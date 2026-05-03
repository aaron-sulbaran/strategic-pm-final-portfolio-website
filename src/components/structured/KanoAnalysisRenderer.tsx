import { ArtifactHeader } from './ArtifactHeader';
import { structuredTokens, type CategoryTintKey } from '../../styles/structuredTokens';
import type {
  KanoAnalysis,
  KanoCategoryDefinition,
  KanoFeature,
  KanoRiceComparison,
} from '../../data/structured/types';

interface Props {
  data: KanoAnalysis;
}

const CATEGORY_TINT_KEY: Record<KanoFeature['category'], CategoryTintKey> = {
  Excitement: 'EXCITEMENT',
  Performance: 'PERFORMANCE',
  Basic: 'BASIC',
  Indifferent: 'INDIFFERENT',
  Reverse: 'REVERSE',
};

export function KanoAnalysisRenderer({ data }: Props) {
  return (
    <div className="w-full max-w-[1100px] mx-auto px-5 sm:px-6 pb-16">
      <ArtifactHeader
        title={data.title}
        subtitle={data.subtitle}
        attribution={[
          { label: 'Author', value: data.metadata.author },
          { label: 'Course', value: data.metadata.course },
          { label: 'Date', value: data.metadata.date },
        ]}
        metadata={data.metadata}
      />

      {/* 2. Methodology */}
      <Section heading="Methodology">
        <p
          className="font-sf"
          style={{
            fontSize: 14,
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            margin: 0,
            marginBottom: 16,
          }}
        >
          {data.methodology.intro}
        </p>
        <div
          className="grid gap-3 mb-5"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}
        >
          {data.methodology.categories.map((c) => (
            <CategoryDefCard key={c.label} c={c} />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <AxisLine text={data.methodology.axes.vertical} />
          <AxisLine text={data.methodology.axes.horizontal} />
          <AxisLine text={data.methodology.axes.curves} />
        </div>
      </Section>

      {/* 3. Feature categorization */}
      <Section heading="Feature Categorization">
        <p
          className="font-sf"
          style={{
            fontSize: 13,
            color: 'var(--text-tertiary)',
            margin: 0,
            marginBottom: 12,
            lineHeight: 1.45,
          }}
        >
          {data.categorizationCaption}
        </p>
        <div className="flex flex-col gap-3">
          {data.features.map((f) => (
            <FeatureCard key={f.number} f={f} />
          ))}
        </div>
      </Section>

      {/* 4. Chart */}
      <Section heading="Kano Chart">
        <p
          className="font-sf"
          style={{
            fontSize: 13,
            color: 'var(--text-tertiary)',
            margin: 0,
            marginBottom: 12,
            lineHeight: 1.45,
          }}
        >
          {data.chartCaption}
        </p>
        <KanoChart features={data.features} />
      </Section>

      {/* 5. RICE comparison */}
      <Section heading="RICE vs Kano">
        <p
          className="font-sf"
          style={{
            fontSize: 14,
            color: 'var(--text-secondary)',
            margin: 0,
            marginBottom: 16,
            lineHeight: 1.5,
          }}
        >
          {data.riceComparison.intro}
        </p>
        <RiceTable rows={data.riceComparison.rows} />
        <ClosingLesson lesson={data.riceComparison.closingLesson} />
      </Section>
    </div>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h2
        className="font-sf"
        style={{
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: '-0.2px',
          color: 'var(--text-primary)',
          margin: 0,
          marginBottom: 12,
        }}
      >
        {heading}
      </h2>
      {children}
    </section>
  );
}

function CategoryDefCard({ c }: { c: KanoCategoryDefinition }) {
  return (
    <div
      className="flex flex-col p-3"
      style={{
        background: structuredTokens.card.background,
        borderRadius: 12,
        boxShadow: structuredTokens.card.shadow,
        border: structuredTokens.card.border,
      }}
    >
      <h3
        className="font-sf"
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: 'var(--text-primary)',
          margin: 0,
        }}
      >
        {c.label}
      </h3>
      {c.secondaryLabel && (
        <p
          className="font-sf"
          style={{
            fontSize: 11,
            color: 'var(--text-tertiary)',
            margin: 0,
            marginTop: 2,
            letterSpacing: '0.3px',
          }}
        >
          {c.secondaryLabel}
        </p>
      )}
      <p
        className="font-sf"
        style={{
          fontSize: 12,
          color: 'var(--text-secondary)',
          margin: 0,
          marginTop: 8,
          lineHeight: 1.4,
        }}
      >
        {c.description}
      </p>
    </div>
  );
}

function AxisLine({ text }: { text: string }) {
  return (
    <p
      className="font-sf italic"
      style={{
        fontSize: 13,
        color: 'var(--text-tertiary)',
        margin: 0,
        lineHeight: 1.5,
      }}
    >
      {text}
    </p>
  );
}

