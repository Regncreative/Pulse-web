'use client'

import { useState } from 'react'
import { Section } from '@/components/ui/Section'
import { TimelineDemo } from '@/components/demo/TimelineDemo'
import { HealthDemo } from '@/components/demo/HealthDemo'
import { InventoryDemo } from '@/components/demo/InventoryDemo'
import { ReportsDemo } from '@/components/demo/ReportsDemo'
import { DiagnosticsDemo } from '@/components/demo/DiagnosticsDemo'
import { SettingsDemo } from '@/components/demo/SettingsDemo'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/cn'

const TABS = [
  { id: 'timeline', Demo: TimelineDemo },
  { id: 'health', Demo: HealthDemo },
  { id: 'inventory', Demo: InventoryDemo },
  { id: 'reports', Demo: ReportsDemo },
  { id: 'diagnostics', Demo: DiagnosticsDemo },
  { id: 'settings', Demo: SettingsDemo },
] as const

export function ProductDemo() {
  const { t } = useLang()
  const [active, setActive] = useState<(typeof TABS)[number]['id']>('timeline')

  const labels: Record<(typeof TABS)[number]['id'], { title: string; desc: string }> = {
    timeline: { title: t.productDemo.timelineTitle, desc: t.productDemo.timelineDesc },
    health: { title: t.productDemo.healthTitle, desc: t.productDemo.healthDesc },
    inventory: { title: t.productDemo.inventoryTitle, desc: t.productDemo.inventoryDesc },
    reports: { title: t.productDemo.reportsTitle, desc: t.productDemo.reportsDesc },
    diagnostics: { title: t.productDemo.diagnosticsTitle, desc: t.productDemo.diagnosticsDesc },
    settings: { title: t.productDemo.settingsTitle, desc: t.productDemo.settingsDesc },
  }

  const ActiveDemo = TABS.find((tab) => tab.id === active)!.Demo

  return (
    <Section
      id="demo"
      eyebrow={t.productDemo.eyebrow}
      title={t.productDemo.title}
      description={t.productDemo.description}
    >
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors',
              active === tab.id
                ? 'bg-[var(--accent)] text-white shadow-[var(--accent-glow)]'
                : 'border border-[var(--line)] bg-[var(--surface)] text-[var(--fg-dim)] hover:text-[var(--fg)]',
            )}
          >
            {labels[tab.id].title}
          </button>
        ))}
      </div>

      <p className="mb-5 text-center text-sm text-[var(--fg-dim)]">{labels[active].desc}</p>

      <ActiveDemo />
    </Section>
  )
}
