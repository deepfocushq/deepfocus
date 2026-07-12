import { neon } from "@neondatabase/serverless";

export function getClientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function hasPostgres(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

let tableReady = false;

async function getSql() {
  const sql = neon(process.env.DATABASE_URL as string);
  if (!tableReady) {
    await sql`
      CREATE TABLE IF NOT EXISTS rate_limits (
        rate_key TEXT PRIMARY KEY,
        count INT NOT NULL DEFAULT 1,
        first_attempt_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;
    tableReady = true;
  }
  return sql;
}

// No database configured (pure local file-storage dev) means no rate limiting;
// this only ever matters once a real database — and a real deployment — exist.
export async function isRateLimited(
  key: string,
  { max = 5, windowMinutes = 15 }: { max?: number; windowMinutes?: number } = {}
): Promise<boolean> {
  if (!hasPostgres()) return false;
  const sql = await getSql();
  const rows = await sql`SELECT count, first_attempt_at FROM rate_limits WHERE rate_key = ${key}`;
  const row = rows[0] as { count: number; first_attempt_at: string } | undefined;
  if (!row) return false;
  const windowExpired = Date.now() - new Date(row.first_attempt_at).getTime() > windowMinutes * 60 * 1000;
  if (windowExpired) return false;
  return row.count >= max;
}

export async function recordAttempt(key: string, windowMinutes = 15): Promise<void> {
  if (!hasPostgres()) return;
  const sql = await getSql();
  await sql`
    INSERT INTO rate_limits (rate_key, count, first_attempt_at)
    VALUES (${key}, 1, now())
    ON CONFLICT (rate_key) DO UPDATE SET
      count = CASE
        WHEN now() - rate_limits.first_attempt_at > make_interval(mins => ${windowMinutes}) THEN 1
        ELSE rate_limits.count + 1
      END,
      first_attempt_at = CASE
        WHEN now() - rate_limits.first_attempt_at > make_interval(mins => ${windowMinutes}) THEN now()
        ELSE rate_limits.first_attempt_at
      END
  `;
}

export async function clearAttempts(key: string): Promise<void> {
  if (!hasPostgres()) return;
  const sql = await getSql();
  await sql`DELETE FROM rate_limits WHERE rate_key = ${key}`;
}