function FeatureCard({ f }: { f: KanoFeature }) {
  const tint = structuredTokens.categoryTints[CATEGORY_TINT_KEY[f.category]];
  return (
    <article
      className="flex gap-3 p-3"
      style={{
        background: structuredTokens.card.background,
        borderRadius: 12,
        boxShadow: structuredTokens.card.shadow,
        border: structuredTokens.card.border,
      }}
    >
      <span
        className="font-sf flex-shrink-0"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 28,
          height: 28,
          borderRadius: 999,
          background: 'var(--bg-app)',
          color: 'var(--text-secondary)',
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        {f.number}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className="font-sf"
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            {f.fullName}
          </h3>
          <span
            className="font-sf"
            style={{
              background: tint.bg,
              color: tint.fg,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              padding: '2px 8px',
              borderRadius: 6,
            }}
          >
            {f.category}
          </span>
        </div>
        <p
          className="font-sf"
          style={{
            fontSize: 13,
            color: 'var(--text-secondary)',
            margin: 0,
            marginTop: 6,
            lineHeight: 1.5,
          }}
        >
          {f.reasoning}
        </p>
      </div>
    </article>
  );
}

// SVG Kano chart. The three classic curves with the 10 features plotted
// near the curve appropriate to their category. Positions are
// illustrative, not data-precise.
function KanoChart({ features }: { features: KanoFeature[] }) {
  const W = 720;
  const H = 420;
  const PAD = 50;
  const innerW = W - PAD * 2;
  const innerH = H - PAD * 2;

  // Helper to convert curve position to SVG coord.
  // x in [0,1] left-to-right, y in [0,1] bottom-to-top.
  const xy = (x: number, y: number) => ({
    x: PAD + x * innerW,
    y: PAD + (1 - y) * innerH,
  });

  // Three curves rendered with quadratic paths.
  // Excitement: y = sqrt(x) shape (bends top)
  const excitementPath = curvePath((t) => Math.pow(t, 0.4));
  // Performance: linear
  const performancePath = curvePath((t) => t);
  // Basic: y = 1 - sqrt(1-x) (bends bottom-right)
  const basicPath = curvePath((t) => 1 - Math.pow(1 - t, 0.4));

  function curvePath(fn: (t: number) => number): string {
    const steps = 24;
    const pts: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const { x, y } = xy(t, fn(t));
      pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return pts.join(' ');
  }

  // Sensible plotted positions per feature, keyed by feature number.
  const positions: Record<number, { x: number; y: number }> = {
    1: { x: 0.55, y: 0.78 }, // Health Insurance - Excitement
    2: { x: 0.7, y: 0.86 }, // Workplace Badge - Excitement
    3: { x: 0.45, y: 0.45 }, // Import Scanner - Performance
    4: { x: 0.6, y: 0.6 }, // Wallet Org - Performance
    5: { x: 0.65, y: 0.32 }, // Smart Surfacing - Basic
    6: { x: 0.4, y: 0.7 }, // Merchant Indicator - Excitement
    7: { x: 0.78, y: 0.45 }, // Offline Mode - Basic
    8: { x: 0.85, y: 0.94 }, // P2P Identity - Excitement
    9: { x: 0.75, y: 0.75 }, // International - Performance
    10: { x: 0.35, y: 0.5 }, // Guided Setup - Indifferent
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full"
        style={{ maxWidth: 720, display: 'block' }}
        role="img"
        aria-label="Kano chart with the ten Apple Wallet features plotted on the satisfaction and implementation axes"
      >
        {/* Axes */}
        <line
          x1={PAD}
          y1={H - PAD}
          x2={W - PAD}
          y2={H - PAD}
          stroke="var(--text-quaternary)"
          strokeWidth={1.5}
        />
        <line
          x1={PAD}
          y1={PAD}
          x2={PAD}
          y2={H - PAD}
          stroke="var(--text-quaternary)"
          strokeWidth={1.5}
        />
        {/* Mid Y line (zero satisfaction) */}
        <line
          x1={PAD}
          y1={PAD + innerH / 2}
          x2={W - PAD}
          y2={PAD + innerH / 2}
          stroke="var(--divider)"
          strokeWidth={1}
          strokeDasharray="4 4"
        />

        {/* Curves */}
        <path d={excitementPath} fill="none" stroke="#7A5A2E" strokeWidth={2} opacity={0.6} />
        <path d={performancePath} fill="none" stroke="#0A4D8C" strokeWidth={2} opacity={0.6} />
        <path d={basicPath} fill="none" stroke="#1B5E20" strokeWidth={2} opacity={0.6} />

        {/* Curve labels */}
        <text
          x={xy(0.85, 0.92).x + 4}
          y={xy(0.85, 0.92).y - 4}
          fontSize={11}
          fontWeight={700}
          fill="#7A5A2E"
          fontFamily="-apple-system, sans-serif"
        >
          Excitement
        </text>
        <text
          x={xy(0.85, 0.85).x - 90}
          y={xy(0.85, 0.85).y + 4}
          fontSize={11}
          fontWeight={700}
          fill="#0A4D8C"
          fontFamily="-apple-system, sans-serif"
        >
          Performance
        </text>
        <text
          x={xy(0.92, 0.65).x - 56}
          y={xy(0.92, 0.65).y + 14}
          fontSize={11}
          fontWeight={700}
          fill="#1B5E20"
          fontFamily="-apple-system, sans-serif"
        >
          Basic
        </text>

        {/* Axis labels */}
        <text
          x={W / 2}
          y={H - 12}
          fontSize={11}
          fontWeight={600}
          fill="var(--text-tertiary)"
          textAnchor="middle"
          fontFamily="-apple-system, sans-serif"
        >
          Implementation →
        </text>
        <text
          transform={`translate(14, ${H / 2}) rotate(-90)`}
          fontSize={11}
          fontWeight={600}
          fill="var(--text-tertiary)"
          textAnchor="middle"
          fontFamily="-apple-system, sans-serif"
        >
          Satisfaction →
        </text>

        {/* Quadrant corner labels */}
        <text x={PAD + 6} y={PAD + 14} fontSize={10} fill="var(--text-quaternary)" fontFamily="-apple-system, sans-serif">
          Satisfied
        </text>
        <text x={PAD + 6} y={H - PAD - 6} fontSize={10} fill="var(--text-quaternary)" fontFamily="-apple-system, sans-serif">
          Unsatisfied
        </text>
        <text
          x={W - PAD - 6}
          y={H - PAD - 6}
          fontSize={10}
          fill="var(--text-quaternary)"
          textAnchor="end"
          fontFamily="-apple-system, sans-serif"
        >
          Fully Implemented
        </text>
        <text
          x={PAD + 6}
          y={H - PAD - 6}
          fontSize={10}
          fill="var(--text-quaternary)"
          fontFamily="-apple-system, sans-serif"
          textAnchor="start"
          dx={62}
        >
          Not Implemented
        </text>

        {/* Plotted features */}
        {features.map((f) => {
          const pos = positions[f.number];
          if (!pos) return null;
          const tint = structuredTokens.categoryTints[CATEGORY_TINT_KEY[f.category]];
          const { x, y } = xy(pos.x, pos.y);
          return (
            <g key={f.number}>
              <circle cx={x} cy={y} r={11} fill={tint.fg} stroke="#FFFFFF" strokeWidth={2} />
              <text
                x={x}
                y={y + 3.5}
                fontSize={10}
                fontWeight={700}
                fill="#FFFFFF"
                textAnchor="middle"
                fontFamily="-apple-system, sans-serif"
              >
                {f.number}
              </text>
            </g>
          );
        })}
      </svg>
      <p
        className="font-sf"
        style={{
          fontSize: 11,
          color: 'var(--text-tertiary)',
          margin: 0,
          marginTop: 8,
          textAlign: 'center',
        }}
      >
        Numbers correspond to features in the categorization above.
      </p>
    </div>
  );
}

