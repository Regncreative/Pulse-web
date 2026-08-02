'use client'

import { Copy, Plug, RefreshCw, Zap } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { PageHeader, PulseAppShell } from './PulseAppShell'
import { DemoFrame, ScaleToFit } from './shared'
import { cn } from '@/lib/cn'

const SUBNAV = [
  'Service',
  'IPC',
  'Live Monitoring',
  'Event Pipeline',
  'Collectors',
  'Performance',
  'Health Checks',
  'Advanced',
]

const LATENCY: Array<[string, string]> = [
  ['Last ping', '45 ms'],
  ['Average ping', '52.0 ms'],
  ['Reconnects', '1'],
]

const THROUGHPUT: Array<[string, string]> = [
  ['Messages received', '637'],
  ['Bytes sent', '15.8 MiB'],
  ['Rate', '1.1 msg/s'],
]

export function DiagnosticsDemo() {
  const reduceMotion = useReducedMotion()

  return (
    <DemoFrame>
      <ScaleToFit width={960} height={560}>
        <div className="h-[560px] w-[960px]">
          <PulseAppShell active="diagnostics" className="h-full">
            <div className="flex h-full overflow-hidden">
              <aside className="w-[168px] shrink-0 border-r border-white/[0.06] bg-[#12151a] p-3">
                <p className="mb-2 px-2 text-[10px] font-semibold tracking-[0.12em] text-white/30 uppercase">
                  Diagnostics
                </p>
                <ul className="space-y-0.5">
                  {SUBNAV.map((item, i) => (
                    <li
                      key={item}
                      className={cn(
                        'rounded-lg px-2.5 py-2 text-[11px] font-medium',
                        i === 1
                          ? 'bg-[#3DDA7A]/12 text-[#6EE7A0]'
                          : 'text-white/50',
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>

              <div className="min-w-0 flex-1 overflow-hidden p-5">
                <PageHeader title="Diagnostics" />

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="rounded-xl border border-white/[0.06] bg-[#15181e] p-4"
                >
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <Plug className="size-4 text-[#3DDA7A]" aria-hidden />
                    <p className="text-[15px] font-semibold">IPC</p>
                    <span className="rounded-full bg-[#3DDA7A]/15 px-2 py-0.5 text-[10px] font-semibold text-[#3DDA7A]">
                      Connected
                    </span>
                    <span className="ml-auto rounded-md bg-white/[0.04] px-2 py-0.5 font-mono-pulse text-[9px] text-white/40">
                      \\.\pipe\PulseService
                    </span>
                  </div>
                  <p className="mb-4 text-[11px] text-white/40">
                    Named-pipe connection health, latency, and recovery actions.
                  </p>

                  <Section title="Latency & recovery" rows={LATENCY} delay={0.16} reduceMotion={!!reduceMotion} />
                  <Section title="Throughput" rows={THROUGHPUT} delay={0.22} reduceMotion={!!reduceMotion} />

                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="mt-3 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2"
                  >
                    <p className="mb-1 text-[10px] font-semibold tracking-wide text-white/35 uppercase">
                      Reconnect history
                    </p>
                    <p className="font-mono-pulse text-[10px] text-white/55">
                      2026-08-02 12:34:57 · Reconnected after disconnect
                    </p>
                  </motion.div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#3DDA7A] px-3 py-2 text-[11px] font-semibold text-[#0b1220]">
                      <Zap className="size-3.5" aria-hidden />
                      Ping Service
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-[11px] text-white/70">
                      <RefreshCw className="size-3.5" aria-hidden />
                      Restart IPC Connection
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-[11px] text-white/70">
                      <Copy className="size-3.5" aria-hidden />
                      Copy Diagnostics
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </PulseAppShell>
        </div>
      </ScaleToFit>
    </DemoFrame>
  )
}

function Section({
  title,
  rows,
  delay,
  reduceMotion,
}: {
  title: string
  rows: Array<[string, string]>
  delay: number
  reduceMotion: boolean
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="mb-3"
    >
      <p className="mb-1.5 text-[10px] font-semibold tracking-[0.12em] text-white/30 uppercase">
        {title}
      </p>
      <dl className="space-y-1.5 text-[11px]">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-3">
            <dt className="text-white/40">{label}</dt>
            <dd className="font-medium text-white/85">{value}</dd>
          </div>
        ))}
      </dl>
    </motion.div>
  )
}
