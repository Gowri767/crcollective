import type { MetadataRoute } from 'next';
import { products, site } from '@/data/products';
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ['', '/catalog', '/product-development', '/about-us', '/contact-us'].map((p) => ({ url: site.url + p, lastModified: now, priority: p === '' ? 1 : 0.8 }));
  const prods = products.map((p) => ({ url: `${site.url}/catalog/${p.slug}`, lastModified: now, priority: p.comingSoon ? 0.3 : 0.7 }));
  return [...pages, ...prods];
}
