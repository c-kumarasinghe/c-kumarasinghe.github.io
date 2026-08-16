import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useMemo } from 'react';

/* Only Mai HRMS has a publishable product shot, and most of the rest never
   will — NDA or government firewall. Inventing screenshots would pass fiction
   off as work, so the others get a wireframe instead.

   Every cover is the same app frame — rail, top bar, three figures, a main
   panel and an activity list — so the row reads as one set. Only the main
   panel changes, and it changes to the project's own subject.

   The motion follows the same rule. The frame fades up identically everywhere,
   then each panel animates the way its subject actually behaves: a prompt
   generates, the chain settles a payout, the seal stamps down, the pulse
   traces itself, a slot gets taken. Nothing here is a generic reveal applied
   eight times.

   Motion is driven by variants rather than per-element whileInView, so the one
   intersection observer on the <svg> sequences the whole drawing. */

const W = 600;
const H = 338; // 16:9

const GROUND = '#0F0F13';
const RAIL = '#131318';
const PANEL = '#16161C';
const RULE = '#26262F';
const LINE = '#6B6B78';
const EDGE = '#9C9CA8';
const ACC = '#D2733F';

const EASE = [0.22, 1, 0.36, 1] as const;

const CHROME: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

/** Sequencer for a panel's parts. The frame lands first, hence delayChildren. */
const seq = (stagger = 0.09, delay = 0.3): Variants => ({
  hidden: {},
  shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const FADE: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.45, ease: EASE } },
};

