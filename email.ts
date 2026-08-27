/**
 * Email helper – Resend-compatible (or any HTTP provider).
 * Set RESEND_API_KEY (or EMAIL_PROVIDER_URL + EMAIL_API_KEY).
 */

export interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export async function sendEmail(params: SendEmailParams): Promise<{
  ok: boolean;
  id?: string;
  demo?: boolean;
  error?: string;
}> {
  const from =
    params.from ||
    process.env.EMAIL_FROM ||
    "Scopusixteen Publishing <noreply@scopusixteen.com>";
  const to = Array.isArray(params.to) ? params.to : [params.to];

  // Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          subject: params.subject,
          html: params.html,
          text: params.text,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { ok: false, error: data.message || "Email provider error" };
      }
      return { ok: true, id: data.id };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : "Email failed",
      };
    }
  }

  // Demo: log only
  console.log("[email:demo]", {
    from,
    to,
    subject: params.subject,
    preview: params.text?.slice(0, 120) || params.html.slice(0, 120),
  });
  return {
    ok: true,
    demo: true,
    id: `demo-email-${Date.now()}`,
  };
}

export function manuscriptSubmittedEmail(opts: {
  authorName: string;
  title: string;
  manuscriptId: string;
  journalTitle: string;
}) {
  return {
    subject: `Submission received: ${opts.title}`,
    html: `
      <p>Dear ${opts.authorName},</p>
      <p>We have received your manuscript <strong>${opts.title}</strong>
      (ID: ${opts.manuscriptId}) for <em>${opts.journalTitle}</em>.</p>
      <p>You can track status in your
      <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/author">author dashboard</a>.</p>
      <p>— Scopusixteen Publishing</p>
    `,
    text: `Submission received: ${opts.title} (${opts.manuscriptId}) for ${opts.journalTitle}.`,
  };
}

export function apcPaymentReceivedEmail(opts: {
  authorName: string;
  title: string;
  manuscriptId: string;
  amount: string;
}) {
  return {
    subject: `APC payment received: ${opts.title}`,
    html: `
      <p>Dear ${opts.authorName},</p>
      <p>We have received your Article Processing Charge payment (${opts.amount})
      for <strong>${opts.title}</strong> (${opts.manuscriptId}).</p>
      <p>Production will proceed. You will be notified when proofs are ready.</p>
      <p>— Scopusixteen Publishing</p>
    `,
    text: `APC payment received for ${opts.title} (${opts.manuscriptId}): ${opts.amount}.`,
  };
}

export function decisionEmail(opts: {
  authorName: string;
  title: string;
  manuscriptId: string;
  decision: string;
  letter?: string;
}) {
  return {
    subject: `Editorial decision: ${opts.title}`,
    html: `
      <p>Dear ${opts.authorName},</p>
      <p>Decision on <strong>${opts.title}</strong> (${opts.manuscriptId}):
      <strong>${opts.decision}</strong>.</p>
      ${opts.letter ? `<div>${opts.letter}</div>` : ""}
      <p>— Scopusixteen Publishing</p>
    `,
    text: `Decision on ${opts.title}: ${opts.decision}`,
  };
}
