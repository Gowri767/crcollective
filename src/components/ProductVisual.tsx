import type { Product } from '@/data/products';
import images from '@/data/images.json';
import PvMarkup from './PvMarkup';

/** Returns the real product image if one has been supplied (see scripts/gen-images.mjs), else null. */
export function realImage(slug: string): string | null {
  return (images as Record<string, string>)[slug] ?? null;
}

/**
 * Shows the real hero render when /public/products/<slug>/hero.(webp|png|jpg) exists.
 * Until then it draws a generic, clearly-labelled placeholder. It is NOT the real product.
 */
export function hoverImage(slug: string): string | null {
  return (images as Record<string, string>)[slug + ':hover'] ?? null;
}

export default function ProductVisual({ product, auto = false, lift, label = true, lcp = false }: { product: Pick<Product, 'slug' | 'name' | 'shape' | 'accent'>; auto?: boolean; lift?: number; label?: boolean; lcp?: boolean }) {
  const img = realImage(product.slug);
  if (img) {
    const hov = hoverImage(product.slug);
    return (
      <span className={`pv-swap${hov ? ' has-hover' : ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="pv-img pv-a" src={img} alt={`${product.name} child-resistant packaging by CR Collective`} loading={lcp ? 'eager' : 'lazy'} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {hov && <img className="pv-img pv-b" src={hov} alt="" aria-hidden="true" loading="lazy" />}
      </span>
    );
  }
  return <PvMarkup product={product} auto={auto} label={label} style={lift !== undefined ? { ['--lift' as string]: lift } : undefined} />;
}
