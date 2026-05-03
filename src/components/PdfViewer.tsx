import { ViewerShell } from './ViewerShell';

interface PdfViewerProps {
  src: string;
  title: string;
  onClose: () => void;
}

export function PdfViewer({ src, title, onClose }: PdfViewerProps) {
  return (
    <ViewerShell onClose={onClose} background="#1a1a1a">
      <div className="flex-1 min-h-0 w-full flex justify-center">
        <iframe
          src={src}
          title={title}
          className="w-full max-w-[1200px] h-full block bg-white"
        />
      </div>
    </ViewerShell>
  );
}
