import type { ReactNode } from 'react';
/** Endless horizontal strip. Content is duplicated for a seamless loop; pauses on hover; static for reduced motion. */
export default function Marquee({ children, reverse = false, speed = 40, label }: { children: ReactNode; reverse?: boolean; speed?: number; label: string }) {
  return (
    <div className={`marquee${reverse ? ' rev' : ''}`} role="group" aria-label={label}>
      <div className="mq-track" style={{ animationDuration: `${speed}s` }}>
        <div className="mq-set">{children}</div>
        <div className="mq-set" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
