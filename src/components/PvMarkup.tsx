import type { CSSProperties } from 'react';
import type { Product } from '@/data/products';

/** Generic CSS placeholder. Not a CR Collective product; only shown until real renders exist. */
export default function PvMarkup({ product, auto = false, label = true, style }: { product: Pick<Product, 'name' | 'shape' | 'accent'>; auto?: boolean; label?: boolean; style?: CSSProperties }) {
  return (
    <div className={`pv s-${product.shape}${auto ? ' auto' : ''}`} style={{ ['--c' as string]: product.accent, ...style }} role="img" aria-label={`Placeholder illustration for ${product.name}; product render pending`}>
      <div className="pv-obj"><div className="pv-part pv-body" /><div className="pv-part pv-inner" /><div className="pv-part pv-lid" /></div>
      <div className="pv-shadow" />
      {label && <span className="pv-tag">Illustrative placeholder · product render pending</span>}
    </div>
  );
}
