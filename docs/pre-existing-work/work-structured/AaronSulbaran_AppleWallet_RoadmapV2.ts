import React from 'react';
import type { RoadmapV2 } from './types';

const roadmapV2: RoadmapV2 = {
  metadata: {
    type: 'Strategic Roadmap',
    status: 'Final',
    readTime: '~5 min scan',
    author: 'Aaron Sulbaran',
    course: 'MKT 372T 21 Strategic Product Management',
    school: 'McCombs School of Business, UT Austin',
    term: 'Spring 2026',
    date: 'Spring 2026',
  },
  eyebrow: 'Apple Wallet · Strategic Roadmap v2',
  title: 'Replacing the Leather Wallet',
  description:
    'Theme-based rolling roadmap. Three strategic outcomes, ten features, three horizons. Aligned to the North Star Metric: Weekly Active Credential Uses per User.',
  vision:
    'Make Apple Wallet the default home for every credential a person carries, so the leather wallet becomes optional in everyday life.',
  northStarMetric: 'Weekly Active Credential Uses per User',
  horizons: [
    { id: 'now', title: 'NOW · Q3 2026', meta: 'Jul – Sep · In flight or next sprint' },
    { id: 'next', title: 'NEXT · Q4 2026', meta: 'Oct – Dec · Committed for the half' },
    { id: 'later', title: 'LATER · 2027', meta: 'H1 2027 · Directional, not committed' },
  ],
  themes: [
    {
      id: 'breadth',
      label: 'Theme 1',
      name: 'Breadth',
      accent: '#ff9500',
      pill: { bg: '#fff4e5', color: '#bf6900' },
      outcome: React.createElement(
        React.Fragment,
        null,
        'Get ',
        React.createElement('strong', null, 'more credentials in Wallet'),
        ' so users have more daily moments of use.'
      ),
      metric: React.createElement(
        React.Fragment,
        null,
        'Full-suite adoption (3+ types) ',
        React.createElement(
          'span',
          { style: { color: '#34c759', fontWeight: 700 } },
          '▲'
        ),
        ' 18% → 35%'
      ),
      features: {
        now: [
          {
            name: 'Guided Wallet Setup',
            size: 'S',
            driver: React.createElement(
              React.Fragment,
              null,
              React.createElement('strong', null, 'Acquisition multiplier.'),
              ' Connects daily habits to features at iPhone activation. RICE rank #3.'
            ),
          },
        ],
        next: [
          {
            name: 'Health Insurance Credentials',
            size: 'L',
            driver: React.createElement(
              React.Fragment,
              null,
              React.createElement('strong', null, 'Replaces a wallet category.'),
              ' NFC tap for insurance + pharmacy ID. Highest impact (3/3).'
            ),
          },
          {
            name: 'Credential Import Scanner',
            size: 'M',
            driver: React.createElement(
              React.Fragment,
              null,
              React.createElement('strong', null, 'Long-tail capture.'),
              ' Bridge for unsupported cards while formal partnerships develop.'
            ),
          },
        ],
        later: [
          {
            name: 'Campus & Workplace Badges',
            size: 'L',
            driver: React.createElement(
              React.Fragment,
              null,
              React.createElement('strong', null, '80M daily badgers.'),
              ' Gated by enterprise IT cycles, hence Later horizon.'
            ),
          },
          {
            name: 'International Compatibility',
            size: 'L',
            driver: React.createElement(
              React.Fragment,
              null,
              React.createElement('strong', null, 'Travel unlock.'),
              ' Country-by-country partner work; lowest confidence (55%).'
            ),
          },
        ],
      },
    },
    {
      id: 'reliability',
      label: 'Theme 2',
      name: 'Reliability',
      accent: '#007aff',
      pill: { bg: '#e3f2fd', color: '#0a4d8c' },
      outcome: React.createElement(
        React.Fragment,
        null,
        'Make ',
        React.createElement('strong', null, 'every tap succeed'),
        ' so users trust Wallet over the physical card.'
      ),
      metric: React.createElement(
        React.Fragment,
        null,
        'Surfacing accuracy ',
        React.createElement(
          'span',
          { style: { color: '#34c759', fontWeight: 700 } },
          '▲'
        ),
        ' 72% → 92%'
      ),
      features: {
        now: [
          {
            name: 'Contextual Smart Surfacing',
            size: 'M',
            driver: React.createElement(
              React.Fragment,
              null,
              React.createElement('strong', null, 'Highest reach (300M/mo).'),
              ' Foundation feature; if this fails, every other tap fails.'
            ),
          },
        ],
        next: [
          {
            name: 'Offline Transaction Mode',
            size: 'M',
            driver: React.createElement(
              React.Fragment,
              null,
              React.createElement('strong', null, 'Failure-mode killer.'),
              ' Subway and parking-garage taps without signal.'
            ),
          },
        ],
        later: [],
      },
    },
    {
      id: 'frequency',
      label: 'Theme 3',
      name: 'Frequency',
      accent: '#af52de',
      pill: { bg: '#f3e5f5', color: '#6a1b9a' },
      outcome: React.createElement(
        React.Fragment,
        null,
        'Drive ',
        React.createElement('strong', null, 'repeat use across daily life'),
        ' so Wallet becomes habituated, not occasional.'
      ),
      metric: React.createElement(
        React.Fragment,
        null,
        'Wallet abandonment ',
        React.createElement(
          'span',
          { style: { color: '#34c759', fontWeight: 700 } },
          '▲'
        ),
        ' 0% → 25% of power users'
      ),
      features: {
        now: [
          {
            name: 'Merchant Acceptance Indicator',
            size: 'S',
            driver: React.createElement(
              React.Fragment,
              null,
              React.createElement('strong', null, 'RICE #1.'),
              ' Removes "do they take Apple Pay?" hesitation. Cheap, high-frequency win.'
            ),
          },
        ],
        next: [
          {
            name: 'Wallet Org. & Custom Grouping',
            size: 'M',
            driver: React.createElement(
              React.Fragment,
              null,
              React.createElement('strong', null, 'Scale prep.'),
              ' As Theme 1 lands more credentials, users need to organize them.'
            ),
          },
        ],
        later: [
          {
            name: 'Peer-to-Peer Identity Verification',
            size: 'L',
            driver: React.createElement(
              React.Fragment,
              null,
              React.createElement('strong', null, 'Lowest confidence (50%).'),
              ' Discovery-track item; viability validated before commit.'
            ),
          },
        ],
      },
    },
  ],
  footerText: 'Outcome-anchored roadmap · Living document, refreshed quarterly',
  sizeLegend: {
    S: '1–3 sprints',
    M: '1 quarter',
    L: '2+ quarters',
  },
  sizeStyles: {
    S: { bg: '#e8f5e9', color: '#1b5e20' },
    M: { bg: '#fff3e0', color: '#bf6900' },
    L: { bg: '#ffebee', color: '#b71c1c' },
  },
};

export default roadmapV2;
