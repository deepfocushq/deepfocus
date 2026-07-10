export default function Footer({
  brandName,
  tagline,
  copyrightName,
}: {
  brandName: string;
  tagline: string;
  copyrightName: string;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-4 py-10">
      <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <div className="text-lg font-extrabold">{brandName}.</div>
          <p className="mt-1 max-w-sm text-sm text-muted">{tagline}</p>
        </div>
        <p className="text-sm text-muted">
          © {year} {copyrightName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
