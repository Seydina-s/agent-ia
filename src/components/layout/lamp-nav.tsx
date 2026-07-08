"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "motion/react";
import { cn } from "@/lib/utils";

const items = [
  { name: "Accueil", url: "/" },
  { name: "Agents", url: "/agents" },
  { name: "Services", url: "/services" },
  { name: "Blog", url: "/blog" },
];

// Glass pill nav with a "lamp" light that glides onto the active route.
export function LampNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  return (
    <nav
      className={cn(
        "flex items-center gap-1 rounded-pill border border-hairline bg-white/5 px-1 py-1 backdrop-blur-lg",
        className
      )}
    >
      {items.map((item) => {
        const active = isActive(item.url);
        return (
          <Link
            key={item.url}
            href={item.url}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative rounded-pill px-5 py-2 text-body-sm font-medium transition-colors",
              active
                ? "text-foreground-strong"
                : "text-foreground hover:text-foreground-strong"
            )}
          >
            {item.name}
            {active && (
              <m.div
                layoutId="lamp"
                className="absolute inset-0 -z-10 rounded-pill bg-accent/10"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* the light pointing at the active page */}
                <div className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-accent">
                  <div className="absolute -left-2 -top-2 h-6 w-12 rounded-full bg-accent/25 blur-md" />
                  <div className="absolute -top-1 h-6 w-8 rounded-full bg-accent/20 blur-md" />
                  <div className="absolute left-2 top-0 h-4 w-4 rounded-full bg-accent/20 blur-sm" />
                </div>
              </m.div>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