const RISE: Variants = {
  hidden: { opacity: 0, y: 10 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

const DRAW: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  shown: { pathLength: 1, opacity: 1, transition: { duration: 0.7, ease: EASE } },
};

const tick = (x: number, y: number) => `M${x} ${y} l 4 5 l 8 -10.5`;

/** Ruled lines — the stand-in for copy anywhere a wireframe needs text. */
function Lines({
  x,
  y,
  widths,
  gap = 15,
  stroke = LINE,
  width = 1.5,
}: {
  x: number;
  y: number;
  widths: number[];
  gap?: number;
  stroke?: string;
  width?: number;
}) {
  return (
    <>
      {widths.map((w, i) => (
        <line
          key={i}
          x1={x}
          y1={y + i * gap}
          x2={x + w}
          y2={y + i * gap}
          stroke={stroke}
          strokeWidth={width}
          opacity="0.85"
        />
      ))}
    </>
  );
}

/** Panel heading, shared by every panel and always the first thing to land. */
function Head() {
  return (
    <motion.line
      x1="110"
      y1="162"
      x2="184"
      y2="162"
      stroke={EDGE}
      strokeWidth="2"
      variants={DRAW}
    />
  );
}

// ── The main panels ────────────────────────────────────────

/** Mai HRMS — one prompt, three kinds of output, then the workflow it kicks
 *  off. Animates in that order: the ask lands, text, video and audio generate
 *  one after another, and the automation runs last. */
function AssistantPanel() {
  const outs = [110, 200, 290];

  return (
    <motion.g variants={seq(0.2)}>
      <Head />

      {/* the prompt */}
      <motion.g variants={RISE}>
        <rect x="110" y="178" width="262" height="26" rx="13" fill={GROUND} stroke={ACC} strokeWidth="2" />
        <path
          d="M127 185 l2.4 5 l5 2.4 l-5 2.4 l-2.4 5 l-2.4 -5 l-5 -2.4 l5 -2.4 z"
          fill={ACC}
        />
        <motion.line x1="144" y1="191" x2="330" y2="191" stroke={ACC} strokeWidth="1.5" opacity="0.5" variants={DRAW} />
      </motion.g>

      {/* text, video, audio — generated one after another */}
      <motion.g variants={seq(0.14, 0)}>
        {outs.map((x, i) => (
          <motion.g key={x} variants={RISE}>
            <rect x={x} y="214" width="82" height="64" rx="3" fill={GROUND} stroke={LINE} strokeWidth="1.5" />
            {i === 0 && <Lines x={x + 12} y={234} widths={[58, 44, 58]} gap={14} />}
            {i === 1 && (
              <>
                <rect x={x + 12} y="228" width="58" height="36" rx="2" fill="none" stroke={RULE} strokeWidth="1.4" />
                <path d={`M${x + 36} 238 l14 8 l-14 8 z`} fill={EDGE} />
              </>
            )}
            {i === 2 &&
              [0, 1, 2, 3, 4, 5, 6].map((k) => {
                const h = 6 + Math.abs(Math.sin(k * 1.1)) * 20;
                return (
                  <line
                    key={k}
                    x1={x + 16 + k * 8.5}
                    y1={246 - h / 2}
                    x2={x + 16 + k * 8.5}
                    y2={246 + h / 2}
                    stroke={EDGE}
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                );
              })}
          </motion.g>
        ))}
      </motion.g>

      {/* the automation those outputs feed */}
      <motion.g variants={seq(0.09, 0)}>
        {[110, 182, 254].map((x, i) => (
          <motion.g key={x} variants={FADE}>
            <rect x={x} y="292" width="52" height="18" rx="9" fill={GROUND} stroke={LINE} strokeWidth="1.5" />
            {i < 2 && (
              <path
                d={`M${x + 56} 301 h 10 m -4 -3.5 l 4 3.5 l -4 3.5`}
                fill="none"
                stroke={LINE}
                strokeWidth="1.4"
              />
            )}
          </motion.g>
        ))}
        <motion.g variants={FADE}>
          <circle cx="342" cy="301" r="9" fill="none" stroke={ACC} strokeWidth="1.8" />
          <path d={tick(337, 300)} fill="none" stroke={ACC} strokeWidth="1.8" strokeLinecap="round" />
        </motion.g>
      </motion.g>
    </motion.g>
  );
}

/** Web3 rewards — blocks confirm along the chain, then the payout drops onto
 *  the newest one. Left to right, because that is the direction a chain grows. */
function ChainPanel() {
  const xs = [116, 178, 240, 302];
  const hot = 3;

  return (
    <motion.g variants={seq(0.12)}>
      <Head />

      {xs.map((x, i) => (
        <motion.g key={x} variants={FADE}>
          {i > 0 && <line x1={x - 14} y1="250" x2={x} y2="250" stroke={LINE} strokeWidth="1.5" />}
          <rect
            x={x}
            y="226"
            width="48"
            height="48"
            rx="3"
            fill={GROUND}
            stroke={i === hot ? ACC : LINE}
            strokeWidth={i === hot ? 2 : 1.5}
          />
          <rect
            x={x + 13}
            y="239"
            width="22"
            height="22"
            rx="1.5"
            fill="none"
            stroke={i === hot ? ACC : RULE}
            strokeWidth="1.4"
          />
        </motion.g>
      ))}

      {/* the payout, falling in and settling */}
      <motion.g
        variants={{
          hidden: { opacity: 0, y: -26 },
          shown: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 17 } },
        }}
      >
        <line x1="326" y1="204" x2="326" y2="220" stroke={ACC} strokeWidth="1.5" strokeDasharray="3 4" />
        <path d="M321 214 l5 6 l5 -6" fill="none" stroke={ACC} strokeWidth="1.6" />
        <circle cx="326" cy="190" r="15" fill={GROUND} stroke={ACC} strokeWidth="2" />
        <circle cx="326" cy="190" r="7" fill="none" stroke={ACC} strokeWidth="1.4" opacity="0.7" />
      </motion.g>
    </motion.g>
  );
}

/** ERL 2.0 — the licence is issued, then the seal stamps down onto it. The
 *  seal lands hard and slightly overshoots, the way a stamp does. */
