import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { WalletHome } from './components/WalletHome';
import { PassDetail } from './components/PassDetail';
import { VisitorOnboardingModal } from './components/VisitorOnboardingModal';
import { useVisitorOnboarding } from './hooks/useVisitorOnboarding';
import { signVisitor } from './lib/visitors';

export default function App() {
  const location = useLocation();
  const onboarding = useVisitorOnboarding(700);
  const onHome = location.pathname === '/' || location.pathname === '';

  async function handleSign(firstName: string, lastName: string) {
    const result = await signVisitor({ firstName, lastName });
    if (!result.ok) {
      throw new Error(result.error ?? 'Save failed.');
    }
    try {
      window.localStorage.setItem('portfolio_visitor_signed', 'true');
    } catch {
      // ignore
    }
    onboarding.markSigned();
  }

  return (
    <>
      <AnimatePresence mode="sync" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<WalletHome />} />
          <Route path="/pass/:id" element={<PassDetail />} />
          <Route path="*" element={<WalletHome />} />
        </Routes>
      </AnimatePresence>

      <VisitorOnboardingModal
        open={onHome && onboarding.shouldShow}
        onSign={handleSign}
        onSkip={onboarding.markSkipped}
        onReturning={onboarding.markReturning}
      />
    </>
  );
}
