'use client';
import { useState, type FormEvent } from 'react';
import { products } from '@/data/products';
import { track } from './Analytics';

type State = { kind: 'idle' } | { kind: 'sending' } | { kind: 'ok' } | { kind: 'err'; msg: string };

export default function ContactForm({ initialProduct = '', initialVariant = '' }: { initialProduct?: string; initialVariant?: string }) {
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [product, setProduct] = useState(initialProduct);
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState({ kind: 'sending' });
    const fd = new FormData(e.currentTarget); const body = Object.fromEntries(fd.entries());
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const j = await r.json().catch(() => ({}));
      if (r.ok) { setState({ kind: 'ok' }); track('form_submission', { form: 'quote', product }); return; }
      setState({ kind: 'err', msg: j.message || 'Something went wrong. Please try again, or call us.' });
    } catch { setState({ kind: 'err', msg: 'We could not send your message. Please check your connection and try again, or call us.' }); }
  }
  if (state.kind === 'ok') return <div className="alert ok" role="status"><b>Thank you.</b> Your message has been sent. A member of the CR Collective team will be in touch.</div>;
  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="row">
        <label>Name <span className="req" aria-hidden="true">*</span><input name="name" required autoComplete="name" placeholder="Enter your name here" /></label>
        <label>Company name<input name="company" autoComplete="organization" /></label>
      </div>
      <div className="row">
        <label>Email address <span className="req" aria-hidden="true">*</span><input name="email" type="email" required autoComplete="email" placeholder="Enter your email address here" /></label>
        <label>Phone number<input name="phone" type="tel" autoComplete="tel" /></label>
      </div>
      <label>Product or packaging category
        <select name="product" value={product} onChange={(e) => setProduct(e.target.value)}>
          <option value="">Not sure yet / custom project</option>
          {products.filter((p) => !p.comingSoon).map((p) => <option key={p.slug} value={p.name}>{p.name}</option>)}
        </select>
      </label>
      {product && <div className="row">
        <label>Variant or size of interest<input name="variant" defaultValue={initialVariant} /></label>
        <label>Expected quantity<input name="quantity" inputMode="numeric" placeholder="e.g. 10,000" /></label>
      </div>}
      <label>How can we help you? <span className="req" aria-hidden="true">*</span><textarea name="message" required /></label>
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {state.kind === 'err' && <div className="alert err" role="alert">{state.msg}</div>}
      <div><button className="btn" type="submit" disabled={state.kind === 'sending'}>{state.kind === 'sending' ? 'Sending…' : 'Send message'} <span className="arr">→</span></button></div>
    </form>
  );
}
