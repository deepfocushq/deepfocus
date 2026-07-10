import type { ServiceItem } from "@/lib/types";

export default function Services({
  eyebrow,
  heading,
  subheading,
  items,
}: {
  eyebrow: string;
  heading: string;
  subheading: string;
  items: ServiceItem[];
}) {
  return (
    <section id="services" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
          <span className="h-px w-5 bg-accent" />
          {eyebrow}
        </div>
        <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">{heading}</h2>
        <p className="mt-4 max-w-xl text-muted">{subheading}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((item, i) => (
            <div key={item.id} className="relative rounded-2xl border border-border bg-surface p-6">
              <span className="absolute right-5 top-5 text-5xl font-extrabold text-foreground/5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
              {item.checklist.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {item.checklist.map((entry, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {entry}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