function LicencePanel() {
  return (
    <motion.g variants={seq(0.14)}>
      <Head />

      <motion.g variants={FADE}>
        <rect x="110" y="182" width="164" height="112" rx="4" fill={GROUND} stroke={EDGE} strokeWidth="1.6" />
        <g stroke={LINE} strokeWidth="1.6" fill="none">
          <path d="M128 224 l6 -11 h20 l7 -8 h16 l9 19 z" />
          <circle cx="140" cy="227" r="5" />
          <circle cx="175" cy="227" r="5" />
        </g>
        <line x1="128" y1="203" x2="186" y2="203" stroke={EDGE} strokeWidth="2.2" />
      </motion.g>

      <motion.g variants={FADE}>
        <Lines x={128} y={248} widths={[112, 88, 100]} gap={14} />
      </motion.g>

      {/* the stamp landing — origin pinned to the seal, since SVG transforms
          resolve against the viewBox rather than the element */}
      <motion.g
        style={{ transformOrigin: '330px 238px' }}
        variants={{
          hidden: { opacity: 0, scale: 1.9 },
          shown: {
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', stiffness: 260, damping: 15, delay: 0.16 },
          },
        }}
      >
        <circle cx="330" cy="238" r="27" fill={GROUND} stroke={ACC} strokeWidth="2" />
        <circle cx="330" cy="238" r="18" fill="none" stroke={ACC} strokeWidth="1.3" opacity="0.6" />
        <path d={tick(323, 237)} fill="none" stroke={ACC} strokeWidth="2.2" strokeLinecap="round" />
      </motion.g>
    </motion.g>
  );
}

/** SLAASMB — the checklist is worked top to bottom, each tick drawn as it is
 *  signed off, and the identity boundary closes around it last. */
function AuditPanel() {
  const rows = [196, 226, 256, 286];

  return (
    <motion.g variants={seq(0.13)}>
      <Head />

      {rows.map((y, i) => (
        <motion.g key={y} variants={RISE}>
          <rect x="110" y={y - 8} width="16" height="16" rx="2" fill="none" stroke={LINE} strokeWidth="1.5" />
          {i < 3 && (
            <motion.path
              d={tick(113, y - 1)}
              fill="none"
              stroke={LINE}
              strokeWidth="1.8"
              strokeLinecap="round"
              variants={DRAW}
            />
          )}
          <line x1="138" y1={y} x2={i === 3 ? 208 : 246} y2={y} stroke={LINE} strokeWidth="1.5" opacity="0.85" />
        </motion.g>
      ))}

      <motion.g variants={seq(0.12, 0.1)}>
        <motion.path
          d="M330 178 L378 200 V250 C378 280 356 297 330 307 C304 297 282 280 282 250 V200 Z"
          fill={GROUND}
          stroke={EDGE}
          strokeWidth="1.6"
          variants={DRAW}
        />
        <motion.g variants={FADE}>
          <circle cx="330" cy="234" r="13" fill="none" stroke={ACC} strokeWidth="2" />
          <path d="M330 247 v20 M330 260 h11" stroke={ACC} strokeWidth="2" fill="none" />
        </motion.g>
      </motion.g>
    </motion.g>
  );
}

/** DynamicDocuments QT — one template, and the offers generated off it sliding
 *  out from underneath it. The documents come from where they are made. */
function TemplatePanel() {
  return (
    <motion.g variants={seq(0.16)}>
      <Head />

      <motion.g variants={FADE}>
        <rect x="110" y="186" width="62" height="108" rx="3" fill={GROUND} stroke={LINE} strokeWidth="1.5" />
        {[206, 232, 258].map((y) => (
          <rect key={y} x="120" y={y - 8} width="42" height="16" rx="1.5" fill="none" stroke={RULE} strokeWidth="1.4" />
        ))}
      </motion.g>

      <motion.g variants={FADE}>
        <line x1="182" y1="240" x2="212" y2="240" stroke={LINE} strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M207 235 l6 5 l-6 5" fill="none" stroke={LINE} strokeWidth="1.6" />
      </motion.g>

      {/* Rotation stays on a static wrapper — animating x on the same element
          would overwrite the transform attribute the rotation lives in. */}
      <g transform="rotate(-6 274 241)">
        <motion.rect
          x="226"
          y="180"
          width="96"
          height="122"
          rx="3"
          fill={GROUND}
          stroke={LINE}
          strokeWidth="1.5"
          opacity="0.55"
          variants={{
            hidden: { opacity: 0, x: -46 },
            shown: { opacity: 0.55, x: 0, transition: { duration: 0.55, ease: EASE } },
          }}
        />
      </g>

      <g transform="rotate(2 300 244)">
        <motion.g
          variants={{
            hidden: { opacity: 0, x: -58 },
            shown: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
          }}
        >
          <rect x="252" y="184" width="96" height="120" rx="3" fill={GROUND} stroke={ACC} strokeWidth="2" />
          <line x1="266" y1="206" x2="320" y2="206" stroke={ACC} strokeWidth="2.2" />
          <Lines x={266} y={230} widths={[68, 54, 68]} gap={16} />
          <line x1="266" y1="282" x2="298" y2="282" stroke={ACC} strokeWidth="1.8" opacity="0.8" />
        </motion.g>
      </g>
    </motion.g>
  );
}

