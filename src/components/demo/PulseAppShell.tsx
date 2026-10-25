'use client'

import {
  FileText,
  HeartPulse,
  ListTree,
  Minus,
  PackageSearch,
  Radio,
  Search,
  Settings,
  Sparkles,
  Square,
  Stethoscope,
  X,
} from 'lucide-react'
import { PulseMark } from '@/components/icons/PulseLogo'
import { cn } from '@/lib/cn'
import { SITE } from '@/lib/constants'
import { MIDNIGHT } from './shared'

export type PulseNav =
  'timeline' | 'health' | 'inventory' | 'reports' | 'diagnostics' | 'settings' | 'assistant'

type NavItem = { id: PulseNav; label: string; icon: typeof ListTree }

const NAV_TOP: NavItem[] = [
  { id: 'timeline', label: 'Timeline', icon: ListTree },
  { id: 'health', label: 'Health', icon: HeartPulse },
  { id: 'inventory', label: 'Inventory', icon: PackageSearch },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'diagnostics', label: 'Diagnose', icon: Stethoscope },
]

const NAV_BOTTOM: NavItem[] = [
  { id: 'assistant', label: 'Assistant', icon: Sparkles },
  { id: 'settings', label: 'Settings', icon: Settings },
]

/** Midnight chrome matching the Pulse 1.2 Windows app: title bar, icon rail, canvas. */
export function PulseAppShell({
  active,
  children,
  className,
}: {
  active: PulseNav
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'midnight-shell flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#08080A] text-[#F4F4F5]',
        className,
      )}
    >
      <TitleBar />
      <div className="flex min-h-0 flex-1 gap-3 px-3 pb-3">
        <aside className="flex w-[60px] shrink-0 flex-col items-center rounded-[16px] border border-white/[0.08] bg-[#0D0D10] py-2.5">
          <span
            className="mb-3 flex size-10 items-center justify-center rounded-[11px]"
            style={{ background: MIDNIGHT.lime }}
          >
            <PulseMark size={20} color={MIDNIGHT.canvas} />
          </span>
          <nav className="flex w-full flex-col gap-1 px-1.5">
            {NAV_TOP.map((item) => (
              <RailItem key={item.id} item={item} active={item.id === active} />
            ))}
          </nav>
          <nav className="mt-auto flex w-full flex-col gap-1 px-1.5">
            {NAV_BOTTOM.map((item) => (
              <RailItem key={item.id} item={item} active={item.id === active} />
            ))}
          </nav>
          <span className="live-dot mt-3 size-1.5 rounded-full bg-[#34D399]" aria-hidden />
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  )
}

function TitleBar() {
  return (
    <div className="flex h-9 shrink-0 items-center px-4">
      <span className="w-28 text-[11px] font-medium whitespace-nowrap text-white/70">{SITE.name}</span>
      <div className="mx-auto flex h-6 w-[300px] items-center gap-2 rounded-full border border-white/[0.08] bg-[#111114] px-3">
        <Search className="size-3 text-white/40" aria-hidden />
        <span className="text-[10px] text-white/40">Search or jump to…</span>
        <span className="font-mono-pulse ml-auto rounded-[5px] border border-white/[0.1] px-1.5 text-[8px] text-white/50">
          Ctrl K
        </span>
      </div>
      <div className="flex w-24 justify-end gap-4 text-white/60">
        <Minus className="size-3" aria-hidden />
        <Square className="size-2.5" aria-hidden />
        <X className="size-3" aria-hidden />
      </div>
    </div>
  )
}

function RailItem({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-0.5 rounded-[9px] py-1.5',
        active ? 'bg-[#1E1E23] text-white' : 'text-white/55',
      )}
    >
      <Icon
        className="size-4"
        strokeWidth={1.8}
        style={active ? { color: MIDNIGHT.lime } : undefined}
        aria-hidden
      />
      <span className="text-[8.5px] font-medium">{item.label}</span>
    </div>
  )
}

export function ConnectedBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-[#34D399]/35 bg-[#34D399]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#34D399]',
        className,
      )}
    >
      <Radio className="size-3" aria-hidden />
      Connected
    </span>
  )
}

export function LiveBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-[#34D399]/35 bg-[#34D399]/10 px-2 py-0.5 text-[10px] font-semibold text-[#34D399]',
        className,
      )}
    >
      <Radio className="size-3" aria-hidden />
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
        <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-white">{title}</h3>
        <ConnectedBadge />
        {actions ? <div className="ml-auto flex items-center gap-2">{actions}</div> : null}
      </div>
      {subtitle ? <p className="mt-1.5 text-[12px] text-white/50">{subtitle}</p> : null}
    </div>
  )
}
