'use client'

import { Clock, Cpu, Gpu, LayoutGrid, MemoryStick, Monitor } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { PageHeader, PulseAppShell } from './PulseAppShell'
import { DemoFrame, MIDNIGHT, ScaleToFit, utilizationColor } from './shared'

const MEMORY_PERCENT = 63
const RING_RADIUS = 38
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

const CHARTS: Array<{ label: string; value: string; percent: number; path: string }> = [
  {
    label: 'CPU',
    value: '7 %',
    percent: 7,
    path: 'M0 14 L18 36 L34 30 L50 40 L66 34 L82 46 L98 22 L114 36 L130 38 L150 44',
  },
  {
    label: 'Memory',
    value: '20.0 GB',
    percent: 63,
    path: 'M0 10 L18 12 L34 12 L50 22 L66 18 L82 28 L98 34 L114 8 L130 44 L150 50',
  },
  {
    label: 'GPU',
    value: '1 %',
    percent: 1,
    path: 'M0 44 L18 42 L30 6 L44 48 L60 40 L80 26 L96 18 L112 18 L130 22 L150 22',
  },
  {
    label: 'Disk',
    value: '8.5 MB/s',
    percent: 12,
    path: 'M0 48 L30 48 L60 49 L90 48 L110 49 L126 12 L140 12 L150 16',
  },
]

const IDENTITY = [
  { icon: Monitor, label: 'Windows', value: 'Windows 11 Pro 25H2' },
  { icon: Cpu, label: 'CPU', value: 'AMD Ryzen 5 7500F' },
  { icon: Gpu, label: 'GPU', value: 'NVIDIA GeForce RTX 3060' },
  { icon: MemoryStick, label: 'Memory', value: '32 GiB' },
  { icon: Clock, label: 'Uptime', value: '15h 56m' },
]

const TILE = 'rounded-[18px] border border-white/[0.08] bg-[#111114]'

