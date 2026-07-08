import { neon } from "@neondatabase/serverless";

// Neon over HTTP — portable (works on a Node VPS and serverless alike).
// `sql` is a tagged template: interpolations are ALWAYS sent as bound
// parameters, never string-concatenated, so it is safe against SQL injection.
// Never build queries by concatenating user input into the template string.
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL manquant (voir .env.local).");
}

export const sql = neon(process.env.DATABASE_URL);
