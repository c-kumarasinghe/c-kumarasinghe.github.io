import { useEffect, useRef, useState } from 'react';

/**
 * A trailing cursor: a small solid dot pinned to the pointer, and a ring that
 * chases it with easing. The ring swells and the dot shrinks over anything
 * interactive.
 *
 * Position is written straight to the elements inside a rAF loop rather than
 * held in React state — this runs every frame, and re-rendering the tree on
 * mousemove would be far too expensive.
 *
 * Never shown for coarse pointers (touch) or when reduced motion is asked for,
 * and it always sits behind `pointer-events: none`, so the real cursor and all
 * native hit-testing are untouched.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Start off-screen so nothing flashes at 0,0 before the first move.
    let mx = -100;
    let my = -100;
    let rx = mx;
    let ry = my;
    let hovering = false;
    let visible = false;
    let raf = 0;

    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, label';

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        // Jump the ring to the pointer on first sight, so it doesn't fly in.
        rx = mx;
        ry = my;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
      hovering = !!(e.target as Element)?.closest?.(INTERACTIVE);
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const tick = () => {
      // Exponential ease — the ring is always chasing, never quite arriving.
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      const scale = hovering ? 1.9 : 1;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%) scale(${
        hovering ? 0.4 : 1
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
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] w-9 h-9 rounded-full border border-ink-900/40 opacity-0 transition-opacity duration-300 mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] w-1.5 h-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-300"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
