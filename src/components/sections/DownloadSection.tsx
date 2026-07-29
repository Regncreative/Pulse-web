'use client'

import { Download, MonitorSmartphone, Cpu } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { SITE } from '@/lib/constants'
import { useLang } from '@/lib/i18n'

type DownloadSectionProps = {
  version: string
  downloadUrl: string | null
  releaseUrl: string
}

export function DownloadSection({ version, downloadUrl, releaseUrl }: DownloadSectionProps) {
  const { t } = useLang()
  const hasInstaller = Boolean(downloadUrl)

  return (
    <Section
      id="download"
      eyebrow={t.download.eyebrow}
      title={t.download.title}
      description={t.download.description}
    >
      <div className="mx-auto max-w-2xl rounded-[28px] bg-[linear-gradient(180deg,rgba(96,205,255,0.14),rgba(27,31,36,0.85))] p-8 text-center ring-1 ring-[var(--accent-ring)] shadow-[var(--shadow-md)] sm:p-12">
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
          {hasInstaller ? (
            <Button href={downloadUrl!} external size="lg" className="min-w-[200px]">
              <Download className="size-4" aria-hidden />
              {t.download.downloadBtn}
            </Button>
          ) : (
            <Button href={SITE.github} external size="lg" className="min-w-[200px]">
              <GitHubIcon />
              {t.download.githubBtn}
            </Button>
          )}
          <Button href={releaseUrl} external variant="secondary" size="lg">
            <GitHubIcon />
            {t.download.releasesBtn}
          </Button>
        </div>

        {!hasInstaller ? (
          <p className="mt-4 text-sm text-[var(--muted)]">{t.download.comingSoon}</p>
        ) : null}

        <p className="mt-5 text-sm text-[var(--muted)]">
          {t.download.sourcePrefix}{' '}
          <a
            href={SITE.github}
            className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {SITE.repo}
          </a>
        </p>
      </div>
    </Section>
  )
}
