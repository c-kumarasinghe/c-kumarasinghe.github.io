import { motion, useTransform, type MotionValue } from 'framer-motion';

type Orientation = 'vertical' | 'horizontal';

interface ShatterProps {
  src: string;
  alt: string;
  /** 0 → 1 scroll progress driving the break. */
  progress: MotionValue<number>;
  /** Progress stops the keyframes below are sampled at. */
  stops: number[];
  /** Travel along each slice's long axis, in % of the frame, per stop. */
  amounts: number[];
  /** Fan out from the middle across the other axis, in % per slice, per stop. */
  fan: number[];
  pieces?: number;
  /** 'vertical' = strips side by side; 'horizontal' = bands stacked. */
  orientation?: Orientation;
  /** Optional parallax drift applied inside every slice. */
  parallaxY?: MotionValue<string>;
  className?: string;
  imgClassName?: string;
  /** object-position for the underlying image. */
  objectPosition?: string;
}

/**
 * One slice. Every piece renders the whole image and clips itself down to its
 * own strip, so at rest the slices sit edge to edge and read as one uncut
 * photo. A hair of bleed on each edge keeps subpixel rounding from showing a
 * seam when they close up.
 */
function Piece({
  index,
  count,
  orientation,
  progress,
  stops,
  amounts,
  fan,
  src,
  decorative,
  alt,
  parallaxY,
  imgClassName = '',
  objectPosition,
}: Omit<ShatterProps, 'className' | 'pieces' | 'orientation'> & {
  index: number;
  count: number;
  orientation: Orientation;
  decorative: boolean;
}) {
  const size = 100 / count;
  const lead = Math.max(index * size - 0.15, 0);
  const trail = Math.max(100 - (index + 1) * size - 0.15, 0);

  const clipPath =
    orientation === 'vertical'
      ? `inset(0% ${trail}% 0% ${lead}%)`
      : `inset(${lead}% 0% ${trail}% 0%)`;

  // Alternate the travel direction so the break reads as a shatter rather than
  // a slide, and fan the slices outwards from the middle.
  const dir = index % 2 === 0 ? -1 : 1;
  const offset = index - (count - 1) / 2;

  const primary = useTransform(
    progress,
    stops,
    amounts.map((a) => `${dir * a}%`)
  );
  const cross = useTransform(
    progress,
    stops,
    fan.map((a) => `${offset * a}%`)
  );

  return (
    <motion.div
      className="absolute inset-0"
      style={
        orientation === 'vertical'
          ? { clipPath, y: primary, x: cross }
          : { clipPath, x: primary, y: cross }
      }
    >
      <motion.div
        style={parallaxY ? { y: parallaxY } : undefined}
        className={parallaxY ? 'absolute inset-x-0 -top-[10%] h-[120%]' : 'absolute inset-0'}
      >
        <img
          src={src}
          alt={decorative ? '' : alt}
          aria-hidden={decorative || undefined}
          className={`w-full h-full object-cover ${imgClassName}`}
          style={objectPosition ? { objectPosition } : undefined}
        />
      </motion.div>
    </motion.div>
  );
}

/**
 * An image that breaks into slices and reassembles, bound to scroll position
 * rather than triggered — so scrolling back up replays it in reverse.
 *
 * Only `transform` animates, so every slice stays GPU-composited and nothing
 * reflows. Note each slice holds its own full-size texture: keep `pieces` low.
 */
export default function ShatterImage({
  src,
  alt,
  progress,
  stops,
  amounts,
  fan,
  pieces = 5,
  orientation = 'vertical',
  parallaxY,
  className = 'relative',
  imgClassName = '',
  objectPosition,
}: ShatterProps) {
  /* `className` owns positioning outright — don't prepend `relative` here. A
     caller passing `absolute inset-0` would end up with both classes, and
     Tailwind emits `relative` last, so it would win and collapse this box to
     zero height. Percentage translateY on the slices then resolves to 0 and
     the cross-axis fan silently does nothing. */
  return (
    <div className={className}>
      {/* The description lives once, off-screen; the slices are decorative. */}
      <span className="sr-only">{alt}</span>
      {Array.from({ length: pieces }, (_, i) => (
        <Piece
          key={i}
          index={i}
          count={pieces}
          orientation={orientation}
          progress={progress}
          stops={stops}
          amounts={amounts}
          fan={fan}
          src={src}
          alt={alt}
          decorative
          parallaxY={parallaxY}
          imgClassName={imgClassName}
          objectPosition={objectPosition}
        />
      ))}
    </div>
  );
}
