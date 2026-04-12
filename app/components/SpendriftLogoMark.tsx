const LOGO_SRC = '/images/spendrift-logo.png';

const glassMaskStyle = {
  WebkitMaskImage: `url(${LOGO_SRC})`,
  WebkitMaskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskImage: `url(${LOGO_SRC})`,
  maskSize: 'contain',
  maskRepeat: 'no-repeat',
  maskPosition: 'center',
} as const;

export type SpendriftLogoMarkProps = {
  /** Tailwind height / sizing on the outer wrapper, e.g. `h-7 w-auto sm:h-8` */
  className?: string;
};

export function SpendriftLogoMark({ className = 'h-7 w-auto sm:h-8 lg:h-9' }: SpendriftLogoMarkProps) {
  return (
    <span className={`relative inline-flex w-auto shrink-0 ${className}`} aria-hidden>
      <img
        src={LOGO_SRC}
        alt=""
        className="block h-full w-auto opacity-[0.42] grayscale contrast-[1.15] brightness-[1.08]"
      />
      <span
        className="pointer-events-none absolute inset-0 bg-white/[0.14] backdrop-blur-md backdrop-saturate-150"
        style={glassMaskStyle}
      />
    </span>
  );
}
