'use client'

import {
  Activity,
  Box,
  Cpu,
  Download,
  FileText,
  HardDrive,
  LayoutList,
  Server,
  Stethoscope,
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { PageHeader, PulseAppShell } from './PulseAppShell'
import { DemoFrame, ScaleToFit } from './shared'
import { cn } from '@/lib/cn'

const TEMPLATES = [
  {
    icon: Activity,
    title: 'System Health snapshot',
    desc: 'CPU, memory, GPU, disk, and network metrics plus system identity.',
    selected: true,
  },
  {
    icon: LayoutList,
    title: 'Timeline events',
    desc: 'Events currently loaded in the Timeline session.',
  },
  {
    icon: Stethoscope,
    title: 'Diagnostics',
    desc: 'Service identity, IPC stats, pipeline stages, and client metrics.',
  },
  {
    icon: Cpu,
    title: 'Hardware inventory',
    desc: 'USB and PCI device catalogs from the Inventory Engine.',
  },
  {
    icon: Server,
    title: 'Service inventory',
    desc: 'Windows services from the Inventory Engine (SCM).',
  },
  {
    icon: HardDrive,
    title: 'Driver inventory',
    desc: 'Driver services from the Inventory Engine.',
  },
  {
    icon: Box,
    title: 'Software inventory',
    desc: 'Installed software from machine-wide Uninstall registry.',
  },
  {
    icon: FileText,
    title: 'System inventory',
    desc: 'Motherboard, BIOS, CPU, memory, storage, and adapters.',
  },
]

const FORMATS = ['JSON', 'CSV', 'HTML', 'PDF'] as const

export function ReportsDemo() {
  const reduceMotion = useReducedMotion()

  return (
    <DemoFrame>
      <ScaleToFit width={960} height={560}>
        <div className="h-[560px] w-[960px]">
          <PulseAppShell active="reports" className="h-full">
            <div className="flex h-full overflow-hidden pt-3 pr-3">
              <div className="min-w-0 flex-1 overflow-hidden pr-3">
                <PageHeader title="Reports" />
                <p className="mb-3 text-[12px] font-semibold text-white/70">Choose a template</p>
                <div className="grid grid-cols-2 gap-2">
                  {TEMPLATES.map((template, i) => {
                    const Icon = template.icon
                    return (
                      <motion.div
                        key={template.title}
                        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.08 + i * 0.03 }}
                        className={cn(
                          'rounded-[16px] border p-3',
                          template.selected
                            ? 'border-[#C8F04A]/45 bg-[#C8F04A]/[0.07]'
                            : 'border-white/[0.08] bg-[#111114]',
                        )}
                      >
                        <div className="mb-1.5 flex items-center gap-2">
                          <Icon
                            className={cn(
                              'size-3.5',
                              template.selected ? 'text-[#C8F04A]' : 'text-white/45',
                            )}
                            aria-hidden
                          />
                          <p className="truncate text-[12px] font-semibold text-white/90">
                            {template.title}
                          </p>
                        </div>
                        <p className="text-[10px] leading-snug text-white/40">{template.desc}</p>
                      </motion.div>
                    )
                  })}
                </div>

                <p className="mt-4 mb-2 text-[12px] font-semibold text-white/70">Format</p>
                <div className="inline-flex gap-1 rounded-full border border-white/[0.08] bg-[#111114] p-1">
                  {FORMATS.map((format, i) => (
                    <motion.span
                      key={format}
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.35 + i * 0.04 }}
                      className={cn(
                        'rounded-full px-3.5 py-1.5 text-[11px] font-semibold',
                        format === 'JSON' ? 'bg-[#F4F4F5] text-[#08080A]' : 'text-white/70',
                      )}
                    >
                      {format}
                    </motion.span>
                  ))}
                </div>
              </div>

              <motion.aside
                initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="flex w-[220px] shrink-0 flex-col rounded-[16px] border border-white/[0.08] bg-[#111114] p-4"
              >
                <p className="mb-3 text-[13px] font-semibold">Export summary</p>
                <dl className="space-y-3 text-[11px]">
                  <div>
                    <dt className="text-white/35">Template</dt>
                    <dd className="mt-0.5 font-medium text-white/85">System Health snapshot</dd>
                  </div>
                  <div>
                    <dt className="text-white/35">Format</dt>
                    <dd className="mt-0.5 font-medium text-[#C8F04A]">JSON</dd>
                  </div>
                  <div>
                    <dt className="text-white/35">Destination</dt>
                    <dd className="font-mono-pulse mt-0.5 text-[10px] leading-relaxed text-white/55">
                      Documents / Pulse / exports
                    </dd>
                  </div>
                </dl>
                <span className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#C8F04A] px-3 py-2.5 text-[12px] font-semibold text-[#08080A]">
                  <Download className="size-3.5" aria-hidden />
                  Export Report
                </span>
              </motion.aside>
            </div>
          </PulseAppShell>
        </div>
      </ScaleToFit>
    </DemoFrame>
  )
}
