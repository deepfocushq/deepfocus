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
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email: fromEmail, message }),
    });

    if (res.ok) {
      setStatus("sent");
      setName("");
      setFromEmail("");
      setMessage("");
      return;
    }

    if (res.status === 500) {
      // Not configured server-side — fall back to opening the visitor's email client.
      const subject = encodeURIComponent(`New message from ${name || "your site"}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${fromEmail})`);
      window.location.href = `mailto:${encodeURIComponent(email)}?subject=${subject}&body=${body}`;
      setStatus("idle");
      return;
    }

    const data = await res.json().catch(() => ({}));
    setError(data.error || "Could not send your message.");
    setStatus("error");
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
              required
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
              required
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
              required
              className="w-full resize-none rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>
          {status === "error" && error && <p className="text-sm text-red-400">{error}</p>}
          {status === "sent" && <p className="text-sm text-accent">Message sent — thanks!</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send message ↗"}
          </button>
        </form>
      </div>
    </section>
  );
}
