'use client'

import { Copy, Plug, Radio, RefreshCw, Server, Share2, Zap } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { PageHeader, PulseAppShell } from './PulseAppShell'
import { DemoFrame, ScaleToFit } from './shared'

const PIPELINE = [
  'Windows Event Log',
  'Collector',
  'Intelligence',
  'IPC',
  'Flutter',
  'Timeline',
]

export function DiagnosticsDemo() {
  const reduceMotion = useReducedMotion()

  return (
    <DemoFrame>
      <ScaleToFit width={960} height={560}>
        <div className="h-[560px] w-[960px]">
          <PulseAppShell active="diagnostics" className="h-full">
            <div className="h-full overflow-hidden p-5">
              <PageHeader
                title="Diagnostics"
                subtitle="Troubleshooting — When something looks wrong, start here. All data stays on this PC."
              />

              <div className="grid grid-cols-2 gap-3">
                <Card
                  icon={Server}
                  title="Service"
                  delay={0.08}
                  reduceMotion={!!reduceMotion}
                  rows={[
                    ['Status', 'Connected'],
                    ['Service version', '0.1.2-beta'],
                    ['IPC protocol', '1'],
                    ['Mode', 'Console'],
                  ]}
                />
                <Card
                  icon={Radio}
                  title="Live Monitoring"
                  delay={0.14}
                  reduceMotion={!!reduceMotion}
                  rows={[
                    ['Status', 'Subscribed'],
                    ['Active channel', 'System'],
                    ['Events pushed', '0'],
                    ['Events dropped', '0'],
                  ]}
                />
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="rounded-xl border border-white/[0.06] bg-[#15181e] p-3.5"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <Plug className="size-4 text-[#60CDFF]" aria-hidden />
                    <p className="text-[13px] font-semibold">IPC</p>
                    <span className="ml-auto rounded-md bg-white/[0.04] px-1.5 py-0.5 font-mono-pulse text-[9px] text-white/40">
                      \\.\pipe\PulseService
                    </span>
                  </div>
                  <dl className="space-y-1.5 text-[11px]">
                    <Row label="Messages sent" value="96" />
                    <Row label="Messages received" value="94" />
                    <Row label="Latency" value="< 2 ms" />
                  </dl>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-[#60CDFF] px-2.5 py-1.5 text-[10px] font-semibold text-[#0b1220]">
                      <Zap className="size-3" aria-hidden />
                      Ping Service
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 text-[10px] text-white/70">
                      <RefreshCw className="size-3" aria-hidden />
                      Restart IPC
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 text-[10px] text-white/70">
                      <Copy className="size-3" aria-hidden />
                      Copy
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.26 }}
                  className="rounded-xl border border-white/[0.06] bg-[#15181e] p-3.5"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <Share2 className="size-4 text-[#60CDFF]" aria-hidden />
                    <p className="text-[13px] font-semibold">Event Pipeline</p>
                  </div>
                  <ul className="space-y-1.5">
                    {PIPELINE.map((step, i) => (
                      <motion.li
                        key={step}
                        initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.32 + i * 0.05 }}
                        className="flex items-center justify-between rounded-lg bg-white/[0.02] px-2.5 py-1.5"
                      >
                        <span className="text-[11px] text-white/75">{step}</span>
                        <span className="rounded-full bg-[#3dd68c]/15 px-2 py-0.5 text-[9px] font-semibold text-[#3dd68c]">
                          Healthy
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </PulseAppShell>
        </div>
      </ScaleToFit>
    </DemoFrame>
  )
}

function Card({
  icon: Icon,
  title,
  rows,
  delay,
  reduceMotion,
}: {
  icon: typeof Server
  title: string
  rows: Array<[string, string]>
  delay: number
  reduceMotion: boolean
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-xl border border-white/[0.06] bg-[#15181e] p-3.5"
    >
      <div className="mb-3 flex items-center gap-2">
        <Icon className="size-4 text-[#60CDFF]" aria-hidden />
        <p className="text-[13px] font-semibold">{title}</p>
      </div>
      <dl className="space-y-1.5 text-[11px]">
        {rows.map(([label, value]) => (
          <Row key={label} label={label} value={value} />
        ))}
      </dl>
    </motion.div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-white/40">{label}</dt>
      <dd className="font-medium text-white/85">{value}</dd>
    </div>
  )
}
