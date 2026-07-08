import { sql } from "@/lib/db";

const MAX_ATTEMPTS = 3;
const LOCK_SECONDS = 60;

export type LockState = { locked: boolean; retryAfter: number };

// Is this identifier currently locked out?
export async function getLock(identifier: string): Promise<LockState> {
  const rows = (await sql`
    select locked_until from login_attempts where identifier = ${identifier}
  `) as { locked_until: string | null }[];
  const until = rows[0]?.locked_until
    ? new Date(rows[0].locked_until).getTime()
    : 0;
  if (until > Date.now()) {
    return { locked: true, retryAfter: Math.ceil((until - Date.now()) / 1000) };
  }
  return { locked: false, retryAfter: 0 };
}

// Record a failed attempt; lock for LOCK_SECONDS once MAX_ATTEMPTS is reached.
export async function recordFailure(identifier: string): Promise<LockState> {
  const rows = (await sql`
    insert into login_attempts (identifier, failed_count, updated_at)
    values (${identifier}, 1, now())
    on conflict (identifier) do update
      set failed_count = login_attempts.failed_count + 1, updated_at = now()
    returning failed_count
  `) as { failed_count: number }[];

  if (rows[0].failed_count >= MAX_ATTEMPTS) {
    await sql`
      update login_attempts
      set locked_until = now() + make_interval(secs => ${LOCK_SECONDS}),
          failed_count = 0
      where identifier = ${identifier}
    `;
    return { locked: true, retryAfter: LOCK_SECONDS };
  }
  return { locked: false, retryAfter: 0 };
}

export async function resetAttempts(identifier: string) {
  await sql`delete from login_attempts where identifier = ${identifier}`;
}
