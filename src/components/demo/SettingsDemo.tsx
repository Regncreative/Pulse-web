'use client'

import { PageHeader, PulseAppShell } from './PulseAppShell'
import { ScaleToFit } from './shared'
import { cn } from '@/lib/cn'

const COLLECTION = [
  { name: 'System', desc: 'Windows System Event Log — active channel', status: 'Active' as const },
  { name: 'Application', desc: 'Application Event Log', status: 'Future' as const },
  { name: 'Security', desc: 'Security Event Log', status: 'Future' as const },
  { name: 'Setup', desc: 'Setup Event Log', status: 'Future' as const },
  { name: 'ETW', desc: 'Event Tracing for Windows', status: 'Future' as const },
  { name: 'WMI', desc: 'Windows Management Instrumentation', status: 'Future' as const },
]

export function SettingsDemo() {
  return (
    <ScaleToFit width={920} height={520}>
      <div className="h-[520px] w-[920px]">
        <PulseAppShell active="settings" className="h-full">
          <div className="h-full overflow-hidden p-5">
            <PageHeader title="Settings" />
            <p className="mb-1 text-[15px] font-semibold text-white">Preferences</p>
            <p className="mb-4 text-[12px] text-white/45">
              Everything stays on this PC. No accounts, cloud sync, or telemetry.
            </p>

            <div className="mb-3 rounded-xl border border-white/[0.06] bg-[#15181e] p-4">
              <p className="mb-3 text-[12px] font-semibold text-white/80">Timeline</p>
              <Slider label="Maximum stored events" value="500 events in memory" fill={72} />
              <Slider label="Startup snapshot size" value="100 events on connect" fill={40} />
              <Toggle label="Auto-scroll" desc="Keep Timeline pinned to newest events" on />
              <Toggle label="Live Monitoring" desc="Receive pushed Event Log updates" on />
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-[#15181e] p-3">
              <p className="mb-2 px-1 text-[12px] font-semibold text-white/80">Collection</p>
              <ul className="space-y-1">
                {COLLECTION.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-white/[0.02]"
                  >
                    <div>
                      <p className="text-[12px] font-medium text-white/90">{item.name}</p>
                      <p className="text-[10px] text-white/35">{item.desc}</p>
                    </div>
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[9px] font-semibold',
                        item.status === 'Active'
                          ? 'bg-[#3dd68c]/15 text-[#3dd68c]'
                          : 'bg-white/[0.06] text-white/35',
                      )}
                    >
                      {item.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </PulseAppShell>
      </div>
    </ScaleToFit>
  )
}

function Slider({ label, value, fill }: { label: string; value: string; fill: number }) {
  return (
    <div className="mb-3">
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="text-[11px] text-white/70">{label}</span>
        <span className="font-mono-pulse text-[10px] text-white/35">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-[#60CDFF]" style={{ width: `${fill}%` }} />
      </div>
    </div>
  )
}

function Toggle({ label, desc, on }: { label: string; desc: string; on?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-white/[0.05] py-2.5 first:border-0">
      <div>
        <p className="text-[12px] font-medium text-white/90">{label}</p>
        <p className="text-[10px] text-white/35">{desc}</p>
      </div>
      <span
        className={cn(
          'relative h-5 w-9 rounded-full',
          on ? 'bg-[#60CDFF]' : 'bg-white/15',
        )}
        aria-hidden
      >
        <span
          className={cn(
            'absolute top-0.5 size-4 rounded-full bg-[#0b1220]',
            on ? 'right-0.5' : 'left-0.5 bg-white/70',
          )}
        />
      </span>
    </div>
  )
}
