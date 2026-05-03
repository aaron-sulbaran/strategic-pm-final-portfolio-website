import type { BusinessModelCanvas } from './types';

const businessModelCanvas: BusinessModelCanvas = {
  metadata: {
    type: 'Business Model Canvas',
    status: 'Final',
    readTime: '~3 min scan',
    author: 'Aaron Sulbaran',
    course: 'MKT 372T Strategic Product Management',
    school: 'McCombs School of Business, UT Austin',
    term: 'Spring 2026',
    date: 'February 4, 2026',
    iteration: '1',
  },
  designedFor: 'Apple Wallet',
  designedBy: 'Aaron Sulbaran',
  blocks: {
    keyPartners: {
      iconSymbol: 'link',
      title: 'Key Partners',
      items: [
        'Payment networks like Visa, MasterCard, Discover, and Amex',
        'Banks and other financial institutions',
        'Point-of-sale providers or type-to-pay providers',
        'Data and security regulators or data protection agencies',
        'Hardware and Fabrication Partners for actual Tap-to-Pay functionality and RFID blocking',
      ],
    },
    keyActivities: {
      iconSymbol: 'gearshape',
      title: 'Key Activities',
      items: [
        'Maintaining wallet app security and features through software',
        'Maintaining the security promise through cybersecurity measures',
        'Negotiating partnerships',
        'Meaning data privacy and financial compliance',
      ],
    },
    keyResources: {
      iconSymbol: 'cube.box',
      title: 'Key Resources',
      items: [
        'Hardware that supports Apple Wallet and security features',
        'iOS Operating System support',
        'Brand Trust and loyalty',
        'Existing Data and Intellectual property',
      ],
    },
    valuePropositions: {
      iconSymbol: 'gift',
      title: 'Value Propositions',
      items: [
        'For Users, the security (FaceID) and transaction privacy of any "tap-to-pay" interaction',
        'For Issuers and Banks, fraud reduction as well as higher-frequency card usage',
        'For Merchants, more payment channels typically lead to more purchase volume and more customers',
        'For Public Entities, reduced infrastructure, logistic support (issuing cards), and faster transit',
        'Easier communication between all users involved',
      ],
    },
    customerRelationships: {
      iconSymbol: 'heart',
      title: 'Customer Relationships',
      items: [
        'Ease of use and self-service',
        'High switching costs for a power user',
        'B2B support for major issuers and government, public entities',
      ],
    },
    channels: {
      iconSymbol: 'paperplane',
      title: 'Channels',
      items: [
        'Apple Wallet is a native app and is preinstalled into every device that supports it',
        'Part of iOS setup requires the user to interact with Apple Wallet',
        'Apps that offer "Add to Apple Wallet"',
        '"We accept Apple Pay" decals',
      ],
    },
    customerSegments: {
      iconSymbol: 'person.3',
      title: 'Customer Segments',
      items: [
        'iPhone and Apple Watch users; Apple Wallet is not on other Apple OS systems',
        'Issuing Banks and Issuers in general',
        'Merchants, E-Retailers, etc.',
        'Public Entities like government-issued IDs and Public Transportation orgs',
      ],
    },
    costStructure: {
      iconSymbol: 'arrow.down.right.circle',
      title: 'Cost Structure',
      items: [
        'Engineering and research and development will be highest expense drivers',
        'Cloud infrastructure to maintain iCloud syncing and backend support',
        'Legalities (legal fees) for financial compliance and antitrust',
        'Maintaining brand trust through marketing and content partnerships',
      ],
    },
    revenueStreams: {
      iconSymbol: 'arrow.up.right.circle',
      title: 'Revenue Streams',
      items: [
        'A 0.15% interchange fee paid by issuers',
        'Fees or other interest from Apple Pay Later and the Apple Card features integrated into Apple Wallet',
        'Possible multiple product purchases from a user who sees the value in Apple Wallet alongside other iOS features',
        'Partnerships and integration fees for future providers on Apple Wallet',
      ],
    },
  },
};

export default businessModelCanvas;
