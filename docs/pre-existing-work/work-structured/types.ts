// Shared types for structured portfolio artifacts.
// Each artifact has its own body shape but inherits common metadata.

import type { ReactNode } from 'react';

export interface ArtifactMetadata {
  /** Type label shown in the metadata strip, e.g., "Business Model Canvas". */
  type: string;
  /** Status label, e.g., "Final", "Draft v1". */
  status: string;
  /** Optional read or scan time, e.g., "~3 min scan". */
  readTime?: string;
  /** Author name. */
  author: string;
  /** Course identifier. */
  course: string;
  /** School name. */
  school: string;
  /** Term, e.g., "Spring 2026". */
  term: string;
  /** Date the artifact was authored or finalized. */
  date: string;
  /** Iteration number, used by canvases. */
  iteration?: string;
  /** True when this artifact should render the EXTRA pill on its row. */
  isExtra?: boolean;
}

// === Business Model Canvas ===

export interface BMCBlock {
  /** SF Symbol name for the block icon, e.g., "link", "gearshape". */
  iconSymbol: string;
  /** The block's section title. */
  title: string;
  /** Bulleted items inside the block. */
  items: string[];
}

export interface BusinessModelCanvas {
  metadata: ArtifactMetadata;
  designedFor: string;
  designedBy: string;
  blocks: {
    keyPartners: BMCBlock;
    keyActivities: BMCBlock;
    keyResources: BMCBlock;
    valuePropositions: BMCBlock;
    customerRelationships: BMCBlock;
    channels: BMCBlock;
    customerSegments: BMCBlock;
    costStructure: BMCBlock;
    revenueStreams: BMCBlock;
  };
}

// === Value Proposition Canvas ===

export interface VPCBlock {
  iconSymbol: string;
  title: string;
  items: string[];
}

export interface ValuePropositionCanvas {
  metadata: ArtifactMetadata;
  designedFor: string;
  designedBy: string;
  /** The left side of the canvas: the value map (what the product offers). */
  valueMap: {
    productsAndServices: VPCBlock;
    gainCreators: VPCBlock;
    painRelievers: VPCBlock;
  };
  /** The right side of the canvas: the customer profile (who the user is). */
  customerProfile: {
    customerJobs: VPCBlock;
    gains: VPCBlock;
    pains: VPCBlock;
  };
}

// === Vision Board ===

export interface VisionBoardSubsection {
  /** Heading shown above the subsection content. */
  heading: string;
  /** Body paragraph or description. */
  body: string;
}

export interface VisionBoardSection {
  iconSymbol: string;
  title: string;
  /** The italicized prompt question(s) that frame the section. */
  prompt: string;
  /** One or more subsections inside this section. */
  subsections: VisionBoardSubsection[];
}

export interface VisionBoard {
  metadata: ArtifactMetadata;
  /** The single, top-level vision statement. */
  vision: {
    prompt: string;
    statement: string;
  };
  sections: {
    targetGroup: VisionBoardSection;
    needs: VisionBoardSection;
    product: VisionBoardSection;
    businessGoals: VisionBoardSection;
  };
  /** Source attribution. */
  attribution?: string;
}

// === Opportunity Solution Tree ===

export interface OSTAssumption {
  /** Type of assumption, e.g., "DESIRABILITY", "VIABILITY", "FEASIBILITY", "VALUE", "IMPACT". */
  category: 'DESIRABILITY' | 'VIABILITY' | 'FEASIBILITY' | 'VALUE' | 'IMPACT';
  /** The assumption statement to test. */
  statement: string;
}

export interface OSTSolution {
  /** Solution letter, e.g., "A", "B", "C". */
  letter: string;
  title: string;
  description: string;
}

export interface OSTSubOpportunity {
  /** Sub-opportunity identifier, e.g., "1a", "1b", "2a". */
  id: string;
  text: string;
  /** True if this sub-opportunity is the focus of the drill-down (highlighted in the diagram). */
  isFocus?: boolean;
}

export interface OSTOpportunity {
  /** Top-level opportunity number, 1 through 4. */
  number: number;
  title: string;
  description: string;
  /** True if this opportunity is the focus of the drill-down (the one with solutions mapped). */
  isFocus?: boolean;
  subOpportunities: OSTSubOpportunity[];
}

export interface OpportunitySolutionTree {
  metadata: ArtifactMetadata;
  /** The single desired outcome at the top of the tree. */
  desiredOutcome: {
    title: string;
    subtitle: string;
  };
  opportunities: OSTOpportunity[];
  /** Solutions mapped to the focused opportunity. */
  solutions: {
    /** Which opportunity number these solutions map to. */
    mappedToOpportunity: number;
    items: OSTSolution[];
  };
  /** Assumptions to test for the focused solutions. */
  assumptionsToTest: OSTAssumption[];
}

// === Product Scorecard ===

export interface ScorecardMetric {
  name: string;
  /** Target value the metric is aiming at, e.g., "+25% YoY". */
  target: string;
  whatItIs: string;
  howWeCaptureIt: string;
}

