import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { findPassById, type PassDocument } from '../data/passes';
import { PassCard } from './PassCard';
import { BackButton } from './BackButton';
import { VisitorFeed } from './VisitorFeed';
import { DocumentList } from './DocumentList';
import { MetadataHeaderStrip } from './MetadataHeaderStrip';
import { DocumentViewer } from './DocumentViewer';
import { ImageViewer } from './ImageViewer';
import { PdfViewer } from './PdfViewer';
import { VideoViewer } from './VideoViewer';
import { StructuredViewer } from './structured/StructuredViewer';

export function PassDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pass = id ? findPassById(id) : undefined;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const rowRefs = useRef<Map<number, HTMLButtonElement | null>>(new Map());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!pass) {
    return (
      <div className="min-h-screen w-full bg-bg-app flex flex-col items-center">
        <div className="w-full max-w-wallet flex flex-col px-5 pt-14">
          <BackButton onClick={() => navigate('/')} />
          <p className="font-sf text-[17px] text-text-secondary mt-8">Pass not found.</p>
        </div>
      </div>
    );
  }

  const reflectionIsPlaceholder =
    !pass.reflection || pass.reflection.trim() === '[REFLECTION TBD]';
  const primaryDoc = pass.documents[0];
  const showMetadataStrip =
    !pass.isVisitorPass &&
    primaryDoc &&
    (primaryDoc.type === 'markdown' || primaryDoc.type === 'structured');

  const activeDoc = activeIndex != null ? pass.documents[activeIndex] : null;

  function handleOpen(_doc: PassDocument, _rowEl: HTMLButtonElement | null) {
    const idx = pass!.documents.findIndex((d) => d === _doc);
    if (idx < 0) return;
    if (_doc.type === 'external' || _doc.type === 'iframe') {
      if (_doc.src) window.open(_doc.src, '_blank', 'noopener,noreferrer');
      return;
    }
    setActiveIndex(idx);
  }

  function handleClose() {
    const idxToFocus = activeIndex;
    setActiveIndex(null);
    if (idxToFocus != null) {
      window.setTimeout(() => {
        rowRefs.current.get(idxToFocus)?.focus();
      }, 50);
    }
  }

  return (
    <div className="min-h-screen w-full bg-bg-app flex flex-col items-center relative overflow-x-hidden">
      <div
        className="w-full max-w-wallet flex flex-col"
        aria-hidden={activeDoc ? true : undefined}
      >
        <header className="px-5 pt-14 pb-4 flex items-center justify-between">
          <BackButton onClick={() => navigate('/')} />
        </header>

        <main className="px-5 pb-24">
          {/* Hero card */}
          <div className="mb-8">
            <PassCard pass={pass} variant="hero" />
          </div>

          {/* Title and caption */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15, ease: 'easeOut' }}
          >
            <h1 className="font-sf font-bold text-[32px] tracking-[-0.4px] text-text-primary leading-tight">
              {pass.title}
            </h1>
            <p className="font-sf text-[15px] text-text-tertiary mt-2 leading-snug">
              {pass.caption}
            </p>

            {/* Metadata strip (for markdown-primary passes only) */}
            {showMetadataStrip && primaryDoc && (
              <MetadataHeaderStrip doc={primaryDoc} />
            )}

            {/* Reflection paragraph (only when set) */}
            {!reflectionIsPlaceholder && pass.reflection && (
              <p className="font-sf italic text-[15px] text-text-tertiary mt-4 mb-2 leading-relaxed">
                {pass.reflection}
              </p>
            )}
          </motion.div>

          {/* Visitor pass keeps its custom feed */}
          {pass.isVisitorPass ? (
            <motion.section
              aria-label="Visitor signatures"
              className="mt-6"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
            >
              <VisitorFeed />
            </motion.section>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
            >
              <DocumentList
                documents={pass.documents}
                cardStyle={pass.cardStyle}
                onOpen={handleOpen}
                registerRowRef={(i, el) => {
                  if (el) rowRefs.current.set(i, el);
                  else rowRefs.current.delete(i);
                }}
              />
            </motion.div>
          )}
        </main>
      </div>

      <AnimatePresence>
        {activeDoc && (
          <ViewerForDocument key={`${pass.id}-${activeIndex}`} doc={activeDoc} onClose={handleClose} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ViewerForDocument({ doc, onClose }: { doc: PassDocument; onClose: () => void }) {
  switch (doc.type) {
    case 'markdown':
      return doc.src ? <DocumentViewer src={doc.src} onClose={onClose} /> : null;
    case 'image':
      return doc.src ? <ImageViewer src={doc.src} alt={doc.title} onClose={onClose} /> : null;
    case 'pdf':
      return doc.src ? <PdfViewer src={doc.src} title={doc.title} onClose={onClose} /> : null;
    case 'video':
      return doc.src ? <VideoViewer src={doc.src} title={doc.title} onClose={onClose} /> : null;
    case 'structured':
      return doc.rendererComponent && doc.dataSource ? (
        <StructuredViewer
          rendererComponent={doc.rendererComponent}
          dataSource={doc.dataSource}
          onClose={onClose}
        />
      ) : null;
    default:
      return null;
  }
}
