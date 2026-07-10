import type { ProcessStep } from "@/lib/types";

export default function Process({
  eyebrow,
  heading,
  subheading,
  steps,
}: {
  eyebrow: string;
  heading: string;
  subheading: string;
  steps: ProcessStep[];
}) {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
          <span className="h-px w-5 bg-accent" />
          {eyebrow}
        </div>
        <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">{heading}</h2>
        <p className="mt-4 max-w-xl text-muted">{subheading}</p>

        <div className="mt-10 space-y-3">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:gap-6"
            >
              <span className="text-2xl font-extrabold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-bold sm:w-32 sm:shrink-0">{step.title}</span>
              <span className="text-sm text-muted">{step.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
