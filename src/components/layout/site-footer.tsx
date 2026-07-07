import Link from "next/link";
import { Logo } from "@/components/brand/logo";

const nav = [
  { href: "/", label: "Accueil" },
  { href: "/agents", label: "Agents" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-hairline">
      <div className="container-page flex flex-col gap-10 py-14 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-body-sm text-muted">
            La première agence d&apos;agents IA autonomes au Sénégal.
          </p>
        </div>

        <nav className="flex flex-col gap-3 sm:items-end">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-body-sm text-foreground transition-colors hover:text-foreground-strong"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="container-page flex flex-col gap-2 border-t border-hairline py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-caption uppercase tracking-wide text-graphite">
          © {year} Agent AI — Dakar, Sénégal
        </p>
        <p className="text-caption uppercase tracking-wide text-graphite">
          Conçu pour agir
        </p>
      </div>
    </footer>
  );
}
