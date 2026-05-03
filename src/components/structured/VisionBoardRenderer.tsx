import { ArtifactHeader } from './ArtifactHeader';
import { Icon, type SFSymbol } from '../Icon';
import { structuredTokens } from '../../styles/structuredTokens';
import type {
  VisionBoard,
  VisionBoardSection,
} from '../../data/structured/types';

interface Props {
  data: VisionBoard;
}

export function VisionBoardRenderer({ data }: Props) {
  return (
    <div className="w-full max-w-[720px] mx-auto px-5 sm:px-6 pb-16">
      <ArtifactHeader
        title="Product Vision Board"
        subtitle="Apple Wallet"
        attribution={[
          { label: 'Author', value: data.metadata.author },
          { label: 'Course', value: data.metadata.course },
          { label: 'Date', value: data.metadata.date },
        ]}
        metadata={data.metadata}
      />

      <section
        className="p-6 mb-5"
        style={{
          background:
            'linear-gradient(135deg, #F4F4F7 0%, #FAFAFC 100%)',
          borderRadius: 18,
          border: '1px solid rgba(0, 0, 0, 0.04)',
          boxShadow: structuredTokens.card.shadow,
        }}
      >
        <p
          className="font-sf italic"
          style={{
            fontSize: 13,
            color: 'var(--text-tertiary)',
            margin: 0,
            marginBottom: 12,
            lineHeight: 1.4,
          }}
        >
          {data.vision.prompt}
        </p>
        <p
          className="font-sf"
          style={{
            fontSize: 24,
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: '-0.3px',
            color: 'var(--text-primary)',
            margin: 0,
          }}
        >
          {data.vision.statement}
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section section={data.sections.targetGroup} />
        <Section section={data.sections.needs} />
        <Section section={data.sections.product} />
        <Section section={data.sections.businessGoals} />
      </div>

      {data.attribution && (
        <p
          className="font-sf italic mt-6"
          style={{
            fontSize: 12,
            color: 'var(--text-tertiary)',
            textAlign: 'center',
          }}
        >
          {data.attribution}
        </p>
      )}
    </div>
  );
}

function Section({ section }: { section: VisionBoardSection }) {
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
      <div className="flex items-center gap-2 mb-1">
        <span
          aria-hidden="true"
          style={{ color: structuredTokens.blockIcon.color }}
        >
          <Icon name={section.iconSymbol as SFSymbol} size={18} />
        </span>
        <h3
          className="font-sf"
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
          }}
        >
          {section.title}
        </h3>
      </div>
      <p
        className="font-sf italic"
        style={{
          fontSize: 12,
          color: 'var(--text-tertiary)',
          margin: 0,
          marginBottom: 12,
          lineHeight: 1.4,
        }}
      >
        {section.prompt}
      </p>
      <div className="flex flex-col gap-3">
        {section.subsections.map((sub, i) => (
          <div key={i}>
            <h4
              className="font-sf"
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--text-primary)',
                margin: 0,
                marginBottom: 4,
                lineHeight: 1.3,
              }}
            >
              {sub.heading}
            </h4>
            <p
              className="font-sf"
              style={{
                fontSize: 14,
                color: 'var(--text-secondary)',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {sub.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
