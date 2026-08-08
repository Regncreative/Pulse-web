'use client'

import { MonitorSmartphone, Cpu } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { MicrosoftStoreIcon } from '@/components/icons/MicrosoftStoreIcon'
import { SITE } from '@/lib/constants'
import { useLang } from '@/lib/i18n'

type DownloadSectionProps = {
  version: string
  releaseUrl: string
}

export function DownloadSection({ version, releaseUrl }: DownloadSectionProps) {
  const { t } = useLang()

  return (
    <Section
      id="download"
      eyebrow={t.download.eyebrow}
      title={t.download.title}
      description={t.download.description}
    >
      <div className="mx-auto max-w-2xl rounded-[28px] bg-[var(--surface)] p-8 text-center shadow-[var(--shadow-md)] ring-1 ring-[var(--accent-ring)] sm:p-12">
        <p className="text-sm font-medium text-[var(--muted)]">{t.download.latestVersion}</p>
        <p className="mt-2 text-4xl font-semibold tracking-tight text-[var(--foreground)]">
          v{version}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <Badge tone="accent">
            <MonitorSmartphone className="size-3.5" aria-hidden />
            Windows 11
          </Badge>
          <Badge>
            <Cpu className="size-3.5" aria-hidden />
            x64
          </Badge>
          <Badge>{t.download.win10Badge}</Badge>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" className="min-w-[200px]" href={SITE.github} external>
            <GitHubIcon className="size-4" aria-hidden />
            {t.download.githubBtn}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            href={SITE.microsoftStore}
            external
          >
            <MicrosoftStoreIcon className="size-4" aria-hidden />
            {t.download.downloadBtn}
          </Button>
          <Button variant="ghost" size="lg" href={releaseUrl} external>
            {t.download.releasesBtn}
          </Button>
        </div>

        <p className="mt-5 text-sm text-[var(--muted)]">{t.download.comingSoon}</p>
      </div>
    </Section>
  )
}
