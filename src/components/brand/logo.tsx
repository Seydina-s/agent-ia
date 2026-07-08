import Link from "next/link";

// Placeholder mark echoing the real icon (rounded "A" + cyan dot).
// `ink` follows the theme (white on dark, deep teal on light) via --logo-ink;
// the dot is always the cyan signal. Swapped for the official SVG on delivery.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Agent AI"
      fill="none"
    >
      <g
        stroke="var(--logo-ink)"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* main diagonal of the A */}
        <path d="M27 8 L37 40" />
        {/* rounded base with a central lift */}
        <path d="M9 34 L16.5 28 L24 34" />
      </g>
      {/* the dot — always the cyan signal */}
      <circle cx="16.5" cy="17.5" r="4.5" fill="var(--color-cyan-500, #24b7cc)" />
    </svg>
  );
}

export function Logo({
  className,
  wordmark = true,
}: {
  className?: string;
  wordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Agent AI — accueil"
      className={`inline-flex items-center gap-2.5 ${className ?? ""}`}
    >
      <LogoMark className="h-8 w-8 shrink-0" />
      {wordmark && (
        <span className="text-lg font-medium tracking-tight text-[color:var(--logo-ink)]">
          Agent<span className="text-accent-ink"> AI</span>
        </span>
      )}
    </Link>
  );
}
