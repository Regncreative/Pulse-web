'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { useLang } from '@/lib/i18n'

export function Translate() {
  const reduceMotion = useReducedMotion()
  const { t } = useLang()

  return (
    <Section
      id="translate"
      eyebrow={t.translate.eyebrow}
      title={t.translate.title}
      description={t.translate.description}
    >
      <div className="mx-auto max-w-4xl space-y-4">
        {t.translate.rows.map((row, index) => (
          <motion.div
            key={row.bad}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]"
          >
            <div className="rounded-2xl border border-white/8 bg-[var(--surface)] p-4 sm:p-5">
              <p className="font-mono-pulse text-[10px] tracking-[0.14em] text-[var(--err)] uppercase">
                {t.translate.badLabel}
              </p>
              <p className="mt-2 font-mono-pulse text-[13px] leading-relaxed text-[var(--fg-dim)]">
                {row.bad}
              </p>
            </div>
            <div className="flex items-center justify-center text-[var(--accent)]">
              <ArrowRight className="size-5 rotate-90 md:rotate-0" aria-hidden />
            </div>
            <div className="rounded-2xl border border-[var(--line-strong)] bg-[var(--accent-dim)] p-4 sm:p-5">
              <p className="font-mono-pulse text-[10px] tracking-[0.14em] text-[var(--accent)] uppercase">
                {t.translate.goodLabel}
              </p>
              <p className="mt-2 text-[15px] leading-snug font-semibold text-[var(--fg)]">
                {row.good}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
