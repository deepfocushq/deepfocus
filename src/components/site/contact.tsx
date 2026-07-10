"use client";

import { useState } from "react";
import type { SocialLink } from "@/lib/types";
import { sanitizeUrl } from "@/lib/safe-url";

export default function Contact({
  eyebrow,
  heading,
  email,
  socialLinks,
}: {
  eyebrow: string;
  heading: string;
  email: string;
  socialLinks: SocialLink[];
}) {
  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`New message from ${name || "your site"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${fromEmail})`);
    window.location.href = `mailto:${encodeURIComponent(email)}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="px-4 py-20 sm:py-28">
      <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-2">
        <div>
          <div className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-5 bg-accent" />
            {eyebrow}
          </div>
          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">{heading}</h2>

          <div className="mt-8 space-y-3">
            <a
              href={`mailto:${email}`}
              className="flex items-center justify-between rounded-2xl border border-border bg-surface p-4"
            >
              <div>
                <div className="text-xs uppercase tracking-wide text-muted">Email</div>
                <div className="font-semibold">{email}</div>
              </div>
              <span>&#8599;</span>
            </a>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={sanitizeUrl(link.url)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-border bg-surface p-4 font-medium"
                >
                  {link.label}
                  <span>&#8599;</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-border bg-surface p-6"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              placeholder="you@company.com"
              type="email"
              className="w-full rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project..."
              rows={4}
              className="w-full resize-none rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            Send message &#8599;
          </button>
        </form>
      </div>
    </section>
  );
}
