import type { ValuePropositionCanvas } from './types';

const valuePropositionCanvas: ValuePropositionCanvas = {
  metadata: {
    type: 'Value Proposition Canvas',
    status: 'Final',
    readTime: '~3 min scan',
    author: 'Aaron Sulbaran',
    course: 'MKT 372T Strategic Product Management',
    school: 'McCombs School of Business, UT Austin',
    term: 'Spring 2026',
    date: 'February 11, 2026',
    iteration: '1',
  },
  designedFor: 'Strategic PM',
  designedBy: 'Aaron Sulbaran',
  valueMap: {
    productsAndServices: {
      iconSymbol: 'cube.box',
      title: 'Products and Services',
      items: [
        'Apple Pay is the core NFC based payment system',
        '"ID Hub" or digital passes from temporary flights/tickets to personal/work IDs or transit cards',
        'Digital Keys being offered from more retailers for home, hotel, dorm, and car keys',
      ],
    },
    gainCreators: {
      iconSymbol: 'sparkles',
      title: 'Gain Creators',
      items: [
        "Integrates all aspects of a user's financial life in one place",
        'Creates financial opportunity in the form of a CC and HYSA (Apple Card) in an easy to use and sleek "apple-y" way',
        'Creates a universal access key beyond CC, also expanding on state/government IDs and other access features',
        'Easily integrates other hardware and software solutions to become more useful (i.e. location-based triggers, auto loading shipping info, etc.)',
      ],
    },
    painRelievers: {
      iconSymbol: 'shield',
      title: 'Pain Relievers',
      items: [
        'Ensures safety through hardware and cyber (software) solutions. Also established trust',
        '"AIO" solutions from general daily use to even theft and loss',
        'Removes friction through location-based triggers for automatic taps at public transit or auto paying with "top of wallet" card at NFC payment register',
      ],
    },
  },
  customerProfile: {
    customerJobs: {
      iconSymbol: 'person.crop.circle',
      title: 'Customer Jobs',
      items: [
        'Consolidated, all-in-one wallet',
        'Secure transactions from anywhere',
        'High level of personal data privacy',
        'Key to more infrastructure innovation',
        'Less physical bulk',
      ],
    },
    gains: {
      iconSymbol: 'star',
      title: 'Gains',
      items: [
        'Low Friction',
        'Instant use, payments, verification, etc.',
        'Seamless ecosystem (harmony)',
        'Wide support system',
        'Many partnerships and offerings',
      ],
    },
    pains: {
      iconSymbol: 'exclamationmark.triangle',
      title: 'Pains',
      items: [
        'Inconsistency with merchants or transit systems',
        'Apple Pay not being accepted (digital dead zones)',
        'Travel restrictions, international support',
        'Hardware dependency (devices dying)',
        'Security concerns/risks',
      ],
    },
  },
};

export default valuePropositionCanvas;
