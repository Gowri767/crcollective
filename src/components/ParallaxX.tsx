'use client';
import { useEffect, useRef, type ReactNode } from 'react';

const subs = new Set<() => void>(); let bound = false; let ticking = false;
function bind() {
  if (bound) return; bound = true;
  const run = () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { ticking = false; subs.forEach((f) => f()); }); };
  window.addEventListener('scroll', run, { passive: true }); window.addEventListener('resize', run);
}
/** Product image drifts sideways (and tilts slightly) as its card passes through the viewport. */
export default function ParallaxX({ children, amount = 36, className = '' }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const f = () => {
      const r = el.getBoundingClientRect(); if (r.bottom < -100 || r.top > innerHeight + 100) return;
      const d = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / (innerHeight * 0.7)));
      el.style.transform = `translate3d(${(-d * amount).toFixed(1)}px,0,0) rotate(${(d * 2.5).toFixed(2)}deg)`;
    };
    bind(); subs.add(f); f(); return () => { subs.delete(f); };
  }, [amount]);
  return <div ref={ref} className={className} style={{ willChange: 'transform' }}>{children}</div>;
}