export function HealthDemo() {
  const reduceMotion = useReducedMotion()
  const appear = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay },
        }

  return (
    <DemoFrame>
      <ScaleToFit width={960} height={560}>
        <div className="h-[560px] w-[960px]">
          <PulseAppShell active="health" className="h-full">
            <div className="flex h-full flex-col pt-3 pr-3">
              <PageHeader
                title="System Health"
                actions={<LayoutGrid className="size-4 text-white/60" aria-hidden />}
              />

              <div className="grid grid-cols-[1.25fr_1fr_1fr] grid-rows-[118px_118px] gap-2.5">
                <motion.div {...appear(0.05)} className={`${TILE} row-span-2 flex flex-col p-3.5`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono-pulse text-[9px] tracking-[0.14em] text-white/55 uppercase">
                        System pulse
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-[26px] font-semibold tracking-[-0.02em]">
                        <span className="size-2 rounded-full bg-[#34D399]" aria-hidden />
                        Healthy
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className="font-mono-pulse text-[34px] leading-none"
                        style={{ color: MIDNIGHT.lime }}
                      >
                        92
                      </p>
                      <p className="mt-1 text-[10px] text-white/60">Health score</p>
                    </div>
                  </div>
                  <p className="mt-1 text-[12px] text-white/65">
                    Everything looks normal. Up for 15h 56m.
                  </p>
                  <p className="mt-3 flex justify-between text-[10px] text-white/55">
                    <span>CPU · last 60 seconds</span>
                    <span>Just now</span>
                  </p>
                  <svg
                    viewBox="0 0 300 40"
                    className="mt-auto h-10 w-full"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <motion.path
                      d="M0 22 L40 24 L80 27 L120 30 L160 29 L200 31 L240 27 L270 29 L300 30"
                      fill="none"
                      stroke={MIDNIGHT.lime}
                      strokeWidth="1.6"
                      initial={reduceMotion ? false : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.1, delay: 0.2 }}
                    />
                  </svg>
                  <div className="mt-2 grid grid-cols-3 border-t border-white/[0.08] pt-2">
                    {[
                      ['CPU', '7%'],
                      ['Memory', '63%'],
                      ['GPU', '1%'],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <p className="text-[10px] text-white/55">{label}</p>
                        <p className="font-mono-pulse text-[15px]">{value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div {...appear(0.1)} className={`${TILE} flex items-center gap-4 p-3.5`}>
                  <svg viewBox="0 0 96 96" className="size-[86px] shrink-0 -rotate-90" aria-hidden>
                    <circle
                      cx="48"
                      cy="48"
                      r={RING_RADIUS}
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="7"
                    />
                    <motion.circle
                      cx="48"
                      cy="48"
                      r={RING_RADIUS}
                      fill="none"
                      stroke={utilizationColor(MEMORY_PERCENT)}
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray={RING_CIRCUMFERENCE}
                      initial={reduceMotion ? false : { strokeDashoffset: RING_CIRCUMFERENCE }}
                      animate={{
                        strokeDashoffset: RING_CIRCUMFERENCE * (1 - MEMORY_PERCENT / 100),
                      }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </svg>
                  <div>
                    <p className="text-[11px] font-semibold">Memory</p>
                    <p className="font-mono-pulse text-[24px] leading-tight">{MEMORY_PERCENT}%</p>
                    <p className="text-[10px] text-white/60">20.0 GB of 32 GB</p>
                  </div>
                </motion.div>

                <motion.div {...appear(0.15)} className={`${TILE} flex flex-col p-3.5`}>
                  <p className="text-[11px] font-semibold">CPU</p>
                  <p className="font-mono-pulse text-[24px] leading-tight">
                    7 <span className="text-[12px] text-white/55">%</span>
                  </p>
                  <Sparkline color={utilizationColor(7)} />
                  <p className="mt-auto truncate text-[10px] text-white/60">
                    AMD Ryzen 5 7500F 6-Core Processor
                  </p>
                </motion.div>

                <motion.div {...appear(0.2)} className={`${TILE} flex flex-col p-3.5`}>
                  <p className="flex items-center justify-between text-[11px] font-semibold">
                    GPU
                    <span className="font-mono-pulse rounded-full bg-white/[0.08] px-1.5 py-px text-[9px] text-white/80">
                      35 °C
                    </span>
                  </p>
                  <p className="font-mono-pulse text-[24px] leading-tight">
                    1 <span className="text-[12px] text-white/55">%</span>
                  </p>
                  <Sparkline color={utilizationColor(1)} flat />
                  <p className="mt-auto truncate text-[10px] text-white/60">
                    NVIDIA GeForce RTX 3060
                  </p>
                </motion.div>

                <motion.div {...appear(0.25)} className={`${TILE} flex flex-col p-3.5`}>
                  <p className="text-[11px] font-semibold">Network</p>
                  <div className="mt-1 grid grid-cols-2">
                    <div>
                      <p className="text-[10px] text-white/55">Down</p>
                      <p className="font-mono-pulse text-[15px]">14 Kbps</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/55">Up</p>
                      <p className="font-mono-pulse text-[15px]">12 Kbps</p>
                    </div>
                  </div>
                  <Sparkline color={MIDNIGHT.info} />
                  <p className="mt-auto truncate text-[10px] text-white/60">
                    Realtek Gaming 2.5GbE
                  </p>
                </motion.div>
              </div>

              <p className="font-mono-pulse mt-3 mb-1.5 text-[9px] tracking-[0.12em] text-white/50 uppercase">
                Performance <span className="normal-case">(Last 60 seconds)</span>
              </p>
              <div className="grid grid-cols-4 gap-2.5">
                {CHARTS.map((chart, index) => {
                  const color =
                    chart.label === 'Disk'
                      ? 'rgba(255,255,255,0.45)'
                      : utilizationColor(chart.percent)
                  return (
                    <motion.div
                      key={chart.label}
                      {...appear(0.3 + index * 0.05)}
                      className={`${TILE} p-3`}
                    >
                      <p className="flex justify-between text-[10px]">
                        <span className="text-white/60">{chart.label}</span>
                        <span className="font-semibold">{chart.value}</span>
                      </p>
                      <svg
                        viewBox="0 0 150 52"
                        className="mt-1.5 h-[62px] w-full"
                        preserveAspectRatio="none"
                        aria-hidden
                      >
                        <path d={`${chart.path} L150 52 L0 52 Z`} fill={color} opacity="0.08" />
                        <motion.path
                          d={chart.path}
                          fill="none"
                          stroke={color}
                          strokeWidth="1.4"
                          initial={reduceMotion ? false : { pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.1, delay: 0.35 + index * 0.06 }}
                        />
                      </svg>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-2.5 flex items-center justify-between rounded-[12px] border border-white/[0.08] bg-[#111114] px-3 py-2">
                {IDENTITY.map(({ icon: Icon, label, value }) => (
                  <span key={label} className="flex items-center gap-1.5 text-[9.5px]">
                    <Icon className="size-3 text-white/45" aria-hidden />
                    <span className="text-white/45">{label}</span>
                    <span className="text-white/85">{value}</span>
                  </span>
                ))}
              </div>
            </div>
          </PulseAppShell>
        </div>
      </ScaleToFit>
    </DemoFrame>
  )
}

function Sparkline({ color, flat }: { color: string; flat?: boolean }) {
  const reduceMotion = useReducedMotion()
  return (
    <svg viewBox="0 0 200 20" className="mt-1.5 h-4 w-full" preserveAspectRatio="none" aria-hidden>
      <motion.path
        d={flat ? 'M0 14 L200 14' : 'M0 12 L30 13 L60 12 L90 13 L120 12 L150 11 L180 13 L200 12'}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        initial={reduceMotion ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.25 }}
      />
    </svg>
  )
}
