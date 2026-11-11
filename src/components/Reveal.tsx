'use client';
import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';

export default function Reveal({ children, i = 0, className = '', as: Tag = 'div' }: { children: ReactNode; i?: number; className?: string; as?: 'div' | 'li' | 'section' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setOn(true); return; }
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { setOn(true); io.disconnect(); } }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const T = Tag as 'div';
  return <T ref={ref} className={`rv ${on ? 'in' : ''} ${className}`} style={{ ['--i' as string]: i } as CSSProperties}>{children}</T>;
}
