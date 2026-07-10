import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { getContent, saveContent } from "@/lib/content";
import { isValidSiteContent } from "@/lib/validate-content";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!isValidSiteContent(body)) {
    return NextResponse.json({ error: "Invalid content payload" }, { status: 400 });
  }

  await saveContent(body);
  return NextResponse.json({ ok: true });
}
