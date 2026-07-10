import Link from "next/link";
import ThemeToggle from "./theme-toggle";

const LINKS = [
  { href: "#work", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
];

export default function Navbar({
  brandName,
  hireMeLabel,
}: {
  brandName: string;
  hireMeLabel: string;
}) {
  const initial = brandName.trim().charAt(0).toUpperCase() || "P";

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:top-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          href="#top"
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-base font-bold"
        >
          {initial}
          <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-accent-blue" />
        </Link>

        <nav className="flex items-center gap-1 rounded-full border border-border bg-surface/90 px-2 py-2 backdrop-blur">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground sm:inline-block"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-accent-blue px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {hireMeLabel}
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
