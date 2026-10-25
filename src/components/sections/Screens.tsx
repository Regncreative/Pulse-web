'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/cn'

/** The Pulse app at 1440×900 with sample data, rendered by the app repository's
 * screenshot tool (apps/pulse_app/test/screenshots). */
const SHOT_WIDTH = 1440
const SHOT_HEIGHT = 900

const SHOTS = [
  { src: '/screens/timeline.png', key: 'timeline' as const, featured: true },
  { src: '/screens/crashes.png', key: 'crashes' as const },
  { src: '/screens/health.png', key: 'health' as const },
  { src: '/screens/assistant.png', key: 'assistant' as const },
  { src: '/screens/inventory.png', key: 'inventory' as const },
  { src: '/screens/reports.png', key: 'reports' as const },
]

export function Screens() {
  const reduceMotion = useReducedMotion()
  const { t } = useLang()

  const captions = {
    timeline: t.productDemo.timelineTitle,
    crashes: t.productDemo.crashesTitle,
    health: t.productDemo.healthTitle,
    assistant: t.productDemo.assistantTitle,
    inventory: t.productDemo.inventoryTitle,
    reports: t.productDemo.reportsTitle,
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
            className={cn(
              'flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[#08080A] shadow-[var(--shadow-md)]',
              shot.featured && 'sm:col-span-2 lg:row-span-2',
            )}
          >
            <div className="relative flex flex-1 items-center bg-[#08080A]">
              <Image
                src={shot.src}
                alt={`Pulse ${captions[shot.key]}`}
                width={SHOT_WIDTH}
                height={SHOT_HEIGHT}
                className="h-auto w-full"
                sizes={
                  shot.featured
                    ? '(max-width: 640px) 100vw, 66vw'
                    : '(max-width: 640px) 100vw, 33vw'
                }
                priority={shot.featured}
              />
            </div>
            <figcaption className="font-mono-pulse border-t border-white/[0.08] bg-[#111114] px-4 py-3 text-[11px] tracking-wide text-white/60 uppercase">
              {captions[shot.key]}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  )
}
