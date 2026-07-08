"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Logo } from "@/components/brand/logo";
import { GlassButton } from "@/components/ui/glass-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LampNav } from "@/components/layout/lamp-nav";
import { ease } from "@/lib/motion";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/agents", label: "Agents" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/documentation", label: "Documentation" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Lock scroll + close on Escape while the overlay is open.
  // (The overlay closes on navigation via each link's onClick.)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-page flex h-18 items-center justify-between">
        <Logo />

        {/* Desktop nav — glass pill with the "lamp" on the active page */}
        <LampNav className="hidden lg:flex" />

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <GlassButton href="/contact">Nous contacter</GlassButton>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          className="flex size-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-px w-6 bg-foreground-strong transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-foreground-strong transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {open && (
          <m.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: ease.soft }}
            className="fixed inset-0 z-40 bg-background lg:hidden"
          >
            <nav className="container-page flex h-full flex-col justify-center gap-1 overflow-y-auto py-24">
              {links.map((l, i) => (
                <m.div
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, ease: ease.soft }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block py-2 text-[1.75rem] font-medium tracking-tight transition-colors ${
                      isActive(l.href)
                        ? "text-accent-ink"
                        : "text-foreground-strong hover:text-accent-ink"
                    }`}
                    aria-current={isActive(l.href) ? "page" : undefined}
                  >
                    {l.label}
                  </Link>
                </m.div>
              ))}
              <div className="mt-6 flex items-center gap-3">
                <GlassButton href="/contact" size="lg" onClick={() => setOpen(false)}>
                  Nous contacter
                </GlassButton>
                <ThemeToggle />
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
