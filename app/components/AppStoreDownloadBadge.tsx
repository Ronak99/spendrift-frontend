export const SPENDRIFT_APP_STORE_URL =
  'https://apps.apple.com/us/app/spendrift/id6761763507';

export type AppStoreBadgeSize = 'xs' | 'sm' | 'md' | 'lg';

const SIZE_HEIGHT_CLASS: Record<AppStoreBadgeSize, string> = {
  xs: 'h-5',
  sm: 'h-7',
  md: 'h-12',
  lg: 'h-16',
};

export type AppStoreDownloadBadgeProps = {
  size?: AppStoreBadgeSize;
  href?: string;
  className?: string;
};

/**
 * Official-style App Store badge (`/images/app-store.svg`), scaled by height while keeping aspect ratio.
 */
export function AppStoreDownloadBadge({
  size = 'md',
  href = SPENDRIFT_APP_STORE_URL,
  className = '',
}: AppStoreDownloadBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center rounded-md transition-all hover:scale-[1.02] hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c6ef5]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] ${className}`.trim()}
      aria-label="Download on the App Store"
    >
      <img
        src="/images/app-store.svg"
        alt=""
        width={496}
        height={172}
        className={`block w-auto ${SIZE_HEIGHT_CLASS[size]}`}
        decoding="async"
      />
    </a>
  );
}
