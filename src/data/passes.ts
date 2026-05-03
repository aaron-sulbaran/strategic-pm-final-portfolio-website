export type DocumentType =
  | 'markdown'
  | 'pdf'
  | 'image'
  | 'iframe'
  | 'external'
  | 'video'
  | 'structured';

export type Category =
  | 'Discovery'
  | 'Definition'
  | 'Prioritization'
  | 'Delivery'
  | 'Outcomes'
  | 'Guestbook';

// Renderer keys for the seven custom artifact renderers.
// PassDetail.tsx maps these strings to actual React components.
export type StructuredRendererKey =
  | 'BusinessModelCanvas'
  | 'ValuePropositionCanvas'
  | 'VisionBoard'
  | 'OpportunitySolutionTree'
  | 'KanoAnalysis'
  | 'ProductScorecard'
  | 'RoadmapV2';

export type StructuredDataSourceKey =
  | 'AaronSulbaran_AppleWallet_BusinessModelCanvas'
  | 'AaronSulbaran_AppleWallet_ValuePropositionCanvas'
  | 'AaronSulbaran_AppleWallet_VisionBoard'
  | 'AaronSulbaran_AppleWallet_OpportunitySolutionTree'
  | 'AaronSulbaran_AppleWallet_KanoAnalysis'
  | 'AaronSulbaran_AppleWallet_ProductScorecard'
  | 'AaronSulbaran_AppleWallet_RoadmapV2';

export interface PassDocument {
  title: string;
  subtitle?: string;
  type: DocumentType;
  /** Required for markdown, pdf, image, iframe, external, video. */
  src?: string;
  /** Required for type === 'structured'. */
  rendererComponent?: StructuredRendererKey;
  /** Required for type === 'structured'. */
  dataSource?: StructuredDataSourceKey;
  isExtra?: boolean;
  iconSymbol?: string;
}

export interface CardStyle {
  background: string;
  textColor: 'white' | 'black';
  /** Soft tint used as the icon background on document rows. */
  tint?: string;
  /** Foreground color for the row icon glyph. */
  tintFg?: string;
}

export interface Pass {
  id: string;
  number: number;
  title: string;
  shortLabel: string;
  category: Category;
  caption: string;
  reflection?: string;
  cardStyle: CardStyle;
  documents: PassDocument[];
  isVisitorPass?: boolean;
}

export const PORTFOLIO_TOTAL = 13;

