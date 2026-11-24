import type { Photo } from '@/components/PhotoStory';
/** Real photographs supplied by CR Collective. Captions only describe what is visible. */
export const photos: Record<string, Photo[]> = {
  'vacusnap-caps': [
    { src: '/products/vacusnap-caps/photos/closed.webp', caption: 'Closed.', alt: 'VacuSnap Cap in black, closed, on a wooden table' },
    { src: '/products/vacusnap-caps/photos/top.webp', caption: 'From above.', alt: 'VacuSnap Cap in black seen from above' },
    { src: '/products/vacusnap-caps/photos/open.webp', caption: 'Opened: cap and jar.', alt: 'VacuSnap Cap in black opened, showing the inside of the cap and the jar' },
  ],
};
