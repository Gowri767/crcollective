'use client';
import { useRef, useState } from 'react';
import PvMarkup from './PvMarkup';
import type { Product } from '@/data/products';

/**
 * Drag-to-rotate viewer. With a real hero image it shows the image; with a 3D model/frames
 * supplied later this is the component that will host them. Until then it rotates the placeholder.
 */
export default function ProductViewer({ product, img }: { product: Pick<Product, 'name' | 'shape' | 'accent'>; img: string | null }) {
  const [ry, setRy] = useState(-18); const [lift, setLift] = useState(0); const [auto, setAuto] = useState(true);
  const drag = useRef<{ x: number; r: number } | null>(null);
  if (img) {
    // eslint-disable-next-line @next/next/no-img-element
    return <div className="viewer"><img className="pv-img" style={{ width: '86%', height: '86%' }} src={img} alt={`${product.name} child-resistant packaging by CR Collective`} /></div>;
  }
  return (
    <div>
      <div className="viewer" role="group" aria-label="Product viewer. Drag or use arrow keys to rotate." tabIndex={0}
        onPointerDown={(e) => { drag.current = { x: e.clientX, r: ry }; setAuto(false); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); }}
        onPointerMove={(e) => { if (drag.current) setRy(drag.current.r + (e.clientX - drag.current.x) * 0.5); }}
        onPointerUp={() => { drag.current = null; }}
        onKeyDown={(e) => { if (e.key === 'ArrowLeft') { setAuto(false); setRy((r) => r - 10); } if (e.key === 'ArrowRight') { setAuto(false); setRy((r) => r + 10); } }}>
        <span className="viewer-hint">Drag to rotate</span>
        <PvMarkup product={product} auto={auto && lift === 0} style={{ ['--ry' as string]: `${ry}deg`, ['--lift' as string]: lift }} />
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
        <button className="chip" aria-pressed={lift > 0} onClick={() => { setAuto(false); setLift(lift ? 0 : 220); }}>{lift ? 'Close' : 'Open'}</button>
        <button className="chip" onClick={() => { setRy(-18); setLift(0); setAuto(true); }}>Reset</button>
      </div>
    </div>
  );
}
