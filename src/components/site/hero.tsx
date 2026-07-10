export default function Hero({
  titleLine1,
  titleLine2,
  highlightWord,
  imageLeft,
  imageRight,
}: {
  titleLine1: string;
  titleLine2: string;
  highlightWord: string;
  imageLeft: string;
  imageRight: string;
}) {
  return (
    <section id="top" className="relative overflow-hidden px-4 pt-40 pb-24 sm:pt-48 sm:pb-32">
      <div className="pointer-events-none absolute left-8 top-1/2 hidden -translate-y-1/2 -rotate-6 overflow-hidden rounded-2xl border border-border bg-surface p-3 shadow-2xl xl:block xl:left-16">
        {imageLeft ? (
          <img src={imageLeft} alt="" className="h-28 w-24 rounded-lg object-cover" />
        ) : (
          <div className="h-28 w-24 rounded-lg bg-gradient-to-br from-accent/30 to-accent-blue/30" />
        )}
      </div>
      <div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 rotate-6 overflow-hidden rounded-2xl border border-border bg-surface p-3 shadow-2xl xl:block xl:right-16">
        {imageRight ? (
          <img src={imageRight} alt="" className="h-28 w-24 rounded-lg object-cover" />
        ) : (
          <div className="h-28 w-24 rounded-lg bg-gradient-to-br from-accent-blue/30 to-accent/30" />
        )}
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
          {titleLine1}
          <br />
          {titleLine2.split(" ").map((word, i) => {
            const isHighlight = word.toLowerCase() === highlightWord.toLowerCase();
            return (
              <span key={i} className={isHighlight ? "text-muted" : undefined}>
                {word}{" "}
              </span>
            );
          })}
        </h1>
      </div>
    </section>
  );
}
