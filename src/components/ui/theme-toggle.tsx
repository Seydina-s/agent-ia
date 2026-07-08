"use client";

import { useTheme } from "@/components/theme/theme-provider";
import { useHydrated } from "@/lib/use-hydrated";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  // The real theme is only known on the client (set by the anti-flash script).
  // Until hydrated, render the SSR default ("dark") so hydration matches.
  const hydrated = useHydrated();
  const isDark = hydrated ? theme === "dark" : true;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      aria-pressed={isDark}
      className={`inline-flex h-9 items-center gap-2 rounded-pill border border-hairline px-4 text-body-sm text-foreground transition-colors hover:border-accent hover:text-foreground-strong ${className ?? ""}`}
    >
      <span
        aria-hidden
        className="size-2 rounded-pill bg-accent transition-transform"
      />
      {isDark ? "Sombre" : "Clair"}
    </button>
  );
}
