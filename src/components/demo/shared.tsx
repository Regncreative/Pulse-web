'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { PulseLogo } from '@/components/icons/PulseLogo'
import { cn } from '@/lib/cn'

/** Active / live accent from the current Pulse Windows build. */
export const ACCENT = '#3DDA7A'
export const ACCENT_SOFT = '#6EE7A0'

export function ScaleToFit({
  width,
  height,
  children,
  className,
}: {
  width: number
  height: number
  children: React.ReactNode
  className?: string
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const update = (w: number) => {
      if (w <= 0) return
      setScale(Math.min(1, w / width))
    }

    update(host.clientWidth)
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) update(entry.contentRect.width)
    })
    ro.observe(host)
    return () => ro.disconnect()
  }, [width])

  return (
    <div
      ref={hostRef}
      className={cn('relative mx-auto w-full overflow-hidden', className)}
      style={{ height: height * scale }}
    >
      <div
        className="absolute top-0 left-1/2"
        style={{
          width,
          height,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export function DemoFrame({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={cn('mx-auto w-full max-w-5xl', className)}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function PulseMark({ size = 16, color = ACCENT }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
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

export function DemoStage({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--surface)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function DemoAppChrome({
  title = 'Pulse',
  subtitle,
  activeNav,
}: {
  title?: string
  subtitle?: string
  activeNav?: 'timeline' | 'health' | 'inventory' | 'reports' | 'diagnostics' | 'settings'
}) {
  const nav = [
    { id: 'timeline', label: 'Timeline' },
    { id: 'health', label: 'Health' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'reports', label: 'Reports' },
    { id: 'diagnostics', label: 'Diagnostics' },
    { id: 'settings', label: 'Settings' },
  ] as const

  return (
    <div className="border-b border-[var(--line)] bg-[#0d1218]/95 px-4 pt-3 pb-0">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <PulseLogo size={32} className="rounded-[10px]" />
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold leading-none tracking-[-0.02em] text-white">
              {title}
            </p>
            {subtitle ? (
              <p className="mt-1 truncate font-mono-pulse text-[10px] leading-none text-[#9ca3af]">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-white/15" aria-hidden />
          <span className="size-2.5 rounded-full bg-white/15" aria-hidden />
          <span className="size-2.5 rounded-full bg-white/25" aria-hidden />
        </div>
      </div>
      <div className="flex gap-1 overflow-x-auto pb-0">
        {nav.map((item) => {
          const active = activeNav === item.id
          return (
            <span
              key={item.id}
              className={cn(
                'rounded-t-lg px-3 py-2 text-[12px] font-medium whitespace-nowrap',
                active
                  ? 'bg-[#121820] text-[var(--accent)] ring-1 ring-[var(--line)] ring-b-0'
                  : 'text-white/45',
              )}
            >
              {item.label}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export function LevelDot({ level }: { level: 'info' | 'warn' | 'error' | 'ok' }) {
  const colors = {
    info: 'bg-[var(--accent)]',
    warn: 'bg-[var(--warn)]',
    error: 'bg-[var(--err)]',
    ok: 'bg-[var(--ok)]',
  }
  return <span className={cn('mt-1.5 size-2 shrink-0 rounded-full', colors[level])} aria-hidden />
}
