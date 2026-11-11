import type { Metadata, Viewport } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import JsonLd from '@/components/JsonLd';
import { site } from '@/data/products';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'CR Collective | Custom Child Resistant Packaging Solutions', template: '%s' },
  description: 'CR Collective supplies exclusive, factory-direct child-resistant packaging: airtight tins, jars, boxes, caps and more, with custom product development.',
  openGraph: { type: 'website', siteName: 'CR Collective', locale: 'en_US' },
  alternates: { canonical: '/' },
};
export const viewport: Viewport = { themeColor: '#14171A', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
        <JsonLd data={[
          { '@context': 'https://schema.org', '@type': 'Organization', name: 'CR Collective', url: site.url, telephone: '+1-720-826-3866' },
          { '@context': 'https://schema.org', '@type': 'WebSite', name: 'CR Collective', url: site.url },
        ]} />
      </body>
    </html>
  );
}
