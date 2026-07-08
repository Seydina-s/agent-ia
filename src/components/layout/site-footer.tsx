import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";

const nav = [
  { href: "/agents", label: "Agents" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/documentation", label: "Documentation" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-hairline">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1.2fr] lg:gap-16">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-body-sm text-muted">
            La première agence d&apos;agents IA autonomes au Sénégal.
          </p>
        </div>

        <nav className="flex flex-col gap-3">
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

        <NewsletterForm />
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
