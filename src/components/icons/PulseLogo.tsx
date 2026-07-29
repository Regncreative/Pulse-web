import { cn } from '@/lib/cn'

type PulseLogoProps = {
  size?: number
  className?: string
  title?: string
}

/** Inline Telemetry Peak mark — always renders, no asset pipeline dependency. */
export function PulseLogo({ size = 32, className, title = 'Pulse' }: PulseLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label={title}
      className={cn('shrink-0', className)}
    >
      <rect width="32" height="32" rx="7" fill="#1B1F24" />
      <path d="M5 22 H27" stroke="#60CDFF" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M5 22 L10.5 22 L14 8 L17.5 22 L27 22"
        fill="none"
        stroke="#60CDFF"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="8" r="2.1" fill="#60CDFF" />
    </svg>
  )
}

export function PulseMark({
  size = 18,
  className,
  color = '#60CDFF',
}: {
  size?: number
  className?: string
  color?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn('shrink-0', className)}
    >
      <path d="M4 23 H28" stroke={color} strokeWidth="2.25" strokeLinecap="round" />
      <path
        d="M4 23 L10 23 L14.5 7 L19 23 L28 23"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="14.5" cy="7" r="2.25" fill={color} />
    </svg>
  )
}
