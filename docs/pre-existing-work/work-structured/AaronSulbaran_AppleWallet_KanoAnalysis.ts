import type { KanoAnalysis } from './types';

const kanoAnalysis: KanoAnalysis = {
  metadata: {
    type: 'Kano Analysis',
    status: 'Final',
    readTime: '~6 min read',
    author: 'Aaron Sulbaran',
    course: 'MKT 372T 21 Strategic Product Management',
    school: 'McCombs School of Business, UT Austin',
    term: 'Spring 2026',
    date: 'Spring 2026',
  },
  title: 'Kano Analysis',
  subtitle: 'Feature Prioritization for Apple Wallet',
  methodology: {
    intro: 'How each feature is categorized, and why both axes matter.',
    categories: [
      {
        label: 'Basic Need',
        secondaryLabel: 'Must-Be',
        description:
          'Expected as a minimum. Absence causes frustration; presence is invisible.',
      },
      {
        label: 'Performance',
        secondaryLabel: 'One-Dimensional',
        description: 'Satisfaction scales linearly with quality, breadth, or quantity invested.',
      },
      {
        label: 'Excitement',
        secondaryLabel: 'Attractive',
        description:
          'Unexpected delighters. Presence wins users; absence does not lose them.',
      },
      {
        label: 'Indifferent',
        secondaryLabel: '',
        description: 'Does not significantly move satisfaction in either direction.',
      },
      {
        label: 'Reverse',
        secondaryLabel: '',
        description: 'Some users actively dislike. Presence can reduce satisfaction.',
      },
    ],
    axes: {
      vertical:
        'Vertical (Satisfaction): How much a feature moves the user emotionally, from frustration at the bottom to delight at the top.',
      horizontal:
        'Horizontal (Implementation): How fully the feature is built and shipped, from absent on the left to fully realized on the right.',
      curves:
        'Three curves: Basic features bend toward the bottom right, Performance is a straight diagonal, Excitement bends toward the top.',
    },
  },
  features: [
    {
      number: 1,
      shortLabel: 'Health Insurance Integration',
      fullName: 'Health Insurance Credential Integration',
      category: 'Excitement',
      reasoning:
        "No iPhone user is currently dissatisfied that their insurance card lives in a physical wallet. When Wallet handles pharmacy check-in via NFC, it becomes a 'wow' moment that eliminates a top reason to carry a physical wallet at all.",
    },
    {
      number: 2,
      shortLabel: 'Workplace and Campus Badge',
      fullName: 'Universal Campus and Workplace Badge',
      category: 'Excitement',
      reasoning:
        'Replacing the corporate badge or student ID is a novel use of the iPhone. Users are not frustrated by its absence today, but tapping into the office with Face ID delivers a clear delight signal once partner adoption catches up.',
    },
    {
      number: 3,
      shortLabel: 'Credential Import Scanner',
      fullName: 'Credential Import Scanner',
      category: 'Performance',
      reasoning:
        'Users already expect to add cards to Wallet. Each additional supported format (gym, library, loyalty, regional transit) linearly expands utility, so satisfaction scales directly with the breadth and accuracy of the scanner.',
    },
    {
      number: 4,
      shortLabel: 'Wallet Organization and Grouping',
      fullName: 'Wallet Organization and Custom Grouping',
      category: 'Performance',
      reasoning:
        'As the number of credentials per user grows, friction grows with it. More flexibility (drag-to-group, custom labels, smart folders) produces incrementally more satisfaction. Quality of organization scales with quality of experience.',
    },
    {
      number: 5,
      shortLabel: 'Contextual Smart Surfacing',
      fullName: 'Contextual Smart Surfacing Improvements',
      category: 'Basic',
      reasoning:
        'Surfacing the right card at the right moment is the core promise of Wallet. When it works, no one notices. When it fails at the transit gate or checkout terminal, users are deeply frustrated and reach for a physical card. Classic must-be.',
    },
    {
      number: 6,
      shortLabel: 'Merchant Acceptance Indicator',
      fullName: 'Merchant Acceptance Indicator',
      category: 'Excitement',
      reasoning:
        'Users do not expect Wallet to tell them whether a merchant accepts Apple Pay before they walk in. The feature is a pleasant, low-stakes surprise. Its absence creates no real dissatisfaction since users already use trial and error.',
    },
    {
      number: 7,
      shortLabel: 'Offline Transaction Mode',
      fullName: 'Offline Transaction Mode',
      category: 'Basic',
      reasoning:
        'Express Transit users have come to expect their card to work in subway dead zones and parking garages. Failures here strand the user and erode trust in the entire product. When it works, no one celebrates. Reliability is invisible.',
    },
    {
      number: 8,
      shortLabel: 'Peer-to-Peer Identity',
      fullName: 'Peer-to-Peer Identity Verification',
      category: 'Excitement',
      reasoning:
        "Selectively sharing 'over 21' from one phone to another without revealing the date of birth is a novel privacy capability. No user is dissatisfied today by its absence. When it ships, it generates the strongest 'wow' of any feature in the roadmap.",
    },
    {
      number: 9,
      shortLabel: 'International Compatibility',
      fullName: 'International Wallet Compatibility',
      category: 'Performance',
      reasoning:
        'Country coverage scales linearly with traveler satisfaction. Each new tier-one market unlocks measurable value for affected users. Not a binary basic, since most users are domestic, but more breadth always means more satisfaction.',
    },
    {
      number: 10,
      shortLabel: 'Guided Wallet Setup',
      fullName: 'Guided Wallet Setup Experience',
      category: 'Indifferent',
      reasoning:
        'Most users skip onboarding flows. Power users do not need guidance, and casual users disengage before the value lands. The feature has clear business value (RICE rank #3) but does not meaningfully shift user satisfaction either way.',
    },
  ],
  categorizationCaption:
    'Each of the 10 prioritized features mapped to its Kano category, with reasoning grounded in user expectation.',
  chartCaption:
    'All 10 features mapped against satisfaction and implementation. Curves show the three Kano archetypes.',
  riceComparison: {
    intro: 'Two methods, two lenses. The interesting features sit where the methods disagree.',
    rows: [
      {
        riceRank: 1,
        feature: 'Merchant Acceptance Indicator',
        kanoCategory: 'Excitement',
        divergenceCommentary:
          'RICE-best because effort is tiny and reach is broad. Kano sees it as a delighter, not a must-have. Ship it as a quick win, not a foundation.',
      },
      {
        riceRank: 2,
        feature: 'Contextual Smart Surfacing',
        kanoCategory: 'Basic',
        divergenceCommentary:
          'Both methods agree this is high priority, but for different reasons. Kano confirms it is non-negotiable: failure here breaks user trust in the whole product.',
      },
      {
        riceRank: 3,
        feature: 'Guided Wallet Setup Experience',
        kanoCategory: 'Indifferent',
        divergenceCommentary:
          'The clearest divergence. RICE loves the leverage; Kano warns most users will not feel it. A reminder that business value and user satisfaction are not the same thing.',
      },
      {
        riceRank: 5,
        feature: 'Health Insurance Integration',
        kanoCategory: 'Excitement',
        divergenceCommentary:
          'RICE penalized this for high effort and partner risk. Kano elevates it as the strongest delighter in the roadmap. Long-horizon investment with category-defining payoff.',
      },
      {
        riceRank: 6,
        feature: 'Offline Transaction Mode',
        kanoCategory: 'Basic',
        divergenceCommentary:
          'Mid-pack on RICE, but Kano flags it as a Basic Need. This is the kind of feature that should be raised in priority because failure has outsized negative impact.',
      },
    ],
    closingLesson: {
      title: "The 'Down and Right' Lesson",
      body:
        "Features migrate over time. Today's Excitement becomes tomorrow's Performance, and eventually a Basic Need. Apple Pay tap-to-pay was a delighter in 2014; in 2026 it is a basic expectation. The roadmap should treat Excitement features as future Basics: invest now to set the next category-wide expectation, not just the next year's launch.",
    },
  },
};

export default kanoAnalysis;
