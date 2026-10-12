'use client'

import { Cog, Search } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { PageHeader, PulseAppShell } from './PulseAppShell'
import { DemoFrame, ScaleToFit } from './shared'
import { cn } from '@/lib/cn'

const TREE = [
  {
    group: 'System',
    items: ['Motherboard', 'BIOS', 'CPU', 'Memory', 'Storage', 'Network', 'Battery'],
  },
  {
    group: 'Devices',
    items: ['USB', 'PCI', 'Displays', 'Audio', 'Bluetooth', 'Printers'],
  },
  {
    group: 'Software',
    items: ['Installed software', 'Drivers', 'Services'],
  },
]

const SERVICES = [
  { name: 'AdobeUpdateService', status: 'running · automatic' },
  { name: 'AppXSvc', status: 'running · manual' },
  { name: 'AudioEndpointBuilder', status: 'running · automatic' },
  { name: 'BITS', status: 'running · automatic' },
  { name: 'BrokerInfrastructure', status: 'running · automatic' },
  { name: 'CryptSvc', status: 'running · automatic' },
  { name: 'Dhcp', status: 'running · automatic' },
  { name: 'Dnscache', status: 'running · automatic' },
]

export function InventoryDemo() {
  const reduceMotion = useReducedMotion()

  return (
    <DemoFrame>
      <ScaleToFit width={960} height={560}>
        <div className="h-[560px] w-[960px]">
          <PulseAppShell active="inventory" className="h-full">
            <div className="flex h-full flex-col overflow-hidden pt-3 pr-3">
              <PageHeader title="Inventory" />

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="mb-3 flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-2.5"
              >
                <Search className="size-3.5 text-white/35" aria-hidden />
                <span className="text-[12px] text-white/40">Search this domain…</span>
              </motion.div>

              <div className="grid min-h-0 flex-1 grid-cols-[180px_1fr_200px] gap-3 overflow-hidden">
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.12 }}
                  className="overflow-hidden rounded-[16px] border border-white/[0.08] bg-[#111114] p-2"
                >
                  {TREE.map((section) => (
                    <div key={section.group} className="mb-2 last:mb-0">
                      <p className="px-2 py-1 text-[10px] font-semibold tracking-wide text-white/30 uppercase">
                        {section.group}
                      </p>
                      <ul>
                        {section.items.map((item) => {
                          const active = item === 'Services'
                          return (
                            <li
                              key={item}
                              className={cn(
                                'rounded-lg px-2 py-1.5 text-[11px]',
                                active
                                  ? 'bg-[#C8F04A]/12 font-medium text-[#C8F04A]'
                                  : 'text-white/55',
                              )}
                            >
                              {item}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.18 }}
                  className="flex min-h-0 flex-col overflow-hidden rounded-[16px] border border-white/[0.08] bg-[#111114]"
                >
                  <div className="flex items-center gap-2 border-b border-white/[0.08] px-3 py-2.5">
                    <Cog className="size-3.5 text-[#C8F04A]" aria-hidden />
                    <p className="text-[13px] font-semibold">Services</p>
                    <span className="rounded-full border border-[#34D399]/35 bg-[#34D399]/10 px-2 py-0.5 text-[9px] font-semibold text-[#34D399]">
                      Available
                    </span>
                    <span className="font-mono-pulse ml-auto text-[9px] text-white/30">
                      295 items
                    </span>
                  </div>
                  <ul className="min-h-0 flex-1 space-y-0.5 overflow-hidden p-2">
                    {SERVICES.map((service, i) => (
                      <motion.li
                        key={service.name}
                        initial={reduceMotion ? false : { opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.22 + i * 0.04 }}
                        className="flex items-center justify-between rounded-lg px-2.5 py-2 hover:bg-white/[0.03]"
                      >
                        <span className="truncate text-[12px] font-medium text-white/85">
                          {service.name}
                        </span>
                        <span className="font-mono-pulse shrink-0 text-[10px] text-white/35">
                          {service.status}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.24 }}
                  className="flex items-center justify-center rounded-[16px] border border-white/[0.08] bg-[#111114] p-4 text-center"
                >
                  <p className="text-[11px] leading-relaxed text-white/35">
                    Select an item to inspect Identity, Hardware, Firmware, Driver, Capabilities,
                    Power, and Advanced.
                  </p>
                </motion.div>
              </div>
            </div>
          </PulseAppShell>
        </div>
      </ScaleToFit>
    </DemoFrame>
  )
}
