const SAFE_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

/**
 * Content-managed URLs (social links, etc.) are attacker-controlled if the
 * admin account is ever compromised — reject anything but a handful of
 * inert protocols before it reaches an href/src.
 */
export function sanitizeUrl(url: string): string {
  if (!url) return "#";
  try {
    const parsed = new URL(url, "https://example.com");
    if (SAFE_PROTOCOLS.has(parsed.protocol)) {
      return url;
    }
  } catch {
    // Not a parseable URL — treat as unsafe.
  }
  return "#";
}
