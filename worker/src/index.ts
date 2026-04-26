/**
 * VHS Inquiry Worker.
 *
 * Receives the contact-form submission, sends Jordan a notification email
 * (with photo attachments), and sends the client an auto-reply with
 * service-specific follow-up questions. No persistence.
 */

import {
  buildAdminEmail,
  buildClientEmail,
  sendEmail,
  type InquiryData,
  type ResendAttachment,
} from "./email";

interface Env {
  RESEND_API_KEY: string;
  NOTIFY_TO: string;
  FROM_ADDRESS: string;
  REPLY_TO: string;
  ALLOWED_ORIGINS: string;
}

const MAX_TOTAL_ATTACHMENT_BYTES = 20 * 1024 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") ?? "";
    const cors = corsHeaders(env, origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== "POST") {
      return jsonResponse(
        { ok: false, error: "Method not allowed" },
        cors,
        405
      );
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return jsonResponse(
        { ok: false, error: "Invalid form data" },
        cors,
        400
      );
    }

    const honeypot = formData.get("website");
    if (typeof honeypot === "string" && honeypot.length > 0) {
      return jsonResponse({ ok: true }, cors);
    }

    const data: InquiryData = {
      name: stringField(formData, "name"),
      email: stringField(formData, "email"),
      phone: stringField(formData, "phone"),
      address: stringField(formData, "address"),
      service: stringField(formData, "service"),
      timeframe: stringField(formData, "timeframe"),
      message: stringField(formData, "message"),
    };

    const validationError = validate(data);
    if (validationError) {
      return jsonResponse(
        { ok: false, error: validationError },
        cors,
        400
      );
    }

    const photoFiles = (formData.getAll("photos") as unknown as Array<File | string>).filter(
      (entry): entry is File =>
        typeof entry !== "string" &&
        entry !== null &&
        typeof (entry as File).arrayBuffer === "function" &&
        (entry as File).size > 0
    );

    let attachments: ResendAttachment[] = [];
    let attachmentNote = "";
    try {
      const result = await buildAttachments(photoFiles);
      attachments = result.attachments;
      attachmentNote = result.note;
    } catch (err) {
      console.error("attachment_build_failed", err);
      attachmentNote = "Photos could not be attached - ask client to email them directly.";
    }

    const adminEmail = buildAdminEmail(data, attachments.length);
    const clientEmail = buildClientEmail(data);

    if (attachmentNote) {
      adminEmail.text += `\n\nNote: ${attachmentNote}`;
      adminEmail.html = adminEmail.html.replace(
        "</body>",
        `<p style="margin: 16px 0 0; color: #b00; font-size: 13px;">${attachmentNote}</p></body>`
      );
    }

    const sendResults = await Promise.allSettled([
      sendEmail(env.RESEND_API_KEY, {
        from: env.FROM_ADDRESS,
        to: [env.NOTIFY_TO],
        replyTo: data.email,
        subject: adminEmail.subject,
        html: adminEmail.html,
        text: adminEmail.text,
        attachments: attachments.length > 0 ? attachments : undefined,
      }),
      sendEmail(env.RESEND_API_KEY, {
        from: env.FROM_ADDRESS,
        to: [data.email],
        replyTo: env.REPLY_TO,
        subject: clientEmail.subject,
        html: clientEmail.html,
        text: clientEmail.text,
      }),
    ]);

    const adminFailed = sendResults[0].status === "rejected";
    const clientFailed = sendResults[1].status === "rejected";

    if (adminFailed) {
      console.error("admin_email_failed", (sendResults[0] as PromiseRejectedResult).reason);
    }
    if (clientFailed) {
      console.error("client_email_failed", (sendResults[1] as PromiseRejectedResult).reason);
    }

    if (adminFailed && clientFailed) {
      return jsonResponse(
        { ok: false, error: "Email delivery failed" },
        cors,
        502
      );
    }

    return jsonResponse(
      {
        ok: true,
        adminDelivered: !adminFailed,
        clientDelivered: !clientFailed,
      },
      cors
    );
  },
};

function stringField(form: FormData, name: string): string {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function validate(data: InquiryData): string | null {
  if (!data.name) return "Name is required";
  if (!data.email || !EMAIL_RE.test(data.email)) return "Valid email is required";
  if (!data.phone) return "Phone is required";
  if (!data.address) return "Address is required";
  if (!data.service) return "Service is required";
  if (!data.message) return "Message is required";
  return null;
}

interface AttachmentResult {
  attachments: ResendAttachment[];
  note: string;
}

async function buildAttachments(files: File[]): Promise<AttachmentResult> {
  if (files.length === 0) {
    return { attachments: [], note: "" };
  }

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);
  if (totalSize > MAX_TOTAL_ATTACHMENT_BYTES) {
    return {
      attachments: [],
      note: `Client attached ${files.length} photo(s) totalling ${formatMb(totalSize)} - too large to forward, ask client to send them directly.`,
    };
  }

  const attachments: ResendAttachment[] = [];
  for (const file of files) {
    const buf = await file.arrayBuffer();
    attachments.push({
      filename: file.name || "photo",
      content: arrayBufferToBase64(buf),
    });
  }
  return { attachments, note: "" };
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}

function formatMb(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function corsHeaders(env: Env, origin: string): Record<string, string> {
  const allowed = env.ALLOWED_ORIGINS.split(",").map((s) => s.trim());
  const allowOrigin = allowed.includes(origin) ? origin : allowed[0] ?? "*";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Vary": "Origin",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    "Access-Control-Max-Age": "86400",
  };
}

function jsonResponse(
  body: unknown,
  cors: Record<string, string>,
  status = 200
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...cors,
    },
  });
}
