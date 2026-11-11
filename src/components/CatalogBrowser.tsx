'use client';
import { useMemo, useState } from 'react';
import { products, families } from '@/data/products';
import ProductCard from './ProductCard';

export default function CatalogBrowser() {
  const [fam, setFam] = useState<(typeof families)[number]>('All'); const [q, setQ] = useState('');
  const list = useMemo(() => products.filter((p) => (fam === 'All' || p.family === fam) && (p.name + ' ' + p.summary + ' ' + p.variants.join(' ')).toLowerCase().includes(q.toLowerCase())), [fam, q]);
  return (
    <>
      <div className="filters" role="group" aria-label="Filter products">
        {families.map((f) => <button key={f} className="chip" aria-pressed={fam === f} onClick={() => setFam(f)}>{f}</button>)}
        <input className="search" type="search" placeholder="Search products or sizes" aria-label="Search products" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <p className="lead" style={{ fontSize: '.95rem', marginBottom: 20 }} aria-live="polite">{list.length} product{list.length === 1 ? '' : 's'}</p>
      <div className="cards">{list.map((p, i) => <ProductCard key={p.slug} p={p} i={i % 4} />)}</div>
      {list.length === 0 && <p className="lead">No match. Try another word, or <a href="/contact-us">tell us what you need</a>.</p>}
    </>
  );
}
