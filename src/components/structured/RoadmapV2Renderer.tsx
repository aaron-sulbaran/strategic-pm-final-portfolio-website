import { ArtifactHeader } from './ArtifactHeader';
import { structuredTokens } from '../../styles/structuredTokens';
import type {
  RoadmapV2,
  RoadmapTheme,
  RoadmapFeature,
  RoadmapHorizon,
} from '../../data/structured/types';

interface Props {
  data: RoadmapV2;
}

export function RoadmapV2Renderer({ data }: Props) {
  return (
    <div className="w-full max-w-[1100px] mx-auto px-5 sm:px-6 pb-16">
      <ArtifactHeader
        title={data.title}
        subtitle={data.eyebrow}
        attribution={[
          { label: 'Author', value: data.metadata.author },
          { label: 'Course', value: data.metadata.course },
          { label: 'Date', value: data.metadata.date },
        ]}
        metadata={data.metadata}
      />

      <p
        className="font-sf"
        style={{
          fontSize: 14,
          color: 'var(--text-secondary)',
          lineHeight: 1.55,
          margin: 0,
          marginBottom: 16,
        }}
      >
        {data.description}
      </p>

      <VisionStrip vision={data.vision} northStar={data.northStarMetric} />

      {/* Desktop grid: theme label column + 3 horizon columns */}
      <div
        className="hidden md:grid mt-5"
        style={{
          gridTemplateColumns: '220px repeat(3, minmax(0, 1fr))',
          gap: 12,
        }}
      >
        <div /> {/* spacer over theme label col */}
        {data.horizons.map((h) => (
          <HorizonHeader key={h.id} horizon={h} />
        ))}
        {data.themes.map((theme) => (
          <ThemeRowDesktop key={theme.id} theme={theme} sizeStyles={data.sizeStyles} />
        ))}
      </div>

      {/* Mobile: stack themes, each with 3 horizon sub-sections */}
      <div className="md:hidden mt-5 flex flex-col gap-5">
        {data.themes.map((theme) => (
          <ThemeMobile
            key={theme.id}
            theme={theme}
            horizons={data.horizons}
            sizeStyles={data.sizeStyles}
          />
        ))}
      </div>

      {/* Footer legend */}
      <div
        className="mt-6 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
        style={{
          background: 'rgba(0, 0, 0, 0.025)',
          border: '1px solid var(--divider)',
          borderRadius: 12,
        }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span style={structuredTokens.sectionLabel} className="font-sf">
            Sizes
          </span>
          {(['S', 'M', 'L'] as const).map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5">
              <SizeBadge size={s} sizeStyles={data.sizeStyles} />
              <span
                className="font-sf"
                style={{ fontSize: 12, color: 'var(--text-secondary)' }}
              >
                {data.sizeLegend[s]}
              </span>
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span style={structuredTokens.sectionLabel} className="font-sf">
            Themes
          </span>
          {data.themes.map((t) => (
            <span key={t.id} className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: t.accent,
                  display: 'inline-block',
                }}
              />
              <span
                className="font-sf"
                style={{ fontSize: 12, color: 'var(--text-secondary)' }}
              >
                {t.name}
              </span>
            </span>
          ))}
        </div>
      </div>
      <p
        className="font-sf italic"
        style={{
          fontSize: 12,
          color: 'var(--text-tertiary)',
          textAlign: 'right',
          marginTop: 8,
        }}
      >
        {data.footerText}
      </p>
    </div>
  );
}

function VisionStrip({ vision, northStar }: { vision: string; northStar: string }) {
  return (
    <section
      className="px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      style={{
        background: 'linear-gradient(135deg, #0A0A0A 0%, #1F1F1F 100%)',
        color: '#FFFFFF',
        borderRadius: 14,
        boxShadow: structuredTokens.card.shadow,
      }}
    >
      <div className="flex-1 min-w-0">
        <p
          className="font-sf"
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.55)',
            margin: 0,
            marginBottom: 6,
          }}
        >
          Vision
        </p>
        <p
          className="font-sf"
          style={{
            fontSize: 15,
            fontWeight: 600,
            lineHeight: 1.4,
            color: '#FFFFFF',
            margin: 0,
          }}
        >
          {vision}
        </p>
      </div>
      <div className="md:text-right md:max-w-[260px]">
        <p
          className="font-sf"
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.55)',
            margin: 0,
            marginBottom: 4,
          }}
        >
          North Star Metric
        </p>
        <p
          className="font-sf"
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: '#FFFFFF',
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {northStar}
        </p>
      </div>
    </section>
  );
}

function HorizonHeader({ horizon }: { horizon: RoadmapHorizon }) {
  return (
    <div className="px-3 py-2">
      <p
        className="font-sf"
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '0.4px',
          margin: 0,
        }}
      >
        {horizon.title}
      </p>
      <p
        className="font-sf"
        style={{
          fontSize: 11,
          color: 'var(--text-tertiary)',
          margin: 0,
          marginTop: 2,
        }}
      >
        {horizon.meta}
      </p>
    </div>
  );
}

