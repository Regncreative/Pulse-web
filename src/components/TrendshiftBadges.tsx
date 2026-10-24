'use client'

import { useLang } from '@/lib/i18n'

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

export function TrendshiftBadges({ className = '' }: { className?: string }) {
  const { t } = useLang()

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <p className="text-xs text-[var(--fg-dim)]">{t.hero.featured}</p>
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
            <img src={badge.src} alt={badge.alt} width={218} height={48} />
          </a>
        ))}
      </div>
    </div>
  )
}
