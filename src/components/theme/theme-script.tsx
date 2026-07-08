import Script from "next/script";

// Runs synchronously before hydration to set [data-theme] on <html>,
// preventing any flash of the wrong theme. Uses next/script (beforeInteractive)
// so React 19 doesn't reject a raw <script> in the tree. See LESSONS L-002.
export const THEME_STORAGE_KEY = "agent-ai-theme";

const script = `
(function () {
  try {
    var key = "${THEME_STORAGE_KEY}";
    var stored = localStorage.getItem(key);
    var theme = stored;
    if (theme !== "light" && theme !== "dark") {
      theme = window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

export function ThemeScript() {
  return (
    // beforeInteractive in the root layout is the correct App Router placement;
    // the lint rule below is a stale Pages-Router (_document) heuristic.
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script id="theme-init" strategy="beforeInteractive">
      {script}
    </Script>
  );
}
