'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import PvMarkup from './PvMarkup';

const steps = [
  { h: 'Child resistance is the focus of our design.', t: 'Our primary focus is developing child-resistant packaging that meets regulatory requirements and gives peace of mind to parents and caregivers.' },
  { h: 'Airtight, to keep products fresh and secure.', t: 'Airtight features help extend the shelf life of products such as gummies, mints and other edibles.' },
  { h: 'Made to stand out on the shelf.', t: 'Colors, wrap-around printing, and embossing or debossing: packaging that carries your brand.' },
  { h: 'Materials chosen with care.', t: 'From post-consumer recycled plastics to hemp and wheat plastics, we work with our factories toward more sustainable materials.' },
  { h: 'See what we can build for you.', t: 'Tell us about your product and we will walk you through the options.', cta: true },
];
const demo = { name: 'Product placeholder', shape: 'tin' as const, accent: '#c9c4b6' };

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
  // lid lifts through the middle of the story and returns for the CTA
  const lift = p < 0.15 ? 0 : p < 0.4 ? ((p - 0.15) / 0.25) * 220 : p < 0.7 ? 220 : p < 0.9 ? 220 * (1 - (p - 0.7) / 0.2) : 0;
  const ry = -22 + p * 44;
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
          <div className="story-vis"><PvMarkup product={demo} style={{ ['--lift' as string]: lift, ['--ry' as string]: `${ry}deg` }} /></div>
        </div>
      </div>
    </section>
  );
}
