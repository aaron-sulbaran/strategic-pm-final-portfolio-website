import type { VisionBoard } from './types';

const visionBoard: VisionBoard = {
  metadata: {
    type: 'Product Vision Board',
    status: 'Final',
    readTime: '~3 min scan',
    author: 'Aaron Sulbaran',
    course: 'MKT 372T Strategic Product Management',
    school: 'McCombs School of Business, UT Austin',
    term: 'Spring 2026',
    date: 'Spring 2026',
  },
  vision: {
    prompt: 'What is your purpose for creating the product? Which positive change should it bring about?',
    statement:
      'Eliminate the need for a physical wallet by becoming the trusted credential and identity layer of the Apple ecosystem.',
  },
  sections: {
    targetGroup: {
      iconSymbol: 'person.3',
      title: 'Target Group',
      prompt:
        'Which market or market segment does the product address? Who are the target customers and users?',
      subsections: [
        {
          heading: 'Primary: iPhone and Apple Watch users',
          body:
            'Modern professionals like Marcus Reeves, a 27-year-old NYC consultant who already uses Wallet for payments, transit, and IDs and wants every credential in his pocket to live in one place.',
        },
        {
          heading: 'Secondary: Issuing partners',
          body:
            'Banks, health insurers, PBMs, employers, universities, and transit authorities who provision credentials into Wallet.',
        },
        {
          heading: 'Tertiary: Acceptance side',
          body:
            'Merchants, healthcare providers, and venues that accept Wallet credentials at the point of service.',
        },
      ],
    },
    needs: {
      iconSymbol: 'exclamationmark.bubble',
      title: 'Needs',
      prompt: 'What problem does the product solve? Which benefit does it provide?',
      subsections: [
        {
          heading: 'Problems solved',
          body:
            'Users still carry a physical wallet because key credentials (health insurance, workplace badges, campus IDs) have no digital home. Wallet becomes disorganized at scale once users hold 10+ credentials. Failed taps and unclear merchant acceptance erode trust in going fully digital. Most users never explore Wallet beyond adding a payment card.',
        },
        {
          heading: 'Benefits delivered',
          body:
            'One trusted place for every credential, surfaced contextually and verified securely with Face ID.',
        },
      ],
    },
    product: {
      iconSymbol: 'cube.box',
      title: 'Product',
      prompt: 'What product is it? What makes it stand out? Is it feasible to develop the product?',
      subsections: [
        {
          heading: 'What it is',
          body:
            'Apple Wallet, a native iOS app that holds payment cards, transit, IDs, keys, passes, and an expanded set of credentials including health insurance, workplace badges, and campus IDs.',
        },
        {
          heading: 'What makes it stand out',
          body:
            'Pre-installed on every iPhone, secured by the Secure Element and Face ID, and contextually surfaced on the lock screen. Switching costs no software-only competitor can replicate.',
        },
        {
          heading: 'Feasibility',
          body:
            'Builds on existing PassKit, NFC, and Secure Element infrastructure. Health and workplace credentials extend the same digital key framework already shipping today.',
        },
      ],
    },
    businessGoals: {
      iconSymbol: 'chart.line.uptrend.xyaxis',
      title: 'Business Goals',
      prompt: 'How is the product going to benefit the company? What are the business goals?',
      subsections: [
        {
          heading: 'Increase active feature adoption',
          body:
            'Grow the percentage of iPhone users who actively use the full Wallet suite (payments, IDs, transit, keys, passes, and new credential types) beyond payments alone.',
        },
        {
          heading: 'Deepen ecosystem lock-in',
          body:
            'Every new credential category raises switching costs and reinforces iPhone as the daily access device.',
        },
        {
          heading: 'Expand the partner network',
          body:
            'Onboard 3 to 5 large insurers and 10+ enterprise employers as launch partners for new credential categories.',
        },
        {
          heading: 'Grow platform revenue',
          body:
            'Drive interchange fees, Apple Card and Apple Pay Later usage, and partnership revenue across new verticals.',
        },
      ],
    },
  },
  attribution: 'Framework adapted from Roman Pichler. Source: https://www.youtube.com/watch?v=rtbWVxYEgNA',
};

export default visionBoard;
