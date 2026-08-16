import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

/* Only Mai HRMS has a publishable product shot, and most of the rest never
   will — NDA or government firewall. Inventing screenshots would pass fiction
   off as work, so the others get a wireframe instead.

   Every cover is the same app frame — rail, top bar, three figures, a main
   panel and an activity list — so the row reads as one set alongside the real
   Mai HRMS screenshot. Only the main panel changes, and it changes to the
   project's own subject: a licence and its seal for vehicle licensing, slots
   for doctor channeling, a payslip for HR. Deliberately unrendered — no fill,
   no type, no data — so it reads as a schematic and could never be taken for a
   picture of the product. */

const W = 600;
const H = 338; // 16:9, matching the frame the product shot is cropped to

const GROUND = '#0F0F13';
const RAIL = '#131318';
const PANEL = '#16161C';
const RULE = '#26262F';
const LINE = '#6B6B78';
const EDGE = '#9C9CA8';
const ACC = '#D2733F';

// Content area, inside the rail and under the top bar.
const MAIN = { x: 92, y: 136, w: 296, h: 186 };
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

// ── The main panel, one per project ────────────────────────
// Each draws inside MAIN with ~16px of padding. Exactly one accent apiece.

/** Mai HRMS — the embedded assistant, answering off retrieved records. */
function AssistantPanel() {
  return (
    <>
      <Lines x={110} y={162} widths={[74]} width={2} stroke={EDGE} />

      {/* the question */}
      <rect x="212" y="180" width="160" height="30" rx="6" fill={GROUND} stroke={LINE} strokeWidth="1.5" />
      <line x1="226" y1="195" x2="352" y2="195" stroke={LINE} strokeWidth="1.5" opacity="0.8" />

      {/* the grounded answer */}
      <rect x="110" y="220" width="172" height="46" rx="6" fill={GROUND} stroke={ACC} strokeWidth="2" />
      <path
        d="M127 228 l2.6 5.4 l5.4 2.6 l-5.4 2.6 l-2.6 5.4 l-2.6 -5.4 l-5.4 -2.6 l5.4 -2.6 z"
        fill={ACC}
      />
      <line x1="144" y1="236" x2="268" y2="236" stroke={ACC} strokeWidth="1.5" opacity="0.85" />
      <line x1="144" y1="252" x2="238" y2="252" stroke={ACC} strokeWidth="1.5" opacity="0.55" />

      {/* the records it was grounded on */}
      {[110, 148, 186].map((x) => (
        <g key={x}>
          <line x1={x + 14} y1="278" x2={x + 14} y2="266" stroke={LINE} strokeWidth="1.4" strokeDasharray="3 3" />
          <rect x={x} y="280" width="28" height="24" rx="2" fill={GROUND} stroke={LINE} strokeWidth="1.5" />
          <line x1={x + 6} y1="288" x2={x + 22} y2="288" stroke={RULE} strokeWidth="1.4" />
          <line x1={x + 6} y1="295" x2={x + 17} y2="295" stroke={RULE} strokeWidth="1.4" />
        </g>
      ))}
    </>
  );
}

/** Web3 rewards — the block chain, and the payout landing on one of them. */
function ChainPanel() {
  const xs = [116, 178, 240, 302];
  const hot = 3;
  return (
    <>
      <Lines x={110} y={162} widths={[74]} width={2} stroke={EDGE} />
      {xs.map((x, i) => (
        <g key={x}>
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
        </g>
      ))}
      <line x1="326" y1="204" x2="326" y2="220" stroke={ACC} strokeWidth="1.5" strokeDasharray="3 4" />
      <path d="M321 214 l5 6 l5 -6" fill="none" stroke={ACC} strokeWidth="1.6" />
      <circle cx="326" cy="190" r="15" fill={GROUND} stroke={ACC} strokeWidth="2" />
      <circle cx="326" cy="190" r="7" fill="none" stroke={ACC} strokeWidth="1.4" opacity="0.7" />
    </>
  );
}

/** ERL 2.0 — a vehicle revenue licence, and the seal that validates it. */
function LicencePanel() {
  return (
    <>
      <Lines x={110} y={162} widths={[74]} width={2} stroke={EDGE} />
      <rect x="110" y="182" width="164" height="112" rx="4" fill={GROUND} stroke={EDGE} strokeWidth="1.6" />
      <g stroke={LINE} strokeWidth="1.6" fill="none">
        <path d="M128 224 l6 -11 h20 l7 -8 h16 l9 19 z" />
        <circle cx="140" cy="227" r="5" />
        <circle cx="175" cy="227" r="5" />
      </g>
      <line x1="128" y1="203" x2="186" y2="203" stroke={EDGE} strokeWidth="2.2" />
      <Lines x={128} y={248} widths={[112, 88, 100]} gap={14} />
      <circle cx="330" cy="238" r="27" fill={GROUND} stroke={ACC} strokeWidth="2" />
      <circle cx="330" cy="238" r="18" fill="none" stroke={ACC} strokeWidth="1.3" opacity="0.6" />
      <path d={tick(323, 237)} fill="none" stroke={ACC} strokeWidth="2.2" strokeLinecap="round" />
    </>
  );
}

