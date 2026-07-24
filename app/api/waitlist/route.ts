import { env } from "cloudflare:workers";

type WaitlistPayload = {
  email?: unknown;
  city?: unknown;
  district?: unknown;
  role?: unknown;
  problem?: unknown;
  referrals?: unknown;
  ambassador?: unknown;
};

function textValue(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

async function ensureWaitlistSchema() {
  await env.DB.batch([
    env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS waitlist (
        id text PRIMARY KEY NOT NULL,
        email text NOT NULL,
        city text NOT NULL,
        district text,
        role text NOT NULL,
        problem text,
        referrals integer DEFAULT 0 NOT NULL,
        ambassador integer DEFAULT 0 NOT NULL,
        created_at integer NOT NULL,
        updated_at integer NOT NULL
      )`
    ),
    env.DB.prepare(
      "CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_unique ON waitlist (email)"
    ),
  ]);
}

export async function POST(request: Request) {
  const body = (await request.json()) as WaitlistPayload;
  const email = textValue(body.email, 180).toLowerCase();
  const city = textValue(body.city, 80);
  const role = textValue(body.role, 80);

  if (!email.includes("@") || !city || !role) {
    return Response.json({ error: "Nieprawidłowe dane formularza." }, { status: 400 });
  }

  const now = Date.now();
  const referrals = Math.max(0, Math.min(1000, Number(body.referrals) || 0));

  await ensureWaitlistSchema();

  await env.DB.prepare(
    `INSERT INTO waitlist (
      id, email, city, district, role, problem, referrals, ambassador, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(email) DO UPDATE SET
      city = excluded.city,
      district = excluded.district,
      role = excluded.role,
      problem = excluded.problem,
      referrals = excluded.referrals,
      ambassador = excluded.ambassador,
      updated_at = excluded.updated_at`
  )
    .bind(
      crypto.randomUUID(),
      email,
      city,
      textValue(body.district, 180) || null,
      role,
      textValue(body.problem, 1200) || null,
      referrals,
      body.ambassador === true ? 1 : 0,
      now,
      now
    )
    .run();

  return Response.json({ ok: true });
}
