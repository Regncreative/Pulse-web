'use client'

import {
  Activity,
  Box,
  FileText,
  Heart,
  LayoutList,
  Settings,
  Zap,
} from 'lucide-react'
import { PulseLogo } from '@/components/icons/PulseLogo'
import { SITE } from '@/lib/constants'
import { cn } from '@/lib/cn'
import { ACCENT } from './shared'

export type PulseNav =
  | 'timeline'
  | 'health'
  | 'inventory'
  | 'reports'
  | 'diagnostics'
  | 'settings'

const NAV: Array<{ id: PulseNav; label: string; icon: typeof LayoutList }> = [
  { id: 'timeline', label: 'Timeline', icon: LayoutList },
  { id: 'health', label: 'System Health', icon: Heart },
  { id: 'inventory', label: 'Inventory', icon: Box },
  { id: 'reports', label: 'Reports', icon: FileText },
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
        'flex overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0f12] text-white',
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
                  isActive ? 'bg-[#3DDA7A]/12 text-[#6EE7A0]' : 'text-white/55',
                )}
              >
                <Icon className="size-3.5 shrink-0" strokeWidth={1.85} aria-hidden />
                <span className="truncate font-medium">{label}</span>
                {isActive ? (
                  <span
                    className="absolute top-1/2 right-1.5 size-1.5 -translate-y-1/2 rounded-full"
                    style={{ background: ACCENT }}
                  />
                ) : null}
              </div>
            )
          })}
        </nav>

        <div className="mt-auto p-2.5">
          <div className="rounded-xl border border-white/[0.06] bg-[#0d0f12] p-2.5">
            <div className="flex items-center gap-2">
              <span className="live-dot size-1.5 rounded-full bg-[#3DDA7A]" aria-hidden />
              <span className="text-[11px] font-semibold text-white/85">Connected</span>
              <span className="ml-auto rounded-full bg-[#3DDA7A]/15 px-1.5 py-0.5 text-[9px] font-semibold text-[#3DDA7A]">
                Live
              </span>
            </div>
            <p className="mt-2 text-[10px] text-white/40">
              Listening: <span className="text-[#3DDA7A]">Yes</span>
            </p>
            <p className="mt-0.5 font-mono-pulse text-[9px] text-white/30">
              v{SITE.versionFallback}
            </p>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1 bg-[#0d0f12]">{children}</div>
    </div>
  )
}

export function ConnectedBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-[#3DDA7A]/12 px-2.5 py-1 text-[11px] font-medium text-[#3DDA7A]',
        className,
      )}
    >
      <span className="live-dot size-1.5 rounded-full bg-[#3DDA7A]" aria-hidden />
      Connected
    </span>
  )
}

export function LiveBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-[#3DDA7A]/12 px-2.5 py-1 text-[11px] font-medium text-[#3DDA7A]',
        className,
      )}
    >
      <Activity className="size-3" aria-hidden />
      Live
    </span>
  )
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}) {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-[22px] font-semibold tracking-tight text-white">{title}</h3>
        <ConnectedBadge />
        {actions ? <div className="ml-auto flex items-center gap-2">{actions}</div> : null}
      </div>
      {subtitle ? <p className="mt-1.5 text-[12px] text-white/45">{subtitle}</p> : null}
    </div>
  )
}

export { ACCENT }
