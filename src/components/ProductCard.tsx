import Link from 'next/link';
import type { Product } from '@/data/products';
import ProductVisual from './ProductVisual';
import Reveal from './Reveal';
import ParallaxX from './ParallaxX';

export default function ProductCard({ p, i = 0 }: { p: Product; i?: number }) {
  return (
    <Reveal i={i}>
      <Link href={`/catalog/${p.slug}`} className="card" data-track="product_category_click" data-track-product={p.slug}>
        <span className={`badge ${p.comingSoon ? 'soon' : ''}`}>{p.comingSoon ? 'Coming soon' : 'Child resistant'}</span>
        {p.sustainable && !p.comingSoon && <span className="badge eco" style={{ marginTop: -4 }}>Sustainable material</span>}
        <div className="vis"><ParallaxX><ProductVisual product={p} /></ParallaxX></div>
        <div className="meta">
          <div><h3>{p.name}</h3><p className="sub">{p.summary}</p></div>
          <span className="go" aria-hidden="true">→</span>
        </div>
      </Link>
    </Reveal>
  );
}