function RiceTable({ rows }: { rows: KanoRiceComparison[] }) {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        borderRadius: 12,
        border: '1px solid var(--divider)',
        background: structuredTokens.card.background,
      }}
    >
      <table className="w-full" style={{ borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: 'rgba(0, 0, 0, 0.025)' }}>
            <Th>RICE Rank</Th>
            <Th>Feature</Th>
            <Th>Kano</Th>
            <Th>Divergence</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const tint = structuredTokens.categoryTints[CATEGORY_TINT_KEY[r.kanoCategory]];
            return (
              <tr
                key={r.feature}
                style={{ background: i % 2 === 1 ? 'rgba(0, 0, 0, 0.015)' : 'transparent' }}
              >
                <Td>
                  <span style={{ fontWeight: 700 }}>#{r.riceRank}</span>
                </Td>
                <Td>{r.feature}</Td>
                <Td>
                  <span
                    style={{
                      background: tint.bg,
                      color: tint.fg,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      padding: '2px 8px',
                      borderRadius: 6,
                      whiteSpace: 'nowrap',
                    }}
                    className="font-sf"
                  >
                    {r.kanoCategory}
                  </span>
                </Td>
                <Td>
                  <span style={{ color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    {r.divergenceCommentary}
                  </span>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      className="font-sf"
      style={{
        textAlign: 'left',
        padding: '10px 12px',
        fontSize: 11,
        fontWeight: 700,
        color: 'var(--text-tertiary)',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        borderBottom: '1px solid var(--divider)',
      }}
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td
      className="font-sf"
      style={{
        padding: '10px 12px',
        verticalAlign: 'top',
        color: 'var(--text-primary)',
        borderTop: '1px solid var(--divider)',
      }}
    >
      {children}
    </td>
  );
}

function ClosingLesson({ lesson }: { lesson: { title: string; body: string } }) {
  return (
    <div
      className="mt-5 p-4"
      style={{
        background: 'rgba(0, 122, 255, 0.06)',
        border: '1px solid rgba(0, 122, 255, 0.18)',
        borderRadius: 14,
      }}
    >
      <h3
        className="font-sf"
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: 'var(--accent-blue)',
          margin: 0,
          marginBottom: 6,
        }}
      >
        {lesson.title}
      </h3>
      <p
        className="font-sf"
        style={{
          fontSize: 14,
          color: 'var(--text-primary)',
          margin: 0,
          lineHeight: 1.55,
        }}
      >
        {lesson.body}
      </p>
    </div>
  );
}
