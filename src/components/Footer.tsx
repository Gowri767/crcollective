import Link from 'next/link';
import { products, site } from '@/data/products';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="big">Let’s talk about your packaging.</div>
        <Link href="/contact-us" className="btn" data-track="quote_cta" data-track-location="footer">Request a Quote <span className="arr">→</span></Link>
        <div className="cols three">
          <div><h4>Explore</h4><ul><li><Link href="/">Home</Link></li><li><Link href="/catalog">Catalog</Link></li><li><Link href="/product-development">Product Development</Link></li><li><Link href="/about-us">About Us</Link></li><li><Link href="/contact-us">Contact Us</Link></li></ul></div>
          <div><h4>Products</h4><ul>{products.filter((p) => !p.comingSoon).map((p) => <li key={p.slug}><Link href={`/catalog/${p.slug}`}>{p.name}</Link></li>)}</ul></div>
          <div><h4>Contact</h4><ul><li><a href={site.phoneHref} data-track="contact_click" data-track-type="phone">{site.phone}</a></li></ul></div>
        </div>
        <p className="fine">© {new Date().getFullYear()} CR Collective. {site.tagline}</p>
      </div>
    </footer>
  );
}
