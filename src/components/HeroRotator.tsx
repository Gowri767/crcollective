'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export type HeroItem = { slug: string; name: string; src: string };

/** Hero: one large product at a time, crossfading every few seconds, with float and pointer tilt. Pauses on hover; static for reduced motion. */
export default function HeroRotator({ items }: { items: HeroItem[] }) {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (hold || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % items.length), 3800);
    return () => clearInterval(t);
  }, [hold, items.length]);
  const move = (e: React.PointerEvent) => {
    const el = stage.current; if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--tx', String(((e.clientX - r.left) / r.width - 0.5) * 2));
    el.style.setProperty('--ty', String(((e.clientY - r.top) / r.height - 0.5) * 2));
  };
  const leave = () => { setHold(false); stage.current?.style.setProperty('--tx', '0'); stage.current?.style.setProperty('--ty', '0'); };
  const cur = items[i];
  return (
    <div className="hr" ref={stage} onPointerMove={move} onPointerEnter={() => setHold(true)} onPointerLeave={leave}>
      <div className="hr-tilt">
        {items.map((it, n) => (
          <div key={it.slug} className={`hr-slide${n === i ? ' on' : ''}`} aria-hidden={n !== i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.src} alt={n === i ? `${it.name} child-resistant packaging by CR Collective` : ''} loading={n === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>
      <div className="hr-foot">
        <Link href={`/catalog/${cur.slug}`} className="hr-name" data-track="product_category_click" data-track-location="hero_product">{cur.name} <span aria-hidden="true">→</span></Link>
        <div className="hr-dots" role="group" aria-label="Choose product">
          {items.map((it, n) => <button key={it.slug} aria-label={it.name} aria-pressed={n === i} className={n === i ? 'on' : ''} onClick={() => setI(n)} />)}
        </div>
      </div>
    </div>
  );
}
