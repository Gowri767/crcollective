'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const links = [
  { href: '/catalog', label: 'Catalog' },
  { href: '/product-development', label: 'Product Development' },
  { href: '/about-us', label: 'About Us' },
];
export default function Nav() {
  const path = usePathname(); const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 24); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);
  useEffect(() => setOpen(false), [path]);
  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap pill">
        <Link href="/" className="logo" aria-label="CR Collective home"><span className="mark" aria-hidden="true">CR</span>Collective</Link>
        <button className="burger" aria-expanded={open} aria-controls="menu" aria-label="Menu" onClick={() => setOpen(!open)}>
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d={open ? 'M4 4l12 12M16 4L4 16' : 'M3 6h14M3 14h14'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>
        </button>
        <nav aria-label="Main">
          <ul id="menu" className={open ? 'open' : ''}>
            {links.map((l) => <li key={l.href}><Link href={l.href} aria-current={path.startsWith(l.href) ? 'page' : undefined}>{l.label}</Link></li>)}
            <li><Link href="/contact-us" className="btn" data-track="quote_cta" data-track-location="nav">Request a Quote</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
