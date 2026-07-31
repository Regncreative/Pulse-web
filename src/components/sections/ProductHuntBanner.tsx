'use client'

import { SITE } from '@/lib/constants'
import { useLang } from '@/lib/i18n'

export function ProductHuntBanner() {
  const { t } = useLang()

  return (
    <a
      href={SITE.productHunt}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center gap-2.5 bg-[#111827] px-4 py-2 text-center text-[13px] text-white/90 transition hover:bg-[#0b1220]"
    >
      <span className="shrink-0 rounded-full bg-[#FF6154] px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-white uppercase">
        {t.productHunt.live}
      </span>
      <span className="hidden min-w-0 truncate sm:inline">
        <span className="font-medium text-white">{t.productHunt.title}</span>
        <span className="text-white/55"> — {t.productHunt.subtitle}</span>
      </span>
      <span className="truncate font-medium text-white sm:hidden">{t.productHunt.title}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Pulse - See what Windows is really doing. | Product Hunt"
        width={120}
        height={26}
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1211866&theme=dark&t=1785528598590"
        className="ml-1 h-[26px] w-auto shrink-0 opacity-95 transition group-hover:opacity-100"
      />
    </a>
  )
}
