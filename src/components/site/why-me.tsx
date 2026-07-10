import type { HighlightItem } from "@/lib/types";

export default function WhyMe({
  eyebrow,
  heading,
  items,
}: {
  eyebrow: string;
  heading: string;
  items: HighlightItem[];
}) {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
          <span className="h-px w-5 bg-accent" />
          {eyebrow}
        </div>
        <h2 className="max-w-lg text-3xl font-extrabold leading-tight sm:text-4xl">{heading}</h2>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                *
              </span>
              <span className="text-sm font-semibold">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