/** CxPulse — the scale is answered, the trace draws itself across in real
 *  time, and the volume behind it grows up off the baseline. */
function PulsePanel() {
  const bars = Array.from({ length: 20 }, (_, i) => ({
    x: 110 + i * 13.4,
    h: 8 + Math.abs(Math.sin(i * 0.8)) * 28,
  }));

  return (
    <motion.g variants={seq(0.16)}>
      <Head />

      <motion.g variants={seq(0.07, 0)}>
        {[118, 152, 186, 220, 254].map((cx, i) => (
          <motion.circle
            key={cx}
            cx={cx}
            cy="188"
            r="10"
            fill={i < 3 ? LINE : 'none'}
            fillOpacity={i < 3 ? 0.5 : 0}
            stroke={i < 3 ? EDGE : LINE}
            strokeWidth="1.5"
            variants={FADE}
          />
        ))}
      </motion.g>

      <motion.path
        d="M108 240 H160 L172 240 L181 210 L190 274 L199 240 H244 L256 240 L264 224 L272 256 L280 240 H372"
        fill="none"
        stroke={ACC}
        strokeWidth="2.2"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          shown: { pathLength: 1, opacity: 1, transition: { duration: 1.1, ease: 'easeInOut' } },
        }}
      />

      <motion.g variants={seq(0.035, 0)}>
        <line x1="108" y1="306" x2="372" y2="306" stroke={RULE} strokeWidth="1.5" />
        {bars.map((b) => (
          <motion.rect
            key={b.x}
            x={b.x}
            y={306 - b.h}
            width="7"
            height={b.h}
            fill={LINE}
            opacity="0.3"
            style={{ transformOrigin: `${b.x + 3.5}px 306px` }}
            variants={{
              hidden: { scaleY: 0, opacity: 0 },
              shown: { scaleY: 1, opacity: 0.3, transition: { duration: 0.4, ease: EASE } },
            }}
          />
        ))}
      </motion.g>
    </motion.g>
  );
}

/** DOC990 — the board fills in, then one slot gets taken while you watch.
 *  The booking is the last thing to happen, because that is the event. */
function SlotsPanel() {
  const cols = 4;
  const rows = 3;
  const taken = new Set([1, 3, 6, 8, 11]);
  const live = 5;

  return (
    <motion.g variants={seq(0.2)}>
      <Head />

      <motion.g variants={seq(0.035, 0)}>
        {Array.from({ length: cols * rows }, (_, i) => {
          const c = i % cols;
          const r = Math.floor(i / cols);
          if (i === live) return null;
          const isTaken = taken.has(i);
          return (
            <motion.rect
              key={i}
              x={110 + c * 50}
              y={186 + r * 42}
              width="42"
              height="34"
              rx="2.5"
              fill={LINE}
              fillOpacity={isTaken ? 0.28 : 0}
              stroke={isTaken ? EDGE : RULE}
              strokeWidth="1.5"
              variants={FADE}
            />
          );
        })}
      </motion.g>

      {/* the slot being taken */}
      <motion.rect
        x={110 + (live % cols) * 50}
        y={186 + Math.floor(live / cols) * 42}
        width="42"
        height="34"
        rx="2.5"
        fill={ACC}
        stroke={ACC}
        strokeWidth="1.5"
        style={{ transformOrigin: `${110 + (live % cols) * 50 + 21}px ${186 + Math.floor(live / cols) * 42 + 17}px` }}
        variants={{
          hidden: { fillOpacity: 0, opacity: 0, scale: 0.7 },
          shown: {
            fillOpacity: 0.9,
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', stiffness: 420, damping: 18 },
          },
        }}
      />

      <motion.g variants={FADE}>
        <circle cx="336" cy="244" r="30" fill={GROUND} stroke={EDGE} strokeWidth="1.6" />
        <path d="M336 228 v32 M320 244 h32" stroke={LINE} strokeWidth="3.4" strokeLinecap="round" fill="none" />
      </motion.g>
    </motion.g>
  );
}

