'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/cn'

export function WhyPulse() {
  const reduceMotion = useReducedMotion()
  const { t } = useLang()

  return (
    <Section id="why" eyebrow={t.why.eyebrow} title={t.why.title} description={t.why.description}>
      <div className="grid gap-5 md:grid-cols-2">
        <CompareColumn
          tone="bad"
          title={t.why.withoutTitle}
          items={t.why.withoutItems}
          reduceMotion={!!reduceMotion}
        />
        <CompareColumn
          tone="good"
          title={t.why.withTitle}
          items={t.why.withItems}
          reduceMotion={!!reduceMotion}
        />
      </div>
    </Section>
  )
}

function CompareColumn({
  tone,
  title,
  items,
  reduceMotion,
}: {
  tone: 'bad' | 'good'
  title: string
  items: string[]
  reduceMotion: boolean
}) {
  const good = tone === 'good'

  return (
    <motion.div
      className={cn(
        'rounded-3xl p-6 ring-1 sm:p-8',
        good
          ? 'bg-[var(--accent-soft)] ring-[var(--accent-ring)]'
          : 'bg-[var(--surface)] ring-[var(--border)]',
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">{title}</h3>
      <ul className="mt-6 space-y-3">
        {items.map((item, index) => (
          <motion.li
            key={item}
            className="flex items-start gap-3 rounded-2xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/6"
            initial={reduceMotion ? false : { opacity: 0, x: good ? 12 : -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 * index, duration: 0.4 }}
          >
            <span
              className={cn(
                'mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full',
                good ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/10 text-rose-400',
              )}
            >
              {good ? <Check className="size-3.5" aria-hidden /> : <X className="size-3.5" aria-hidden />}
            </span>
            <span className="text-sm font-medium text-[var(--foreground)]">{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