/** SLAASMB — the audit checklist, behind one identity boundary. */
function AuditPanel() {
  const rows = [196, 226, 256, 286];
  return (
    <>
      <Lines x={110} y={162} widths={[74]} width={2} stroke={EDGE} />
      {rows.map((y, i) => (
        <g key={y}>
          <rect x="110" y={y - 8} width="16" height="16" rx="2" fill="none" stroke={LINE} strokeWidth="1.5" />
          {i < 3 && <path d={tick(113, y - 1)} fill="none" stroke={LINE} strokeWidth="1.8" strokeLinecap="round" />}
          <line x1="138" y1={y} x2={i === 3 ? 208 : 246} y2={y} stroke={LINE} strokeWidth="1.5" opacity="0.85" />
        </g>
      ))}
      <path
        d="M330 178 L378 200 V250 C378 280 356 297 330 307 C304 297 282 280 282 250 V200 Z"
        fill={GROUND}
        stroke={EDGE}
        strokeWidth="1.6"
      />
      <circle cx="330" cy="234" r="13" fill="none" stroke={ACC} strokeWidth="2" />
      <path d="M330 247 v20 M330 260 h11" stroke={ACC} strokeWidth="2" fill="none" />
    </>
  );
}

/** DynamicDocuments QT — one template, many generated offers. */
function TemplatePanel() {
  return (
    <>
      <Lines x={110} y={162} widths={[74]} width={2} stroke={EDGE} />
      <rect x="110" y="186" width="62" height="108" rx="3" fill={GROUND} stroke={LINE} strokeWidth="1.5" />
      {[206, 232, 258].map((y) => (
        <rect key={y} x="120" y={y - 8} width="42" height="16" rx="1.5" fill="none" stroke={RULE} strokeWidth="1.4" />
      ))}
      <line x1="182" y1="240" x2="212" y2="240" stroke={LINE} strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M207 235 l6 5 l-6 5" fill="none" stroke={LINE} strokeWidth="1.6" />
      <rect
        x="226"
        y="180"
        width="96"
        height="122"
        rx="3"
        fill={GROUND}
        stroke={LINE}
        strokeWidth="1.5"
        opacity="0.55"
        transform="rotate(-6 274 241)"
      />
      <g transform="rotate(2 300 244)">
        <rect x="252" y="184" width="96" height="120" rx="3" fill={GROUND} stroke={ACC} strokeWidth="2" />
        <line x1="266" y1="206" x2="320" y2="206" stroke={ACC} strokeWidth="2.2" />
        <Lines x={266} y={230} widths={[68, 54, 68]} gap={16} />
        <line x1="266" y1="282" x2="298" y2="282" stroke={ACC} strokeWidth="1.8" opacity="0.8" />
      </g>
    </>
  );
}

/** CxPulse — the rating scale, the pulse it reads, the volume behind it. */
function PulsePanel() {
  return (
    <>
      <Lines x={110} y={162} widths={[74]} width={2} stroke={EDGE} />
      {[118, 152, 186, 220, 254].map((cx, i) => (
        <circle
          key={cx}
          cx={cx}
          cy="188"
          r="10"
          fill={i < 3 ? LINE : 'none'}
          fillOpacity={i < 3 ? 0.5 : 0}
          stroke={i < 3 ? EDGE : LINE}
          strokeWidth="1.5"
        />
      ))}
      <path
        d="M108 240 H160 L172 240 L181 210 L190 274 L199 240 H244 L256 240 L264 224 L272 256 L280 240 H372"
        fill="none"
        stroke={ACC}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <line x1="108" y1="306" x2="372" y2="306" stroke={RULE} strokeWidth="1.5" />
      {Array.from({ length: 20 }, (_, i) => {
        const h = 8 + Math.abs(Math.sin(i * 0.8)) * 28;
        return <rect key={i} x={110 + i * 13.4} y={306 - h} width="7" height={h} fill={LINE} opacity="0.3" />;
      })}
    </>
  );
}

/** DOC990 — the appointment board, one slot just taken. */
function SlotsPanel() {
  const cols = 4;
  const rows = 3;
  const taken = new Set([1, 3, 6, 8, 11]);
  const live = 5;
  return (
    <>
      <Lines x={110} y={162} widths={[74]} width={2} stroke={EDGE} />
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const isLive = i === live;
        const isTaken = taken.has(i);
        return (
          <rect
            key={i}
            x={110 + c * 50}
            y={186 + r * 42}
            width="42"
            height="34"
            rx="2.5"
            fill={isLive ? ACC : LINE}
            fillOpacity={isLive ? 0.9 : isTaken ? 0.28 : 0}
            stroke={isLive ? ACC : isTaken ? EDGE : RULE}
            strokeWidth="1.5"
          />
        );
      })}
      <circle cx="336" cy="244" r="30" fill={GROUND} stroke={EDGE} strokeWidth="1.6" />
      <path d="M336 228 v32 M320 244 h32" stroke={LINE} strokeWidth="3.4" strokeLinecap="round" fill="none" />
    </>
  );
}

