import { useEffect, useRef, useState } from 'react';

/**
 * A small soft white glow trailing the pointer, with a fine dot pinned to its
 * actual position. Restrained on purpose — it lifts the ground very slightly
 * rather than lighting it.
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
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      const scale = hovering ? 1.45 : 1;
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
        className="pointer-events-none fixed left-0 top-0 z-[100] w-28 h-28 rounded-full opacity-0 transition-opacity duration-500"
        style={{
          willChange: 'transform',
          mixBlendMode: 'screen',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.035) 45%, rgba(255,255,255,0) 70%)',
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] w-1 h-1 rounded-full bg-white/70 opacity-0 transition-opacity duration-300 mix-blend-screen"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
