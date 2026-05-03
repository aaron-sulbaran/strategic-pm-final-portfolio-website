// Shared design tokens for the seven structured artifact renderers
// (BMC, VPC, Vision Board, OST, Kano, Product Scorecard, Roadmap V2).
//
// These extend the CSS variables in globals.css with renderer-specific
// values that don't make sense to globalize. Every renderer pulls from
// this file so visual decisions stay in one place.

import type { CSSProperties } from 'react';

export const structuredTokens = {
  card: {
    background: 'var(--bg-card-white)',
    radius: 14,
    padding: 16,
    shadow:
      '0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.06)',
    border: '1px solid rgba(0, 0, 0, 0.04)',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: 'var(--text-tertiary)',
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
  } as CSSProperties,
  body: {
    fontSize: 14,
    fontWeight: 400,
    color: 'var(--text-primary)',
    lineHeight: 1.45,
  } as CSSProperties,
  bulletItem: {
    fontSize: 13,
    fontWeight: 400,
    color: 'var(--text-primary)',
    lineHeight: 1.4,
    paddingLeft: 14,
    position: 'relative',
    marginBottom: 6,
  } as CSSProperties,
  blockIcon: {
    size: 16,
    color: 'var(--text-tertiary)',
  },
  artifactTitle: {
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: '-0.4px',
    color: 'var(--text-primary)',
    lineHeight: 1.15,
  } as CSSProperties,
  artifactSubtitle: {
    fontSize: 16,
    fontWeight: 400,
    color: 'var(--text-tertiary)',
    lineHeight: 1.4,
  } as CSSProperties,
  metadataBar: {
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--text-tertiary)',
    letterSpacing: '0.2px',
    separator: ' · ',
  },
  // Muted category tints used across OST + Kano. Same saturation level
  // so cross-renderer visual cohesion holds.
  categoryTints: {
    DESIRABILITY: { bg: '#EFE7FA', fg: '#5B3FA0' }, // muted purple
    VIABILITY: { bg: '#DCEFEF', fg: '#0F4C5C' }, // muted teal
    FEASIBILITY: { bg: '#FBEED6', fg: '#7A5A2E' }, // muted amber
    VALUE: { bg: '#DCEEDC', fg: '#1B5E20' }, // muted green
    IMPACT: { bg: '#DCE8F5', fg: '#0A4D8C' }, // muted blue
    EXCITEMENT: { bg: '#FBEED6', fg: '#7A5A2E' }, // amber
    PERFORMANCE: { bg: '#DCE8F5', fg: '#0A4D8C' }, // blue
    BASIC: { bg: '#DCEEDC', fg: '#1B5E20' }, // green
    INDIFFERENT: { bg: '#ECECEE', fg: '#4A4E54' }, // gray
    REVERSE: { bg: '#F5DCDC', fg: '#8A1F1F' }, // muted red
  } as Record<
    | 'DESIRABILITY'
    | 'VIABILITY'
    | 'FEASIBILITY'
    | 'VALUE'
    | 'IMPACT'
    | 'EXCITEMENT'
    | 'PERFORMANCE'
    | 'BASIC'
    | 'INDIFFERENT'
    | 'REVERSE',
    { bg: string; fg: string }
  >,
} as const;

export type CategoryTintKey = keyof typeof structuredTokens.categoryTints;