/** OneHRIS / MintHRM — the headcount, and the payroll run it produces. */
function PayrollPanel() {
  const people = [128, 184, 240, 296];
  const hot = 2;
  return (
    <>
      <Lines x={110} y={162} widths={[74]} width={2} stroke={EDGE} />
      {people.map((cx, i) => (
        <g key={cx} stroke={i === hot ? ACC : LINE} strokeWidth={i === hot ? 2 : 1.5} fill="none">
          <circle cx={cx} cy="196" r="13" />
          <path d={`M${cx - 21} 236 a 21 21 0 0 1 42 0`} />
        </g>
      ))}
      <line x1="110" y1="256" x2="372" y2="256" stroke={RULE} strokeWidth="1.5" />
      {[274, 294].map((y) => (
        <g key={y}>
          <line x1="110" y1={y} x2="212" y2={y} stroke={LINE} strokeWidth="1.5" opacity="0.85" />
          <line x1="300" y1={y} x2="372" y2={y} stroke={LINE} strokeWidth="1.5" opacity="0.85" />
        </g>
      ))}
      <line x1="300" y1="314" x2="372" y2="314" stroke={ACC} strokeWidth="2.4" />
      <line x1="110" y1="314" x2="176" y2="314" stroke={LINE} strokeWidth="1.5" opacity="0.85" />
    </>
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

/* A project added later has no panel drawn yet, so it falls back to a plain
   content block rather than an empty frame. */
function GenericPanel() {
  return (
    <>
      <Lines x={110} y={162} widths={[74]} width={2} stroke={EDGE} />
      <Lines x={110} y={192} widths={[248, 214, 248, 180]} gap={22} />
      <line x1="110" y1="292" x2="372" y2="292" stroke={RULE} strokeWidth="1.5" />
      <line x1="110" y1="310" x2="176" y2="310" stroke={ACC} strokeWidth="2.4" />
    </>
  );
}

export default function ProjectCover({ id }: { id: string }) {
  const reduced = useReducedMotion();
  const Panel = useMemo(() => PANELS[id] ?? GenericPanel, [id]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full block" aria-hidden>
      <rect width={W} height={H} fill={GROUND} />

      {/* ── App chrome: the part every cover shares ── */}
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

      {/* three figures across the top of the content area */}
      {[92, 258, 424].map((x) => (
        <g key={x}>
          <rect x={x} y="64" width="84" height="56" rx="4" fill={PANEL} stroke={RULE} strokeWidth="1.5" />
          <line x1={x + 14} y1="82" x2={x + 52} y2="82" stroke={LINE} strokeWidth="1.5" opacity="0.7" />
          <line x1={x + 14} y1="102" x2={x + 44} y2="102" stroke={EDGE} strokeWidth="3" />
        </g>
      ))}

      {/* the two content panels */}
      <rect x={MAIN.x} y={MAIN.y} width={MAIN.w} height={MAIN.h} rx="4" fill={PANEL} stroke={RULE} strokeWidth="1.5" />
      <rect x="404" y={MAIN.y} width="104" height={MAIN.h} rx="4" fill={PANEL} stroke={RULE} strokeWidth="1.5" />
      <rect x="524" y={MAIN.y} width="64" height={MAIN.h} rx="4" fill={PANEL} stroke={RULE} strokeWidth="1.5" />

      {/* activity list, shared */}
      <line x1="418" y1="160" x2="464" y2="160" stroke={EDGE} strokeWidth="2" />
      {[186, 220, 254, 288].map((y) => (
        <g key={y}>
          <circle cx="428" cy={y} r="8" fill="none" stroke={LINE} strokeWidth="1.5" />
          <line x1="444" y1={y - 4} x2="494" y2={y - 4} stroke={LINE} strokeWidth="1.5" opacity="0.8" />
          <line x1="444" y1={y + 5} x2="478" y2={y + 5} stroke={RULE} strokeWidth="1.5" />
        </g>
      ))}

      {/* far rail of small figures */}
      <line x1="538" y1="160" x2="566" y2="160" stroke={EDGE} strokeWidth="2" />
      {[184, 220, 256, 292].map((y) => (
        <g key={y}>
          <line x1="538" y1={y - 5} x2="574" y2={y - 5} stroke={RULE} strokeWidth="1.5" />
          <line x1="538" y1={y + 5} x2="558" y2={y + 5} stroke={LINE} strokeWidth="1.5" opacity="0.8" />
        </g>
      ))}

      <motion.g
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
      >
        <Panel />
      </motion.g>
    </svg>
  );
}
