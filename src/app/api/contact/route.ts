import { NextResponse } from "next/server";
import { getContent } from "@/lib/content";
import { isEmailConfigured, sendContactEmail } from "@/lib/email";
import { getClientIp, isRateLimited, recordAttempt } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!isEmailConfigured()) {
    return NextResponse.json({ error: "Email sending isn't configured yet." }, { status: 500 });
  }

  const key = `contact:${getClientIp(request)}`;
  if (await isRateLimited(key, { max: 5, windowMinutes: 60 })) {
    return NextResponse.json(
      { error: "Too many messages sent. Please try again later." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim().slice(0, 200) : "";
  const fromEmail = typeof body?.email === "string" ? body.email.trim().slice(0, 200) : "";
  const message = typeof body?.message === "string" ? body.message.trim().slice(0, 5000) : "";

  if (!name || !EMAIL_RE.test(fromEmail) || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, a valid email, and a message." },
      { status: 400 }
    );
  }

  await recordAttempt(key, 60);

  const content = await getContent();

  try {
    await sendContactEmail({ to: content.contact.email, name, fromEmail, message });
  } catch {
    return NextResponse.json(
      { error: "Could not send your message. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
