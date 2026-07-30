import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ShieldTone = 'blue' | 'navy' | 'green' | 'lime' | 'cyan' | 'orange' | 'amber'

const TONES: Record<ShieldTone, string> = {
  blue: 'bg-[#007ec6]',
  navy: 'bg-[#0b3d91]',
  green: 'bg-[#4c1]',
  lime: 'bg-[#97ca00]',
  cyan: 'bg-[#00b4d8]',
  orange: 'bg-[#fe7d37]',
  amber: 'bg-[#dfb317]',
}

export type ShieldItem = {
  label: string
  value: string
  tone: ShieldTone
  icon?: ReactNode
}

export function Shield({ label, value, tone, icon }: ShieldItem) {
  return (
    <span
      className="inline-flex h-[22px] overflow-hidden rounded-[4px] text-[11px] leading-none font-semibold tracking-tight text-white shadow-[0_1px_0_rgba(0,0,0,0.08)]"
      title={`${label}: ${value}`}
    >
      <span className="inline-flex items-center gap-1 bg-[#555] px-2">
        {icon ? <span className="inline-flex size-3 items-center justify-center">{icon}</span> : null}
        {label}
      </span>
      <span className={cn('inline-flex items-center px-2', TONES[tone])}>{value}</span>
    </span>
  )
}

export function ShieldRow({ items, className }: { items: ShieldItem[]; className?: string }) {
  return (
    <div
      className={cn('flex flex-wrap items-center justify-center gap-2', className)}
      role="list"
      aria-label="Project status"
    >
      {items.map((item) => (
        <span key={`${item.label}-${item.value}`} role="listitem">
          <Shield {...item} />
        </span>
      ))}
    </div>
  )
}

function FlutterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3" aria-hidden fill="currentColor">
      <path d="M14.314 0 2.3 12.014l3.543 3.543L21.4 0zM14.314 9.886 8.043 16.16l3.543 3.543 9.628-9.628z" />
      <path d="m11.586 19.703 3.543 3.543L21.4 17.0l-3.543-3.543z" opacity=".7" />
    </svg>
  )
}

function CppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3" aria-hidden fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 14.4c-2.4 0-4.2-1.8-4.2-4.4s1.8-4.4 4.2-4.4c1.1 0 2 .4 2.7 1l-1.1 1.2c-.4-.4-.9-.6-1.5-.6-1.4 0-2.4 1.1-2.4 2.8s1 2.8 2.4 2.8c.6 0 1.1-.2 1.5-.6l1.1 1.2c-.7.6-1.6 1-2.7 1zm5.4-.8h-1.2v-1.2h-1.2v-1.2h1.2V12h1.2v1.2h1.2v1.2h-1.2zm3.6 0h-1.2v-1.2h-1.2v-1.2h1.2V12h1.2v1.2h1.2v1.2H19.8z" />
    </svg>
  )
}

export function PulseShields({ version, className }: { version: string; className?: string }) {
  const items: ShieldItem[] = [
    { label: 'platform', value: 'Windows 10/11', tone: 'blue' },
    { label: 'release', value: `v${version}`, tone: 'orange' },
    { label: 'UI', value: 'Flutter', tone: 'navy', icon: <FlutterIcon /> },
    { label: 'service', value: 'C++ 20', tone: 'navy', icon: <CppIcon /> },
    { label: 'license', value: 'MIT', tone: 'lime' },
    { label: 'privacy', value: 'local-first', tone: 'cyan' },
  ]

  return <ShieldRow items={items} className={className} />
}
