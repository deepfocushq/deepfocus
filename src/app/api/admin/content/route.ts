import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { saveContent } from "@/lib/content";
import type { SiteContent } from "@/lib/types";

export async function PUT(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as SiteContent | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid content payload" }, { status: 400 });
  }

  await saveContent(body);
  return NextResponse.json({ ok: true });
}
