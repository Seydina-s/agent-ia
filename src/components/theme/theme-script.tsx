// Runs synchronously in <head> before first paint to set [data-theme]
// on <html>, preventing any flash of the wrong theme. See LESSONS L-002.
export const THEME_STORAGE_KEY = "agent-ai-theme";

const script = `
(function () {
  try {
    var key = "${THEME_STORAGE_KEY}";
    var stored = localStorage.getItem(key);
    var theme = stored;
    if (theme !== "light" && theme !== "dark") {
      // Brand default is dark; honour an explicit system light preference.
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
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
