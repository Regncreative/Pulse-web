'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { PulseLogo } from '@/components/icons/PulseLogo'
import { TimelineDemo } from '@/components/demo/TimelineDemo'
import { SITE } from '@/lib/constants'
import { useLang } from '@/lib/i18n'

type HeroProps = {
  version: string
  downloadUrl: string | null
}

export function Hero({ version, downloadUrl }: HeroProps) {
  const reduceMotion = useReducedMotion()
  const { t } = useLang()
  const hasInstaller = Boolean(downloadUrl)

  return (
    <section className="relative isolate overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20">
      <div aria-hidden className="pulse-grid absolute inset-0 -z-20" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 12% 15%, rgba(96,205,255,0.16), transparent 60%), radial-gradient(ellipse 40% 35% at 90% 65%, rgba(61,214,140,0.08), transparent 55%)',
        }}
      />

      <Container>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <PulseLogo
              size={52}
              className="rounded-[14px] shadow-[var(--accent-glow)] ring-1 ring-[var(--line-strong)]"
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

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {hasInstaller ? (
              <Button href={downloadUrl!} external size="lg">
                <Download className="size-4" aria-hidden />
                {t.hero.downloadBtn}
              </Button>
            ) : (
              <Button href={SITE.github} external size="lg">
                <GitHubIcon />
                {t.hero.primaryBtn}
              </Button>
            )}
            <Button
              href={hasInstaller ? SITE.github : SITE.releases}
              external
              variant="secondary"
              size="lg"
            >
              {hasInstaller ? <GitHubIcon /> : null}
              {hasInstaller ? t.hero.primaryBtn : t.hero.secondaryBtn}
            </Button>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono-pulse text-[11px] text-[var(--fg-dim)]">
            <span className="inline-flex items-center gap-1.5">
              <span className="live-dot size-1.5 rounded-full bg-[var(--ok)]" aria-hidden />
              live monitoring
            </span>
            <span>v{version}</span>
            <span>Windows 10/11</span>
            <span>local-first · MIT</span>
          </div>
          <p className="mt-3 text-sm text-[var(--fg-dim)]">{t.hero.promise}</p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="absolute -inset-4 rounded-[28px] bg-[var(--accent)]/10 blur-3xl" aria-hidden />
          <div className="relative">
            <TimelineDemo />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
