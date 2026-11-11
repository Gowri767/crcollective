'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
export default function TimelineReveal({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null); const [on, setOn] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.2 }); io.observe(el); return () => io.disconnect(); }, []);
  return <div ref={ref} className={`tl ${on ? 'in' : ''}`}><span className="tl-line" />{children}</div>;
}
