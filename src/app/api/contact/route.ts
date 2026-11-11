import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
const esc = (s: unknown) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));

export async function POST(req: Request) {
  let b: Record<string, string>;
  try { b = await req.json(); } catch { return NextResponse.json({ message: 'Invalid request.' }, { status: 400 }); }
  if (b.website) return NextResponse.json({ ok: true }); // honeypot: pretend success to bots
  const name = (b.name || '').trim(), email = (b.email || '').trim(), message = (b.message || '').trim();
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ message: 'Please enter your name, a valid email address and a message.' }, { status: 422 });
  if (message.length > 5000) return NextResponse.json({ message: 'Your message is too long.' }, { status: 422 });

  const key = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO_EMAIL, from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) {
    // Never pretend a message was delivered when no destination is configured.
    return NextResponse.json({ message: 'Our online form is not connected yet. Please call 720 826-3866 and we will help you directly.' }, { status: 503 });
  }
  const rows: [string, string][] = [['Name', name], ['Company', b.company], ['Email', email], ['Phone', b.phone], ['Product', b.product], ['Variant', b.variant], ['Quantity', b.quantity], ['Message', message]];
  const html = rows.filter(([, v]) => v).map(([k, v]) => `<p><b>${k}:</b> ${esc(v).replace(/\n/g, '<br>')}</p>`).join('');
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], reply_to: email, subject: `Quote request: ${b.product || 'General'} (${name})`, html }),
  });
  if (!r.ok) return NextResponse.json({ message: 'We could not send your message right now. Please call 720 826-3866.' }, { status: 502 });
  return NextResponse.json({ ok: true });
}