export interface ScorecardCategory {
  /** Single-letter shorthand shown at the top of the section, e.g., "G", "$", "C", "P", "T". */
  letter: string;
  /** Full category name, e.g., "Business Goals", "Financial". */
  title: string;
  /** Subtitle that frames what the category captures. */
  subtitle: string;
  /** Metrics inside the category. Business Goals uses a special format and stores items in `goals`; all other categories use `metrics`. */
  metrics?: ScorecardMetric[];
}

export interface ScorecardGoal {
  /** Order number, 1 through N. */
  number: number;
  /** Short headline, e.g., "Grow Services revenue via Apple Pay interchange." */
  headline: string;
  /** Full goal description, including the measurable target. */
  body: string;
}

export interface ProductScorecard {
  metadata: ArtifactMetadata;
  /** Title shown at the top of the rendered scorecard. */
  title: string;
  /** Business Goals section is structurally different from the metric categories below. */
  businessGoals: {
    letter: string;
    title: string;
    subtitle: string;
    goals: ScorecardGoal[];
  };
  /** The four leading-indicator categories below Business Goals. */
  categories: {
    financial: ScorecardCategory;
    customer: ScorecardCategory;
    productAndProcess: ScorecardCategory;
    people: ScorecardCategory;
  };
  /** Footer attribution for the framework source. */
  attribution: string;
}

// === Kano Analysis ===

export interface KanoCategoryDefinition {
  /** Primary label, e.g., "Basic Need". */
  label: string;
  /** Secondary label, e.g., "Must-Be". */
  secondaryLabel: string;
  description: string;
}

export interface KanoFeature {
  /** Position in the feature list, 1 through 10. */
  number: number;
  /** Short label used in the chart, e.g., "Health Insurance Integration". */
  shortLabel: string;
  /** Full feature name as used in the categorization table. */
  fullName: string;
  /** Kano category assignment. */
  category: 'Excitement' | 'Performance' | 'Basic' | 'Indifferent' | 'Reverse';
  /** The reasoning for the categorization. */
  reasoning: string;
}

export interface KanoRiceComparison {
  riceRank: number;
  feature: string;
  kanoCategory: KanoFeature['category'];
  divergenceCommentary: string;
}

export interface KanoAnalysis {
  metadata: ArtifactMetadata;
  title: string;
  subtitle: string;
  /** Methodology slide content. */
  methodology: {
    intro: string;
    categories: KanoCategoryDefinition[];
    axes: {
      vertical: string;
      horizontal: string;
      curves: string;
    };
  };
  /** The 10 features and their Kano categorizations. */
  features: KanoFeature[];
  /** Categorization section caption. */
  categorizationCaption: string;
  /** Chart slide caption. */
  chartCaption: string;
  /** RICE vs Kano comparison. */
  riceComparison: {
    intro: string;
    rows: KanoRiceComparison[];
    closingLesson: {
      title: string;
      body: string;
    };
  };
}

// === Roadmap V2 (theme-based, outcome-anchored) ===

export interface RoadmapFeature {
  name: string;
  size: 'S' | 'M' | 'L';
  /** Short driver explanation rendered below the feature name. */
  driver: ReactNode;
}

export interface RoadmapTheme {
  id: string;
  /** Short label like "Theme 1". */
  label: string;
  /** Theme name like "Breadth". */
  name: string;
  /** Hex accent color for the theme's left border on feature cards. */
  accent: string;
  /** Pill background and text color for the theme label. */
  pill: { bg: string; color: string };
  /** Outcome statement rendered in the theme's row label. */
  outcome: ReactNode;
  /** Metric statement rendered in the theme's row label. */
  metric: ReactNode;
  /** Features grouped by horizon. */
  features: {
    now: RoadmapFeature[];
    next: RoadmapFeature[];
    later: RoadmapFeature[];
  };
}

export interface RoadmapHorizon {
  id: 'now' | 'next' | 'later';
  title: string;
  meta: string;
}

export interface RoadmapV2 {
  metadata: ArtifactMetadata;
  /** Eyebrow text rendered above the title, e.g., "Apple Wallet · Strategic Roadmap v2". */
  eyebrow: string;
  /** Main title of the roadmap. */
  title: string;
  /** Description paragraph below the title. */
  description: string;
  /** Vision statement rendered in the dark vision strip. */
  vision: string;
  /** North Star Metric label rendered in the vision strip. */
  northStarMetric: string;
  horizons: RoadmapHorizon[];
  themes: RoadmapTheme[];
  /** Footer text on the right side of the legend strip. */
  footerText: string;
  /** Size legend definitions. */
  sizeLegend: {
    S: string;
    M: string;
    L: string;
  };
  /** Color hex values for size badges. */
  sizeStyles: {
    S: { bg: string; color: string };
    M: { bg: string; color: string };
    L: { bg: string; color: string };
  };
}
