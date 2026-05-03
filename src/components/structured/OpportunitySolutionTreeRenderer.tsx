import { ArtifactHeader } from './ArtifactHeader';
import { structuredTokens } from '../../styles/structuredTokens';
import type {
  OpportunitySolutionTree,
  OSTOpportunity,
  OSTSolution,
  OSTAssumption,
} from '../../data/structured/types';

interface Props {
  data: OpportunitySolutionTree;
}

const FOCUS_BORDER = '2px solid var(--accent-blue)';
const NORMAL_BORDER = structuredTokens.card.border;
const LINE_FOCUS = 'var(--accent-blue)';
const LINE_NORMAL = 'var(--text-quaternary)';

export function OpportunitySolutionTreeRenderer({ data }: Props) {
  return (
    <div className="w-full max-w-[1100px] mx-auto px-5 sm:px-6 pb-16">
      <ArtifactHeader
        title="Opportunity Solution Tree"
        subtitle="Apple Wallet"
        attribution={[
          { label: 'Author', value: data.metadata.author },
          { label: 'Course', value: data.metadata.course },
          { label: 'Date', value: data.metadata.date },
        ]}
        metadata={data.metadata}
      />

      {/* Desired Outcome */}
      <DesiredOutcome
        title={data.desiredOutcome.title}
        subtitle={data.desiredOutcome.subtitle}
      />

      {/* Connector: outcome -> opportunities (desktop only) */}
      <div className="hidden md:block">
        <Connector />
      </div>

      {/* Opportunities row */}
      <div className="hidden md:grid" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
        {data.opportunities.map((opp) => (
          <OpportunityColumn key={opp.number} opportunity={opp} />
        ))}
      </div>

      {/* Mobile: vertical stack of opportunities */}
      <div className="md:hidden flex flex-col gap-4 mt-4">
        {data.opportunities.map((opp) => (
          <OpportunityMobile key={opp.number} opportunity={opp} />
        ))}
      </div>

      {/* Solutions header (desktop) */}
      <div className="hidden md:block">
        <Connector focus />
        <p
          className="font-sf"
          style={{
            ...structuredTokens.sectionLabel,
            color: 'var(--accent-blue)',
            textAlign: 'center',
            marginTop: 16,
            marginBottom: 12,
          }}
        >
          Solutions Mapped to Opportunity {data.solutions.mappedToOpportunity}
        </p>
      </div>

      {/* Solutions row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {data.solutions.items.map((sol) => (
          <SolutionCard key={sol.letter} solution={sol} />
        ))}
      </div>

      {/* Assumptions */}
      <div className="mt-8">
        <h3
          className="font-sf"
          style={{
            fontSize: 17,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: 12,
          }}
        >
          Assumptions to Test
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.assumptionsToTest.map((a, i) => (
            <AssumptionCard key={i} assumption={a} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DesiredOutcome({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section
      className="px-5 py-4"
      style={{
        background: 'linear-gradient(135deg, #0A0A0A 0%, #1F1F1F 100%)',
        color: '#FFFFFF',
        borderRadius: 14,
        boxShadow: structuredTokens.card.shadow,
      }}
    >
      <p
        className="font-sf"
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.6px',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.55)',
          margin: 0,
          marginBottom: 6,
        }}
      >
        Desired Outcome
      </p>
      <h2
        className="font-sf"
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: '#FFFFFF',
          margin: 0,
          lineHeight: 1.3,
        }}
      >
        {title}
      </h2>
      <p
        className="font-sf"
        style={{
          fontSize: 13,
          color: 'rgba(255, 255, 255, 0.7)',
          margin: 0,
          marginTop: 4,
        }}
      >
        {subtitle}
      </p>
    </section>
  );
}

function Connector({ focus = false }: { focus?: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 2,
        height: 16,
        background: focus ? LINE_FOCUS : LINE_NORMAL,
        margin: '0 auto',
      }}
    />
  );
}

