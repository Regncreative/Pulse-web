import { cn } from '@/lib/cn'

type PulseLogoProps = {
  size?: number
  className?: string
  title?: string
}

/**
 * The Pulse app icon: lime tile with the dark peak mark. Same geometry as
 * the app (tools/branding/make_app_icons.py in the Pulse repo).
 */
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
      <rect width="32" height="32" rx="7" fill="#C8F04A" />
      <g
        transform="translate(6.08 6.08) scale(0.62)"
        fill="none"
        stroke="#08080A"
        strokeWidth="2.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 23 L10 23 L14.5 7 L19 23 L28 23" />
        <circle cx="14.5" cy="7" r="2.25" fill="#08080A" stroke="none" />
      </g>
    </svg>
  )
}

export function PulseMark({
  size = 18,
  className,
  color = '#C8F04A',
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
      <path
        d="M4 23 L10 23 L14.5 7 L19 23 L28 23"
        fill="none"
        stroke={color}
        strokeWidth="2.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="14.5" cy="7" r="2.25" fill={color} />
    </svg>
  )
}
