'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

export type StackCard = { title: string; text: string; tone: 'white' | 'sky' | 'lilac' | 'grad' };
const PEEK = 64;
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/** Pinned section: cards slide in from the right and stack over one another as you scroll. Static list on phones and for reduced motion. */
export default function CardStack({ cards, heading, eyebrow }: { cards: StackCard[]; heading: string; eyebrow: string }) {
  const track = useRef<HTMLDivElement>(null); const stage = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState(0); const [w, setW] = useState(900);
  const n = cards.length;
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = track.current; if (!el) return;
        const r = el.getBoundingClientRect(); const total = r.height - innerHeight;
        setQ(Math.min(1, Math.max(0, -r.top / (total || 1))) * (n - 1));
        if (stage.current) setW(stage.current.clientWidth);
      });
    };
    calc(); window.addEventListener('scroll', calc, { passive: true }); window.addEventListener('resize', calc);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', calc); window.removeEventListener('resize', calc); };
  }, [n]);
  const cw = Math.max(280, w - (n - 1) * PEEK);
  return (
    <section className="sec dark stack" aria-labelledby="stack-h" style={{ padding: 0 }}>
      <div className="stack-track" ref={track} style={{ ['--n' as string]: n } as CSSProperties}>
        <div className="stack-sticky">
          <div className="wrap" style={{ width: '100%' }}>
            <span className="eyebrow">{eyebrow}</span>
            <h2 id="stack-h" style={{ marginBottom: 32 }}>{heading}</h2>
            <div className="stack-stage" ref={stage}>
              {cards.map((c, i) => {
                const t = i === 0 ? 1 : Math.min(1, Math.max(0, q - (i - 1)));
                const x = i * PEEK + (1 - ease(t)) * (w - i * PEEK + 24);
                const covered = Math.min(1, Math.max(0, q - i));
                return (
                  <article key={c.title} className={`stack-card tone-${c.tone}`} style={{ width: cw, transform: `translate3d(${x.toFixed(1)}px,0,0)`, zIndex: i + 1, ['--cover' as string]: covered } as CSSProperties}>
                    <span className="num">0{i + 1}</span>
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
