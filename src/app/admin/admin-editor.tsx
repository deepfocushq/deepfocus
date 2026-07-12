"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type {
  FrameImage,
  HighlightItem,
  ProcessStep,
  Project,
  ProjectGroup,
  ServiceItem,
  SiteContent,
  SocialLink,
  Testimonial,
} from "@/lib/types";

function newId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm outline-none focus:border-accent"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full resize-none rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm outline-none focus:border-accent"
      />
    </label>
  );
}

async function uploadToR2(file: File): Promise<string> {
  const res = await fetch("/api/admin/upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contentType: file.type }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Could not start upload");
  }
  const { uploadUrl, publicUrl } = await res.json();

  const putRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!putRes.ok) {
    throw new Error("Upload to storage failed");
  }
  return publicUrl;
}

function MediaUploadField({
  label,
  value,
  onChange,
  kind,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  kind: "image" | "video";
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const url = await uploadToR2(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <div className="flex items-start gap-3">
        {kind === "image" ? (
          value ? (
            <img
              src={value}
              alt=""
              className="h-14 w-14 shrink-0 rounded-lg border border-border object-cover"
            />
          ) : (
            <div className="h-14 w-14 shrink-0 rounded-lg border border-dashed border-border" />
          )
        ) : value ? (
          <video src={value} className="h-14 w-14 shrink-0 rounded-lg border border-border object-cover" />
        ) : (
          <div className="h-14 w-14 shrink-0 rounded-lg border border-dashed border-border" />
        )}
        <div className="flex-1 space-y-2">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... or upload a file"
            className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm outline-none focus:border-accent"
          />
          <div className="flex items-center gap-2">
            <label className="inline-block cursor-pointer rounded-full border border-dashed border-border px-3 py-1 text-xs text-muted hover:border-foreground/30 hover:text-foreground">
              {uploading ? "Uploading…" : kind === "image" ? "Upload image" : "Upload video"}
              <input
                type="file"
                accept={kind === "image" ? "image/*" : "video/*"}
                className="hidden"
                onChange={handleFile}
              />
            </label>
            {error && <span className="text-xs text-red-400">{error}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="text-lg font-bold">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function StringListEditor({
  items,
  onChange,
  placeholder,
  addLabel = "Add",
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  addLabel?: string;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={item}
            onChange={(e) => onChange(items.map((it, idx) => (idx === i ? e.target.value : it)))}
            placeholder={placeholder}
            className="flex-1 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm outline-none focus:border-accent"
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            className="rounded-lg border border-border px-3 text-sm text-muted hover:text-red-400"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="rounded-full border border-dashed border-border px-4 py-1.5 text-sm text-muted hover:border-foreground/30 hover:text-foreground"
      >
        + {addLabel}
      </button>
    </div>
  );
}

function ArrayEditor<T extends { id: string }>({
  items,
  onChange,
  newItem,
  addLabel,
  renderItem,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  addLabel: string;
  renderItem: (item: T, update: (patch: Partial<T>) => void) => React.ReactNode;
}) {
  function update(index: number, patch: Partial<T>) {
    onChange(items.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  }
  function remove(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={item.id} className="relative rounded-xl border border-border p-4">
          <button
            type="button"
            onClick={() => remove(i)}
            className="absolute right-3 top-3 text-xs text-muted hover:text-red-400"
          >
            Remove
          </button>
          <div className="space-y-3 pr-16">{renderItem(item, (patch) => update(i, patch))}</div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, newItem()])}
        className="rounded-full border border-dashed border-border px-4 py-2 text-sm text-muted hover:border-foreground/30 hover:text-foreground"
      >
        + {addLabel}
      </button>
    </div>
  );
}

export default function AdminEditor({ initialContent }: { initialContent: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  function set<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((prev) => ({ ...prev, [key]: value }));
  }

  function patchSection<K extends keyof SiteContent>(key: K, patch: Partial<SiteContent[K]>) {
    setContent((prev) => ({ ...prev, [key]: { ...(prev[key] as object), ...patch } as SiteContent[K] }));
  }

  async function handleSave() {
    setStatus("saving");
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setStatus(res.ok ? "saved" : "error");
    if (res.ok) {
      setTimeout(() => setStatus("idle"), 2000);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-background pb-24 text-foreground">
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur sm:px-8">
        <div>
          <h1 className="text-base font-bold">Site content</h1>
          <p className="text-xs text-muted">Edit every section of your portfolio.</p>
        </div>
        <div className="flex items-center gap-3">
          {status === "saved" && <span className="text-sm text-accent">Saved</span>}
          {status === "error" && <span className="text-sm text-red-400">Save failed</span>}
          <a href="/" target="_blank" className="text-sm font-medium text-muted hover:text-foreground">
            View site &#8599;
          </a>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-muted hover:text-foreground"
          >
            Log out
          </button>
          <button
            onClick={handleSave}
            disabled={status === "saving"}
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground disabled:opacity-60"
          >
            {status === "saving" ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-8">
        <SectionCard title="Brand" description="Your name and the nav bar CTA label.">
          <Field
            label="Name / brand"
            value={content.brand.name}
            onChange={(v) => patchSection("brand", { name: v })}
          />
          <Field
            label="Tagline / title"
            value={content.brand.tagline}
            onChange={(v) => patchSection("brand", { tagline: v })}
          />
          <Field
            label='"Hire me" button label'
            value={content.nav.hireMeLabel}
            onChange={(v) => patchSection("nav", { hireMeLabel: v })}
          />
          <MediaUploadField
            label="Logo (optional — falls back to the first letter of your name)"
            kind="image"
            value={content.brand.logoUrl}
            onChange={(v) => patchSection("brand", { logoUrl: v })}
          />
          <MediaUploadField
            label="Favicon (optional — PNG recommended, square)"
            kind="image"
            value={content.brand.faviconUrl}
            onChange={(v) => patchSection("brand", { faviconUrl: v })}
          />
        </SectionCard>

        <SectionCard title="Hero" description="The big headline at the top of the page.">
          <Field
            label="Line 1"
            value={content.hero.titleLine1}
            onChange={(v) => patchSection("hero", { titleLine1: v })}
          />
          <Field
            label="Line 2"
            value={content.hero.titleLine2}
            onChange={(v) => patchSection("hero", { titleLine2: v })}
          />
          <Field
            label="Word in line 2 to mute (must match exactly)"
            value={content.hero.highlightWord}
            onChange={(v) => patchSection("hero", { highlightWord: v })}
          />
          <MediaUploadField
            label="Background image (optional — sits behind the whole hero, dimmed for readability)"
            kind="image"
            value={content.hero.backgroundImage}
            onChange={(v) => patchSection("hero", { backgroundImage: v })}
          />
          <div className="pt-2">
            <span className="mb-2 block text-sm font-semibold">
              Decorative images (scattered around the hero — up to 6 shown)
            </span>
            <ArrayEditor<FrameImage>
              items={content.heroImages}
              onChange={(items) => set("heroImages", items)}
              addLabel="Add image"
              newItem={() => ({ id: newId("hi"), url: "" })}
              renderItem={(item, update) => (
                <MediaUploadField
                  label="Image"
                  kind="image"
                  value={item.url}
                  onChange={(v) => update({ url: v })}
                />
              )}
            />
          </div>
        </SectionCard>

        <SectionCard title="Selected work">
          <Field
            label="Eyebrow"
            value={content.selectedWork.eyebrow}
            onChange={(v) => patchSection("selectedWork", { eyebrow: v })}
          />
          <Field
            label="Heading"
            value={content.selectedWork.heading}
            onChange={(v) => patchSection("selectedWork", { heading: v })}
          />
          <TextAreaField
            label="Subheading"
            value={content.selectedWork.subheading}
            onChange={(v) => patchSection("selectedWork", { subheading: v })}
          />
          <div className="pt-2">
            <span className="mb-2 block text-sm font-semibold">Project groups</span>
            <ArrayEditor<ProjectGroup>
              items={content.projectGroups}
              onChange={(items) => set("projectGroups", items)}
              addLabel="Add group"
              newItem={() => ({ id: newId("g"), name: "", projects: [] })}
              renderItem={(group, updateGroup) => (
                <>
                  <Field
                    label="Group name"
                    value={group.name}
                    onChange={(v) => updateGroup({ name: v })}
                    placeholder="e.g. Fashion & Beauty"
                  />
                  <div className="pt-1">
                    <span className="mb-2 block text-sm font-medium">Videos in this group</span>
                    <ArrayEditor<Project>
                      items={group.projects}
                      onChange={(projects) => updateGroup({ projects })}
                      addLabel="Add video"
                      newItem={() => ({
                        id: newId("p"),
                        title: "",
                        description: "",
                        thumbnail: "",
                        videoUrl: "",
                      })}
                      renderItem={(item, update) => (
                        <>
                          <Field label="Title" value={item.title} onChange={(v) => update({ title: v })} />
                          <TextAreaField
                            label="Description"
                            value={item.description}
                            onChange={(v) => update({ description: v })}
                            rows={2}
                          />
                          <MediaUploadField
                            label="Video"
                            kind="video"
                            value={item.videoUrl}
                            onChange={(v) => update({ videoUrl: v })}
                          />
                          <MediaUploadField
                            label="Thumbnail / poster (optional)"
                            kind="image"
                            value={item.thumbnail}
                            onChange={(v) => update({ thumbnail: v })}
                          />
                        </>
                      )}
                    />
                  </div>
                </>
              )}
            />
          </div>
        </SectionCard>

        <SectionCard title="Gallery" description="Horizontal scrolling image strip.">
          <Field
            label="Eyebrow"
            value={content.frameWall.eyebrow}
            onChange={(v) => patchSection("frameWall", { eyebrow: v })}
          />
          <Field
            label="Heading"
            value={content.frameWall.heading}
            onChange={(v) => patchSection("frameWall", { heading: v })}
          />
          <div className="pt-2">
            <span className="mb-2 block text-sm font-semibold">Images</span>
            <ArrayEditor<FrameImage>
              items={content.frameImages}
              onChange={(items) => set("frameImages", items)}
              addLabel="Add image"
              newItem={() => ({ id: newId("f"), url: "" })}
              renderItem={(item, update) => (
                <MediaUploadField
                  label="Image"
                  kind="image"
                  value={item.url}
                  onChange={(v) => update({ url: v })}
                />
              )}
            />
          </div>
        </SectionCard>

        <SectionCard title="About">
          <Field
            label="Eyebrow"
            value={content.about.eyebrow}
            onChange={(v) => patchSection("about", { eyebrow: v })}
          />
          <TextAreaField
            label="About text"
            value={content.about.text}
            onChange={(v) => patchSection("about", { text: v })}
            rows={4}
          />
          <div className="pt-2">
            <span className="mb-2 block text-sm font-semibold">Tools</span>
            <StringListEditor
              items={content.tools}
              onChange={(items) => set("tools", items)}
              placeholder="Tool name"
              addLabel="Add tool"
            />
          </div>
        </SectionCard>

        <SectionCard title="Services">
          <Field
            label="Eyebrow"
            value={content.services.eyebrow}
            onChange={(v) => patchSection("services", { eyebrow: v })}
          />
          <Field
            label="Heading"
            value={content.services.heading}
            onChange={(v) => patchSection("services", { heading: v })}
          />
          <TextAreaField
            label="Subheading"
            value={content.services.subheading}
            onChange={(v) => patchSection("services", { subheading: v })}
          />
          <div className="pt-2">
            <span className="mb-2 block text-sm font-semibold">Service cards</span>
            <ArrayEditor<ServiceItem>
              items={content.serviceItems}
              onChange={(items) => set("serviceItems", items)}
              addLabel="Add service"
              newItem={() => ({ id: newId("s"), title: "", description: "", checklist: [] })}
              renderItem={(item, update) => (
                <>
                  <Field label="Title" value={item.title} onChange={(v) => update({ title: v })} />
                  <TextAreaField
                    label="Description"
                    value={item.description}
                    onChange={(v) => update({ description: v })}
                    rows={2}
                  />
                  <div>
                    <span className="mb-1.5 block text-sm font-medium">Checklist</span>
                    <StringListEditor
                      items={item.checklist}
                      onChange={(checklist) => update({ checklist })}
                      placeholder="Checklist item"
                      addLabel="Add item"
                    />
                  </div>
                </>
              )}
            />
          </div>
        </SectionCard>

        <SectionCard title="Process">
          <Field
            label="Eyebrow"
            value={content.process.eyebrow}
            onChange={(v) => patchSection("process", { eyebrow: v })}
          />
          <Field
            label="Heading"
            value={content.process.heading}
            onChange={(v) => patchSection("process", { heading: v })}
          />
          <TextAreaField
            label="Subheading"
            value={content.process.subheading}
            onChange={(v) => patchSection("process", { subheading: v })}
          />
          <div className="pt-2">
            <span className="mb-2 block text-sm font-semibold">Steps</span>
            <ArrayEditor<ProcessStep>
              items={content.processSteps}
              onChange={(items) => set("processSteps", items)}
              addLabel="Add step"
              newItem={() => ({ id: newId("st"), title: "", description: "" })}
              renderItem={(item, update) => (
                <>
                  <Field label="Title" value={item.title} onChange={(v) => update({ title: v })} />
                  <TextAreaField
                    label="Description"
                    value={item.description}
                    onChange={(v) => update({ description: v })}
                    rows={2}
                  />
                </>
              )}
            />
          </div>
        </SectionCard>

        <SectionCard title="Why work with me">
          <Field
            label="Eyebrow"
            value={content.whyMe.eyebrow}
            onChange={(v) => patchSection("whyMe", { eyebrow: v })}
          />
          <Field
            label="Heading"
            value={content.whyMe.heading}
            onChange={(v) => patchSection("whyMe", { heading: v })}
          />
          <div className="pt-2">
            <span className="mb-2 block text-sm font-semibold">Highlights</span>
            <ArrayEditor<HighlightItem>
              items={content.highlights}
              onChange={(items) => set("highlights", items)}
              addLabel="Add highlight"
              newItem={() => ({ id: newId("h"), label: "" })}
              renderItem={(item, update) => (
                <Field label="Label" value={item.label} onChange={(v) => update({ label: v })} />
              )}
            />
          </div>
        </SectionCard>

        <SectionCard title="Testimonials">
          <Field
            label="Eyebrow"
            value={content.testimonials.eyebrow}
            onChange={(v) => patchSection("testimonials", { eyebrow: v })}
          />
          <Field
            label="Heading"
            value={content.testimonials.heading}
            onChange={(v) => patchSection("testimonials", { heading: v })}
          />
          <div className="pt-2">
            <span className="mb-2 block text-sm font-semibold">Quotes</span>
            <ArrayEditor<Testimonial>
              items={content.testimonialItems}
              onChange={(items) => set("testimonialItems", items)}
              addLabel="Add testimonial"
              newItem={() => ({ id: newId("t"), quote: "", name: "", title: "" })}
              renderItem={(item, update) => (
                <>
                  <TextAreaField label="Quote" value={item.quote} onChange={(v) => update({ quote: v })} rows={2} />
                  <Field label="Name" value={item.name} onChange={(v) => update({ name: v })} />
                  <Field label="Role / company" value={item.title} onChange={(v) => update({ title: v })} />
                </>
              )}
            />
          </div>
        </SectionCard>

        <SectionCard title="Contact">
          <Field
            label="Eyebrow"
            value={content.contact.eyebrow}
            onChange={(v) => patchSection("contact", { eyebrow: v })}
          />
          <Field
            label="Heading"
            value={content.contact.heading}
            onChange={(v) => patchSection("contact", { heading: v })}
          />
          <Field
            label="Email"
            value={content.contact.email}
            onChange={(v) => patchSection("contact", { email: v })}
          />
          <div className="pt-2">
            <span className="mb-2 block text-sm font-semibold">Social links</span>
            <ArrayEditor<SocialLink>
              items={content.socialLinks}
              onChange={(items) => set("socialLinks", items)}
              addLabel="Add link"
              newItem={() => ({ id: newId("sl"), label: "", url: "" })}
              renderItem={(item, update) => (
                <>
                  <Field label="Label" value={item.label} onChange={(v) => update({ label: v })} />
                  <Field label="URL" value={item.url} onChange={(v) => update({ url: v })} />
                </>
              )}
            />
          </div>
        </SectionCard>

        <SectionCard title="Footer">
          <TextAreaField
            label="Tagline"
            value={content.footer.tagline}
            onChange={(v) => patchSection("footer", { tagline: v })}
            rows={2}
          />
          <Field
            label="Copyright name"
            value={content.footer.copyrightName}
            onChange={(v) => patchSection("footer", { copyrightName: v })}
          />
        </SectionCard>
      </div>
    </div>
  );
}
