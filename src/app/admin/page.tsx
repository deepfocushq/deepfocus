import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { getContent } from "@/lib/content";
import LoginForm from "./login-form";
import AdminEditor from "./admin-editor";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const authed = verifySessionToken(token);

  if (!authed) {
    return <LoginForm />;
  }

  const content = await getContent();
  return <AdminEditor initialContent={content} />;
}