export const passes: Pass[] = [
  {
    id: 'business-model-canvas',
    number: 1,
    title: 'Business Model Canvas',
    shortLabel: 'Business Model Canvas',
    category: 'Discovery',
    caption:
      'Nine-block strategic snapshot of how Apple Wallet creates and captures value across its multi-sided ecosystem.',
    cardStyle: {
      background: 'linear-gradient(135deg, #0A1F44 0%, #1E3A6E 100%)',
      textColor: 'white',
      tint: 'rgba(30, 58, 110, 0.10)',
      tintFg: '#1E3A6E',
    },
    documents: [
      {
        title: 'Business Model Canvas',
        type: 'structured',
        rendererComponent: 'BusinessModelCanvas',
        dataSource: 'AaronSulbaran_AppleWallet_BusinessModelCanvas',
      },
    ],
  },
  {
    id: 'value-proposition-canvas',
    number: 2,
    title: 'Value Proposition Canvas',
    shortLabel: 'Value Proposition Canvas',
    category: 'Discovery',
    caption:
      'Customer profile and value map for the Apple Wallet user, mapping pains and gains to product features.',
    cardStyle: {
      background: 'linear-gradient(135deg, #0F4C3A 0%, #1F8A6F 100%)',
      textColor: 'white',
      tint: 'rgba(31, 138, 111, 0.10)',
      tintFg: '#0F4C3A',
    },
    documents: [
      {
        title: 'Value Proposition Canvas',
        type: 'structured',
        rendererComponent: 'ValuePropositionCanvas',
        dataSource: 'AaronSulbaran_AppleWallet_ValuePropositionCanvas',
      },
    ],
  },
  {
    id: 'product-vision-board',
    number: 3,
    title: 'Product Vision Board',
    shortLabel: 'Vision Board',
    category: 'Discovery',
    caption:
      'Future-state framing for Apple Wallet, captured as a Pichler vision board.',
    cardStyle: {
      background:
        'linear-gradient(135deg, #FF6E7F 0%, #BFE9FF 25%, #C5A3FF 50%, #FFD580 75%, #B5F5EC 100%)',
      textColor: 'black',
      tint: 'rgba(197, 163, 255, 0.18)',
      tintFg: '#5B3FA0',
    },
    documents: [
      {
        title: 'Product Vision Board',
        type: 'structured',
        rendererComponent: 'VisionBoard',
        dataSource: 'AaronSulbaran_AppleWallet_VisionBoard',
      },
    ],
  },
  {
    id: 'opportunity-solution-tree',
    number: 4,
    title: 'Opportunity Solution Tree',
    shortLabel: 'Opportunity Solution Tree',
    category: 'Discovery',
    caption:
      'Outcome-driven tree connecting the chosen North Star Metric to opportunities, solutions, and experiments.',
    cardStyle: {
      background: 'linear-gradient(135deg, #3A1F6E 0%, #5B3FA0 100%)',
      textColor: 'white',
      tint: 'rgba(91, 63, 160, 0.12)',
      tintFg: '#3A1F6E',
    },
    documents: [
      {
        title: 'Opportunity Solution Tree',
        type: 'structured',
        rendererComponent: 'OpportunitySolutionTree',
        dataSource: 'AaronSulbaran_AppleWallet_OpportunitySolutionTree',
      },
    ],
  },
  {
    id: 'customer-letter',
    number: 5,
    title: 'Customer Letter',
    shortLabel: 'Customer Letter',
    category: 'Discovery',
    caption:
      'A working-backwards customer letter capturing the future-state Apple Wallet experience, paired with an internal response.',
    cardStyle: {
      background: 'linear-gradient(135deg, #F4ECD8 0%, #E2D2B0 100%)',
      textColor: 'black',
      tint: 'rgba(165, 130, 75, 0.14)',
      tintFg: '#7A5A2E',
    },
    documents: [
      {
        title: 'Customer Letter',
        subtitle: 'From: Marcus Reeves',
        type: 'markdown',
        src: '/assets/markdown/AaronSulbaran_AppleWallet_CustomerLetter.md',
      },
      {
        title: 'Internal Note',
        subtitle: 'From: Greg Joswiak',
        type: 'markdown',
        src: '/assets/markdown/AaronSulbaran_AppleWallet_InternalNote.md',
        isExtra: true,
      },
    ],
  },
  {
    id: 'job-stories',
    number: 6,
    title: 'JTBD Stories',
    shortLabel: 'Job Stories',
    category: 'Definition',
    caption:
      'Jobs-to-be-Done stories for the core Apple Wallet personas, framed as situation, motivation, expected outcome.',
    cardStyle: {
      background: 'linear-gradient(135deg, #4A4E54 0%, #6E7378 100%)',
      textColor: 'white',
      tint: 'rgba(74, 78, 84, 0.10)',
      tintFg: '#3A3D42',
    },
    documents: [
      {
        title: 'Job Stories',
        type: 'markdown',
        src: '/assets/markdown/AaronSulbaran_AppleWallet_JobStories.md',
      },
    ],
  },
  {
    id: 'prd',
    number: 7,
    title: 'Product Requirements Document',
    shortLabel: 'Product Requirements Document',
    category: 'Definition',
    caption:
      'Product requirements document for the chosen Apple Wallet feature, including goals, scope, and success metrics.',
    cardStyle: {
      background: 'linear-gradient(135deg, #0A0A0A 0%, #1F1F1F 100%)',
      textColor: 'white',
      tint: 'rgba(0, 0, 0, 0.06)',
      tintFg: '#1F1F1F',
    },
    documents: [
      {
        title: 'Product Requirements Document',
        type: 'markdown',
        src: '/assets/markdown/AaronSulbaran_AppleWallet_PRD.md',
      },
    ],
  },
  {
    id: 'analysis',
    number: 8,
    title: 'Analysis',
    shortLabel: 'Analysis',
    category: 'Prioritization',
    caption:
      'Two prioritization lenses applied to the Apple Wallet backlog: RICE for business leverage, Kano for user satisfaction.',
    cardStyle: {
      background: 'linear-gradient(135deg, #6B0F1A 0%, #B22A2F 100%)',
      textColor: 'white',
      tint: 'rgba(178, 42, 47, 0.10)',
      tintFg: '#6B0F1A',
    },
    documents: [
      {
        title: 'RICE Prioritization',
        type: 'markdown',
        src: '/assets/markdown/AaronSulbaran_AppleWallet_RICE.md',
      },
      {
        title: 'Kano Analysis',
        subtitle: 'Companion satisfaction lens',
        type: 'structured',
        rendererComponent: 'KanoAnalysis',
        dataSource: 'AaronSulbaran_AppleWallet_KanoAnalysis',
      },
      {
        title: 'Initial Requirements',
        subtitle: 'Effort estimation rationale',
        type: 'markdown',
        src: '/assets/markdown/AaronSulbaran_AppleWallet_InitialRequirements.md',
        isExtra: true,
      },
    ],
  },
  {
    id: 'roadmap',
    number: 9,
    title: 'Roadmap',
    shortLabel: 'Roadmap',
    category: 'Delivery',
    caption:
      'Theme-based, outcome-anchored roadmap sequencing the prioritized Apple Wallet bets across three horizons.',
    cardStyle: {
      background: 'linear-gradient(135deg, #4DA8DA 0%, #7FCBE8 100%)',
      textColor: 'white',
      tint: 'rgba(77, 168, 218, 0.14)',
      tintFg: '#2A6E92',
    },
    documents: [
      {
        title: 'Strategic Roadmap',
        type: 'structured',
        rendererComponent: 'RoadmapV2',
        dataSource: 'AaronSulbaran_AppleWallet_RoadmapV2',
      },
      {
        title: 'Productboard Roadmap',
        subtitle: 'Original Roadmap Assignment',
        type: 'image',
        src: '/assets/images/AaronSulbaran_AppleWallet_ProductboardRoadmap.png',
        isExtra: true,
      },
    ],
  },
  {
    id: 'prototype',
    number: 10,
    title: 'Prototype',
    shortLabel: 'Prototype',
    category: 'Delivery',
    caption:
      'Interactive prototype of the proposed Apple Wallet health insurance pass flow.',
    cardStyle: {
      background:
        'radial-gradient(circle at 25% 25%, rgba(159, 122, 234, 0.45) 0px, transparent 1px) 0 0 / 8px 8px, radial-gradient(circle at 75% 75%, rgba(159, 122, 234, 0.30) 0px, transparent 1px) 4px 4px / 8px 8px, #0A0A0A',
      textColor: 'white',
      tint: 'rgba(159, 122, 234, 0.16)',
      tintFg: '#5B3FA0',
    },
    documents: [
      {
        title: 'Prototype Walkthrough',
        subtitle: 'Health insurance pass flow video',
        type: 'video',
        src: '/assets/extras/AaronSulbaran_AppleWallet_HealthInsurancePrototype.mp4',
      },
    ],
  },
  {
    id: 'product-scorecard',
    number: 11,
    title: 'Product Scorecard',
    shortLabel: 'Scorecard',
    category: 'Delivery',
    caption:
      'Balanced product scorecard with the Apple Wallet North Star, financial, customer, product, and team-health indicators.',
    cardStyle: {
      background: 'linear-gradient(135deg, #0F4C5C 0%, #1B6B7E 100%)',
      textColor: 'white',
      tint: 'rgba(27, 107, 126, 0.12)',
      tintFg: '#0F4C5C',
    },
    documents: [
      {
        title: 'Product Scorecard',
        type: 'structured',
        rendererComponent: 'ProductScorecard',
        dataSource: 'AaronSulbaran_AppleWallet_ProductScorecard',
      },
      {
        title: 'North Star Metric',
        subtitle: 'Detailed write-up',
        type: 'markdown',
        src: '/assets/markdown/AaronSulbaran_AppleWallet_NorthStarMetric.md',
        isExtra: true,
      },
    ],
  },
  {
    id: 'amazon-memo',
    number: 12,
    title: 'Amazon Memo',
    shortLabel: 'Amazon Memo',
    category: 'Outcomes',
    caption:
      'Amazon-style six-pager narrating the proposed Apple Wallet bet, written as if presented at a senior leadership review.',
    cardStyle: {
      background: 'linear-gradient(135deg, #E2A93A 0%, #F4D06F 100%)',
      textColor: 'black',
      tint: 'rgba(226, 169, 58, 0.16)',
      tintFg: '#8A6116',
    },
    documents: [
      {
        title: 'Amazon Memo',
        type: 'markdown',
        src: '/assets/markdown/AaronSulbaran_AppleWallet_AmazonMemo.md',
      },
    ],
  },
];

export const visitorPass: Pass = {
  id: 'visitors',
  number: 13,
  title: 'Visitors',
  shortLabel: 'Visitors',
  category: 'Guestbook',
  caption: 'People who have viewed this portfolio.',
  cardStyle: {
    background: '#FAFAFA',
    textColor: 'black',
  },
  documents: [],
  isVisitorPass: true,
};

export const allPasses: Pass[] = [...passes, visitorPass];

export function findPassById(id: string): Pass | undefined {
  return allPasses.find((p) => p.id === id);
}
