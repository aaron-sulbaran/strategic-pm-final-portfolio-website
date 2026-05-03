import { ArtifactHeader } from './ArtifactHeader';
import { structuredTokens } from '../../styles/structuredTokens';
import type {
  ProductScorecard,
  ScorecardCategory,
  ScorecardGoal,
  ScorecardMetric,
} from '../../data/structured/types';

interface Props {
  data: ProductScorecard;
}

const CATEGORY_COLORS = {
  goals: { bg: 'rgba(0, 0, 0, 0.06)', fg: '#1F1F1F' },
  financial: { bg: '#DCEEDC', fg: '#1B5E20' },
  customer: { bg: '#DCE8F5', fg: '#0A4D8C' },
  productAndProcess: { bg: '#EFE7FA', fg: '#5B3FA0' },
  people: { bg: '#FBEED6', fg: '#7A5A2E' },
} as const;

export function ProductScorecardRenderer({ data }: Props) {
  return (
    <div className="w-full max-w-[720px] mx-auto px-5 sm:px-6 pb-16">
      <ArtifactHeader
        title={data.title}
        subtitle="Balanced scorecard for outcomes and leading indicators"
        attribution={[
          { label: 'Author', value: data.metadata.author },
          { label: 'Course', value: data.metadata.course },
          { label: 'Date', value: data.metadata.date },
        ]}
        metadata={data.metadata}
      />

      {/* Business Goals card */}
      <CategoryCard
        letterColor={CATEGORY_COLORS.goals}
        category={data.businessGoals}
      >
        <ol className="list-none m-0 p-0 flex flex-col gap-3">
          {data.businessGoals.goals.map((g) => (
            <GoalRow key={g.number} goal={g} />
          ))}
        </ol>
      </CategoryCard>

      {/* Four metric categories in 2x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <CategoryCard
          letterColor={CATEGORY_COLORS.financial}
          category={data.categories.financial}
        >
          <MetricList metrics={data.categories.financial.metrics ?? []} />
        </CategoryCard>
        <CategoryCard
          letterColor={CATEGORY_COLORS.customer}
          northStar
          category={data.categories.customer}
        >
          <MetricList metrics={data.categories.customer.metrics ?? []} />
        </CategoryCard>
        <CategoryCard
          letterColor={CATEGORY_COLORS.productAndProcess}
          category={data.categories.productAndProcess}
        >
          <MetricList metrics={data.categories.productAndProcess.metrics ?? []} />
        </CategoryCard>
        <CategoryCard
          letterColor={CATEGORY_COLORS.people}
          category={data.categories.people}
        >
          <MetricList metrics={data.categories.people.metrics ?? []} />
        </CategoryCard>
      </div>

      <p
        className="font-sf italic mt-6"
        style={{
          fontSize: 12,
          color: 'var(--text-tertiary)',
          textAlign: 'center',
          lineHeight: 1.5,
        }}
      >
        {data.attribution}
      </p>
    </div>
  );
}

interface CategoryCardProps {
  category: ScorecardCategory | ProductScorecard['businessGoals'];
  letterColor: { bg: string; fg: string };
  northStar?: boolean;
  children: React.ReactNode;
}

function CategoryCard({ category, letterColor, northStar, children }: CategoryCardProps) {
  return (
    <section
      className="flex flex-col p-4"
      style={{
        background: structuredTokens.card.background,
        borderRadius: structuredTokens.card.radius,
        boxShadow: structuredTokens.card.shadow,
        border: structuredTokens.card.border,
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <span
          className="font-sf"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            borderRadius: 999,
            background: letterColor.bg,
            color: letterColor.fg,
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          {category.letter}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className="font-sf"
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              {category.title}
            </h3>
            {northStar && (
              <span
                className="font-sf inline-flex items-center gap-1"
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.6px',
                  textTransform: 'uppercase',
                  background: 'var(--accent-blue)',
                  color: '#FFFFFF',
                  padding: '2px 6px',
                  borderRadius: 6,
                }}
              >
                <Star /> North Star
              </span>
            )}
          </div>
          <p
            className="font-sf"
            style={{
              fontSize: 13,
              color: 'var(--text-tertiary)',
              margin: 0,
              marginTop: 2,
              lineHeight: 1.45,
            }}
          >
            {category.subtitle}
          </p>
        </div>
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function GoalRow({ goal }: { goal: ScorecardGoal }) {
  return (
    <li className="flex gap-3">
      <span
        className="font-sf flex-shrink-0"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 22,
          height: 22,
          borderRadius: 999,
          background: 'var(--bg-app)',
          color: 'var(--text-secondary)',
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        {goal.number}
      </span>
      <div>
        <h4
          className="font-sf"
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: 0,
            lineHeight: 1.35,
          }}
        >
          {goal.headline}
        </h4>
        <p
          className="font-sf"
          style={{
            fontSize: 13,
            color: 'var(--text-secondary)',
            margin: 0,
            marginTop: 4,
            lineHeight: 1.5,
          }}
        >
          {goal.body}
        </p>
      </div>
    </li>
  );
}

function MetricList({ metrics }: { metrics: ScorecardMetric[] }) {
  return (
    <div className="flex flex-col gap-4">
      {metrics.map((m, i) => (
        <div
          key={i}
          className="flex flex-col"
          style={{
            paddingTop: i > 0 ? 12 : 0,
            borderTop: i > 0 ? '1px solid var(--divider)' : undefined,
          }}
        >
          <h4
            className="font-sf"
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: 0,
              lineHeight: 1.35,
            }}
          >
            {m.name}
          </h4>
          <p
            className="font-sf"
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: 'var(--accent-blue)',
              margin: 0,
              marginTop: 4,
            }}
          >
            Target: {m.target}
          </p>
          <LabelledBlock label="What it is" body={m.whatItIs} />
          <LabelledBlock label="How we capture it" body={m.howWeCaptureIt} />
        </div>
      ))}
    </div>
  );
}

function LabelledBlock({ label, body }: { label: string; body: string }) {
  return (
    <div className="mt-3">
      <p style={structuredTokens.sectionLabel} className="font-sf">
        {label}
      </p>
      <p
        className="font-sf"
        style={{
          fontSize: 13,
          color: 'var(--text-secondary)',
          margin: 0,
          marginTop: 2,
          lineHeight: 1.5,
        }}
      >
        {body}
      </p>
    </div>
  );
}

function Star() {
  return (
    <svg width={10} height={10} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2 L14.6 9 L22 9.5 L16.3 14.2 L18.2 21.5 L12 17.7 L5.8 21.5 L7.7 14.2 L2 9.5 L9.4 9 Z"
        fill="currentColor"
      />
    </svg>
  );
}
