'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { PulseShields } from '@/components/ui/Shield'
import { PulseLogo } from '@/components/icons/PulseLogo'
import { TimelineDemo } from '@/components/demo/TimelineDemo'
import { SITE } from '@/lib/constants'
import { useLang } from '@/lib/i18n'

type HeroProps = {
  version: string
}

export function Hero({ version }: HeroProps) {
  const reduceMotion = useReducedMotion()
  const { t } = useLang()

  return (
    <section className="relative isolate overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-24">
      <div aria-hidden className="pulse-wash absolute inset-0 -z-20" />
      <div aria-hidden className="pulse-grid absolute inset-0 -z-10" />

      <Container>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <div className="mb-7 flex items-center justify-center gap-3">
            <PulseLogo
              size={52}
              className="rounded-[14px] shadow-[var(--shadow-md)] ring-1 ring-[var(--line)]"
            />
            <div className="text-left">
              <p className="font-mono-pulse text-[11px] tracking-[0.18em] text-[var(--accent)] uppercase">
                Regn Creative
              </p>
              <p className="mt-0.5 text-sm text-[var(--fg-dim)]">Windows diagnostics</p>
            </div>
          </div>

          <h1 className="text-[clamp(3rem,8vw,5rem)] leading-[0.94] font-semibold tracking-tight text-[var(--fg)]">
            Pulse
          </h1>
          <p className="mt-3 text-xl font-medium tracking-tight text-[var(--accent)] sm:text-2xl">
            {SITE.tagline}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-[var(--fg-dim)] sm:text-lg">
            {t.hero.tagline}
          </p>

          <PulseShields version={version} className="mt-6" />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              href={SITE.betaDownload}
              external
              aria-label={t.hero.primaryBtn}
            >
              <Download className="size-4" aria-hidden />
              {t.hero.primaryBtn}
            </Button>
            <Button variant="secondary" size="lg" href="#demo">
              {t.hero.secondaryBtn}
            </Button>
          </div>

          <p className="mt-5 text-sm text-[var(--fg-dim)]">{t.hero.promise}</p>
        </motion.div>

        <div className="relative">
          <TimelineDemo />
        </div>
      </Container>
    </section>
  )
}
