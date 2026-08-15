import { useEffect, useState } from 'react';

/* Replaying a full staggered cascade on the way back up is too busy: the
   reader has already seen that content and is now travelling against it. So
   downward re-entry keeps the full reveal, and upward re-entry gets something
   short and simultaneous — present, but quiet.

   One listener for the whole page, shared by every consumer, rather than one
   per component. */
export type ScrollDir = 'up' | 'down';

let scrollDir: ScrollDir = 'down';
const subscribers = new Set<(d: ScrollDir) => void>();

if (typeof window !== 'undefined') {
  let last = window.scrollY;
  let queued = false;
  window.addEventListener(
    'scroll',
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const y = window.scrollY;
        // ignore jitter, and momentum bounce past the ends of the document
        if (Math.abs(y - last) < 6) return;
        const next: ScrollDir = y > last ? 'down' : 'up';
        last = y;
        if (next !== scrollDir) {
          scrollDir = next;
          subscribers.forEach((fn) => fn(next));
        }
      });
    },
    { passive: true }
  );
}

export function useScrollDirection(): ScrollDir {
  const [dir, setDir] = useState<ScrollDir>(scrollDir);
  useEffect(() => {
    subscribers.add(setDir);
    return () => {
      subscribers.delete(setDir);
    };
  }, []);
  return dir;
}
