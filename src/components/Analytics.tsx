'use client';
import { useEffect } from 'react';
import Script from 'next/script';

declare global { interface Window { dataLayer?: Record<string, unknown>[] } }
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  (window.dataLayer = window.dataLayer || []).push({ event, ...params });
}
/** Loads GTM only when NEXT_PUBLIC_GTM_ID is set; always pushes events to dataLayer via data-track attributes. */
export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GTM_ID;
  useEffect(() => {
    const h = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-track]'); if (!el) return;
      const { track: ev, ...rest } = el.dataset; if (!ev) return;
      track(ev, rest as Record<string, unknown>);
    };
    document.addEventListener('click', h); return () => document.removeEventListener('click', h);
  }, []);
  if (!id) return null;
  return <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`}</Script>;
}
