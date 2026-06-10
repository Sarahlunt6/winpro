import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  emptyQuote,
  validateAll,
  serviceNames,
  type QuoteData,
} from "@/lib/quote";
import { rateLimit } from "@/lib/rateLimit";

// Owner inbox (§6). Falls back to the client-confirmed address if the env var is unset.
const TO_EMAIL = process.env.QUOTE_TO_EMAIL || "winprollc363@gmail.com";
// Until the dirtywinpro.com sending domain is verified in Resend, use the
// onboarding domain (§6 Resend setup). Override with QUOTE_FROM_EMAIL once verified.
const FROM_EMAIL = process.env.QUOTE_FROM_EMAIL || "WinPro Website <onboarding@resend.dev>";

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

// Coerce arbitrary JSON into a QuoteData shape we control (never trust the client).
function coerce(body: unknown): QuoteData {
  const b = (body ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  return {
    ...emptyQuote,
    services: Array.isArray(b.services) ? b.services.filter((s) => typeof s === "string") : [],
    propertyType: str(b.propertyType) as QuoteData["propertyType"],
    windowCount: str(b.windowCount) as QuoteData["windowCount"],
    planInterest: (str(b.planInterest) || "None") as QuoteData["planInterest"],
    address: str(b.address),
    city: str(b.city),
    name: str(b.name),
    phone: str(b.phone),
    email: str(b.email),
    notes: str(b.notes),
    company: str(b.company),
  };
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const data = coerce(json);

  // Honeypot: a real user never fills this. Silently 200 so bots learn nothing (§6).
  if (data.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Basic rate limit by IP (§6).
  const limit = rateLimit(clientIp(req));
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  // Server-side validation mirrors the client (§6 — never trust the client).
  const errors = validateAll(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Please check your answers and try again.", fields: errors },
      { status: 400 },
    );
  }

  const subject = `New Quote Request — ${data.name} (${data.city})`;
  const ownerHtml = buildOwnerEmail(data);

  // Dev fallback: with no API key, log the email so the full flow is testable
  // locally without Resend credentials. Real sending kicks in once the key is set.
  if (!process.env.RESEND_API_KEY) {
    console.info("[quote] RESEND_API_KEY not set — would send:\n", { subject, to: TO_EMAIL, data });
    return NextResponse.json({ ok: true, delivered: false });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email,
      subject,
      html: ownerHtml,
    });
    if (error) {
      console.error("[quote] Resend error:", error);
      return NextResponse.json({ error: "Could not send right now. Please try again." }, { status: 502 });
    }
  } catch (err) {
    console.error("[quote] Resend threw:", err);
    return NextResponse.json({ error: "Could not send right now. Please try again." }, { status: 502 });
  }

  // Optional auto-reply to the lead (§6). Best-effort — never fails the request.
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: "We got your request — WinPro",
      html: buildLeadEmail(data),
    });
  } catch (err) {
    console.error("[quote] auto-reply failed (non-fatal):", err);
  }

  return NextResponse.json({ ok: true, delivered: true });
}

function esc(v: string): string {
  return v.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
}

function buildOwnerEmail(d: QuoteData): string {
  const rows: Array<[string, string]> = [
    ["Services", serviceNames(d.services).join(", ") || "—"],
    ["Property type", d.propertyType || "—"],
    ["Window count", d.windowCount || "—"],
    ["Plan interest", d.planInterest],
    ["Address", `${d.address}, ${d.city}`],
    ["Name", d.name],
    ["Phone", d.phone],
    ["Email", d.email],
    ["Notes", d.notes || "—"],
  ];
  const body = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;background:#F6F9FB;font-weight:600;color:#16202E;white-space:nowrap;vertical-align:top;">${label}</td>
          <td style="padding:8px 12px;color:#16202E;">${esc(value)}</td>
        </tr>`,
    )
    .join("");

  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;">
      <h1 style="font-size:18px;color:#16202E;">New quote request</h1>
      <p style="color:#4a5568;font-size:14px;">A new lead came in from the WinPro website.</p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;font-size:14px;">
        ${body}
      </table>
      <p style="color:#94a3b8;font-size:12px;margin-top:16px;">Reply directly to this email to reach ${esc(d.name)}.</p>
    </div>`;
}

function buildLeadEmail(d: QuoteData): string {
  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;">
      <h1 style="font-size:18px;color:#16202E;">Thanks, ${esc(d.name.split(" ")[0] || d.name)}!</h1>
      <p style="color:#16202E;font-size:15px;line-height:1.6;">
        We got your request and we're on it. Expect a call from WinPro within 24 hours to
        confirm details and get you a price. If you need us sooner, just call
        <a href="tel:+14354064455" style="color:#4FA8D8;">(435) 406-4455</a>.
      </p>
      <p style="color:#94a3b8;font-size:13px;">— The WinPro team · St. George &amp; Southern Utah</p>
    </div>`;
}
