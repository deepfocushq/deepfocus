import { promises as fs } from "fs";
import path from "path";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import type { SiteContent } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "content.json");

function hasPostgres(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

let tableReady = false;

async function getSql(): Promise<NeonQueryFunction<false, false>> {
  const sql = neon(process.env.DATABASE_URL as string);
  if (!tableReady) {
    await sql`
      CREATE TABLE IF NOT EXISTS site_content (
        id INT PRIMARY KEY DEFAULT 1,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;
    tableReady = true;
  }
  return sql;
}

export async function getStoredContent(): Promise<SiteContent | null> {
  if (hasPostgres()) {
    const sql = await getSql();
    const rows = await sql`SELECT data FROM site_content WHERE id = 1`;
    return (rows[0]?.data as SiteContent) ?? null;
  }
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as SiteContent;
  } catch {
    return null;
  }
}

export async function setStoredContent(content: SiteContent): Promise<void> {
  if (hasPostgres()) {
    const sql = await getSql();
    const json = JSON.stringify(content);
    await sql`
      INSERT INTO site_content (id, data, updated_at)
      VALUES (1, ${json}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()
    `;
    return;
  }
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(content, null, 2), "utf8");
}
