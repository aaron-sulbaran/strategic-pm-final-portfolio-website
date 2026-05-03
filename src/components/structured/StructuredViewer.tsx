import { ViewerShell } from '../ViewerShell';
import type {
  StructuredRendererKey,
  StructuredDataSourceKey,
} from '../../data/passes';

import { BusinessModelCanvasRenderer } from './BusinessModelCanvasRenderer';
import { ValuePropositionCanvasRenderer } from './ValuePropositionCanvasRenderer';
import { VisionBoardRenderer } from './VisionBoardRenderer';
import { OpportunitySolutionTreeRenderer } from './OpportunitySolutionTreeRenderer';
import { KanoAnalysisRenderer } from './KanoAnalysisRenderer';
import { ProductScorecardRenderer } from './ProductScorecardRenderer';
import { RoadmapV2Renderer } from './RoadmapV2Renderer';

import bmcData from '../../data/structured/AaronSulbaran_AppleWallet_BusinessModelCanvas';
import vpcData from '../../data/structured/AaronSulbaran_AppleWallet_ValuePropositionCanvas';
import visionData from '../../data/structured/AaronSulbaran_AppleWallet_VisionBoard';
import ostData from '../../data/structured/AaronSulbaran_AppleWallet_OpportunitySolutionTree';
import kanoData from '../../data/structured/AaronSulbaran_AppleWallet_KanoAnalysis';
import scorecardData from '../../data/structured/AaronSulbaran_AppleWallet_ProductScorecard';
import roadmapData from '../../data/structured/AaronSulbaran_AppleWallet_RoadmapV2';

interface StructuredViewerProps {
  rendererComponent: StructuredRendererKey;
  dataSource: StructuredDataSourceKey;
  onClose: () => void;
}

// Dispatcher: given a renderer key + data key, mount the matching renderer
// inside ViewerShell (the same shell used by DocumentViewer / PdfViewer /
// ImageViewer / VideoViewer, so the horizontal-push transition is identical).
export function StructuredViewer({
  rendererComponent,
  dataSource,
  onClose,
}: StructuredViewerProps) {
  return (
    <ViewerShell onClose={onClose}>
      <div className="sheet-scroll flex-1 overflow-y-auto w-full">
        {render(rendererComponent, dataSource)}
      </div>
    </ViewerShell>
  );
}

function render(
  rendererComponent: StructuredRendererKey,
  dataSource: StructuredDataSourceKey,
) {
  switch (rendererComponent) {
    case 'BusinessModelCanvas':
      if (dataSource === 'AaronSulbaran_AppleWallet_BusinessModelCanvas') {
        return <BusinessModelCanvasRenderer data={bmcData} />;
      }
      break;
    case 'ValuePropositionCanvas':
      if (dataSource === 'AaronSulbaran_AppleWallet_ValuePropositionCanvas') {
        return <ValuePropositionCanvasRenderer data={vpcData} />;
      }
      break;
    case 'VisionBoard':
      if (dataSource === 'AaronSulbaran_AppleWallet_VisionBoard') {
        return <VisionBoardRenderer data={visionData} />;
      }
      break;
    case 'OpportunitySolutionTree':
      if (dataSource === 'AaronSulbaran_AppleWallet_OpportunitySolutionTree') {
        return <OpportunitySolutionTreeRenderer data={ostData} />;
      }
      break;
    case 'KanoAnalysis':
      if (dataSource === 'AaronSulbaran_AppleWallet_KanoAnalysis') {
        return <KanoAnalysisRenderer data={kanoData} />;
      }
      break;
    case 'ProductScorecard':
      if (dataSource === 'AaronSulbaran_AppleWallet_ProductScorecard') {
        return <ProductScorecardRenderer data={scorecardData} />;
      }
      break;
    case 'RoadmapV2':
      if (dataSource === 'AaronSulbaran_AppleWallet_RoadmapV2') {
        return <RoadmapV2Renderer data={roadmapData} />;
      }
      break;
  }
  return (
    <div className="flex-1 flex items-center justify-center px-5 text-center">
      <p className="font-sf text-[15px] text-text-tertiary">
        Renderer not configured for {rendererComponent} / {dataSource}.
      </p>
    </div>
  );
}
