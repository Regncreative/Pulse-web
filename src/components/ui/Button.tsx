import Link from 'next/link'
import { cn } from '@/lib/cn'

type ButtonProps = {
  children: React.ReactNode
  className?: string
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
  external?: boolean
  type?: 'button' | 'submit'
  onClick?: () => void
  'aria-label'?: string
}

const variants = {
  primary:
    'bg-[var(--accent)] text-[#0b1220] shadow-[var(--accent-glow)] hover:brightness-110 active:scale-[0.98]',
  secondary:
    'bg-[var(--surface)] text-[var(--foreground)] ring-1 ring-[var(--border)] hover:bg-[var(--surface-2)] active:scale-[0.98]',
  ghost: 'bg-transparent text-[var(--foreground)] hover:bg-white/[0.06] active:scale-[0.98]',
}

const sizes = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[15px]',
}

export function Button({
  children,
  className,
  href,
  variant = 'primary',
  size = 'md',
  external,
  type = 'button',
  onClick,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-[transform,filter,background-color,box-shadow] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
    variants[variant],
    sizes[size],
    className,
  )

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
        >
          {children}
        </a>
      )
    }

    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
