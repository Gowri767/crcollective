import type { Metadata } from 'next';
import Link from 'next/link';
import Crumbs from '@/components/Crumbs';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'About CR Collective | Custom Child Resistant Packaging Experts',
  description: 'CR Collective develops custom child-resistant packaging for the cannabis and pharmaceutical industries, with safety and sustainability at the centre.',
  alternates: { canonical: '/about-us' },
};
export default function About() {
  return (
    <>
      <section className="wrap phead">
        <Crumbs items={[{ name: 'Home', href: '/' }, { name: 'About Us' }]} />
        <span className="eyebrow">About CR Collective</span>
        <h1>We supply the suppliers.</h1>
        <p className="lead">Exclusive packaging designs. Factory direct. Wholesale pricing.</p>
      </section>
      <section className="sec sky">
        <div className="wrap cols">
          <Reveal><span className="eyebrow">What we do</span><h2>Custom product development services.</h2></Reveal>
          <Reveal i={1}>
            <p>Our team of experienced professionals understands the unique needs of the cannabis and pharmaceutical industries, and we are dedicated to providing customized solutions that meet those needs. Whether you are looking for a specific material, size, shape or need custom branding and labeling, we have the expertise to deliver the perfect packaging solution for your product.</p>
            <p>At our company, we pride ourselves on our commitment to quality and customer satisfaction. We use only the highest quality materials and adhere to the most strict quality control standards in order to ensure that every package we produce meets our precise merits.</p>
          </Reveal>
        </div>
      </section>
      <section className="sec dark">
        <div className="wrap cols">
          <Reveal><span className="eyebrow">Safety</span><h2>Committed to safety.</h2></Reveal>
          <Reveal i={1}><p className="lead">Though we can dream up new designs all day long, the most important feature of each package is undeniably its ability to pass the rigid safety standards put in place for each industry. This is why our primary focus is developing child-resistant packaging that not only meets regulatory requirements but also provides peace of mind to parents and caregivers. Through cutting-edge materials and technologies we are able to create packaging that is not only secure but also visually appealing. Our goal is to help our clients deliver their products with confidence to the end user.</p></Reveal>
        </div>
      </section>
      <section className="sec moss">
        <div className="wrap cols">
          <Reveal><span className="eyebrow">Sustainability</span><h2>Committed to sustainability.</h2></Reveal>
          <Reveal i={1}><p className="lead">There is no question that climate change has drastically impacted our decisions when it comes to material selection and manufacturing practices. This is why we have worked closely with our factories to fine-tune the manufacturing process of eco-friendly products. From utilizing Post-Consumer Recycled plastics and other recyclable materials, to helping pave the way for hemp and wheat plastics in packaging, we are committed to engaging our material suppliers and our factories in the move toward more sustainable business practices.</p></Reveal>
        </div>
      </section>
      <section className="sec white">
        <div className="wrap cols">
          <div><h2>We are excited to work with you.</h2></div>
          <div><p className="lead">We are excited to work with you to develop the perfect packaging solution for your unique needs!</p><Link href="/contact-us" className="btn" data-track="quote_cta" data-track-location="about">Contact Our Team <span className="arr">→</span></Link></div>
        </div>
      </section>
    </>
  );
}
