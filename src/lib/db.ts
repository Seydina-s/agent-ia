import { neon, neonConfig } from "@neondatabase/serverless";

// Neon over HTTP — portable (works on a Node VPS and serverless alike).
// `sql` is a tagged template: interpolations are ALWAYS sent as bound
// parameters, never string-concatenated, so it is safe against SQL injection.
// Never build queries by concatenating user input into the template string.
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL manquant (voir .env.local).");
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// The Neon free-tier compute suspends after inactivity; the first query after a
// cold start can throw "fetch failed" before the request reaches a live server.
// Retrying the HTTP fetch on network errors makes those transient failures
// recover automatically (safe: a thrown fetch means the query never ran).
async function fetchWithRetry(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  let lastErr: unknown;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      return await fetch(input, init);
    } catch (err) {
      lastErr = err;
      await sleep(250 * (attempt + 1)); // 250ms, 500ms, 750ms
    }
  }
  throw lastErr;
}

neonConfig.fetchFunction = fetchWithRetry;

export const sql = neon(process.env.DATABASE_URL);
