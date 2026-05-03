import { structuredTokens } from '../../styles/structuredTokens';
import type { ArtifactMetadata } from '../../data/structured/types';

interface ArtifactHeaderProps {
  title: string;
  subtitle?: string;
  attribution?: { label: string; value: string }[];
  metadata: ArtifactMetadata;
}

export function ArtifactHeader({
  title,
  subtitle,
  attribution,
  metadata,
}: ArtifactHeaderProps) {
  const metadataParts = [metadata.readTime, metadata.type, metadata.status]
    .filter(Boolean)
    .map((s) => s as string);

  return (
    <header className="w-full mb-6">
      <h1 style={structuredTokens.artifactTitle} className="font-sf">
        {title}
      </h1>
      {subtitle && (
        <h2
          style={{ ...structuredTokens.artifactSubtitle, marginTop: 6 }}
          className="font-sf"
        >
          {subtitle}
        </h2>
      )}

      {attribution && attribution.length > 0 && (
        <dl
          className="grid mt-5"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px 24px',
          }}
        >
          {attribution.map((pair) => (
            <div key={pair.label} className="flex flex-col gap-1 min-w-0">
              <dt
                style={structuredTokens.sectionLabel}
                className="font-sf"
              >
                {pair.label}
              </dt>
              <dd
                style={{ ...structuredTokens.body, fontSize: 13 }}
                className="font-sf truncate"
              >
                {pair.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <hr
        className="my-5"
        style={{ border: 0, borderTop: '1px solid var(--divider)' }}
      />

      {metadataParts.length > 0 && (
        <p
          style={{
            fontSize: structuredTokens.metadataBar.fontSize,
            fontWeight: structuredTokens.metadataBar.fontWeight,
            color: structuredTokens.metadataBar.color,
            letterSpacing: structuredTokens.metadataBar.letterSpacing,
            margin: 0,
          }}
          className="font-sf"
        >
          {metadataParts.map((part, i) => (
            <span key={`${part}-${i}`}>
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="px-2"
                  style={{ color: 'var(--text-quaternary)' }}
                >
                  ·
                </span>
              )}
              {part}
            </span>
          ))}
        </p>
      )}
    </header>
  );
}
