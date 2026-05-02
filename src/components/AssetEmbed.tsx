import type { PassAsset } from '../data/passes';

interface AssetEmbedProps {
  asset: PassAsset;
  title: string;
}

export function AssetEmbed({ asset, title }: AssetEmbedProps) {
  if (asset.pending) {
    return <PendingPlaceholder title={title} />;
  }

  switch (asset.type) {
    case 'pdf':
      return (
        <div className="rounded-card-content overflow-hidden border border-divider bg-bg-card-white shadow-card">
          <iframe
            src={asset.src}
            title={title}
            className="w-full block bg-white"
            style={{ height: asset.height ?? 'min(80vh, 880px)' }}
          />
        </div>
      );
    case 'image':
      return (
        <div className="rounded-card-content overflow-hidden border border-divider bg-bg-card-white shadow-card">
          <img
            src={asset.src}
            alt={asset.alt ?? title}
            className="w-full h-auto block"
            loading="lazy"
          />
        </div>
      );
    case 'video':
      return (
        <div className="rounded-card-content overflow-hidden border border-divider bg-black shadow-card">
          <video
            src={asset.src}
            controls
            playsInline
            preload="metadata"
            className="w-full h-auto block"
          />
        </div>
      );
    case 'iframe':
      return (
        <div className="rounded-card-content overflow-hidden border border-divider bg-bg-card-white shadow-card">
          <iframe
            src={asset.src}
            title={title}
            className="w-full block bg-white"
            style={{ height: asset.height ?? 'min(80vh, 880px)' }}
          />
        </div>
      );
    case 'external':
      if (!asset.src) return null;
      return (
        <a
          href={asset.src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full py-3 rounded-pill bg-accent-blue text-white font-sf font-semibold text-[17px] shadow-card active:scale-[0.99] transition-transform"
        >
          Open Prototype
        </a>
      );
  }
}

function PendingPlaceholder({ title }: { title: string }) {
  return (
    <div className="rounded-card-content border border-divider bg-bg-card-white shadow-card p-8 text-center">
      <p className="font-sf font-semibold text-[17px] text-text-secondary">
        {title} coming soon.
      </p>
      <p className="font-sf text-[15px] text-text-tertiary mt-2">
        The artifact will appear here once it is dropped into{' '}
        <code className="font-mono text-[13px]">/public/assets/</code>.
      </p>
    </div>
  );
}