function OpportunityColumn({ opportunity }: { opportunity: OSTOpportunity }) {
  const focus = opportunity.isFocus;
  return (
    <div className="flex flex-col items-stretch gap-2">
      <Card focus={!!focus}>
        <NumberBadge n={opportunity.number} focus={!!focus} />
        <h3
          className="font-sf"
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: 0,
            marginTop: 8,
            lineHeight: 1.3,
          }}
        >
          {opportunity.title}
        </h3>
        <p
          className="font-sf"
          style={{
            fontSize: 12,
            color: 'var(--text-tertiary)',
            margin: 0,
            marginTop: 4,
            lineHeight: 1.4,
          }}
        >
          {opportunity.description}
        </p>
      </Card>
      {opportunity.subOpportunities.map((sub) => (
        <div key={sub.id} className="flex flex-col items-stretch">
          <Connector focus={!!sub.isFocus} />
          <Card focus={!!sub.isFocus}>
            <p
              className="font-sf"
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: sub.isFocus ? 'var(--accent-blue)' : 'var(--text-tertiary)',
                letterSpacing: '0.5px',
                margin: 0,
                marginBottom: 4,
              }}
            >
              {sub.id.toUpperCase()}
            </p>
            <p
              className="font-sf"
              style={{
                fontSize: 13,
                color: 'var(--text-primary)',
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {sub.text}
            </p>
          </Card>
        </div>
      ))}
    </div>
  );
}

function OpportunityMobile({ opportunity }: { opportunity: OSTOpportunity }) {
  const focus = opportunity.isFocus;
  return (
    <div className="flex flex-col gap-2">
      <Card focus={!!focus}>
        <NumberBadge n={opportunity.number} focus={!!focus} />
        <h3
          className="font-sf"
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: 0,
            marginTop: 8,
            lineHeight: 1.3,
          }}
        >
          {opportunity.title}
        </h3>
        <p
          className="font-sf"
          style={{
            fontSize: 13,
            color: 'var(--text-tertiary)',
            margin: 0,
            marginTop: 4,
          }}
        >
          {opportunity.description}
        </p>
      </Card>
      {opportunity.subOpportunities.map((sub) => (
        <div key={sub.id} className="flex flex-col items-center gap-1">
          <ChevronDown />
          <div className="w-full">
            <Card focus={!!sub.isFocus}>
              <p
                className="font-sf"
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: sub.isFocus ? 'var(--accent-blue)' : 'var(--text-tertiary)',
                  letterSpacing: '0.5px',
                  margin: 0,
                  marginBottom: 4,
                }}
              >
                {sub.id.toUpperCase()}
              </p>
              <p
                className="font-sf"
                style={{
                  fontSize: 13,
                  color: 'var(--text-primary)',
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {sub.text}
              </p>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
}

function SolutionCard({ solution }: { solution: OSTSolution }) {
  return (
    <Card focus>
      <div className="flex items-center gap-2 mb-1">
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            borderRadius: 999,
            background: 'var(--accent-blue)',
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: 700,
          }}
          className="font-sf"
        >
          {solution.letter}
        </span>
        <h4
          className="font-sf"
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: 0,
          }}
        >
          {solution.title}
        </h4>
      </div>
      <p
        className="font-sf"
        style={{
          fontSize: 13,
          color: 'var(--text-secondary)',
          margin: 0,
          lineHeight: 1.45,
        }}
      >
        {solution.description}
      </p>
    </Card>
  );
}

function AssumptionCard({ assumption }: { assumption: OSTAssumption }) {
  const tint = structuredTokens.categoryTints[assumption.category];
  return (
    <Card>
      <span
        className="font-sf inline-flex items-center"
        style={{
          background: tint.fg,
          color: '#FFFFFF',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.6px',
          textTransform: 'uppercase',
          padding: '3px 8px',
          borderRadius: 6,
          alignSelf: 'flex-start',
        }}
      >
        {assumption.category}
      </span>
      <p
        className="font-sf"
        style={{
          fontSize: 13,
          color: 'var(--text-primary)',
          margin: 0,
          marginTop: 8,
          lineHeight: 1.45,
        }}
      >
        {assumption.statement}
      </p>
    </Card>
  );
}

function ChevronDown() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 32 32"
      aria-hidden="true"
      style={{ color: 'var(--text-quaternary)' }}
    >
      <path
        d="M6 11 L16 21 L26 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NumberBadge({ n, focus }: { n: number; focus: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 22,
        height: 22,
        borderRadius: 999,
        background: focus ? 'var(--accent-blue)' : 'var(--text-quaternary)',
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: 700,
      }}
      className="font-sf"
    >
      {n}
    </span>
  );
}

function Card({
  focus = false,
  children,
}: {
  focus?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col p-3"
      style={{
        background: structuredTokens.card.background,
        borderRadius: 12,
        boxShadow: structuredTokens.card.shadow,
        border: focus ? FOCUS_BORDER : NORMAL_BORDER,
      }}
    >
      {children}
    </div>
  );
}
