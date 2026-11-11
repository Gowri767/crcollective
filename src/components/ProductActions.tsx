'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ProductActions({ slug, name, variants }: { slug: string; name: string; variants: string[] }) {
  const [v, setV] = useState<string | null>(null);
  const href = `/contact-us?product=${encodeURIComponent(slug)}${v ? `&variant=${encodeURIComponent(v)}` : ''}`;
  return (
    <div>
      {variants.length > 0 && (
        <>
          <h3 style={{ fontSize: '1rem', marginBottom: 0 }}>Product variants</h3>
          <div className="variants" role="group" aria-label={`${name} variants`}>
            {variants.map((x) => <button key={x} className="var" aria-pressed={v === x} onClick={() => setV(v === x ? null : x)}>{x}</button>)}
          </div>
        </>
      )}
      <Link href={href} className="btn" data-track="quote_cta" data-track-location="product_page" data-track-product={slug}>
        {v ? `Request a Quote: ${v}` : 'Request a Quote'} <span className="arr">→</span>
      </Link>
    </div>
  );
}
