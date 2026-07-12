import type { FrameImage } from "@/lib/types";

const SLOTS = [
  { position: "left-6 top-28", rotate: "-rotate-6" },
  { position: "right-6 top-28", rotate: "rotate-6" },
  { position: "left-16 top-1/2 -translate-y-1/2", rotate: "-rotate-3" },
  { position: "right-16 top-1/2 -translate-y-1/2", rotate: "rotate-3" },
  { position: "left-10 bottom-16", rotate: "rotate-6" },
  { position: "right-10 bottom-16", rotate: "-rotate-6" },
];

export default function Hero({
  titleLine1,
  titleLine2,
  highlightWord,
  images,
  backgroundImage,
}: {
  titleLine1: string;
  titleLine2: string;
  highlightWord: string;
  images: FrameImage[];
  backgroundImage: string;
}) {
  return (
    <section id="top" className="relative overflow-hidden px-4 pt-40 pb-24 sm:pt-48 sm:pb-32">
      {backgroundImage && (
        <div className="absolute inset-0 -z-10">
          <img src={backgroundImage} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-background/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-background/60" />
        </div>
      )}

      {images.slice(0, 6).map((image, i) => {
        const slot = SLOTS[i];
        return (
          <div
            key={image.id}
            className={`pointer-events-none absolute hidden overflow-hidden rounded-2xl border border-border bg-surface p-3 shadow-2xl xl:block ${slot.position} ${slot.rotate}`}
          >
            {image.url ? (
              <img src={image.url} alt="" className="h-28 w-24 rounded-lg object-cover" />
            ) : (
              <div
                className={`h-28 w-24 rounded-lg bg-gradient-to-br ${
                  i % 2 === 0 ? "from-accent/30 to-accent-blue/30" : "from-accent-blue/30 to-accent/30"
                }`}
              />
            )}
          </div>
        );
      })}

      <div className="relative mx-auto max-w-4xl text-center">
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
