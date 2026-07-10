import type { FrameImage } from "@/lib/types";

export default function FrameWall({
  eyebrow,
  heading,
  images,
}: {
  eyebrow: string;
  heading: string;
  images: FrameImage[];
}) {
  if (images.length === 0) return null;

  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
          <span className="h-px w-5 bg-accent" />
          {eyebrow}
        </div>
        <h2 className="mb-8 text-2xl font-extrabold sm:text-3xl">{heading}</h2>
      </div>
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 pb-2 sm:px-[max(1rem,calc((100vw-56rem)/2))]">
        {images.map((image) => (
          <div
            key={image.id}
            className="h-40 w-64 shrink-0 overflow-hidden rounded-xl bg-surface-2"
          >
            {image.url ? (
              <img src={image.url} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-accent/15 to-accent-blue/15" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
