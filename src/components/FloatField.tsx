'use client';
import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';

export type FloatItem = { node: ReactNode; x: number; y: number; w: number; depth: number; delay?: number; rot?: number; z?: number };

/** Hero product cluster: each item floats gently and shifts with the pointer at its own depth. */
export default function FloatField({ items }: { items: FloatItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(hover: none)').matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', String(((e.clientX - r.left) / r.width - 0.5) * 2));
        el.style.setProperty('--my', String(((e.clientY - r.top) / r.height - 0.5) * 2));
      });
    };
    const leave = () => { el.style.setProperty('--mx', '0'); el.style.setProperty('--my', '0'); };
    window.addEventListener('pointermove', move, { passive: true }); el.addEventListener('pointerleave', leave);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', move); };
  }, []);
  return (
    <div className="ff" ref={ref}>
      {items.map((it, i) => (
        <div key={i} className="ff-item" style={{ left: `${it.x}%`, top: `${it.y}%`, width: `${it.w}%`, zIndex: it.z ?? 1, ['--d' as string]: it.depth } as CSSProperties}>
          <div className="ff-float" style={{ animationDelay: `${-(it.delay ?? i * 1.3)}s`, ['--rot' as string]: `${it.rot ?? 0}deg` } as CSSProperties}>{it.node}</div>
        </div>
      ))}
    </div>
  );
}
