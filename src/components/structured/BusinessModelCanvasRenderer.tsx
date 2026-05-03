import { ArtifactHeader } from './ArtifactHeader';
import { CanvasBlock } from './CanvasBlock';
import type { BusinessModelCanvas } from '../../data/structured/types';

interface Props {
  data: BusinessModelCanvas;
}

// Renders the canonical Strategyzer 9-block BMC.
// Desktop: 5-column x 3-row grid with cell spans.
// Mobile (<= 480px): single column in Strategyzer's recommended
// right-to-left mobile reading order.
export function BusinessModelCanvasRenderer({ data }: Props) {
  const b = data.blocks;
  return (
    <div className="w-full max-w-[1100px] mx-auto px-5 sm:px-6 pb-16">
      <ArtifactHeader
        title="Business Model Canvas"
        subtitle="Apple Wallet"
        attribution={[
          { label: 'Designed for', value: data.designedFor },
          { label: 'Designed by', value: data.designedBy },
          { label: 'Date', value: data.metadata.date },
          { label: 'Iteration', value: data.metadata.iteration ?? '1' },
        ]}
        metadata={data.metadata}
      />

      {/* Desktop grid */}
      <div
        className="hidden md:grid"
        style={{
          gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
          gridTemplateRows: 'repeat(2, minmax(180px, auto)) minmax(160px, auto)',
          gap: 12,
        }}
      >
        <div style={{ gridColumn: '1', gridRow: '1 / span 2' }}>
          <CanvasBlock {...b.keyPartners} />
        </div>
        <div style={{ gridColumn: '2', gridRow: '1' }}>
          <CanvasBlock {...b.keyActivities} />
        </div>
        <div style={{ gridColumn: '2', gridRow: '2' }}>
          <CanvasBlock {...b.keyResources} />
        </div>
        <div style={{ gridColumn: '3', gridRow: '1 / span 2' }}>
          <CanvasBlock {...b.valuePropositions} />
        </div>
        <div style={{ gridColumn: '4', gridRow: '1' }}>
          <CanvasBlock {...b.customerRelationships} />
        </div>
        <div style={{ gridColumn: '4', gridRow: '2' }}>
          <CanvasBlock {...b.channels} />
        </div>
        <div style={{ gridColumn: '5', gridRow: '1 / span 2' }}>
          <CanvasBlock {...b.customerSegments} />
        </div>
        <div style={{ gridColumn: '1 / span 3', gridRow: '3' }}>
          <CanvasBlock {...b.costStructure} />
        </div>
        <div style={{ gridColumn: '4 / span 2', gridRow: '3' }}>
          <CanvasBlock {...b.revenueStreams} />
        </div>
      </div>

      {/* Mobile single column, Strategyzer right-to-left order */}
      <div className="md:hidden flex flex-col gap-3">
        <CanvasBlock {...b.customerSegments} />
        <CanvasBlock {...b.customerRelationships} />
        <CanvasBlock {...b.channels} />
        <CanvasBlock {...b.valuePropositions} />
        <CanvasBlock {...b.keyActivities} />
        <CanvasBlock {...b.keyResources} />
        <CanvasBlock {...b.keyPartners} />
        <CanvasBlock {...b.costStructure} />
        <CanvasBlock {...b.revenueStreams} />
      </div>
    </div>
  );
}
