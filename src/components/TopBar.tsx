import { Icon } from './Icon';

interface TopBarProps {
  title: string;
  onInfo?: () => void;
  onSearch?: () => void;
}

export function TopBar({ title, onInfo, onSearch }: TopBarProps) {
  return (
    <header className="px-5 pt-14 pb-3 flex items-end justify-between">
      <h1
        className="font-sf font-bold text-[34px] tracking-[-0.5px] text-text-primary leading-none"
      >
        {title}
      </h1>
      <div className="flex items-center gap-2">
        {onInfo && (
          <button
            type="button"
            onClick={onInfo}
            aria-label="About this portfolio"
            className="w-11 h-11 rounded-full bg-bg-card-white shadow-pill flex items-center justify-center text-text-secondary active:scale-95 transition-transform"
          >
            <Icon name="info.circle" size={22} />
          </button>
        )}
        {onSearch && (
          <button
            type="button"
            onClick={onSearch}
            aria-label="Search portfolio"
            className="h-11 px-3 min-w-[52px] rounded-full bg-bg-card-white shadow-pill flex items-center justify-center text-text-secondary active:scale-95 transition-transform"
          >
            <Icon name="magnifyingglass" size={20} />
          </button>
        )}
      </div>
    </header>
  );
}