/** OneHRIS / MintHRM — headcount first, then the run it feeds, and the total
 *  last. Payroll is a calculation, so the figure arrives at the end. */
function PayrollPanel() {
  const people = [128, 184, 240, 296];
  const hot = 2;

  return (
    <motion.g variants={seq(0.14)}>
      <Head />

      <motion.g variants={seq(0.08, 0)}>
        {people.map((cx, i) => (
          <motion.g
            key={cx}
            stroke={i === hot ? ACC : LINE}
            strokeWidth={i === hot ? 2 : 1.5}
            fill="none"
            variants={RISE}
          >
            <circle cx={cx} cy="196" r="13" />
            <path d={`M${cx - 21} 236 a 21 21 0 0 1 42 0`} />
          </motion.g>
        ))}
      </motion.g>

      <motion.line x1="110" y1="256" x2="372" y2="256" stroke={RULE} strokeWidth="1.5" variants={DRAW} />

      <motion.g variants={seq(0.09, 0)}>
        {[274, 294].map((y) => (
          <motion.g key={y} variants={FADE}>
            <line x1="110" y1={y} x2="212" y2={y} stroke={LINE} strokeWidth="1.5" opacity="0.85" />
            <line x1="300" y1={y} x2="372" y2={y} stroke={LINE} strokeWidth="1.5" opacity="0.85" />
          </motion.g>
        ))}
      </motion.g>

      <motion.g variants={FADE}>
        <line x1="110" y1="314" x2="176" y2="314" stroke={LINE} strokeWidth="1.5" opacity="0.85" />
      </motion.g>
      <motion.line
        x1="300"
        y1="314"
        x2="372"
        y2="314"
        stroke={ACC}
        strokeWidth="2.4"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          shown: { pathLength: 1, opacity: 1, transition: { duration: 0.5, ease: EASE } },
        }}
      />
    </motion.g>
  );
}

const PANELS: Record<string, () => React.JSX.Element> = {
  'mai-hrms': AssistantPanel,
  'web3-rewards': ChainPanel,
  erl2: LicencePanel,
  slaasm: AuditPanel,
  dynamicdocs: TemplatePanel,
  cxpulse: PulsePanel,
  doc990: SlotsPanel,
  onehris: PayrollPanel,
};

/** A project added later has no panel drawn yet — a plain content block rather
 *  than an empty frame. */
function GenericPanel() {
  return (
    <motion.g variants={seq(0.1)}>
      <Head />
      <motion.g variants={FADE}>
        <Lines x={110} y={192} widths={[248, 214, 248, 180]} gap={22} />
      </motion.g>
      <motion.line x1="110" y1="292" x2="372" y2="292" stroke={RULE} strokeWidth="1.5" variants={DRAW} />
      <motion.line x1="110" y1="310" x2="176" y2="310" stroke={ACC} strokeWidth="2.4" variants={DRAW} />
    </motion.g>
  );
}

