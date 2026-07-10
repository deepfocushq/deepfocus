import type { Testimonial } from "@/lib/types";

export default function Testimonials({
  eyebrow,
  heading,
  items,
}: {
  eyebrow: string;
  heading: string;
  items: Testimonial[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
          <span className="h-px w-5 bg-accent" />
          {eyebrow}
        </div>
        <h2 className="max-w-lg text-3xl font-extrabold leading-tight sm:text-4xl">{heading}</h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border bg-surface p-6">
              <span className="text-3xl text-accent">&ldquo;</span>
              <p className="mt-2 text-sm text-foreground/90">{item.quote}</p>
              <div className="mt-5 border-t border-border pt-4">
                <div className="text-sm font-bold">{item.name}</div>
                <div className="text-xs text-muted">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
