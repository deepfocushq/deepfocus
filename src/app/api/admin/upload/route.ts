import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { isR2Configured, uploadToR2 } from "@/lib/r2";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isR2Configured()) {
    return NextResponse.json(
      { error: "Image uploads aren't configured yet (missing R2 environment variables)." },
      { status: 500 }
    );
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const extension = ALLOWED_TYPES[file.type];
  if (!extension) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
  }

  const key = `uploads/${randomUUID()}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const url = await uploadToR2(key, buffer, file.type);

  return NextResponse.json({ url });
}
