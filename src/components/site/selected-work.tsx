"use client";

import { useState } from "react";
import type { Project } from "@/lib/types";

function PlayThumb({ thumbnail }: { thumbnail: string }) {
  return (
    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-surface-2">
      {thumbnail ? (
        <img src={thumbnail} alt="" className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-accent/20 to-accent-blue/20" />
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="black">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function SelectedWork({
  eyebrow,
  heading,
  subheading,
  projects,
}: {
  eyebrow: string;
  heading: string;
  subheading: string;
  projects: Project[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="work" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
          <span className="h-px w-5 bg-accent" />
          {eyebrow}
        </div>
        <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">{heading}</h2>
        <p className="mt-4 max-w-xl text-muted">{subheading}</p>

        <div className="mt-10 space-y-3">
          {projects.map((project) => {
            const isOpen = openId === project.id;
            return (
              <div
                key={project.id}
                className="rounded-2xl border border-border bg-surface transition-colors"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : project.id)}
                  className="flex w-full items-center gap-4 p-4 text-left sm:p-5"
                >
                  <PlayThumb thumbnail={project.thumbnail} />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold uppercase tracking-wide text-accent">
                      {project.category}
                    </div>
                    <div className="mt-1 truncate text-base font-bold sm:text-lg">
                      {project.title}
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{project.description}</p>
                  </div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`shrink-0 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="border-t border-border px-5 pb-5 pt-4">
                    <div className="aspect-video w-full overflow-hidden rounded-xl bg-surface-2">
                      {project.thumbnail ? (
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/10 to-accent-blue/10 text-sm text-muted">
                          Add a thumbnail or video link in the admin panel
                        </div>
                      )}
                    </div>
                    <p className="mt-4 text-sm text-muted">{project.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
