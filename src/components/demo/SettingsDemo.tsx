'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { PageHeader, PulseAppShell } from './PulseAppShell'
import { DemoFrame, ScaleToFit } from './shared'
import { cn } from '@/lib/cn'

const SUBNAV = [
  'General',
  'Appearance',
  'Background',
  'System Health',
  'Timeline',
  'Diagnostics',
  'Performance',
  'Privacy',
  'Updates',
  'Developer',
]

const THEMES = ['System', 'Light', 'Dark'] as const
const ACCENTS = [
  { name: 'Lime', color: '#C8F04A' },
  { name: 'Blue', color: '#60CDFF' },
  { name: 'Green', color: '#34D399' },
  { name: 'Purple', color: '#A78BFA' },
  { name: 'Orange', color: '#FB923C' },
]

export function SettingsDemo() {
  const reduceMotion = useReducedMotion()

  return (
    <DemoFrame>
      <ScaleToFit width={960} height={560}>
        <div className="h-[560px] w-[960px]">
          <PulseAppShell active="settings" className="h-full">
            <div className="flex h-full flex-col overflow-hidden pt-3 pr-3">
              <PageHeader title="Settings" />
              <div className="flex min-h-0 flex-1 gap-4">
                <aside className="mb-1 w-[168px] shrink-0 rounded-[16px] border border-white/[0.08] bg-[#111114] p-2.5">
                  <p className="mb-2 px-2 text-[10px] font-semibold tracking-[0.12em] text-white/30 uppercase">
                    Settings
                  </p>
                  <ul className="space-y-0.5">
                    {SUBNAV.map((item, i) => (
                      <li
                        key={item}
                        className={cn(
                          'rounded-lg px-2.5 py-2 text-[11px] font-medium',
                          i === 1 ? 'bg-[#C8F04A]/12 text-[#C8F04A]' : 'text-white/50',
                        )}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </aside>

                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="mb-1 text-[15px] font-semibold text-white">Appearance</p>
                  <p className="mb-4 text-[12px] text-white/45">
                    Theme, accent, density, and motion — stored only on this PC.
                  </p>

                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="mb-3 rounded-[16px] border border-white/[0.08] bg-[#111114] p-4"
                  >
                    <p className="mb-1 text-[12px] font-semibold text-white/80">Theme</p>
                    <p className="mb-3 text-[10px] text-white/35">
                      Follow system, or force light / dark.
                    </p>
                    <div className="inline-flex gap-1 rounded-full border border-white/[0.08] bg-[#08080A] p-1">
                      {THEMES.map((theme) => (
                        <span
                          key={theme}
                          className={cn(
                            'rounded-full px-3.5 py-1.5 text-[11px] font-semibold',
                            theme === 'Dark' ? 'bg-[#F4F4F5] text-[#08080A]' : 'text-white/70',
                          )}
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.18 }}
                    className="mb-3 rounded-[16px] border border-white/[0.08] bg-[#111114] p-4"
                  >
                    <p className="mb-3 text-[12px] font-semibold text-white/80">Accent</p>
                    <div className="flex flex-wrap items-center gap-3">
                      {ACCENTS.map((accent, i) => (
                        <motion.span
                          key={accent.name}
                          initial={reduceMotion ? false : { scale: 0.7, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.35, delay: 0.22 + i * 0.05 }}
                          className="flex flex-col items-center gap-1.5"
                        >
                          <span
                            className={cn(
                              'size-8 rounded-full ring-2 ring-offset-2 ring-offset-[#111114]',
                              i === 0 ? 'ring-[#C8F04A]' : 'ring-transparent',
                            )}
                            style={{ background: accent.color }}
                            aria-hidden
                          />
                          <span className="text-[10px] text-white/45">{accent.name}</span>
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.26 }}
                    className="mb-3 rounded-[16px] border border-white/[0.08] bg-[#111114] p-4"
                  >
                    <p className="mb-3 text-[12px] font-semibold text-white/80">Density & motion</p>
                    <Toggle label="Compact mode" desc="Slightly denser typography" />
                    <Slider label="Text size" value="1.00x" fill={50} />
                    <Toggle label="Animations" desc="Motion for panels and transitions" on />
                    <Slider label="Animation speed" value="1.00x" fill={50} />
                  </motion.div>

                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.32 }}
                    className="rounded-[16px] border border-white/[0.08] bg-[#111114] p-4"
                  >
                    <p className="mb-1 text-[12px] font-semibold text-white/80">
                      Background & tray
                    </p>
                    <p className="mb-3 text-[10px] text-white/35">
                      Keep Pulse listening in the tray with local critical alerts.
                    </p>
                    <Toggle
                      label="Run in system tray"
                      desc="Stay connected after closing the window"
                      on
                    />
                    <Toggle
                      label="Background monitoring"
                      desc="Continue collecting events while minimized"
                      on
                    />
                    <Toggle
                      label="Local notifications"
                      desc="Windows toasts for critical conditions"
                      on
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </PulseAppShell>
        </div>
      </ScaleToFit>
    </DemoFrame>
  )
}

function Slider({ label, value, fill }: { label: string; value: string; fill: number }) {
  const reduceMotion = useReducedMotion()
  return (
    <div className="mb-3 border-t border-white/[0.05] pt-2.5">
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="text-[11px] text-white/70">{label}</span>
        <span className="font-mono-pulse text-[10px] text-white/35">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-[#C8F04A]"
          initial={reduceMotion ? false : { width: 0 }}
          animate={{ width: `${fill}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

function Toggle({ label, desc, on }: { label: string; desc: string; on?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-white/[0.05] py-2.5 first:border-0 first:pt-0">
      <div>
        <p className="text-[12px] font-medium text-white/90">{label}</p>
        <p className="text-[10px] text-white/35">{desc}</p>
      </div>
      <span
        className={cn('relative h-5 w-9 rounded-full', on ? 'bg-[#C8F04A]' : 'bg-white/15')}
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
