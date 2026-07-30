import { cn } from '@/lib/cn'

type BadgeProps = {
  children: React.ReactNode
  className?: string
  tone?: 'neutral' | 'accent' | 'success'
}

const tones = {
  neutral: 'bg-[var(--tile)] text-[var(--muted)] ring-[var(--border)]',
  accent: 'bg-[var(--accent-soft)] text-[var(--accent)] ring-[var(--accent-ring)]',
  success: 'bg-emerald-500/10 text-emerald-700 ring-emerald-500/25',
}

export function Badge({ children, className, tone = 'neutral' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
