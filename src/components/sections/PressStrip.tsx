'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { useLang } from '@/lib/i18n'

/** Articles about Pulse, newest first. Titles stay in the article's own
 * language. */
const ARTICLES = [
  {
    outlet: 'IT-Connect',
    country: { en: 'France', tr: 'Fransa' },
    date: '2026-10-24',
    author: 'Florian Burnel',
    title: 'Pulse : les journaux d’événements de Windows facilement lisibles, avec de l’IA locale',
    url: 'https://www.it-connect.fr/pulse-journaux-evenements-de-windows-facilement-lisibles-avec-ia-locale/',
  },
  {
    outlet: 'TecnoAndroid',
    country: { en: 'Italy', tr: 'İtalya' },
    date: '2026-10-18',
    author: 'Manuel De Pandis',
    title: 'Pulse per Windows 11: il Visualizzatore eventi diventa leggibile',
    url: 'https://www.tecnoandroid.it/news/pulse-per-windows-11-il-visualizzatore-eventi-diventa-leggibile-1994644/',
  },
  {
    outlet: 'IlSoftware.it',
    country: { en: 'Italy', tr: 'İtalya' },
    date: '2026-10-13',
    author: 'Michele Nasi',
    title: 'Visualizzatore eventi Windows 11 più comprensibile con un tool open source',
    url: 'https://www.ilsoftware.it/focus/visualizzatore-eventi-windows-11-migliorato-pulse/',
  },
] as const

/** Trendshift's own embed badges (repository 102083). The GitHub Trending
 * badge does not name the list, so the caption says Dart. */
const TRENDSHIFT_URL = 'https://trendshift.io/repositories/102083'
const BADGES = [
  {
    src: 'https://trendshift.io/api/badge/repositories/102083',
    alt: 'Regncreative/Pulse on GitHub Trending (Dart) | Trendshift',
  },
  {
    src: 'https://trendshift.io/api/badge/trendshift/repositories/102083/weekly?language=Dart',
    alt: 'Regncreative/Pulse on the Trendshift weekly list for Dart',
  },
] as const

export function PressStrip() {
  const { t, lang } = useLang()
  const reduceMotion = useReducedMotion()
  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso))

  return (
    <section aria-label={t.press.label} className="py-6 sm:py-10">
      <Container className="space-y-4">
        {ARTICLES.map((article) => (
          <motion.a
            key={article.url}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mx-auto grid max-w-5xl items-center gap-6 overflow-hidden rounded-3xl bg-[#08080A] p-6 text-white shadow-[var(--shadow-lg)] ring-1 ring-white/10 transition hover:ring-[#C8F04A]/40 sm:p-8 md:grid-cols-[auto_1fr_auto] md:gap-10"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* lime glow */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-[#C8F04A]/15 blur-3xl transition group-hover:bg-[#C8F04A]/25"
            />

            <div className="relative">
              <p className="font-mono-pulse text-[11px] tracking-[0.2em] text-[#C8F04A] uppercase">
                {t.press.label}
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{article.outlet}</p>
              <p className="mt-1 text-sm text-white/50">
                {article.country[lang]} · {formatDate(article.date)}
              </p>
            </div>

            <blockquote className="relative border-white/10 md:border-l md:pl-10">
              <p className="text-lg leading-snug font-semibold text-white/90 sm:text-xl">
                “{article.title}”
              </p>
              <p className="mt-2 text-sm text-white/50">
                {t.press.by} {article.author}
              </p>
            </blockquote>

            <span className="relative inline-flex w-fit items-center gap-2 rounded-full bg-[#C8F04A] px-5 py-2.5 text-sm font-semibold text-[#08080A] transition group-hover:brightness-110">
              {t.press.read}
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </motion.a>
        ))}

        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 pt-4">
          <p className="text-sm text-[var(--fg-dim)]">{t.press.featured}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {BADGES.map((badge) => (
              <a
                key={badge.src}
                href={TRENDSHIFT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl transition hover:opacity-90"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={badge.src} alt={badge.alt} width={250} height={55} loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
