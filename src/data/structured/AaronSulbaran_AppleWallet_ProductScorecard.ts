import type { ProductScorecard } from './types';

const productScorecard: ProductScorecard = {
  metadata: {
    type: 'Product Scorecard',
    status: 'Final',
    readTime: '~4 min scan',
    author: 'Aaron Sulbaran',
    course: 'MKT 372T 21 Strategic Product Management',
    school: 'McCombs School of Business, UT Austin',
    term: 'Spring 2026',
    date: 'Spring 2026',
  },
  title: 'Apple Wallet Product Scorecard',
  businessGoals: {
    letter: 'G',
    title: 'Business Goals',
    subtitle: 'The desired business benefits the product should create; prioritized and measurable.',
    goals: [
      {
        number: 1,
        headline: 'Grow Services revenue via Apple Pay interchange.',
        body:
          'Increase global Apple Pay interchange revenue by 25% YoY through deeper credential adoption and tap volume.',
      },
      {
        number: 2,
        headline: 'Deepen iPhone ecosystem stickiness.',
        body:
          'Reduce iPhone-to-Android switching among multi-credential Wallet users by 30%, measured against the prior fiscal year.',
      },
      {
        number: 3,
        headline: 'Replace the physical wallet in daily life.',
        body:
          'Get 25% of power users to report no longer carrying a physical wallet daily within 12 months of the v2 launch.',
      },
    ],
  },
  categories: {
    financial: {
      letter: '$',
      title: 'Financial',
      subtitle: 'The relevant financial indicators driving Services-segment contribution.',
      metrics: [
        {
          name: 'Apple Pay interchange revenue',
          target: '+25% YoY',
          whatItIs:
            "Total revenue Apple earns from Apple Pay interchange fees on Wallet-initiated transactions globally. Tracks the dollar value Wallet contributes to the Services segment.",
          howWeCaptureIt:
            'Apple internal financial reporting, segmented by region and credential type. Reviewed monthly against the FY plan.',
        },
      ],
    },
    customer: {
      letter: 'C',
      title: 'Customer',
      subtitle: 'The customer-value indicator Wallet rallies the org around.',
      metrics: [
        {
          name: 'Weekly Active Credential Uses per User (WACU/U) - North Star',
          target: '12+ uses per user per week',
          whatItIs:
            'Average number of successful credential interactions (payments, ID, transit, keys, passes, health) completed per active Wallet user per week. Measures whether Wallet is delivering value at the point of need.',
          howWeCaptureIt:
            "Server-side telemetry from Apple Pay, NFC events, ID presentations, and pass usage; aggregated weekly per Apple ID and reviewed in the Wallet team's weekly business review.",
        },
      ],
    },
    productAndProcess: {
      letter: 'P',
      title: 'Product and Process',
      subtitle: 'Leading indicators of product health and adoption breadth.',
      metrics: [
        {
          name: 'Credential surfacing accuracy',
          target: '92% (from 72% baseline)',
          whatItIs:
            'Percentage of contextual auto-surface events on the lock screen that present the correct credential on the first attempt across all categories.',
          howWeCaptureIt:
            'Instrumentation on lock-screen surfacing events plus user dismiss/correction signals; reported in the Wallet engineering scorecard each sprint.',
        },
        {
          name: 'Full-suite credential adoption rate',
          target: '35% within 12 months (from 18%)',
          whatItIs:
            'Percentage of active iPhone users with three or more credential types in Wallet (e.g., payment, ID, transit). A leading indicator of WACU/U because more credentials means more daily moments of use.',
          howWeCaptureIt:
            'Wallet provisioning telemetry aggregated per Apple ID; tracked monthly and reviewed alongside roadmap milestones.',
        },
      ],
    },
    people: {
      letter: 'T',
      title: 'People',
      subtitle: 'Team and stakeholder health that underwrite future delivery.',
      metrics: [
        {
          name: 'Wallet team engineering retention + Partner NPS',
          target: '90% engineer retention; Partner NPS ≥ 50',
          whatItIs:
            'Annual retention of the Wallet engineering org as a check on team health, paired with Net Promoter Score from issuer, transit, and insurer partners as a check on cross-functional execution.',
          howWeCaptureIt:
            'Internal Apple HR system for retention; annual partner survey administered by the Wallet partnerships team. Reviewed quarterly by Wallet leadership.',
        },
      ],
    },
  },
  attribution:
    "Structure adapted from Roman Pichler's Balanced Product Scorecard. Metrics derived from the Apple Wallet PRD, North Star Metric, and RICE prioritization deliverables.",
};

export default productScorecard;
