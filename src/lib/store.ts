import { promises as fs } from "fs";
import path from "path";
import type { SiteContent } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "content.json");
const KV_KEY = "deepfocus:site-content";

function hasKv(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function getKvClient() {
  const { Redis } = await import("@upstash/redis");
  return new Redis({
    url: process.env.KV_REST_API_URL as string,
    token: process.env.KV_REST_API_TOKEN as string,
  });
}

export async function getStoredContent(): Promise<SiteContent | null> {
  if (hasKv()) {
    const kv = await getKvClient();
    const value = await kv.get<SiteContent>(KV_KEY);
    return value ?? null;
  }
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as SiteContent;
  } catch {
    return null;
  }
}

export async function setStoredContent(content: SiteContent): Promise<void> {
  if (hasKv()) {
    const kv = await getKvClient();
    await kv.set(KV_KEY, content);
    return;
  }
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(content, null, 2), "utf8");
}
