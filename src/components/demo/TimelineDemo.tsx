'use client'

import { ChevronRight, RefreshCw } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { LiveBadge, PageHeader, PulseAppShell } from './PulseAppShell'
import { DemoFrame, ScaleToFit } from './shared'
import { cn } from '@/lib/cn'

const FILTERS = [
  'All severity',
  'All sources',
  'All types',
  'All time',
  'Advanced',
] as const

const EVENTS = [
  {
    tone: 'info' as const,
    latest: true,
    title: 'Security-SPP Event',
    body: 'Offline low-level transition completed successfully. No action required.',
    meta: '8m ago · Application',
    tag: 'Info',
  },
  {
    tone: 'critical' as const,
    title: 'DistributedCOM Event',
    body: 'An application attempted to access a COM component without sufficient permissions.',
    meta: '22m ago · System',
    tag: 'Error',
  },
  {
    tone: 'info' as const,
    title: 'IsolatedUserMode Event',
    body: 'Secure Trustlet IsolatedUserMode started with status STATUS_SUCCESS.',
    meta: '45m ago · System',
    tag: 'Info',
  },
  {
    tone: 'warn' as const,
    title: 'Windows Service Configuration Changed',
    body: 'A service configuration change was recorded in the System channel.',
    meta: '1h ago · System',
    tag: 'Warning',
  },
  {
    tone: 'critical' as const,
    title: 'Kernel-Power · Unexpected Shutdown',
    body: 'The system restarted without a clean shutdown. Check power and driver stability.',
    meta: '1h ago · System',
    tag: 'Error',
  },
  {
    tone: 'info' as const,
    title: 'Service Control Manager',
    body: 'Windows Update service entered the running state.',
    meta: '2h ago · System',
    tag: 'Info',
  },
]

const toneStyles = {
  critical: {
    rail: 'bg-[#f87171]',
    tag: 'bg-[#f87171]/15 text-[#fca5a5]',
    latest: 'text-[#fca5a5]',
  },
  warn: {
    rail: 'bg-amber-400',
    tag: 'bg-amber-400/15 text-amber-300',
    latest: 'text-amber-300',
  },
  info: {
    rail: 'bg-[#3DDA7A]',
    tag: 'bg-[#3DDA7A]/15 text-[#6EE7A0]',
    latest: 'text-[#6EE7A0]',
  },
}

export function TimelineDemo() {
  const reduceMotion = useReducedMotion()
  const stream = [...EVENTS, ...EVENTS]

  return (
    <DemoFrame>
      <ScaleToFit width={960} height={560}>
        <div className="h-[560px] w-[960px]">
          <PulseAppShell active="timeline" className="h-full">
            <div className="flex h-full flex-col p-5">
              <PageHeader
                title="Timeline"
                actions={<LiveBadge />}
              />

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5"
              >
                <span className="text-[12px] text-white/40">
                  Search provider, Event ID, computer, message, process, PID…
                </span>
              </motion.div>

              <div className="mb-4 flex flex-wrap items-center gap-1.5">
                {FILTERS.map((filter, i) => (
                  <motion.span
                    key={filter}
                    initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.12 + i * 0.04 }}
                    className={cn(
                      'rounded-lg px-2.5 py-1 text-[11px] font-medium',
                      i === 0
                        ? 'bg-[#3DDA7A]/18 text-[#6EE7A0]'
                        : 'border border-white/[0.08] text-white/45',
                    )}
                  >
                    {filter}
                  </motion.span>
                ))}
                <span className="ml-auto inline-flex size-8 items-center justify-center rounded-full border border-white/[0.08] text-white/40">
                  <RefreshCw className="size-3.5" aria-hidden />
                </span>
              </div>

              <div className="relative min-h-0 flex-1 overflow-hidden">
                <div className="absolute top-3 bottom-3 left-[7px] w-px bg-white/10" aria-hidden />
                <ul className={cn('space-y-2.5', !reduceMotion && 'stream-track')}>
                  {stream.map((event, index) => {
                    const styles = toneStyles[event.tone]
                    return (
                      <motion.li
                        key={`${event.title}-${event.meta}-${index}`}
                        initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: Math.min(index, 4) * 0.08 }}
                        className="relative pl-6"
                      >
                        <span
                          className={cn(
                            'absolute top-4 left-0 size-3.5 rounded-full border-2 border-[#0d0f12]',
                            styles.rail,
                          )}
                          aria-hidden
                        />
                        <div className="rounded-xl border border-white/[0.06] bg-[#15181e] p-3.5">
                          <div className="flex items-start gap-3">
                            <div
                              className={cn('mt-0.5 w-0.5 self-stretch rounded-full', styles.rail)}
                            />
                            <div className="min-w-0 flex-1">
                              {event.latest && index % EVENTS.length === 0 ? (
                                <p
                                  className={cn(
                                    'mb-1 text-[10px] font-semibold tracking-wide uppercase',
                                    styles.latest,
                                  )}
                                >
                                  Latest
                                </p>
                              ) : null}
                              <p className="text-[14px] font-semibold text-white">{event.title}</p>
                              <p className="mt-1 text-[12px] leading-relaxed text-white/45">
                                {event.body}
                              </p>
                              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                                <span className="text-[11px] text-white/35">{event.meta}</span>
                                <span
                                  className={cn(
                                    'rounded-full px-2 py-0.5 text-[10px] font-medium',
                                    styles.tag,
                                  )}
                                >
                                  {event.tag}
                                </span>
                              </div>
                            </div>
                            <ChevronRight
                              className="mt-1 size-4 shrink-0 text-white/25"
                              aria-hidden
                            />
                          </div>
                        </div>
                      </motion.li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </PulseAppShell>
        </div>
      </ScaleToFit>
    </DemoFrame>
  )
}
