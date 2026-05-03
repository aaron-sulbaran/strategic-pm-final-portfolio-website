import { ViewerShell } from './ViewerShell';

interface VideoViewerProps {
  src: string;
  title: string;
  onClose: () => void;
}

export function VideoViewer({ src, title, onClose }: VideoViewerProps) {
  return (
    <ViewerShell onClose={onClose} background="#000000">
      <div className="flex-1 min-h-0 w-full flex items-center justify-center px-4 pb-6">
        <video
          src={src}
          title={title}
          controls
          autoPlay
          playsInline
          preload="metadata"
          className="max-w-full max-h-full rounded-card-content shadow-card bg-black"
        />
      </div>
    </ViewerShell>
  );
}
