import { neon } from "@neondatabase/serverless";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function hasPostgres(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

let tableReady = false;

async function getSql() {
  const sql = neon(process.env.DATABASE_URL as string);
  if (!tableReady) {
    await sql`
      CREATE TABLE IF NOT EXISTS login_attempts (
        ip TEXT PRIMARY KEY,
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
export async function isRateLimited(ip: string): Promise<boolean> {
  if (!hasPostgres()) return false;
  const sql = await getSql();
  const rows = await sql`SELECT count, first_attempt_at FROM login_attempts WHERE ip = ${ip}`;
  const row = rows[0] as { count: number; first_attempt_at: string } | undefined;
  if (!row) return false;
  const windowExpired = Date.now() - new Date(row.first_attempt_at).getTime() > WINDOW_MS;
  if (windowExpired) return false;
  return row.count >= MAX_ATTEMPTS;
}

export async function recordFailedAttempt(ip: string): Promise<void> {
  if (!hasPostgres()) return;
  const sql = await getSql();
  await sql`
    INSERT INTO login_attempts (ip, count, first_attempt_at)
    VALUES (${ip}, 1, now())
    ON CONFLICT (ip) DO UPDATE SET
      count = CASE
        WHEN now() - login_attempts.first_attempt_at > interval '15 minutes' THEN 1
        ELSE login_attempts.count + 1
      END,
      first_attempt_at = CASE
        WHEN now() - login_attempts.first_attempt_at > interval '15 minutes' THEN now()
        ELSE login_attempts.first_attempt_at
      END
  `;
}

export async function clearAttempts(ip: string): Promise<void> {
  if (!hasPostgres()) return;
  const sql = await getSql();
  await sql`DELETE FROM login_attempts WHERE ip = ${ip}`;
}
