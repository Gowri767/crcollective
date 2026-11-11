import Link from 'next/link';
export const metadata = { title: 'Page not found | CR Collective', robots: { index: false } };
export default function NotFound() {
  return <section className="wrap phead"><span className="eyebrow">404</span><h1>Page not found.</h1><p className="lead">The page you are looking for doesn’t exist or has been moved.</p><Link className="btn" href="/catalog">Explore Our Products <span className="arr">→</span></Link></section>;
}
