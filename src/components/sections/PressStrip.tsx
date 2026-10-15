'use client'

import { ArrowUpRight, Newspaper } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { useLang } from '@/lib/i18n'

/** Articles about Pulse. Titles stay in the article's own language. */
const ARTICLES = [
  {
    outlet: 'IlSoftware.it',
    title: 'Visualizzatore eventi Windows 11 più comprensibile con un tool open source',
    url: 'https://www.ilsoftware.it/focus/visualizzatore-eventi-windows-11-migliorato-pulse/',
  },
] as const

export function PressStrip() {
  const { t } = useLang()

  return (
    <section aria-label={t.press.label} className="pb-4">
      <Container>
        <div className="flex flex-col items-center gap-3">
          <p className="font-mono-pulse text-[11px] tracking-[0.18em] text-[var(--fg-dim)] uppercase">
            {t.press.label}
          </p>
          {ARTICLES.map((article) => (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex max-w-full items-center gap-3 rounded-2xl bg-[var(--surface)] px-4 py-3 shadow-[var(--shadow-sm)] ring-1 ring-[var(--border)] transition hover:ring-[var(--accent-ring)]"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] ring-1 ring-[var(--accent-ring)]">
                <Newspaper className="size-4" aria-hidden />
              </span>
              <span className="min-w-0 text-left">
                <span className="block text-sm font-semibold text-[var(--foreground)]">
                  {t.press.featured} {article.outlet}
                </span>
                <span className="block truncate text-sm text-[var(--fg-dim)] italic">
                  {article.title}
                </span>
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-[var(--fg-dim)] transition group-hover:text-[var(--accent)]"
                aria-hidden
              />
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
