import type { Metadata } from 'next';
import Crumbs from '@/components/Crumbs';
import ContactForm from '@/components/ContactForm';
import { bySlug, site } from '@/data/products';

export const metadata: Metadata = {
  title: 'Get in Touch | Custom Child Resistant Packaging Quotes',
  description: 'Request a quote or talk to CR Collective about child-resistant packaging. Call 720 826-3866 or send us your project details.',
  alternates: { canonical: '/contact-us' },
};
export default function Contact({ searchParams }: { searchParams: { product?: string; variant?: string } }) {
  const p = searchParams.product ? bySlug(searchParams.product) : undefined;
  return (
    <>
      <section className="wrap phead" style={{ paddingBottom: 32 }}>
        <Crumbs items={[{ name: 'Home', href: '/' }, { name: 'Contact Us' }]} />
        <span className="eyebrow">Request a quote</span>
        <h1>Let’s talk.</h1>
        <p className="lead">Don’t hesitate: get in touch with us today! If you have any questions about our products or services, we’re always happy to help, and we pride ourselves on providing excellent customer service.</p>
      </section>
      <section className="wrap cols contact" style={{ paddingBottom: 'clamp(64px,9vw,120px)' }}>
        <ContactForm initialProduct={p && !p.comingSoon ? p.name : ''} initialVariant={searchParams.variant ?? ''} />
        <aside><div className="tile"><h3>Phone</h3><p><a href={site.phoneHref} data-track="contact_click" data-track-type="phone" style={{ fontSize: '1.5rem', fontWeight: 600, textDecoration: 'none' }}>{site.phone}</a></p></div></aside>
      </section>
    </>
  );
}
