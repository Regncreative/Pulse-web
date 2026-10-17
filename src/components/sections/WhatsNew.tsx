'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  Bot,
  FileSearch,
  HardDrive,
  MonitorX,
  Moon,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { useLang } from '@/lib/i18n'

// Release video for 1.4, one per language (rendered in the Pulse-Video
// project; captions are burned in).
const VIDEO = {
  en: { src: '/media/pulse-1.4-en.mp4', poster: '/media/pulse-1.4-en.jpg' },
  tr: { src: '/media/pulse-1.4-tr.mp4', poster: '/media/pulse-1.4-tr.jpg' },
} as const

const ICONS = [MonitorX, Zap, FileSearch, ShieldCheck]
// 1.4.1: disk health, wake source, Secure Boot events, Assistant.
const PATCH_ICONS = [HardDrive, Moon, ShieldCheck, Bot]

type Feature = { title: string; description: string }

function FeatureGrid({
  items,
  icons,
  className,
}: {
  items: readonly Feature[]
  icons: readonly LucideIcon[]
  className: string
}) {
  const reduceMotion = useReducedMotion()
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {items.map((item, index) => {
        const Icon = icons[index % icons.length]
        return (
          <motion.li
            key={item.title}
            className="flex h-full flex-col gap-3 rounded-2xl bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] ring-1 ring-[var(--border)]"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 * index, duration: 0.4 }}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] ring-1 ring-[var(--accent-ring)]">
              <Icon className="size-5" aria-hidden />
            </span>
            <div>
              <h3 className="font-semibold tracking-tight text-[var(--foreground)]">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--fg-dim)]">
                {item.description}
              </p>
            </div>
          </motion.li>
        )
      })}
    </ul>
  )
}

export function WhatsNew() {
  const reduceMotion = useReducedMotion()
  const { t, lang } = useLang()
  const video = VIDEO[lang]

  return (
    <Section
      id="whats-new"
      eyebrow={t.whatsNew.eyebrow}
      title={t.whatsNew.title}
      description={t.whatsNew.description}
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="overflow-hidden rounded-3xl bg-[#08080A] shadow-[var(--shadow-lg)] ring-1 ring-[var(--border)]"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            key={video.src}
            className="aspect-video w-full"
            controls
            playsInline
            preload="metadata"
            poster={video.poster}
            aria-label={t.whatsNew.videoLabel}
          >
            <source src={video.src} type="video/mp4" />
            {t.intro.unsupported}
          </video>
        </motion.div>

        <FeatureGrid items={t.whatsNew.items} icons={ICONS} className="mt-8" />

        <p className="mt-12 text-center font-mono-pulse text-xs tracking-[0.2em] text-[var(--accent)] uppercase">
          {t.whatsNew.patchTitle}
        </p>
        <FeatureGrid
          items={t.whatsNew.patchItems}
          icons={PATCH_ICONS}
          className="mt-5"
        />
      </div>
    </Section>
  )
}
