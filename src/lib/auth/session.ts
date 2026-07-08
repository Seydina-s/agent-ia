import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 8; // 8h

function secretKey() {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET manquant (voir .env.local).");
  return new TextEncoder().encode(s);
}

export type SessionPayload = { sub: string; email: string };

export async function createSession(payload: SessionPayload) {
  const token = await new SignJWT(payload as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secretKey());
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return { sub: String(payload.sub), email: String(payload.email) };
  } catch {
    return null;
  }
}

export async function clearSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

// Defense-in-depth for server actions/pages: middleware already guards /admin,
// but actions are directly reachable, so re-check here too.
export async function requireAdmin(): Promise<SessionPayload> {
  const session = await getSession();
  if (session) return session;
  const { redirect } = await import("next/navigation");
  redirect("/admin/login"); // throws (NEXT_REDIRECT) — never returns
  throw new Error("unreachable");
}
