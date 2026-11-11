import Link from 'next/link';
import JsonLd from './JsonLd';
import { site } from '@/data/products';
export default function Crumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        {items.map((it, i) => <span key={i} style={{ margin: 0, opacity: 1 }}>{i > 0 && <span>/</span>}{it.href ? <Link href={it.href}>{it.name}</Link> : <span style={{ margin: 0, opacity: 1 }} aria-current="page">{it.name}</span>}</span>)}
      </nav>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, ...(it.href ? { item: site.url + it.href } : {}) })) }} />
    </>
  );
}
