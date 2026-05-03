import type { OpportunitySolutionTree } from './types';

const opportunitySolutionTree: OpportunitySolutionTree = {
  metadata: {
    type: 'Opportunity Solution Tree',
    status: 'Final',
    readTime: '~3 min scan',
    author: 'Aaron Sulbaran',
    course: 'MKT 372T Strategic Product Management',
    school: 'McCombs School of Business, UT Austin',
    term: 'Spring 2026',
    date: 'Spring 2026',
  },
  desiredOutcome: {
    title: 'Increase % of iPhone users who actively use the full suite of Apple Wallet features',
    subtitle: 'Payments, IDs, transit, keys, and passes',
  },
  opportunities: [
    {
      number: 1,
      title: "Users don't know what Wallet does beyond payments",
      description:
        'Gap between capability and awareness limits adoption of non-payment features',
      subOpportunities: [
        { id: '1a', text: 'Users add a card at setup, never return to explore' },
        { id: '1b', text: 'No guided experience connecting daily habits to features' },
      ],
    },
    {
      number: 2,
      title: 'Key credential categories remain unsupported',
      description: 'Missing credentials force users to carry physical wallets as backup',
      isFocus: true,
      subOpportunities: [
        { id: '2a', text: 'Health insurance and pharmacy credentials have no digital home', isFocus: true },
        { id: '2b', text: 'Workplace and campus badges are fragmented across apps', isFocus: true },
      ],
    },
    {
      number: 3,
      title: 'Merchant and infrastructure inconsistency',
      description: 'Failed taps erode confidence and prevent users from going fully digital',
      subOpportunities: [
        { id: '3a', text: "Users can't tell in advance which venues accept Wallet" },
        { id: '3b', text: 'Failed taps create lasting distrust in going fully digital' },
      ],
    },
    {
      number: 4,
      title: 'Wallet becomes disorganized at scale',
      description: '10+ credentials with no grouping or reliable contextual surfacing',
      subOpportunities: [
        { id: '4a', text: 'No user-controlled grouping or categorization system' },
        { id: '4b', text: 'Contextual auto-surfacing is inconsistent across types' },
      ],
    },
  ],
  solutions: {
    mappedToOpportunity: 2,
    items: [
      {
        letter: 'A',
        title: 'Health credential integration',
        description:
          'Partner with insurers and PBMs to support insurance cards, HSA/FSA credentials, and pharmacy IDs via NFC tap verification',
      },
      {
        letter: 'B',
        title: 'Universal campus / workplace badge',
        description:
          'Standardized credential framework for employers and universities, extending existing digital key infrastructure',
      },
      {
        letter: 'C',
        title: 'Credential import scanner',
        description:
          'Photograph any physical card to create a scannable digital version, bridging the gap before formal partnerships',
      },
    ],
  },
  assumptionsToTest: [
    {
      category: 'DESIRABILITY',
      statement: 'Users trust Wallet with health data at the same level as payment cards',
    },
    {
      category: 'VIABILITY',
      statement:
        'Employers and universities adopt a standardized Apple framework over proprietary systems',
    },
    {
      category: 'FEASIBILITY',
      statement:
        'Scanned card images are accepted by enough providers to be useful pre-partnership',
    },
    {
      category: 'FEASIBILITY',
      statement: 'Providers have NFC infrastructure to accept digital insurance credentials',
    },
    {
      category: 'DESIRABILITY',
      statement: 'Users who carry a work/campus badge would consolidate to Wallet if available',
    },
    {
      category: 'VALUE',
      statement: 'A card stored in Wallet is meaningfully better than a photo in the camera roll',
    },
    {
      category: 'IMPACT',
      statement: 'Health credentials measurably reduce users who still carry a physical wallet',
    },
  ],
};

export default opportunitySolutionTree;
