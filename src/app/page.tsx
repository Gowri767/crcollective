import type { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/data/products';
import ProductVisual from '@/components/ProductVisual';
import ProductCard from '@/components/ProductCard';
import ScrollStory from '@/components/ScrollStory';
import Reveal from '@/components/Reveal';
import TimelineReveal from '@/components/TimelineReveal';
import FloatField from '@/components/FloatField';
import Marquee from '@/components/Marquee';
import CardStack from '@/components/CardStack';

export const metadata: Metadata = {
  title: 'CR Collective | Custom Child Resistant Packaging Solutions',
  description: 'Exclusive, factory-direct child-resistant packaging at wholesale pricing: airtight tins, jars, boxes, caps and topicals, plus custom product development.',
  alternates: { canonical: '/' },
  openGraph: { title: 'CR Collective | Custom Child Resistant Packaging Solutions', description: 'Exclusive packaging designs. Factory direct. Wholesale pricing.', url: '/' },
};

const featured = ['tins', 'leaning-jars', 'bio-boxes'].map((s) => products.find((p) => p.slug === s)!);
const pick = (slug: string) => products.find((p) => p.slug === slug)!;
const cluster = [
  { slug: 'tins', x: 20, y: 24, w: 62, depth: 14, z: 3, auto: true, label: true, rot: 0 },
  { slug: 'leaning-jars', x: 0, y: 4, w: 30, depth: 30, z: 2, auto: false, label: false, rot: -4 },
  { slug: 'aluminum-cans', x: 70, y: 52, w: 30, depth: 34, z: 4, auto: false, label: false, rot: 4 },
  { slug: 'bio-boxes', x: 2, y: 62, w: 32, depth: 24, z: 4, auto: false, label: false, rot: 3 },
  { slug: 'vacusnap-caps', x: 68, y: 0, w: 30, depth: 40, z: 2, auto: false, label: false, rot: -3 },
].map((c, i) => ({ node: <ProductVisual product={pick(c.slug)} auto={c.auto} label={c.label} lcp />, x: c.x, y: c.y, w: c.w, depth: c.depth, z: c.z, rot: c.rot, delay: i * 1.7 }));
const stackCards = [
  { title: 'Committed to safety', text: 'The most important feature of each package is its ability to pass the rigid safety standards put in place for each industry.', tone: 'white' as const },
  { title: 'Custom development', text: 'Specific material, size, shape, custom branding and labeling: tailored to your product.', tone: 'sky' as const },
  { title: 'Sustainable thinking', text: 'Post-consumer recycled plastics, hemp and wheat plastics, and recyclable materials.', tone: 'lilac' as const },
  { title: 'Factory direct', text: 'Exclusive designs, wholesale pricing, and strict quality control standards.', tone: 'grad' as const },
];
const stages = [
  { h: 'Define', t: 'Tell us the material, size and shape your product needs.' },
  { h: 'Design', t: 'Custom branding and labeling, shaped around your brand.' },
  { h: 'Meet the standard', t: 'Packaging built to pass the rigid safety standards of your industry.' },
  { h: 'Produce', t: 'Made with our factories under strict quality control standards.' },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div>
            <span className="eyebrow">Child-resistant packaging</span>
            <h1>Packaging engineered to <em>make an impression.</em></h1>
            <p className="lead">Exclusive packaging designs. Factory direct. Wholesale pricing.</p>
            <div className="ctas">
              <Link href="/catalog" className="btn" data-track="product_category_click" data-track-location="hero">Explore Our Products <span className="arr">→</span></Link>
              <Link href="/product-development" className="btn ghost" data-track="quote_cta" data-track-location="hero">Develop Your Packaging</Link>
            </div>
          </div>
          <div className="hero-stage"><FloatField items={cluster} /></div>
        </div>
      </section>

      <div className="mq-wrap">
        <Marquee label="Our promise" speed={34}>{['Exclusive packaging designs', 'Factory direct', 'Wholesale pricing', 'Child-resistant by design'].map((t) => <span className="mq-item big" key={t}>{t}<i aria-hidden="true">✦</i></span>)}</Marquee>
        <Marquee label="Product families" reverse speed={52}>{products.filter((p) => !p.comingSoon).map((p) => <a className="mq-item pill" key={p.slug} href={`/catalog/${p.slug}`} tabIndex={-1}>{p.name}</a>)}</Marquee>
      </div>

      <section className="sec" aria-labelledby="cats">
        <div className="wrap">
          <Reveal><span className="eyebrow">The range</span><h2 id="cats">Eleven product families. One focus: child-resistant.</h2>
          <p className="lead" style={{ marginBottom: 48 }}>From bottles and jars to boxes and beverage caps, we offer a diverse selection of packaging solutions that are not only compliant with industry regulations, but also eye-catching and user friendly.</p></Reveal>
          <div className="cards">{products.map((p, i) => <ProductCard key={p.slug} p={p} i={i % 4} />)}</div>
        </div>
      </section>

      <ScrollStory />

      <section className="sec white" aria-labelledby="dev">
        <div className="wrap">
          <Reveal><span className="eyebrow">Product development</span><h2 id="dev">From requirement to finished package.</h2>
          <p className="lead" style={{ marginBottom: 56 }}>Whether you are looking for a specific material, size, shape or need custom branding and labeling, we have the expertise to deliver the perfect packaging solution for your product.</p></Reveal>
          <TimelineReveal>{stages.map((s, i) => <div key={s.h} className="tl-item"><h3>{s.h}</h3><p>{s.t}</p></div>)}</TimelineReveal>
          <div style={{ marginTop: 48 }}><Link href="/product-development" className="btn ghost">How development works <span className="arr">→</span></Link></div>
        </div>
      </section>

      <CardStack eyebrow="Why CR Collective" heading="Safety first. Then everything else." cards={stackCards} />

      <section className="sec stone" aria-labelledby="feat">
        <div className="wrap">
          <Reveal><span className="eyebrow">Featured</span><h2 id="feat">Designs to stand out on the shelf.</h2></Reveal>
          <div className="cards" style={{ marginTop: 40 }}>{featured.map((p, i) => <ProductCard key={p.slug} p={p} i={i} />)}</div>
        </div>
      </section>

      <section className="sec sky" aria-labelledby="ind">
        <div className="wrap">
          <Reveal><span className="eyebrow">Industries</span><h2 id="ind">Built for regulated products.</h2>
          <p className="lead" style={{ marginBottom: 32 }}>Our team understands the unique needs of the cannabis and pharmaceutical industries, and our range extends to infused beverages, wine, hemp products, edibles and topicals.</p></Reveal>
          <div className="ind">
            <Link href="/catalog/concentrate-jars">Cannabis concentrates</Link><Link href="/catalog/airtight-hemp">Hemp &amp; pre-rolls</Link><Link href="/catalog/aluminum-cans">Infused beverages</Link><Link href="/catalog/wine-caps">Wine</Link><Link href="/catalog/topicals">Topicals</Link><Link href="/about-us">Pharmaceutical</Link>
          </div>
        </div>
      </section>

      <section className="sec moss" aria-labelledby="custom">
        <div className="wrap cols">
          <Reveal><span className="eyebrow">Custom development</span><h2 id="custom">Have a packaging challenge no catalog item solves?</h2></Reveal>
          <Reveal i={1}><p className="lead">We can dream up new designs all day long. Tell us what your product needs and we will help you shape the perfect packaging solution.</p><Link href="/contact-us" className="btn" style={{ background: '#fff', color: 'var(--ink)', borderColor: '#fff', boxShadow: 'none' }} data-track="quote_cta" data-track-location="custom_section">Discuss Your Project <span className="arr">→</span></Link></Reveal>
        </div>
      </section>
    </>
  );
}
