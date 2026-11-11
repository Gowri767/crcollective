import type { Metadata } from 'next';
import Link from 'next/link';
import Crumbs from '@/components/Crumbs';
import Reveal from '@/components/Reveal';
import TimelineReveal from '@/components/TimelineReveal';

export const metadata: Metadata = {
  title: 'Custom Product Development | Child Resistant Packaging | CR Collective',
  description: 'Custom child-resistant packaging development: material, size, shape, branding and labeling, built to meet the safety standards of your industry.',
  alternates: { canonical: '/product-development' },
};
const stages = [
  { h: 'Define your requirements', t: 'Whether you need a specific material, size or shape, we start by understanding your product and what it needs to do.' },
  { h: 'Design & branding', t: 'Custom branding and labeling. On our tins, for example, that can mean colors, wrap-around printing, and embossing or debossing; our Bio Boxes offer full color printing.' },
  { h: 'Safety & regulation', t: 'The most important feature of each package is its ability to pass the rigid safety standards put in place for each industry. Child-resistant packaging that meets regulatory requirements is our primary focus.' },
  { h: 'Materials & production', t: 'We have worked closely with our factories to fine-tune manufacturing of eco-friendly products, and adhere to strict quality control standards.' },
];
export default function Dev() {
  return (
    <>
      <section className="wrap phead">
        <Crumbs items={[{ name: 'Home', href: '/' }, { name: 'Product Development' }]} />
        <span className="eyebrow">Custom product development services</span>
        <h1>Better packaging begins with better thinking.</h1>
        <p className="lead">Our team understands the unique needs of the cannabis and pharmaceutical industries, and we are dedicated to providing customized solutions that meet those needs.</p>
      </section>
      <section className="sec dark">
        <div className="wrap">
          <Reveal><span className="eyebrow">How it works</span><h2>From requirement to finished package.</h2></Reveal>
          <div style={{ marginTop: 56 }}><TimelineReveal dark>{stages.map((s) => <div key={s.h} className="tl-item"><h3>{s.h}</h3><p>{s.t}</p></div>)}</TimelineReveal></div>
        </div>
      </section>
      <section className="sec white">
        <div className="wrap cols">
          <Reveal><span className="eyebrow">Customise</span><h2>Your material, size, shape and brand.</h2></Reveal>
          <Reveal i={1}>
            <p className="lead" style={{ color: 'var(--ink)' }}>Whether you are looking for a specific material, size, shape or need custom branding and labeling, we have the expertise to deliver the perfect packaging solution for your product.</p>
            <p>We pride ourselves on our commitment to quality and customer satisfaction, and use only the highest quality materials.</p>
            <Link href="/catalog" className="btn ghost">Browse the catalog <span className="arr">→</span></Link>
          </Reveal>
        </div>
      </section>
      <section className="sec moss">
        <div className="wrap cols">
          <Reveal><span className="eyebrow">Sustainability</span><h2>Committed to sustainability.</h2></Reveal>
          <Reveal i={1}><p className="lead">From utilizing Post-Consumer Recycled plastics and other recyclable materials, to helping pave the way for hemp and wheat plastics in packaging, we are committed to engaging our material suppliers and our factories in the move toward more sustainable business practices.</p></Reveal>
        </div>
      </section>
      <section className="sec dark">
        <div className="wrap cols">
          <div><span className="eyebrow">Start a project</span><h2>We are excited to work with you.</h2></div>
          <div><p className="lead">We are excited to work with you to develop the perfect packaging solution for your unique needs.</p><Link href="/contact-us" className="btn" data-track="quote_cta" data-track-location="development">Discuss Your Project <span className="arr">→</span></Link></div>
        </div>
      </section>
    </>
  );
}
