'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { useLang } from '@/lib/i18n'

const SHOTS = [
  { src: '/screens/timeline.png', key: 'timeline' as const },
  { src: '/screens/health.png', key: 'health' as const },
  { src: '/screens/inventory.png', key: 'inventory' as const },
  { src: '/screens/reports.png', key: 'reports' as const },
  { src: '/screens/diagnostics.png', key: 'diagnostics' as const },
  { src: '/screens/settings.png', key: 'settings' as const },
]

export function Screens() {
  const reduceMotion = useReducedMotion()
  const { t } = useLang()

  const captions = {
    timeline: t.productDemo.timelineTitle,
    health: t.productDemo.healthTitle,
    inventory: t.productDemo.inventoryTitle,
    reports: t.productDemo.reportsTitle,
    diagnostics: t.productDemo.diagnosticsTitle,
    settings: t.productDemo.settingsTitle,
  }

  return (
    <Section
      id="screens"
      eyebrow={t.screens.eyebrow}
      title={t.screens.title}
      description={t.screens.description}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SHOTS.map((shot, index) => (
          <motion.figure
            key={shot.src}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-md)]"
          >
            <Image
              src={shot.src}
              alt={`Pulse ${captions[shot.key]}`}
              width={1280}
              height={800}
              className="h-auto w-full"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <figcaption className="border-t border-[var(--line)] px-4 py-3 font-mono-pulse text-[11px] tracking-wide text-[var(--fg-dim)] uppercase">
              {captions[shot.key]}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  )
}
