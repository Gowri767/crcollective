'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { realImage } from './ProductVisual';

const steps = [
  { h: 'Child resistance is the focus of our design.', t: 'Our primary focus is developing child-resistant packaging that meets regulatory requirements and gives peace of mind to parents and caregivers.' },
  { h: 'Airtight, to keep products fresh and secure.', t: 'Airtight features help extend the shelf life of products such as gummies, mints and other edibles.' },
  { h: 'Made to stand out on the shelf.', t: 'Colors, wrap-around printing, and embossing or debossing: packaging that carries your brand.' },
  { h: 'Materials chosen with care.', t: 'From post-consumer recycled plastics to hemp and wheat plastics, we work with our factories toward more sustainable materials.' },
  { h: 'See what we can build for you.', t: 'Tell us about your product and we will walk you through the options.', cta: true },
];
const imgs = ['tins', 'bio-boxes', 'leaning-jars', 'aluminum-cans', 'topicals'];

export default function ScrollStory() {
  const track = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = track.current; if (!el) return;
        const r = el.getBoundingClientRect(); const total = r.height - window.innerHeight;
        setP(Math.min(1, Math.max(0, -r.top / (total || 1))));
      });
    };
    on(); window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, []);
  const idx = Math.min(steps.length - 1, Math.floor(p * steps.length));
  const ry = -14 + p * 28;
  const sc = 0.92 + Math.sin(p * Math.PI) * 0.12;
  return (
    <section className="story" aria-labelledby="story-h">
      <h2 id="story-h" className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>How CR Collective packaging is made</h2>
      <div className="story-track" ref={track}>
        <div className="story-sticky">
          <div className="story-copy">
            {steps.map((s, i) => (
              <div key={i} className={`story-step ${i === idx ? 'on' : ''}`} aria-hidden={i !== idx ? undefined : undefined}>
                <span className="n">0{i + 1} / 0{steps.length}</span>
                <h2>{s.h}</h2><p className="lead">{s.t}</p>
                {s.cta && <div><Link href="/contact-us" className="btn" data-track="quote_cta" data-track-location="scroll_story">Request Product Details <span className="arr">→</span></Link></div>}
              </div>
            ))}
          </div>
            <div className="story-prog" aria-hidden="true">{steps.map((_, i) => <i key={i} className={i <= idx ? 'on' : ''} />)}</div>
          <div className="story-vis"><div className="story-stage" style={{ transform: `perspective(1200px) rotateY(${ry}deg) scale(${sc})` }}>
            {imgs.map((slug, i) => { const src = realImage(slug); return src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={slug} src={src} alt={i === idx ? 'CR Collective child-resistant packaging' : ''} aria-hidden={i !== idx} className={`story-img${i === idx ? ' on' : i < idx ? ' past' : ''}`} loading="lazy" />) : null; })}
          </div></div>
        </div>
      </div>
    </section>
  );
}
