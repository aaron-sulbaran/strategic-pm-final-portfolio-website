import { ArtifactHeader } from './ArtifactHeader';
import { CanvasBlock } from './CanvasBlock';
import { structuredTokens } from '../../styles/structuredTokens';
import type { ValuePropositionCanvas } from '../../data/structured/types';

interface Props {
  data: ValuePropositionCanvas;
}

// Two halves: Value Map (what the product offers) on the left, Customer
// Profile (who the user is) on the right. Each half is one labeled
// outer card containing three internal blocks.
export function ValuePropositionCanvasRenderer({ data }: Props) {
  return (
    <div className="w-full max-w-[1100px] mx-auto px-5 sm:px-6 pb-16">
      <ArtifactHeader
        title="Value Proposition Canvas"
        subtitle="Apple Wallet"
        attribution={[
          { label: 'Designed for', value: data.designedFor },
          { label: 'Designed by', value: data.designedBy },
          { label: 'Date', value: data.metadata.date },
          { label: 'Iteration', value: data.metadata.iteration ?? '1' },
        ]}
        metadata={data.metadata}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CanvasHalf
          label="Value Map"
          description="What Apple Wallet offers"
          blocks={[
            data.valueMap.productsAndServices,
            data.valueMap.gainCreators,
            data.valueMap.painRelievers,
          ]}
        />
        <CanvasHalf
          label="Customer Profile"
          description="Who the user is"
          blocks={[
            data.customerProfile.customerJobs,
            data.customerProfile.gains,
            data.customerProfile.pains,
          ]}
        />
      </div>
    </div>
  );
}

interface CanvasHalfProps {
  label: string;
  description: string;
  blocks: { iconSymbol: string; title: string; items: string[] }[];
}

function CanvasHalf({ label, description, blocks }: CanvasHalfProps) {
  return (
    <section
      className="flex flex-col gap-3 p-4"
      style={{
        background: structuredTokens.card.background,
        borderRadius: structuredTokens.card.radius,
        boxShadow: structuredTokens.card.shadow,
        border: structuredTokens.card.border,
      }}
    >
      <div className="flex flex-col mb-1">
        <h3
          style={{
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: '-0.2px',
            color: 'var(--text-primary)',
          }}
          className="font-sf"
        >
          {label}
        </h3>
        <p
          style={{
            fontSize: 13,
            color: 'var(--text-tertiary)',
            margin: 0,
          }}
          className="font-sf"
        >
          {description}
        </p>
      </div>
      {blocks.map((block, i) => (
        <CanvasBlock
          key={`${label}-${i}`}
          {...block}
          style={{ boxShadow: 'none', border: '1px solid var(--divider)' }}
        />
      ))}
    </section>
  );
}
