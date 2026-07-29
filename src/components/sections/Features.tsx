'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  FileArchive,
  HardDrive,
  LayoutList,
  PanelRight,
  Radio,
  Server,
  Shield,
  Sparkles,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/cn'

const ICONS: LucideIcon[] = [
  LayoutList,
  Radio,
  Activity,
  PanelRight,
  FileArchive,
  Shield,
  HardDrive,
  Sparkles,
  Server,
]

export function Features() {
  const { t } = useLang()
  const reduceMotion = useReducedMotion()

  return (
    <Section
      id="features"
      eyebrow={t.features.eyebrow}
      title={t.features.title}
      description={t.features.description}
      align="left"
    >
      <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {t.features.items.map((feature, index) => {
          const Icon = ICONS[index]
          return (
            <motion.div
              key={feature.title}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="group grid gap-4 py-6 sm:grid-cols-[72px_1fr_1.2fr] sm:items-start sm:gap-8"
            >
              <div className="flex items-center gap-3 sm:block">
                <span className="font-mono-pulse text-[11px] text-[var(--accent)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={cn(
                    'inline-flex size-9 items-center justify-center rounded-lg bg-[var(--accent-dim)] text-[var(--accent)] sm:mt-2',
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                </span>
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-[var(--fg)]">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--fg-dim)] sm:pt-1">
                {feature.description}
              </p>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
