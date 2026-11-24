'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import PvMarkup from './PvMarkup';
import type { Product } from '@/data/products';

type G = { src: string; caption: string; key: string };

/**
 * Product page hero. Left: stage with the official CR Collective render (pointer-tilt, zoom on hover,
 * crossfade between views). Right: copy and variant picker. Choosing a variant shows that variant's
 * own official image (which includes CR Collective's dimension drawing); we do not restate any numbers.
 */
export default function ProductHero({ p, hero, variants, gallery }: { p: Product; hero: string | null; variants: Record<string, string>; gallery: G[] }) {
  const [v, setV] = useState<string | null>(null);
  const [gi, setGi] = useState<number | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const views = [
    ...(hero ? [{ k: 'hero', src: hero, label: 'Overview' }] : []),
    ...gallery.map((g, i) => ({ k: 'g' + i, src: g.src, label: g.caption })),
  ];
  const activeSrc = v && variants[v] ? variants[v] : gi !== null && views[gi] ? views[gi].src : hero;
  const href = `/contact-us?product=${encodeURIComponent(p.slug)}${v ? `&variant=${encodeURIComponent(v)}` : ''}`;
  const tilt = (e: React.PointerEvent) => {
    const el = stage.current; if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--tx', String(((e.clientX - r.left) / r.width - 0.5) * 2));
    el.style.setProperty('--ty', String(((e.clientY - r.top) / r.height - 0.5) * 2));
  };
  const reset = () => { stage.current?.style.setProperty('--tx', '0'); stage.current?.style.setProperty('--ty', '0'); };
  return (
    <section className="wrap phero">
      <div>
        <div className="viewer stagey" ref={stage} onPointerMove={tilt} onPointerLeave={reset}>
          {activeSrc ? (
            <div className="vw-tilt">
              {[hero, ...Object.values(variants), ...gallery.map((g) => g.src)].filter((s, i, a): s is string => !!s && a.indexOf(s) === i).map((s) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={s} src={s} className={`vw-img${s === activeSrc ? ' on' : ''}`} alt={s === activeSrc ? `${p.name}${v ? ` ${v}` : ''} child-resistant packaging by CR Collective` : ''} loading={s === hero ? 'eager' : 'lazy'} />
              ))}
            </div>
          ) : <div className="pv-host"><PvMarkup product={p} auto /></div>}
        </div>
        {views.length > 1 && (
          <div className="thumbs" role="group" aria-label="Views">
            {views.map((t, i) => <button key={t.k} className="thumb" aria-pressed={v === null && (gi ?? 0) === i} onClick={() => { setV(null); setGi(i); }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={t.src} alt="" loading="lazy" /><span>{t.label}</span></button>)}
          </div>
        )}
      </div>
      <div>
        <span className={`badge ${p.comingSoon ? 'soon' : ''}`}>{p.comingSoon ? 'Coming soon' : 'Child resistant'}</span>
        <h1 style={{ fontSize: 'clamp(2.4rem,5vw,4.2rem)' }}>{p.name}</h1>
        {p.description.map((d, i) => <p key={i} className={i === 0 ? 'lead' : undefined} style={i === 0 ? { color: 'var(--ink)' } : { color: 'var(--muted)' }}>{d}</p>)}
        {p.variants.length > 0 && (
          <>
            <h3 style={{ fontSize: '1rem', marginBottom: 0 }}>{p.comingSoon ? 'Planned sizes' : 'Product variants'}</h3>
            <div className="variants" role="group" aria-label={`${p.name} variants`}>
              {p.variants.map((x) => <button key={x} className="var" aria-pressed={v === x} onClick={() => { setV(v === x ? null : x); setGi(null); }}>{x}</button>)}
            </div>
          </>
        )}
        <Link href={p.comingSoon ? '/contact-us?product=airtight-pod' : href} className="btn" data-track="quote_cta" data-track-location="product_page" data-track-product={p.slug}>
          {p.comingSoon ? 'Ask About Availability' : v ? `Request a Quote: ${v}` : 'Request a Quote'} <span className="arr">→</span>
        </Link>
      </div>
    </section>
  );
}
