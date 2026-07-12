import { Resend } from "resend";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API);
}

export async function sendContactEmail({
  to,
  name,
  fromEmail,
  message,
}: {
  to: string;
  name: string;
  fromEmail: string;
  message: string;
}): Promise<void> {
  const resend = new Resend(process.env.RESEND_API);
  // onboarding@resend.dev works with zero setup. To send from your own domain
  // instead, verify it in the Resend dashboard and set RESEND_FROM_EMAIL.
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  const { error } = await resend.emails.send({
    from: `Portfolio contact form <${from}>`,
    to,
    replyTo: fromEmail,
    subject: `New message from ${name}`,
    text: `${message}\n\n— ${name} (${fromEmail})`,
  });

  if (error) {
    throw new Error(error.message || "Failed to send email");
  }
}
