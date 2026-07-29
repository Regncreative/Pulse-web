'use client'

import { ShieldCheck } from 'lucide-react'
import { PageHeader, PulseAppShell } from './PulseAppShell'
import { ScaleToFit } from './shared'

const METRICS = [
  { label: 'CPU', value: '14%', spark: 'M0 18 L8 14 L16 16 L24 8 L32 12 L40 6 L48 10' },
  { label: 'Memory', value: '13.9 GB', spark: 'M0 16 L8 15 L16 14 L24 12 L32 11 L40 10 L48 9' },
  { label: 'GPU', value: '9%', spark: 'M0 17 L8 16 L16 10 L24 14 L32 8 L40 12 L48 11' },
  { label: 'Download', value: '14 Kbps', spark: 'M0 14 L8 16 L16 12 L24 15 L32 9 L40 13 L48 11' },
  { label: 'Upload', value: '22 Kbps', spark: 'M0 15 L8 13 L16 14 L24 10 L32 12 L40 8 L48 11' },
]

const CHARTS = ['CPU', 'Memory', 'GPU', 'Disk']

export function HealthDemo() {
  return (
    <ScaleToFit width={920} height={520}>
      <div className="h-[520px] w-[920px]">
        <PulseAppShell active="health" className="h-full">
          <div className="h-full overflow-hidden p-5">
            <PageHeader title="System Health" />

            <div className="mb-3 flex flex-wrap items-center gap-4 rounded-xl border border-[#3dd68c]/20 bg-[#3dd68c]/08 px-4 py-3">
              <div className="flex items-center gap-2 text-[#3dd68c]">
                <ShieldCheck className="size-4" aria-hidden />
                <span className="text-[13px] font-semibold">Healthy — Everything looks normal.</span>
              </div>
              <div className="ml-auto flex flex-wrap gap-4 font-mono-pulse text-[10px] text-white/40">
                <span>Uptime: 4h 37m</span>
                <span>Health Score: 94</span>
                <span>Last Updated: Just now</span>
              </div>
            </div>

            <div className="mb-3 grid grid-cols-5 gap-2">
              {METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-white/[0.06] bg-[#15181e] p-2.5"
                >
                  <p className="text-[10px] text-white/40">{metric.label}</p>
                  <p className="mt-1 text-[16px] font-semibold tracking-tight text-white">
                    {metric.value}
                  </p>
                  <svg viewBox="0 0 48 22" className="mt-2 h-6 w-full" aria-hidden>
                    <path
                      d={metric.spark}
                      fill="none"
                      stroke="#60CDFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              ))}
            </div>

            <div className="mb-3 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2 font-mono-pulse text-[9px] text-white/35">
              Windows 10 Pro · AMD Ryzen 5 7500F · RTX 3060 · 32 GB · Uptime 4h 37m
            </div>

            <p className="mb-2 text-[10px] font-semibold tracking-[0.12em] text-white/35 uppercase">
              Performance · Last 60 seconds
            </p>
            <div className="grid grid-cols-4 gap-2">
              {CHARTS.map((label, i) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/[0.06] bg-[#15181e] p-2.5"
                >
                  <p className="text-[11px] font-medium text-white/70">{label}</p>
                  <svg viewBox="0 0 120 48" className="mt-2 h-14 w-full" aria-hidden>
                    <path
                      d={
                        [
                          'M0 30 L15 28 L30 22 L45 26 L60 12 L75 18 L90 10 L105 16 L120 14',
                          'M0 24 L15 22 L30 20 L45 18 L60 16 L75 15 L90 14 L105 13 L120 12',
                          'M0 28 L15 26 L30 18 L45 24 L60 14 L75 20 L90 16 L105 18 L120 17',
                          'M0 32 L15 30 L30 28 L45 20 L60 24 L75 18 L90 22 L105 16 L120 18',
                        ][i]
                      }
                      fill="none"
                      stroke="#60CDFF"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </PulseAppShell>
      </div>
    </ScaleToFit>
  )
}
