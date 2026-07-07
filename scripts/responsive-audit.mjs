// Responsive audit — screenshots the running dev server at a range of widths
// and reports any horizontal overflow. Requires the dev server on :3000 and
// Google Chrome installed. Usage: node scripts/responsive-audit.mjs [url]
import { mkdirSync } from "node:fs";
import puppeteer from "puppeteer-core";

const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
const url = process.argv[2] || "http://localhost:3000/";
const widths = [320, 390, 768, 1024, 1440, 1920, 2560];
const outDir = ".audit";
mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox"],
});

let anyOverflow = false;
for (const w of widths) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: Math.round(w * 0.62), deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle0" });
  const overflow = await page.evaluate(
    (vw) => document.documentElement.scrollWidth - vw,
    w
  );
  if (overflow > 0) anyOverflow = true;
  console.log(`${String(w).padStart(4)}px  overflow=${overflow}px  ${overflow > 0 ? "❌" : "✓"}`);
  await page.screenshot({ path: `${outDir}/w-${w}.png` });
  await page.close();
}
await browser.close();
console.log(anyOverflow ? "\nHorizontal overflow detected." : "\nNo horizontal overflow at any width.");
process.exit(anyOverflow ? 1 : 0);
