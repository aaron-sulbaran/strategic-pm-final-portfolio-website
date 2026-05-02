export type AssetType = 'pdf' | 'image' | 'video' | 'iframe' | 'external';

export type Category =
  | 'Discovery'
  | 'Definition'
  | 'Prioritization'
  | 'Delivery'
  | 'Outcomes'
  | 'Guestbook';

export interface PassAsset {
  type: AssetType;
  src: string;
  alt?: string;
  height?: string;
  pending?: boolean;
}

export interface CardStyle {
  background: string;
  textColor: 'white' | 'black';
}

export interface Pass {
  id: string;
  number: number;
  title: string;
  shortLabel: string;
  category: Category;
  caption: string;
  reflection: string;
  cardStyle: CardStyle;
  asset: PassAsset;
  extras?: Pass[];
  isExtra?: boolean;
  extraCaption?: string;
  isVisitorPass?: boolean;
}

export const passes: Pass[] = [
  {
    id: 'business-model-canvas',
    number: 1,
    title: 'Business Model Canvas',
    shortLabel: 'BMC',
    category: 'Discovery',
    caption:
      'Nine-block strategic snapshot of how Apple Wallet creates and captures value across its multi-sided ecosystem.',
    reflection: '[REFLECTION TBD]',
    cardStyle: {
      background: 'linear-gradient(135deg, #0A1F44 0%, #1E3A6E 100%)',
      textColor: 'white',
    },
    asset: {
      type: 'pdf',
      src: '/assets/pdfs/AaronSulbaran_AppleWallet_BusinessModelCanvas.pdf',
    },
  },
  {
    id: 'value-proposition-canvas',
    number: 2,
    title: 'Value Proposition Canvas',
    shortLabel: 'VPC',
    category: 'Discovery',
    caption:
      'Customer profile and value map for the Apple Wallet user, mapping pains and gains to product features.',
    reflection: '[REFLECTION TBD]',
    cardStyle: {
      background: 'linear-gradient(135deg, #0F4C3A 0%, #1F8A6F 100%)',
      textColor: 'white',
    },
    asset: {
      type: 'pdf',
      src: '/assets/pdfs/AaronSulbaran_AppleWallet_ValuePropositionCanvas.pdf',
    },
  },
  {
    id: 'product-vision-board',
    number: 3,
    title: 'Product Vision Board',
    shortLabel: 'Vision Board',
    category: 'Definition',
    caption:
      'Future-state framing for Apple Wallet, captured through the customer letter format (Option 1 of the original assignment).',
    reflection: '[REFLECTION TBD]',
    cardStyle: {
      background:
        'linear-gradient(135deg, #FF6E7F 0%, #BFE9FF 25%, #C5A3FF 50%, #FFD580 75%, #B5F5EC 100%)',
      textColor: 'black',
    },
    asset: {
      type: 'pdf',
      src: '/assets/pdfs/AaronSulbaran_AppleWallet_CustomerLetter.pdf',
    },
    extras: [
      {
        id: 'product-vision-board-extra',
        number: 3,
        title: 'Standalone Vision Board',
        shortLabel: 'Vision Board',
        category: 'Definition',
        caption: 'Vision Board completed as Option 2 of the assignment, included as bonus.',
        reflection: '[REFLECTION TBD]',
        cardStyle: {
          background:
            'linear-gradient(135deg, #FF6E7F 0%, #BFE9FF 25%, #C5A3FF 50%, #FFD580 75%, #B5F5EC 100%)',
          textColor: 'black',
        },
        asset: {
          type: 'pdf',
          src: '/assets/pdfs/AaronSulbaran_AppleWallet_VisionBoard.pdf',
          pending: true,
        },
        isExtra: true,
        extraCaption:
          'Additional work submitted as part of the final portfolio for bonus credit.',
      },
    ],
  },
  {
    id: 'opportunity-solution-tree',
    number: 4,
    title: 'Opportunity Solution Tree',
    shortLabel: 'OST',
    category: 'Definition',
    caption:
      'Outcome-driven tree connecting the chosen North Star Metric to opportunities, solutions, and experiments.',
    reflection: '[REFLECTION TBD]',
    cardStyle: {
      background: 'linear-gradient(135deg, #3A1F6E 0%, #5B3FA0 100%)',
      textColor: 'white',
    },
    asset: {
      type: 'image',
      src: '/assets/images/AaronSulbaran_AppleWallet_OST_.png',
      alt: 'Opportunity Solution Tree for Apple Wallet',
    },
  },
  {
    id: 'customer-letter',
    number: 5,
    title: 'Customer Letter',
    shortLabel: 'Customer Letter',
    category: 'Definition',
    caption:
      'A working-backwards customer letter capturing the future-state Apple Wallet experience from a single user perspective.',
    reflection: '[REFLECTION TBD]',
    cardStyle: {
      background: 'linear-gradient(135deg, #F4ECD8 0%, #E2D2B0 100%)',
      textColor: 'black',
    },
    asset: {
      type: 'pdf',
      src: '/assets/pdfs/AaronSulbaran_AppleWallet_CustomerLetter.pdf',
    },
  },
  {
    id: 'job-stories',
    number: 6,
    title: 'JTBD Stories',
    shortLabel: 'Job Stories',
    category: 'Definition',
    caption:
      'Jobs-to-be-Done stories for the core Apple Wallet personas, framed as situation, motivation, expected outcome.',
    reflection: '[REFLECTION TBD]',
    cardStyle: {
      background: 'linear-gradient(135deg, #4A4E54 0%, #6E7378 100%)',
      textColor: 'white',
    },
    asset: {
      type: 'pdf',
      src: '/assets/pdfs/AaronSulbaran_AppleWallet_JobStories.pdf',
    },
  },
  {
    id: 'prd',
    number: 7,
    title: 'PRD',
    shortLabel: 'PRD',
    category: 'Delivery',
    caption:
      'Product requirements document for the chosen Apple Wallet feature, including goals, scope, and success metrics.',
    reflection: '[REFLECTION TBD]',
    cardStyle: {
      background: 'linear-gradient(135deg, #0A0A0A 0%, #1F1F1F 100%)',
      textColor: 'white',
    },
    asset: {
      type: 'pdf',
      src: '/assets/pdfs/AaronSulbaran_AppleWallet_PRD.pdf',
    },
  },
  {
    id: 'kano-analysis',
    number: 8,
    title: 'Kano Analysis',
    shortLabel: 'Kano',
    category: 'Prioritization',
    caption:
      'Kano model categorizing proposed Apple Wallet features as basic, performance, or delight to inform prioritization.',
    reflection: '[REFLECTION TBD]',
    cardStyle: {
      background: 'linear-gradient(135deg, #FF7E5F 0%, #FEB47B 100%)',
      textColor: 'black',
    },
    asset: {
      type: 'pdf',
      src: '/assets/pdfs/AaronSulbaran_AppleWallet_KanoAnalysis.pdf',
      pending: true,
    },
    extras: [
      {
        id: 'kano-analysis-extra',
        number: 8,
        title: 'RICE Prioritization',
        shortLabel: 'RICE',
        category: 'Prioritization',
        caption:
          'A second prioritization pass using the RICE scoring model, paired with the Kano analysis for triangulation.',
        reflection: '[REFLECTION TBD]',
        cardStyle: {
          background: 'linear-gradient(135deg, #6B0F1A 0%, #B22A2F 100%)',
          textColor: 'white',
        },
        asset: {
          type: 'pdf',
          src: '/assets/pdfs/AaronSulbaran_AppleWallet_RICE.pdf',
          pending: true,
        },
        isExtra: true,
        extraCaption:
          'Additional work submitted as part of the final portfolio for bonus credit.',
      },
    ],
  },
  {
    id: 'rice-prioritization',
    number: 9,
    title: 'RICE Prioritization',
    shortLabel: 'RICE',
    category: 'Prioritization',
    caption:
      'RICE scoring (Reach, Impact, Confidence, Effort) applied to the candidate Apple Wallet feature backlog.',
    reflection: '[REFLECTION TBD]',
    cardStyle: {
      background: 'linear-gradient(135deg, #6B0F1A 0%, #B22A2F 100%)',
      textColor: 'white',
    },
    asset: {
      type: 'pdf',
      src: '/assets/pdfs/AaronSulbaran_AppleWallet_RICE.pdf',
      pending: true,
    },
  },
  {
    id: 'roadmap',
    number: 10,
    title: 'Roadmap',
    shortLabel: 'Roadmap',
    category: 'Delivery',
    caption:
      'Outcome-aligned roadmap sequencing the prioritized Apple Wallet bets across the next four quarters.',
    reflection: '[REFLECTION TBD]',
    cardStyle: {
      background: 'linear-gradient(135deg, #4DA8DA 0%, #7FCBE8 100%)',
      textColor: 'white',
    },
    asset: {
      type: 'image',
      src: '/assets/images/AaronSulbaran_AppleWallet_ProductboardRoadmap.png',
      alt: 'Productboard roadmap export for Apple Wallet',
    },
    extras: [
      {
        id: 'roadmap-extra',
        number: 10,
        title: 'Productboard Roadmap View',
        shortLabel: 'Roadmap',
        category: 'Delivery',
        caption:
          'A second view of the roadmap exported directly from Productboard for traceability.',
        reflection: '[REFLECTION TBD]',
        cardStyle: {
          background: 'linear-gradient(135deg, #4DA8DA 0%, #7FCBE8 100%)',
          textColor: 'white',
        },
        asset: {
          type: 'image',
          src: '/assets/images/AaronSulbaran_AppleWallet_ProductboardRoadmap.png',
          alt: 'Productboard roadmap second view',
        },
        isExtra: true,
        extraCaption:
          'Additional work submitted as part of the final portfolio for bonus credit.',
      },
    ],
  },
  {
    id: 'prototype',
    number: 11,
    title: 'Prototype',
    shortLabel: 'Prototype',
    category: 'Delivery',
    caption:
      'Interactive prototype of the proposed Apple Wallet health insurance pass flow, captured as a walkthrough.',
    reflection: '[REFLECTION TBD]',
    cardStyle: {
      background:
        'radial-gradient(circle at 25% 25%, rgba(159, 122, 234, 0.45) 0px, transparent 1px) 0 0 / 8px 8px, radial-gradient(circle at 75% 75%, rgba(159, 122, 234, 0.30) 0px, transparent 1px) 4px 4px / 8px 8px, #0A0A0A',
      textColor: 'white',
    },
    asset: {
      type: 'video',
      src: '/assets/extras/AaronSulbaran_AppleWallet_HealthInsurancePrototype.mp4',
    },
  },
  {
    id: 'amazon-memo',
    number: 12,
    title: 'Amazon Memo',
    shortLabel: 'Amazon Memo',
    category: 'Outcomes',
    caption:
      'Amazon-style six-pager narrating the proposed Apple Wallet bet, written as if presented at a senior leadership review.',
    reflection: '[REFLECTION TBD]',
    cardStyle: {
      background: 'linear-gradient(135deg, #E2A93A 0%, #F4D06F 100%)',
      textColor: 'black',
    },
    asset: {
      type: 'pdf',
      src: '/assets/pdfs/AaronSulbaran_AppleWallet_AmazonMemo.pdf',
      pending: true,
    },
  },
];

export const visitorPass: Pass = {
  id: 'visitors',
  number: 13,
  title: 'Visitors',
  shortLabel: 'Visitors',
  category: 'Guestbook',
  caption: 'People who have viewed this portfolio.',
  reflection: '',
  cardStyle: {
    background: '#FAFAFA',
    textColor: 'black',
  },
  asset: {
    type: 'external',
    src: '',
  },
  isVisitorPass: true,
};

export const allPasses: Pass[] = [...passes, visitorPass];

export function findPassById(id: string): Pass | undefined {
  for (const pass of allPasses) {
    if (pass.id === id) return pass;
    if (pass.extras) {
      const extra = pass.extras.find((e) => e.id === id);
      if (extra) return extra;
    }
  }
  return undefined;
}

export function findParentOfExtra(extraId: string): Pass | undefined {
  return passes.find((p) => p.extras?.some((e) => e.id === extraId));
}
