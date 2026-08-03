'use client'

import { PulseLogo } from '@/components/icons/PulseLogo'
import { Container } from '@/components/ui/Container'
import { SITE } from '@/lib/constants'
import { useLang } from '@/lib/i18n'

export function Footer() {
  const { t } = useLang()

  const links = [
    { href: SITE.github, label: t.footer.github },
    { href: SITE.release, label: t.footer.releases },
    { href: SITE.license, label: t.footer.license },
  ]

  return (
    <footer className="border-t border-[var(--line)] py-10">
      <Container className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <PulseLogo size={24} className="rounded-md" />
          <div>
            <p className="text-sm font-semibold text-[var(--fg)]">Pulse</p>
            <p className="font-mono-pulse text-[11px] text-[var(--fg-dim)]">{SITE.author}</p>
          </div>
        </div>

        <p className="text-sm text-[var(--fg-dim)]">
          {links.map((link, index) => (
            <span key={link.href}>
              {index > 0 ? ' · ' : null}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[var(--fg)]"
              >
                {link.label}
              </a>
            </span>
          ))}
        </p>
      </Container>
    </footer>
  )
}
