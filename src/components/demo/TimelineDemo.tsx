'use client'

import { ChevronDown, Download, RefreshCw, Search } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { LiveBadge, PageHeader, PulseAppShell } from './PulseAppShell'
import { DemoFrame, MIDNIGHT, ScaleToFit } from './shared'
import { cn } from '@/lib/cn'

const FILTERS = ['All severity', 'All sources', 'All types', 'All time'] as const

type Severity = 'info' | 'warn' | 'error'

const SEVERITY_COLOR: Record<Severity, string> = {
  info: MIDNIGHT.info,
  warn: MIDNIGHT.warn,
  error: MIDNIGHT.err,
}

/** 30-minute slices over the last 24 hours: 0 = idle, otherwise the worst severity. */
const ACTIVITY: Array<{ height: number; severity: Severity | null }> = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 1, 4,
].map((height, index) => ({
  height,
  severity:
    height === 0
      ? null
      : index === 24 || index === 47
        ? 'error'
        : index === 25 || index === 45
          ? 'warn'
          : 'info',
}))

const EVENTS: Array<{
  time: string
  severity: Severity
  title: string
  body: string
  meta: string
  latest?: boolean
}> = [
  {
    time: '23:15',
    severity: 'info',
    title: 'Windows Update installed an update',
    body: 'Windows Update finished installing 1 update successfully.',
    meta: '3m ago · System · WindowsUpdateClient · ID 19 · Info',
    latest: true,
  },
  {
    time: '23:02',
    severity: 'error',
    title: 'Explorer unexpectedly closed',
    body: 'Windows restarted Explorer automatically.',
    meta: '16m ago · Application · Application Error · ID 1000 · Error',
  },
  {
    time: '22:47',
    severity: 'warn',
    title: 'A driver took longer than expected',
    body: 'The display driver responded slowly during startup.',
    meta: '31m ago · System · Display · ID 4101 · Warning',
  },
  {
    time: '22:30',
    severity: 'error',
    title: 'The PC restarted without shutting down cleanly',
    body: 'Check power, drivers and recent crashes around this time.',
    meta: '48m ago · System · Kernel-Power · ID 41 · Critical',
  },
  {
    time: '22:12',
    severity: 'info',
    title: 'Windows Update service started',
    body: 'The Windows Update service entered the running state.',
    meta: '1h ago · System · Service Control Manager · ID 7036 · Info',
  },
]

export function TimelineDemo() {
  const reduceMotion = useReducedMotion()
  const stream = [...EVENTS, ...EVENTS]

  return (
    <DemoFrame>
      <ScaleToFit width={960} height={560}>
        <div className="h-[560px] w-[960px]">
          <PulseAppShell active="timeline" className="h-full">
            <div className="flex h-full flex-col pt-3 pr-3">
              <PageHeader title="Timeline" actions={<LiveBadge />} />

              <div className="mb-3 flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#111114] px-3.5 py-2">
                <Search className="size-3.5 text-white/40" aria-hidden />
                <span className="text-[11px] text-white/40">
                  Search provider, Event ID, computer, message, process, PID…
                </span>
              </div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="mb-3 rounded-[18px] border border-white/[0.08] bg-[#111114] px-5 pt-4 pb-3"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono-pulse text-[9px] tracking-[0.14em] text-white/50 uppercase">
                      Monday 12 October · 23:18
                    </p>
                    <p className="mt-1.5 text-[22px] leading-tight font-semibold tracking-[-0.02em] text-white">
                      Windows reported 2 problems in the last hour.
                    </p>
                    <p className="mt-1 text-[12px] text-white/55">
                      14 events · 2 errors in the last hour.
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-6 text-right">
                    <Count label="Events · 1 h" value="14" />
                    <Count label="Errors" value="2" color={MIDNIGHT.err} />
                    <Count label="Warnings" value="1" color={MIDNIGHT.warn} />
                  </div>
                </div>
                <div className="mt-3 flex h-9 items-end gap-[3px]" aria-hidden>
                  {ACTIVITY.map((slice, index) => (
                    <motion.span
                      key={index}
                      className="flex-1 rounded-[2px]"
                      style={{
                        // Like the app: only problem slices are colored; quiet activity stays neutral.
                        background:
                          slice.severity === 'error' || slice.severity === 'warn'
                            ? SEVERITY_COLOR[slice.severity]
                            : slice.severity === 'info'
                              ? 'rgba(255,255,255,0.22)'
                              : 'rgba(255,255,255,0.12)',
                      }}
                      initial={reduceMotion ? false : { height: 2 }}
                      animate={{ height: slice.height === 0 ? 2 : 6 + slice.height * 7 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.01 }}
                    />
                  ))}
                </div>
                <div className="font-mono-pulse mt-1.5 flex justify-between text-[8px] text-white/40">
                  <span>24 h ago</span>
                  <span>18 h</span>
                  <span>12 h</span>
                  <span>6 h</span>
                  <span>Now</span>
                </div>
              </motion.div>

              <div className="mb-3 flex items-center gap-1.5">
                {FILTERS.map((filter) => (
                  <span
                    key={filter}
                    className="inline-flex items-center gap-1 rounded-full border border-white/[0.12] px-2.5 py-1 text-[10px] font-medium text-white/80"
                  >
                    {filter}
                    <ChevronDown className="size-3 text-white/50" aria-hidden />
                  </span>
                ))}
                <span className="rounded-full border border-white/[0.12] px-2.5 py-1 text-[10px] font-medium text-white/80">
                  Advanced
                </span>
                <span className="ml-auto flex gap-3 text-white/60">
                  <Download className="size-3.5" aria-hidden />
                  <RefreshCw className="size-3.5" aria-hidden />
                </span>
              </div>

              <div className="relative min-h-0 flex-1 overflow-hidden rounded-t-[18px] border border-b-0 border-white/[0.08] bg-[#111114] px-4">
                <ul className={cn('pt-3', !reduceMotion && 'stream-track')}>
                  {stream.map((event, index) => (
                    <li
                      key={`${event.time}-${index}`}
                      className="grid grid-cols-[44px_14px_1fr] pb-3"
                    >
                      <span className="font-mono-pulse pt-0.5 text-[10px] text-white/50">
                        {event.time}
                      </span>
                      <span className="relative flex justify-center">
                        <span
                          className="mt-1.5 size-1.5 rounded-full"
                          style={{ background: SEVERITY_COLOR[event.severity] }}
                          aria-hidden
                        />
                        <span
                          className="absolute top-4 bottom-[-12px] w-px bg-white/[0.08]"
                          aria-hidden
                        />
                      </span>
                      <div className="min-w-0 pl-1.5">
                        <p className="flex items-center gap-2 text-[13px] font-semibold text-white">
                          {event.title}
                          {event.latest && index === 0 ? (
                            <span
                              className="rounded-full px-1.5 py-px text-[9px] font-semibold text-[#08080A]"
                              style={{ background: MIDNIGHT.lime }}
                            >
                              Latest
                            </span>
                          ) : null}
                        </p>
                        <p className="mt-0.5 text-[12px] text-white/75">{event.body}</p>
                        <p className="mt-1 truncate text-[10px] text-white/45">{event.meta}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#111114] to-transparent"
                  aria-hidden
                />
              </div>
            </div>
          </PulseAppShell>
        </div>
      </ScaleToFit>
    </DemoFrame>
  )
}

function Count({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div>
      <p className="text-[10px] text-white/55">{label}</p>
      <p
        className="font-mono-pulse mt-1 text-[26px] leading-none font-medium"
        style={{ color: color ?? '#F4F4F5' }}
      >
        {value}
      </p>
    </div>
  )
}
