'use client'

import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/cn'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const reduceMotion = useReducedMotion()
  const baseId = useId()
  const { t } = useLang()
  const faqs = t.faq.items

  return (
    <Section id="faq" eyebrow={t.faq.eyebrow} title={t.faq.title} description={t.faq.description}>
      <div className="mx-auto max-w-2xl divide-y divide-[var(--border)] rounded-3xl bg-[var(--surface)] ring-1 ring-[var(--border)]">
        {faqs.map((item, index) => {
          const isOpen = open === index
          const panelId = `${baseId}-panel-${index}`
          const buttonId = `${baseId}-button-${index}`

          return (
            <div key={index} className="px-5 sm:px-6">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left text-[15px] font-semibold text-[var(--foreground)]"
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  {item.q}
                  <ChevronDown
                    className={cn(
                      'size-5 shrink-0 text-[var(--muted)] transition-transform duration-300',
                      isOpen && 'rotate-180',
                    )}
                    aria-hidden
                  />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm leading-relaxed text-[var(--muted)]">{item.a}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
