'use client'

import { ChevronRight, RefreshCw } from 'lucide-react'
import { PageHeader, PulseAppShell } from './PulseAppShell'
import { ScaleToFit } from './shared'
import { cn } from '@/lib/cn'

const FILTERS = ['All', 'Errors', 'Warnings', 'System', 'Application'] as const

const EVENTS = [
  {
    tone: 'warn' as const,
    latest: true,
    title: 'COM Permission Warning',
    body: 'An application attempted to access a COM component without sufficient permissions. No action required.',
    meta: 'Just now · System',
    tag: 'Warning',
  },
  {
    tone: 'info' as const,
    title: 'IsolatedUserMode Event',
    body: 'Secure Trustlet IsolatedUserMode started with status STATUS_SUCCESS.',
    meta: '45m ago · System',
    tag: 'Info',
  },
  {
    tone: 'info' as const,
    title: 'Windows Service Configuration Changed',
    body: 'A service configuration change was recorded in the System channel.',
    meta: '1h ago · System',
    tag: 'Info',
  },
  {
    tone: 'info' as const,
    title: 'IsolatedUserMode Event',
    body: 'Secure Trustlet completed initialization successfully.',
    meta: '1h ago · System',
    tag: 'Info',
  },
]

const toneStyles = {
  warn: {
    rail: 'bg-amber-400',
    tag: 'bg-amber-400/15 text-amber-300',
    latest: 'text-amber-300',
  },
  info: {
    rail: 'bg-[#60CDFF]',
    tag: 'bg-[#60CDFF]/15 text-[#7ad7ff]',
    latest: 'text-[#7ad7ff]',
  },
}

export function TimelineDemo() {
  return (
    <ScaleToFit width={920} height={520}>
      <div className="h-[520px] w-[920px]">
        <PulseAppShell active="timeline" className="h-full">
          <div className="flex h-full flex-col p-5">
            <div className="mb-3 flex items-start justify-between gap-3">
              <PageHeader title="Timeline" />
            </div>

            <div className="mb-3 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5">
              <span className="text-[12px] text-white/35">
                Search becomes available once live events are collected.
              </span>
              <span className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/30">
                Unavailable
              </span>
            </div>

            <div className="mb-4 flex items-center gap-1.5">
              {FILTERS.map((filter, i) => (
                <span
                  key={filter}
                  className={cn(
                    'rounded-full px-3 py-1 text-[11px] font-medium',
                    i === 0
                      ? 'bg-[#60CDFF]/18 text-[#7ad7ff]'
                      : 'border border-white/[0.08] text-white/45',
                  )}
                >
                  {filter}
                </span>
              ))}
              <span className="ml-auto inline-flex size-8 items-center justify-center rounded-full border border-white/[0.08] text-white/40">
                <RefreshCw className="size-3.5" aria-hidden />
              </span>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden">
              <div className="absolute top-3 bottom-3 left-[7px] w-px bg-white/10" aria-hidden />
              <ul className="space-y-2.5">
                {EVENTS.map((event) => {
                  const styles = toneStyles[event.tone]
                  return (
                    <li key={event.title + event.meta} className="relative pl-6">
                      <span
                        className={cn(
                          'absolute top-4 left-0 size-3.5 rounded-full border-2 border-[#0d0f12]',
                          styles.rail,
                        )}
                        aria-hidden
                      />
                      <div className="rounded-xl border border-white/[0.06] bg-[#15181e] p-3.5">
                        <div className="flex items-start gap-3">
                          <div className={cn('mt-0.5 w-0.5 self-stretch rounded-full', styles.rail)} />
                          <div className="min-w-0 flex-1">
                            {event.latest ? (
                              <p className={cn('mb-1 text-[10px] font-semibold tracking-wide uppercase', styles.latest)}>
                                Latest
                              </p>
                            ) : null}
                            <p className="text-[14px] font-semibold text-white">{event.title}</p>
                            <p className="mt-1 text-[12px] leading-relaxed text-white/45">{event.body}</p>
                            <div className="mt-2.5 flex flex-wrap items-center gap-2">
                              <span className="text-[11px] text-white/35">{event.meta}</span>
                              <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-medium', styles.tag)}>
                                {event.tag}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="mt-1 size-4 shrink-0 text-white/25" aria-hidden />
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </PulseAppShell>
      </div>
    </ScaleToFit>
  )
}
