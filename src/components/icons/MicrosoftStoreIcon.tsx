import { cn } from '@/lib/cn'

type IconProps = {
  className?: string
  'aria-hidden'?: boolean
}

/** Official-style Microsoft Store bag mark. */
export function MicrosoftStoreIcon({ className, 'aria-hidden': ariaHidden = true }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('size-4', className)}
      aria-hidden={ariaHidden}
    >
      <path d="M4 3.5h7.2v7.2H4V3.5Zm8.8 0H20v7.2h-7.2V3.5ZM4 13.3h7.2V20.5H4v-7.2Zm8.8 0H20v7.2h-7.2v-7.2Z" />
    </svg>
  )
}
