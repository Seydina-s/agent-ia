import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

function deviceFrom(ua: string): "mobile" | "tablet" | "desktop" {
  if (/ipad|tablet/i.test(ua)) return "tablet";
  if (/mobi|android|iphone/i.test(ua)) return "mobile";
  return "desktop";
}

// Privacy-friendly page-view logging: no cookies, no IP, no PII.
export async function POST(req: Request) {
  const ua = req.headers.get("user-agent") ?? "";
  // Skip bots/crawlers.
  if (/bot|crawler|spider|crawling|preview|slurp|bingpreview/i.test(ua)) {
    return new NextResponse(null, { status: 204 });
  }

  let path = "";
  let referrer = "";
  try {
    const body = await req.json();
    path = String(body?.path ?? "");
    referrer = String(body?.referrer ?? "");
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  // Only track internal paths; never track the admin area.
  if (!path.startsWith("/") || path.startsWith("/admin") || path.length > 300) {
    return new NextResponse(null, { status: 204 });
  }

  // Keep only the referrer host (no query/PII); blank for same-site/direct.
  let ref = "";
  try {
    if (referrer) {
      const host = new URL(referrer).host;
      if (host && !host.includes("agent-ai")) ref = host;
    }
  } catch {}

  try {
    await sql`
      insert into page_views (path, referrer, device)
      values (${path}, ${ref || null}, ${deviceFrom(ua)})
    `;
  } catch {
    // analytics must never break the app
  }
  return new NextResponse(null, { status: 204 });
}
