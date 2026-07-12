import type { SiteContent } from "./types";

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

const REQUIRED_OBJECT_KEYS: (keyof SiteContent)[] = [
  "brand",
  "nav",
  "hero",
  "selectedWork",
  "frameWall",
  "about",
  "services",
  "process",
  "whyMe",
  "testimonials",
  "contact",
  "footer",
];

const REQUIRED_ARRAY_KEYS: (keyof SiteContent)[] = [
  "projectGroups",
  "heroImages",
  "frameImages",
  "tools",
  "serviceItems",
  "processSteps",
  "highlights",
  "testimonialItems",
  "socialLinks",
];

/**
 * Deliberately shallow: checks the shape a corrupted/incomplete admin save
 * would violate (missing sections, arrays swapped for objects, etc.) without
 * being a full schema validator. Good enough to stop a bad payload from
 * 500-ing the public homepage.
 */
export function isValidSiteContent(value: unknown): value is SiteContent {
  if (!isObj(value)) return false;

  for (const key of REQUIRED_OBJECT_KEYS) {
    if (!isObj(value[key])) return false;
  }
  for (const key of REQUIRED_ARRAY_KEYS) {
    if (!Array.isArray(value[key])) return false;
  }

  const projectGroups = value.projectGroups as unknown[];
  for (const group of projectGroups) {
    if (!isObj(group) || typeof group.name !== "string" || !Array.isArray(group.projects)) {
      return false;
    }
  }

  return true;
}
