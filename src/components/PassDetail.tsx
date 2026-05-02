import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { findPassById } from '../data/passes';
import { PassCard } from './PassCard';
import { BackButton } from './BackButton';
import { AssetEmbed } from './AssetEmbed';
import { VisitorFeed } from './VisitorFeed';

export function PassDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pass = id ? findPassById(id) : undefined;

  if (!pass) {
    return (
      <div className="min-h-screen w-full bg-bg-app flex flex-col items-center">
        <div className="w-full max-w-wallet flex flex-col px-5 pt-14">
          <BackButton onClick={() => navigate('/')} />
          <p className="font-sf text-[17px] text-text-secondary mt-8">
            Pass not found.
          </p>
        </div>
      </div>
    );
  }

  const reflectionIsPlaceholder =
    !pass.reflection || pass.reflection.trim() === '[REFLECTION TBD]';

  return (
    <div className="min-h-screen w-full bg-bg-app flex flex-col items-center">
      <div className="w-full max-w-wallet flex flex-col">
        <header className="px-5 pt-14 pb-4 flex items-center justify-between">
          <BackButton onClick={() => navigate('/')} />
          {pass.isExtra && (
            <span className="px-2 py-1 rounded bg-accent-blue text-white font-sf font-semibold text-[11px] uppercase tracking-[0.08em]">
              Extra
            </span>
          )}
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

            {pass.isExtra && pass.extraCaption && (
              <p className="font-sf text-[15px] text-text-tertiary mt-2 leading-snug italic">
                {pass.extraCaption}
              </p>
            )}
          </motion.div>

          {/* Reflection card */}
          {!pass.isVisitorPass && (
            <motion.section
              aria-labelledby="reflection-heading"
              className="mt-6 rounded-card-content bg-bg-card-white shadow-card p-5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.22, ease: 'easeOut' }}
            >
              <h2
                id="reflection-heading"
                className="font-sf font-semibold text-[15px] uppercase tracking-[0.08em] text-text-tertiary"
              >
                Reflection
              </h2>
              {reflectionIsPlaceholder ? (
                <p className="mt-2 font-sf text-[17px] text-text-tertiary italic">
                  Reflection coming soon.
                </p>
              ) : (
                <p className="mt-2 font-sf text-[17px] text-text-secondary leading-relaxed whitespace-pre-line">
                  {pass.reflection}
                </p>
              )}
            </motion.section>
          )}

          {/* Asset / Visitor feed */}
          <motion.section
            aria-label={pass.isVisitorPass ? 'Visitor signatures' : `${pass.title} artifact`}
            className="mt-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
          >
            {pass.isVisitorPass ? (
              <VisitorFeed />
            ) : (
              <AssetEmbed asset={pass.asset} title={pass.title} />
            )}
          </motion.section>
        </main>
      </div>
    </div>
  );
}
