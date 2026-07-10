const BAR_WIDTHS = ["92%", "76%", "58%", "40%"];

export default function About({
  eyebrow,
  text,
  tools,
}: {
  eyebrow: string;
  text: string;
  tools: string[];
}) {
  return (
    <section id="about" className="px-4 py-20 sm:py-28">
      <div className="mx-auto grid max-w-4xl gap-12 sm:grid-cols-2 sm:items-center">
        <div>
          <div className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-5 bg-accent" />
            {eyebrow}
          </div>
          <p className="text-2xl font-bold leading-snug sm:text-3xl">{text}</p>

          {tools.length > 0 && (
            <div className="mt-10">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
                Tools I work with
              </div>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-border px-4 py-1.5 text-sm font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="mb-6 flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-blue" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          </div>
          <div className="space-y-3">
            {BAR_WIDTHS.map((width, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-2 w-8 rounded-full bg-surface-2" />
                <div className="h-2 flex-1 rounded-full bg-surface-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width,
                      background: i % 2 === 0 ? "var(--accent)" : "var(--accent-blue)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
