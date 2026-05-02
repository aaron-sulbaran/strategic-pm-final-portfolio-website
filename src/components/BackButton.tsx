import { Icon } from './Icon';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export function BackButton({ onClick, label = 'Back to Wallet' }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="w-11 h-11 rounded-full bg-bg-card-white shadow-pill flex items-center justify-center text-text-secondary active:scale-95 transition-transform"
    >
      <Icon name="chevron.left" size={20} />
    </button>
  );
}
