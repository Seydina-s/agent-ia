import { sql } from "@/lib/db";

const DEFAULT_MAX = 3;
const DEFAULT_LOCK = 60; // seconds

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

// Highest lock among several identifiers (e.g. email + IP).
export async function getLockAny(ids: string[]): Promise<LockState> {
  let worst: LockState = { locked: false, retryAfter: 0 };
  for (const id of ids) {
    const l = await getLock(id);
    if (l.locked && l.retryAfter > worst.retryAfter) worst = l;
  }
  return worst;
}

// Record a failed attempt; lock for `lockSeconds` once `max` is reached.
export async function recordFailure(
  identifier: string,
  max = DEFAULT_MAX,
  lockSeconds = DEFAULT_LOCK
): Promise<LockState> {
  const rows = (await sql`
    insert into login_attempts (identifier, failed_count, updated_at)
    values (${identifier}, 1, now())
    on conflict (identifier) do update
      set failed_count = login_attempts.failed_count + 1, updated_at = now()
    returning failed_count
  `) as { failed_count: number }[];

  if (rows[0].failed_count >= max) {
    await sql`
      update login_attempts
      set locked_until = now() + make_interval(secs => ${lockSeconds}),
          failed_count = 0
      where identifier = ${identifier}
    `;
    return { locked: true, retryAfter: lockSeconds };
  }
  return { locked: false, retryAfter: 0 };
}

export async function resetAttempts(identifiers: string | string[]) {
  const ids = Array.isArray(identifiers) ? identifiers : [identifiers];
  for (const id of ids) {
    await sql`delete from login_attempts where identifier = ${id}`;
  }
}
