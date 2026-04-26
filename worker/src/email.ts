/**
 * Email body builders and Resend HTTP client.
 *
 * Two emails per submission:
 *  - Notification to Jordan (admin transcript with attachments).
 *  - Auto-reply to client (warm thanks plus per-service follow-up questions).
 */

import {
  getServiceLabel,
  getServiceTemplate,
  getTimeframeLabel,
} from "./templates";

export interface InquiryData {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  timeframe: string;
  message: string;
}

export interface ResendAttachment {
  filename: string;
  content: string;
}

export interface SendEmailParams {
  from: string;
  to: string[];
  replyTo: string;
  subject: string;
  html: string;
  text: string;
  attachments?: ResendAttachment[];
}

export async function sendEmail(
  apiKey: string,
  params: SendEmailParams
): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: params.from,
      to: params.to,
      reply_to: params.replyTo,
      subject: params.subject,
      html: params.html,
      text: params.text,
      attachments: params.attachments,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend ${res.status}: ${body}`);
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function nl2br(input: string): string {
  return escapeHtml(input).replace(/\n/g, "<br>");
}

function getFirstName(fullName: string): string {
  const trimmed = fullName.trim();
  if (!trimmed) return "there";
  return trimmed.split(/\s+/)[0];
}

export function buildAdminEmail(
  data: InquiryData,
  photoCount: number
): { subject: string; html: string; text: string } {
  const serviceLabel = getServiceLabel(data.service);
  const timeframeLabel = getTimeframeLabel(data.timeframe);
  const subject = `New estimate request: ${serviceLabel} - ${data.name}`;

  const text = [
    "New estimate request from versatilehomesolutions.ca",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Address: ${data.address}`,
    `Service: ${serviceLabel}`,
    `Timeframe: ${timeframeLabel}`,
    `Photos attached: ${photoCount}`,
    "",
    "Message:",
    data.message,
    "",
    `Reply directly to this email to respond to ${data.name}.`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; color: #1a1a1a; line-height: 1.5;">
  <h2 style="margin: 0 0 16px; color: #1a1a1a;">New estimate request</h2>
  <p style="margin: 0 0 24px; color: #555;">From <strong>${escapeHtml(data.name)}</strong> via versatilehomesolutions.ca</p>

  <table style="width: 100%; border-collapse: collapse;" cellpadding="0" cellspacing="0">
    <tr><td style="padding: 8px 0; color: #555; width: 120px;">Name</td><td style="padding: 8px 0;"><strong>${escapeHtml(data.name)}</strong></td></tr>
    <tr><td style="padding: 8px 0; color: #555;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
    <tr><td style="padding: 8px 0; color: #555;">Phone</td><td style="padding: 8px 0;"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></td></tr>
    <tr><td style="padding: 8px 0; color: #555;">Address</td><td style="padding: 8px 0;">${escapeHtml(data.address)}</td></tr>
    <tr><td style="padding: 8px 0; color: #555;">Service</td><td style="padding: 8px 0;">${escapeHtml(serviceLabel)}</td></tr>
    <tr><td style="padding: 8px 0; color: #555;">Timeframe</td><td style="padding: 8px 0;">${escapeHtml(timeframeLabel)}</td></tr>
    <tr><td style="padding: 8px 0; color: #555;">Photos</td><td style="padding: 8px 0;">${photoCount} attached</td></tr>
  </table>

  <h3 style="margin: 24px 0 8px; color: #1a1a1a;">Message</h3>
  <div style="padding: 16px; background: #f6f6f4; border-left: 3px solid #d4a017; border-radius: 4px; white-space: pre-wrap;">${nl2br(data.message)}</div>

  <p style="margin: 24px 0 0; color: #888; font-size: 13px;">An auto-reply has already been sent to ${escapeHtml(data.email)}. Reply to this email to respond directly.</p>
</body>
</html>`;

  return { subject, html, text };
}

export function buildClientEmail(
  data: InquiryData
): { subject: string; html: string; text: string } {
  const template = getServiceTemplate(data.service);
  const firstName = getFirstName(data.name);
  const subject = `Thanks for reaching out, ${firstName} - a few quick questions`;

  const questionsText = template.questions
    .map((q, i) => `${i + 1}. ${q}`)
    .join("\n\n");

  const text = [
    `Hi ${firstName},`,
    "",
    `Thanks for reaching out to Versatile Home Solutions about your ${template.serviceLabel}. Jordan will be in touch personally to set up a site visit and put together a quote.`,
    "",
    "While we line that up, a few questions that will help us come prepared:",
    "",
    questionsText,
    "",
    "Just hit reply with whatever you know - even partial answers help, and photos are always welcome.",
    "",
    "Talk soon,",
    "The VHS Team",
    "versatilehomesolutions.ca",
    "(902) 824-5333",
  ].join("\n");

  const questionsHtml = template.questions
    .map(
      (q) =>
        `<li style="margin-bottom: 12px; line-height: 1.55;">${escapeHtml(q)}</li>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0; background: #f6f6f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a1a1a;">
  <table style="width: 100%; max-width: 600px; margin: 0 auto; background: #ffffff;" cellpadding="0" cellspacing="0">
    <tr>
      <td style="padding: 32px 32px 16px;">
        <p style="margin: 0; font-size: 12px; letter-spacing: 1px; color: #d4a017; text-transform: uppercase; font-weight: 600;">Versatile Home Solutions</p>
        <h1 style="margin: 8px 0 0; font-size: 24px; color: #1a1a1a;">Thanks for reaching out, ${escapeHtml(firstName)}!</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 0 32px 16px; line-height: 1.6; color: #333;">
        <p style="margin: 0 0 16px;">Thanks for getting in touch about your ${escapeHtml(template.serviceLabel)}. Jordan will be in touch personally to set up a site visit and put together a quote.</p>
        <p style="margin: 0;">While we line that up, a few questions that will help us come prepared:</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 0 32px 24px;">
        <ol style="margin: 0; padding-left: 20px; color: #333;">
          ${questionsHtml}
        </ol>
      </td>
    </tr>
    <tr>
      <td style="padding: 0 32px 24px; line-height: 1.6; color: #333;">
        <p style="margin: 0 0 12px;">Just hit reply with whatever you know - even partial answers help, and photos are always welcome.</p>
        <p style="margin: 0;">Talk soon,<br><strong>The VHS Team</strong></p>
      </td>
    </tr>
    <tr>
      <td style="padding: 16px 32px; background: #1a2a3a; color: #ffffff; font-size: 13px;">
        <p style="margin: 0 0 4px;"><strong>Versatile Home Solutions</strong></p>
        <p style="margin: 0; color: #cbd5d8;">
          <a href="https://versatilehomesolutions.ca" style="color: #d4a017; text-decoration: none;">versatilehomesolutions.ca</a>
          &nbsp;&middot;&nbsp;
          <a href="tel:+19028245333" style="color: #d4a017; text-decoration: none;">(902) 824-5333</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}