function ThemeRowDesktop({
  theme,
  sizeStyles,
}: {
  theme: RoadmapTheme;
  sizeStyles: RoadmapV2['sizeStyles'];
}) {
  return (
    <>
      <ThemeLabelCell theme={theme} />
      <FeatureCell features={theme.features.now} accent={theme.accent} sizeStyles={sizeStyles} />
      <FeatureCell features={theme.features.next} accent={theme.accent} sizeStyles={sizeStyles} />
      <FeatureCell features={theme.features.later} accent={theme.accent} sizeStyles={sizeStyles} />
    </>
  );
}

function ThemeLabelCell({ theme }: { theme: RoadmapTheme }) {
  return (
    <div
      className="flex flex-col p-3"
      style={{
        background: structuredTokens.card.background,
        borderRadius: 12,
        boxShadow: structuredTokens.card.shadow,
        border: structuredTokens.card.border,
      }}
    >
      <span
        className="font-sf inline-flex items-center self-start"
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.6px',
          textTransform: 'uppercase',
          background: theme.pill.bg,
          color: theme.pill.color,
          padding: '2px 8px',
          borderRadius: 6,
        }}
      >
        {theme.label}
      </span>
      <h3
        className="font-sf"
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: 'var(--text-primary)',
          margin: 0,
          marginTop: 6,
        }}
      >
        {theme.name}
      </h3>
      <div
        className="font-sf"
        style={{
          fontSize: 12,
          color: 'var(--text-secondary)',
          margin: 0,
          marginTop: 6,
          lineHeight: 1.45,
        }}
      >
        {theme.outcome}
      </div>
      <div
        className="font-sf"
        style={{
          fontSize: 11,
          color: 'var(--text-tertiary)',
          margin: 0,
          marginTop: 8,
          lineHeight: 1.45,
        }}
      >
        {theme.metric}
      </div>
    </div>
  );
}

function FeatureCell({
  features,
  accent,
  sizeStyles,
}: {
  features: RoadmapFeature[];
  accent: string;
  sizeStyles: RoadmapV2['sizeStyles'];
}) {
  if (features.length === 0) {
    return (
      <div
        className="flex items-center justify-center p-3"
        style={{
          background: 'rgba(0, 0, 0, 0.015)',
          border: '1px dashed var(--divider)',
          borderRadius: 12,
          minHeight: 60,
        }}
      >
        <span
          className="font-sf"
          style={{
            fontSize: 11,
            color: 'var(--text-quaternary)',
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
          }}
        >
          No features
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {features.map((f, i) => (
        <FeatureCard key={i} feature={f} accent={accent} sizeStyles={sizeStyles} />
      ))}
    </div>
  );
}

function FeatureCard({
  feature,
  accent,
  sizeStyles,
}: {
  feature: RoadmapFeature;
  accent: string;
  sizeStyles: RoadmapV2['sizeStyles'];
}) {
  return (
    <article
      className="p-3"
      style={{
        background: structuredTokens.card.background,
        borderRadius: 10,
        boxShadow: structuredTokens.card.shadow,
        border: structuredTokens.card.border,
        borderLeft: `3px solid ${accent}`,
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <h4
          className="font-sf"
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--text-primary)',
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {feature.name}
        </h4>
        <SizeBadge size={feature.size} sizeStyles={sizeStyles} />
      </div>
      <div
        className="font-sf"
        style={{
          fontSize: 10.5,
          color: 'var(--text-tertiary)',
          margin: 0,
          marginTop: 6,
          lineHeight: 1.45,
        }}
      >
        {feature.driver}
      </div>
    </article>
  );
}

function SizeBadge({
  size,
  sizeStyles,
}: {
  size: RoadmapFeature['size'];
  sizeStyles: RoadmapV2['sizeStyles'];
}) {
  const s = sizeStyles[size];
  return (
    <span
      className="font-sf inline-flex items-center justify-center"
      style={{
        background: s.bg,
        color: s.color,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.4px',
        padding: '2px 6px',
        borderRadius: 6,
        minWidth: 18,
      }}
    >
      {size}
    </span>
  );
}

function ThemeMobile({
  theme,
  horizons,
  sizeStyles,
}: {
  theme: RoadmapTheme;
  horizons: RoadmapHorizon[];
  sizeStyles: RoadmapV2['sizeStyles'];
}) {
  return (
    <section className="flex flex-col gap-3">
      <ThemeLabelCell theme={theme} />
      {horizons.map((h) => (
        <div key={h.id}>
          <p
            className="font-sf mb-2"
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.5px',
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase',
            }}
          >
            {h.title}
          </p>
          <FeatureCell
            features={
              h.id === 'now'
                ? theme.features.now
                : h.id === 'next'
                  ? theme.features.next
                  : theme.features.later
            }
            accent={theme.accent}
            sizeStyles={sizeStyles}
          />
        </div>
      ))}
    </section>
  );
}
