/**
 * Ambient colour field sitting behind the whole page — a warm bloom and a cool
 * counterpoint, so the ground reads as lit rather than as flat black.
 *
 * Fixed rather than scrolling: the content travels across a still light source,
 * which gives depth without another scroll listener. Built from soft radial
 * gradients instead of blurred shapes — a `filter: blur()` over an area this
 * large is expensive to composite, and the gradient stops do the same job.
 */
export default function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* warm, upper right — anchors the hero portrait */}
      <div
        className="absolute -top-[22%] -right-[12%] w-[78vw] h-[78vw] max-w-[1000px] max-h-[1000px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(210,115,63,0.16) 0%, rgba(210,115,63,0.05) 42%, rgba(210,115,63,0) 70%)',
        }}
      />
      {/* cool, mid left — keeps the warmth from reading as a single wash */}
      <div
        className="absolute top-[28%] -left-[18%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(92,112,196,0.14) 0%, rgba(92,112,196,0.04) 45%, rgba(92,112,196,0) 72%)',
        }}
      />
      {/* warm again, low centre — carries the eye to the closing block */}
      <div
        className="absolute -bottom-[28%] left-[24%] w-[66vw] h-[66vw] max-w-[850px] max-h-[850px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(210,115,63,0.12) 0%, rgba(210,115,63,0.03) 45%, rgba(210,115,63,0) 70%)',
        }}
      />
    </div>
  );
}
