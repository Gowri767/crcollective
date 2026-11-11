import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, bySlug, related, site } from '@/data/products';
import { realImage } from '@/components/ProductVisual';
import ProductViewer from '@/components/ProductViewer';
import ProductActions from '@/components/ProductActions';
import ProductCard from '@/components/ProductCard';
import Crumbs from '@/components/Crumbs';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';

export const dynamicParams = false;
export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = bySlug(params.slug); if (!p) return {};
  const title = `${p.name} | Child Resistant Packaging | CR Collective`;
  const description = p.comingSoon ? `${p.name} from CR Collective are coming soon. Ask about availability.` : `${p.summary} Child-resistant packaging from CR Collective: factory direct, wholesale pricing. Request a quote.`;
  return { title, description, alternates: { canonical: `/catalog/${p.slug}` }, openGraph: { title, description, url: `/catalog/${p.slug}` }, ...(p.comingSoon ? { robots: { index: false, follow: true } } : {}) };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = bySlug(params.slug); if (!p) notFound();
  const img = realImage(p.slug);
  return (
    <>
      <section className="wrap phead" style={{ paddingBottom: 0 }}>
        <Crumbs items={[{ name: 'Home', href: '/' }, { name: 'Catalog', href: '/catalog' }, { name: p.name }]} />
      </section>
      <section className="wrap phero">
        <ProductViewer product={p} img={img} />
        <div>
          <span className={`badge ${p.comingSoon ? 'soon' : ''}`}>{p.comingSoon ? 'Coming soon' : 'Child resistant'}</span>
          <h1 style={{ fontSize: 'clamp(2.4rem,5vw,4.2rem)' }}>{p.name}</h1>
          {p.description.map((d, i) => <p key={i} className={i === 0 ? 'lead' : undefined} style={i === 0 ? { color: 'var(--ink)' } : { color: 'var(--muted)' }}>{d}</p>)}
          {p.comingSoon ? <Link href="/contact-us?product=airtight-pod" className="btn" data-track="quote_cta" data-track-location="product_page">Ask About Availability <span className="arr">→</span></Link> : null}
          {!p.comingSoon && <ProductActions slug={p.slug} name={p.name} variants={p.variants} />}
          {p.comingSoon && p.variants.length > 0 && <><h3 style={{ fontSize: '1rem', margin: '28px 0 0' }}>Planned sizes</h3><div className="variants">{p.variants.map((v) => <span className="var" key={v} style={{ cursor: 'default' }}>{v}</span>)}</div></>}
        </div>
      </section>

      {p.claims.length > 0 && (
        <section className="sec stone"><div className="wrap cols">
          <Reveal><span className="eyebrow">Highlights</span><h2>What makes it different.</h2></Reveal>
          <Reveal i={1}><ul className="claims">{p.claims.map((c) => <li key={c.text}>{c.text}</li>)}</ul></Reveal>
        </div></section>
      )}

      {p.extraProducts && (
        <section className="sec"><div className="wrap">
          <Reveal><span className="eyebrow">Part of the system</span><h2>More from the {p.name} line.</h2></Reveal>
          <div className="cols" style={{ marginTop: 40 }}>{p.extraProducts.map((e, i) => <Reveal key={e.name} i={i}><div className="tile"><h3>{e.name}</h3><p>{e.text}</p></div></Reveal>)}</div>
        </div></section>
      )}

      {p.disclaimer && <section className="wrap" style={{ paddingBottom: 56, paddingTop: 56 }}><div className="note"><b>Material compatibility.</b> {p.disclaimer}</div></section>}

      <section className="sec dark">
        <div className="wrap cols">
          <div><span className="eyebrow">Next step</span><h2>Let’s talk about {p.name}.</h2></div>
          <div><p className="lead">Tell us your requirements and quantities and we will come back with details, options and wholesale pricing.</p>
            <Link href={`/contact-us?product=${p.slug}`} className="btn" data-track="quote_cta" data-track-location="product_page_footer" data-track-product={p.slug}>Request a Quote <span className="arr">→</span></Link></div>
        </div>
      </section>

      <section className="sec white"><div className="wrap">
        <Reveal><span className="eyebrow">Related products</span><h2>You may also need.</h2></Reveal>
        <div className="cards" style={{ marginTop: 40 }}>{related(p).map((r, i) => <ProductCard key={r.slug} p={r} i={i} />)}</div>
      </div></section>

      {!p.comingSoon && <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Product', name: p.name, description: p.summary, url: `${site.url}/catalog/${p.slug}`, brand: { '@type': 'Brand', name: 'CR Collective' } }} />}
    </>
  );
}
