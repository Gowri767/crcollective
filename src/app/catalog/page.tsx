import type { Metadata } from 'next';
import Crumbs from '@/components/Crumbs';
import CatalogBrowser from '@/components/CatalogBrowser';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Child Resistant Packaging Catalog | Jars, Tins, Boxes & Caps',
  description: 'Browse CR Collective’s child-resistant packaging: airtight tins and boxes, concentrate and glass jars, can and wine caps, topical pumps and sprayers.',
  alternates: { canonical: '/catalog' },
};
export default function Catalog() {
  return (
    <>
      <section className="wrap phead">
        <Crumbs items={[{ name: 'Home', href: '/' }, { name: 'Catalog' }]} />
        <span className="eyebrow">Product catalog</span>
        <h1>Child-resistant packaging, made to stand out.</h1>
        <p className="lead">From bottles and jars to boxes and beverage caps, we offer a diverse selection of packaging solutions that are not only compliant with industry regulations, but also eye-catching and user friendly.</p>
      </section>
      <section className="wrap" style={{ paddingBottom: 'clamp(64px,9vw,120px)' }}>
        <CatalogBrowser />
        <div className="note" style={{ marginTop: 48 }}>Don’t see what you need? <Link href="/product-development" style={{ fontWeight: 600 }}>We develop custom packaging</Link>, or <Link href="/contact-us" style={{ fontWeight: 600 }}>request a quote</Link>.</div>
      </section>
    </>
  );
}
