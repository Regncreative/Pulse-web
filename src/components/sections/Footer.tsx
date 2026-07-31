'use client'

import { PulseLogo } from '@/components/icons/PulseLogo'
import { Container } from '@/components/ui/Container'
import { SITE } from '@/lib/constants'
import { useLang } from '@/lib/i18n'

export function Footer() {
  const { t } = useLang()

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
          <span>{t.footer.github}</span>
          {' · '}
          <a
            href={SITE.betaDownload}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--fg)]"
          >
            {t.footer.releases}
          </a>
          {' · '}
          <span>{t.footer.license}</span>
        </p>
      </Container>
    </footer>
  )
}
