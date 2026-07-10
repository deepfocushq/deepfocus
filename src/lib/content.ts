import { defaultContent } from "./default-content";
import { getStoredContent, setStoredContent } from "./store";
import type { SiteContent } from "./types";

export async function getContent(): Promise<SiteContent> {
  const stored = await getStoredContent();
  return stored ?? defaultContent;
}

export async function saveContent(content: SiteContent): Promise<void> {
  await setStoredContent(content);
}