export default function ProjectCover({ id }: { id: string }) {
  const reduced = useReducedMotion();
  const Panel = useMemo(() => PANELS[id] ?? GenericPanel, [id]);

  return (
    <motion.svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-full block"
      aria-hidden
      initial={reduced ? false : 'hidden'}
      whileInView="shown"
      /* No `once` — the drawing replays whenever a cover re-enters the
         viewport, in either direction, rather than firing a single time and
         then sitting inert for the rest of the session. */
      viewport={{ amount: 0.3 }}
    >
      <rect width={W} height={H} fill={GROUND} />

      {/* ── App chrome: the part every cover shares ── */}
      <motion.g variants={CHROME}>
        <rect x="0" y="0" width="72" height={H} fill={RAIL} />
        <line x1="72" y1="0" x2="72" y2={H} stroke={RULE} strokeWidth="1.5" />
        <rect x="18" y="18" width="20" height="20" rx="4" fill="none" stroke={EDGE} strokeWidth="1.6" />
        {[76, 112, 148, 184, 220].map((y, i) => (
          <g key={y}>
            {i === 1 && <rect x="10" y={y - 13} width="52" height="26" rx="4" fill={LINE} opacity="0.14" />}
            <rect
              x="20"
              y={y - 6}
              width="12"
              height="12"
              rx="2"
              fill="none"
              stroke={i === 1 ? EDGE : LINE}
              strokeWidth="1.5"
            />
            <line x1="38" y1={y} x2="56" y2={y} stroke={i === 1 ? EDGE : LINE} strokeWidth="1.5" opacity="0.8" />
          </g>
        ))}

        <line x1="72" y1="46" x2={W} y2="46" stroke={RULE} strokeWidth="1.5" />
        <rect x="92" y="13" width="140" height="20" rx="10" fill="none" stroke={RULE} strokeWidth="1.5" />
        <circle cx="106" cy="23" r="4.5" fill="none" stroke={LINE} strokeWidth="1.4" />
        <circle cx="512" cy="23" r="6" fill="none" stroke={LINE} strokeWidth="1.4" />
        <circle cx="540" cy="23" r="6" fill="none" stroke={LINE} strokeWidth="1.4" />
        <circle cx="570" cy="23" r="11" fill="none" stroke={EDGE} strokeWidth="1.6" />

        {[92, 258, 424].map((x) => (
          <g key={x}>
            <rect x={x} y="64" width="84" height="56" rx="4" fill={PANEL} stroke={RULE} strokeWidth="1.5" />
            <line x1={x + 14} y1="82" x2={x + 52} y2="82" stroke={LINE} strokeWidth="1.5" opacity="0.7" />
            <line x1={x + 14} y1="102" x2={x + 44} y2="102" stroke={EDGE} strokeWidth="3" />
          </g>
        ))}

        <rect x="92" y="136" width="296" height="186" rx="4" fill={PANEL} stroke={RULE} strokeWidth="1.5" />
        <rect x="404" y="136" width="104" height="186" rx="4" fill={PANEL} stroke={RULE} strokeWidth="1.5" />
        <rect x="524" y="136" width="64" height="186" rx="4" fill={PANEL} stroke={RULE} strokeWidth="1.5" />

        <line x1="418" y1="160" x2="464" y2="160" stroke={EDGE} strokeWidth="2" />
        {[186, 220, 254, 288].map((y) => (
          <g key={y}>
            <circle cx="428" cy={y} r="8" fill="none" stroke={LINE} strokeWidth="1.5" />
            <line x1="444" y1={y - 4} x2="494" y2={y - 4} stroke={LINE} strokeWidth="1.5" opacity="0.8" />
            <line x1="444" y1={y + 5} x2="478" y2={y + 5} stroke={RULE} strokeWidth="1.5" />
          </g>
        ))}

        <line x1="538" y1="160" x2="566" y2="160" stroke={EDGE} strokeWidth="2" />
        {[184, 220, 256, 292].map((y) => (
          <g key={y}>
            <line x1="538" y1={y - 5} x2="574" y2={y - 5} stroke={RULE} strokeWidth="1.5" />
            <line x1="538" y1={y + 5} x2="558" y2={y + 5} stroke={LINE} strokeWidth="1.5" opacity="0.8" />
          </g>
        ))}
      </motion.g>

      <Panel />
    </motion.svg>
  );
}
