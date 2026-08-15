import { useEffect, useRef, useState } from 'react';

/**
 * A single dot in place of the system pointer. It grows over anything
 * interactive and does nothing else.
 *
 * Position is written straight to the node inside a rAF loop rather than held
 * in React state — this runs every frame, and re-rendering the tree on
 * mousemove would be far too expensive.
 *
 * Skipped for coarse pointers and reduced motion, in which case the native
 * cursor is left alone. It is `pointer-events: none` throughout, so hit
 * testing is never affected.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const decide = () => setEnabled(fine.matches && !still.matches);
    decide();
    fine.addEventListener('change', decide);
    still.addEventListener('change', decide);
    return () => {
      fine.removeEventListener('change', decide);
      still.removeEventListener('change', decide);
    };
  }, []);

  /* Hide the native pointer only while the dot is actually mounted and
     running, so a failure here can never leave a machine with no visible
     cursor at all. */
  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add('cursor-dot-active');
    return () => document.body.classList.remove('cursor-dot-active');
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;

    let mx = -100;
    let my = -100;
    let dx = mx;
    let dy = my;
    let hovering = false;
    let seen = false;
    let raf = 0;

    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, label';

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!seen) {
        // Jump to the pointer on first sight so it doesn't streak in from 0,0.
        seen = true;
        dx = mx;
        dy = my;
        dot.style.opacity = '1';
      }
      hovering = !!(e.target as Element)?.closest?.(INTERACTIVE);
    };

    const onLeave = () => {
      seen = false;
      dot.style.opacity = '0';
    };

    const tick = () => {
      // Just enough easing to feel attached rather than glued.
      dx += (mx - dx) * 0.32;
      dy += (my - dy) * 0.32;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%) scale(${
        hovering ? 2.6 : 1
      })`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] w-2.5 h-2.5 rounded-full bg-white opacity-0 mix-blend-difference transition-opacity duration-300"
      style={{ willChange: 'transform' }}
    />
  );
}
