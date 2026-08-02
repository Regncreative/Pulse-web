'use client'

import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  Box,
  FileDown,
  HardDrive,
  LayoutList,
  Palette,
  Radio,
  Server,
  Shield,
  Stethoscope,
} from 'lucide-react'
import { FeatureCard } from '@/components/ui/FeatureCard'
import { Section } from '@/components/ui/Section'
import { useLang } from '@/lib/i18n'

const ICONS: LucideIcon[] = [
  LayoutList,
  Radio,
  Activity,
  Box,
  FileDown,
  Stethoscope,
  Palette,
  Shield,
  HardDrive,
  Server,
]

export function Features() {
  const { t } = useLang()

  return (
    <Section
      id="features"
      eyebrow={t.features.eyebrow}
      title={t.features.title}
      description={t.features.description}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.features.items.map((feature, index) => {
          const Icon = ICONS[index] ?? LayoutList
          return (
            <FeatureCard
              key={feature.title}
              icon={Icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          )
        })}
      </div>
    </Section>
  )
}
