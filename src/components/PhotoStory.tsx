'use client';
import { useEffect, useRef, useState } from 'react';

export type Photo = { src: string; caption: string; alt: string };

/** Pinned scroll sequence through real photos: each frame crossfades while the image slowly zooms. */
export default function PhotoStory({ title, photos }: { title: string; photos: Photo[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => {
      const el = track.current; if (!el) return; const r = el.getBoundingClientRect();
      setP(Math.min(0.999, Math.max(0, -r.top / (r.height - window.innerHeight || 1))));
    }); };
    on(); window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, []);
  const n = photos.length; const idx = Math.floor(p * n); const local = p * n - idx;
  return (
    <section className="ps" aria-label={title}>
      <div className="ps-track" ref={track} style={{ height: `${n * 90 + 40}vh` }}>
        <div className="ps-sticky">
          <div className="ps-frame">
            {photos.map((ph, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={ph.src} src={ph.src} alt={i === idx ? ph.alt : ''} aria-hidden={i !== idx} loading="lazy"
                className={`ps-img${i === idx ? ' on' : ''}`} style={i === idx ? { transform: `scale(${1.02 + local * 0.08})` } : undefined} />
            ))}
          </div>
          <div className="ps-cap"><span className="eyebrow">{title}</span><h2>{photos[idx].caption}</h2>
            <div className="ps-dots" aria-hidden="true">{photos.map((_, i) => <i key={i} className={i <= idx ? 'on' : ''} />)}</div></div>
        </div>
      </div>
    </section>
  );
}
