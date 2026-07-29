'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { PulseLogo } from '@/components/icons/PulseLogo'
import { FlagEn, FlagTr } from '@/components/demo/flags'
import { SITE } from '@/lib/constants'
import { useLang, type Lang } from '@/lib/i18n'
import { cn } from '@/lib/cn'

type NavbarProps = {
  ctaUrl: string
  hasInstaller: boolean
}

export function Navbar({ ctaUrl, hasInstaller }: NavbarProps) {
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
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled
          ? 'border-[var(--line)] bg-[var(--bg)]/80 backdrop-blur-xl'
          : 'border-transparent bg-transparent',
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
              className="rounded-lg px-2.5 py-2 text-[13px] text-[var(--fg-dim)] transition-colors hover:bg-white/[0.04] hover:text-[var(--fg)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-0.5 rounded-full bg-white/[0.04] p-1 ring-1 ring-[var(--line)]"
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
                    ? 'bg-[var(--tile)] text-[var(--fg)] ring-1 ring-[var(--line-strong)]'
                    : 'text-[var(--fg-dim)] opacity-60 hover:opacity-100',
                )}
                onClick={() => setLang(code)}
              >
                <Flag className="rounded-[3px]" />
                <span className="hidden xl:inline">{code}</span>
              </button>
            ))}
          </div>

          <Button
            href={SITE.github}
            external
            variant="ghost"
            className="hidden h-9 px-2.5 sm:inline-flex"
            aria-label="View Pulse on GitHub"
          >
            <GitHubIcon />
            <span className="hidden md:inline">{t.nav.githubBtn}</span>
          </Button>

          <Button
            href={ctaUrl}
            external
            size="md"
            aria-label={hasInstaller ? 'Download latest Pulse release' : 'View Pulse on GitHub'}
          >
            {hasInstaller ? <Download className="size-4" aria-hidden /> : <GitHubIcon />}
            {t.nav.downloadBtn}
          </Button>
        </div>
      </Container>
    </header>
  )
}
