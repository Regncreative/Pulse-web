'use client'

import {
  Activity,
  Heart,
  LayoutList,
  Settings,
  Zap,
} from 'lucide-react'
import { PulseLogo } from '@/components/icons/PulseLogo'
import { cn } from '@/lib/cn'

export type PulseNav = 'timeline' | 'health' | 'diagnostics' | 'settings'

const NAV: Array<{ id: PulseNav; label: string; icon: typeof LayoutList }> = [
  { id: 'timeline', label: 'Timeline', icon: LayoutList },
  { id: 'health', label: 'System Health', icon: Heart },
  { id: 'diagnostics', label: 'Diagnostics', icon: Zap },
  { id: 'settings', label: 'Settings', icon: Settings },
]

/** Shared chrome matching the real Pulse Windows app. */
export function PulseAppShell({
  active,
  children,
  className,
  compact,
}: {
  active: PulseNav
  children: React.ReactNode
  className?: string
  compact?: boolean
}) {
  return (
    <div
      className={cn(
        'flex overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0f12] text-white shadow-[0_28px_80px_rgba(0,0,0,0.55)]',
        compact ? 'min-h-[420px]' : 'min-h-[480px]',
        className,
      )}
    >
      <aside
        className={cn(
          'flex shrink-0 flex-col border-r border-white/[0.06] bg-[#12151a]',
          compact ? 'w-[168px]' : 'w-[200px]',
        )}
      >
        <div className="flex items-center gap-2.5 px-3.5 pt-4 pb-5">
          <PulseLogo size={compact ? 28 : 32} className="rounded-[8px]" />
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold leading-none tracking-tight">Pulse</p>
            <p className="mt-1 truncate text-[10px] leading-none text-white/40">
              Windows diagnostics
            </p>
          </div>
        </div>

        <p className="px-3.5 pb-2 text-[10px] font-semibold tracking-[0.14em] text-white/30 uppercase">
          Workspace
        </p>
        <nav className="flex flex-col gap-0.5 px-2">
          {NAV.map(({ id, label, icon: Icon }) => {
            const isActive = id === active
            return (
              <div
                key={id}
                className={cn(
                  'relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px]',
                  isActive
                    ? 'bg-[#60CDFF]/12 text-[#7ad7ff]'
                    : 'text-white/55',
                )}
              >
                <Icon className="size-3.5 shrink-0" strokeWidth={1.85} aria-hidden />
                <span className="truncate font-medium">{label}</span>
                {isActive ? (
                  <span className="absolute top-1/2 right-1.5 size-1.5 -translate-y-1/2 rounded-full bg-[#60CDFF]" />
                ) : null}
              </div>
            )
          })}
        </nav>

        <div className="mt-auto p-2.5">
          <div className="rounded-xl border border-white/[0.06] bg-[#0d0f12] p-2.5">
            <div className="flex items-center gap-2">
              <span className="live-dot size-1.5 rounded-full bg-[#3dd68c]" aria-hidden />
              <span className="text-[11px] font-semibold text-white/85">Live Monitoring</span>
              <span className="ml-auto rounded-full bg-[#3dd68c]/15 px-1.5 py-0.5 text-[9px] font-semibold text-[#3dd68c]">
                Live
              </span>
            </div>
            <p className="mt-2 text-[10px] text-white/40">
              Listening: <span className="text-[#3dd68c]">Yes</span>
            </p>
            <p className="mt-0.5 font-mono-pulse text-[9px] text-white/30">v0.1.0-bootstrap</p>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1 bg-[#0d0f12]">{children}</div>
    </div>
  )
}

export function LiveBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-[#3dd68c]/12 px-2.5 py-1 text-[11px] font-medium text-[#3dd68c]',
        className,
      )}
    >
      <Activity className="size-3" aria-hidden />
      Live Monitoring
    </span>
  )
}

export function PageHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-[22px] font-semibold tracking-tight text-white">{title}</h3>
        <LiveBadge />
      </div>
      {subtitle ? <p className="mt-1.5 text-[12px] text-white/45">{subtitle}</p> : null}
    </div>
  )
}
