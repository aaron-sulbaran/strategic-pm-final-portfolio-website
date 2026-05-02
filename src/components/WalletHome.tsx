import { useNavigate } from 'react-router-dom';
import { TopBar } from './TopBar';
import { PassCard } from './PassCard';
import { allPasses } from '../data/passes';

const STACK_OVERLAP = 70; // px each card overlaps the one above
const CARD_REVEAL = 110; // px of card top edge revealed in stack

export function WalletHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-bg-app flex flex-col items-center">
      <div className="w-full max-w-wallet flex flex-col">
        <TopBar
          title="Wallet"
          onInfo={() => {
            // About sheet not built yet; placeholder no-op kept for layout.
            // The TopBar control stays interactive in subsequent build steps.
          }}
          onSearch={() => {
            // Search not built yet (Step 7).
          }}
        />

        <main className="px-5 pb-24">
          <div className="relative" role="list" aria-label="Portfolio passes">
            {allPasses.map((pass, index) => (
              <div
                key={pass.id}
                role="listitem"
                style={{
                  position: 'relative',
                  marginTop: index === 0 ? 0 : -STACK_OVERLAP,
                  zIndex: index + 1,
                }}
              >
                <PassCard
                  pass={pass}
                  variant="stack"
                  stackRevealHeight={CARD_REVEAL}
                  onClick={() => navigate(`/pass/${pass.id}`)}
                />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
