'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { PulseLogo } from '@/components/icons/PulseLogo'
import { FlagEn, FlagTr } from '@/components/demo/flags'
import { ProductHuntBanner } from '@/components/sections/ProductHuntBanner'
import { SITE } from '@/lib/constants'
import { useLang, type Lang } from '@/lib/i18n'
import { cn } from '@/lib/cn'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { lang, setLang, t } = useLang()

  const links = [
    { href: '#translate', label: t.nav.translate },
    { href: '#demo', label: t.nav.demo },
    { href: '#features', label: t.nav.features },
    { href: '#why', label: t.nav.why },
    { href: '#download', label: t.nav.download },
    { href: '#faq', label: t.nav.faq },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="sticky top-0 z-50">
      <ProductHuntBanner />
      <header
        className={cn(
          'border-b transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300',
          scrolled
            ? 'border-[var(--line)] bg-[var(--bg-elevated)]/85 shadow-[var(--shadow-sm)] backdrop-blur-xl'
            : 'border-transparent bg-[var(--bg-elevated)]/70 backdrop-blur-md',
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Pulse home">
            <PulseLogo size={28} className="rounded-lg" />
            <span className="text-[15px] font-semibold tracking-tight text-[var(--fg)]">Pulse</span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-2.5 py-2 text-[13px] text-[var(--fg-dim)] transition-colors hover:bg-black/[0.04] hover:text-[var(--fg)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-0.5 rounded-full bg-[var(--tile)] p-1 ring-1 ring-[var(--line)]"
              role="group"
              aria-label="Language"
            >
              {(
                [
                  { code: 'en', label: 'English', Flag: FlagEn },
                  { code: 'tr', label: 'Türkçe', Flag: FlagTr },
                ] as Array<{ code: Lang; label: string; Flag: typeof FlagEn }>
              ).map(({ code, label, Flag }) => (
                <button
                  key={code}
                  type="button"
                  aria-label={label}
                  aria-pressed={lang === code}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[11px] font-semibold uppercase transition-all',
                    lang === code
                      ? 'bg-[var(--surface)] text-[var(--fg)] shadow-[var(--shadow-sm)] ring-1 ring-[var(--line)]'
                      : 'text-[var(--fg-dim)] opacity-70 hover:opacity-100',
                  )}
                  onClick={() => setLang(code)}
                >
                  <Flag className="rounded-[3px]" />
                  <span className="hidden xl:inline">{code}</span>
                </button>
              ))}
            </div>

            <Button
              size="md"
              href={SITE.download}
              external
              aria-label={t.nav.downloadBtn}
            >
              <Download className="size-4" aria-hidden />
              {t.nav.downloadBtn}
            </Button>
          </div>
        </Container>
      </header>
    </div>
  )
}
