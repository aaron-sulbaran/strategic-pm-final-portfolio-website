import { useState } from 'react';
import { ViewerShell } from './ViewerShell';

interface ImageViewerProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export function ImageViewer({ src, alt, onClose }: ImageViewerProps) {
  const [error, setError] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  return (
    <ViewerShell onClose={onClose} background="#0e0e10">
      {error ? (
        <div className="flex-1 flex items-center justify-center px-5 text-center">
          <p className="font-sf text-[15px] text-white/60">
            Image not yet available. Drop it at <code className="font-mono text-[13px]">{src}</code>.
          </p>
        </div>
      ) : (
        <div
          className="sheet-scroll flex-1 overflow-auto flex items-start justify-center px-4 pb-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
            className="flex-shrink-0"
            style={{ cursor: zoomed ? 'zoom-out' : 'zoom-in' }}
          >
            <img
              src={src}
              alt={alt}
              onError={() => setError(true)}
              className="block rounded-card-content shadow-card mt-4 select-none"
              draggable={false}
              style={
                zoomed
                  ? { width: 'auto', height: 'auto', maxWidth: 'none', maxHeight: 'none' }
                  : {
                      maxWidth: 'min(100%, 1200px)',
                      maxHeight: 'calc(100vh - 140px)',
                      width: 'auto',
                      height: 'auto',
                    }
              }
            />
          </button>
        </div>
      )}
    </ViewerShell>
  );
}
