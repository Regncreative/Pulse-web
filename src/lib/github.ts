import { SITE } from './constants'

export type LatestRelease = {
  version: string
  /** GitHub release page for the latest tag (auto-updates). */
  url: string
  /** Direct Setup.exe asset when available; otherwise the release page. */
  downloadUrl: string
  publishedAt: string | null
}

export async function fetchLatestRelease(): Promise<LatestRelease> {
  try {
    const res = await fetch(`https://api.github.com/repos/${SITE.repo}/releases/latest`, {
      next: { revalidate: 1800 },
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'pulse-website',
      },
    })

    if (!res.ok) {
      return fallbackRelease()
    }

    const data = (await res.json()) as {
      tag_name?: string
      html_url?: string
      published_at?: string
      assets?: Array<{ name: string; browser_download_url: string }>
    }

    const version = (data.tag_name ?? SITE.versionFallback).replace(/^v/, '')
    const url =
      data.html_url ??
      `${SITE.github}/releases/tag/v${version}`

    const setupAsset = data.assets?.find(
      (asset) =>
        /pulse.*setup.*\.exe$/i.test(asset.name) ||
        /Setup\.exe$/i.test(asset.name) ||
        /\.msix$/i.test(asset.name),
    )

    return {
      version,
      url,
      downloadUrl: setupAsset?.browser_download_url ?? url,
      publishedAt: data.published_at ?? null,
    }
  } catch {
    return fallbackRelease()
  }
}

function fallbackRelease(): LatestRelease {
  return {
    version: SITE.versionFallback,
    url: SITE.release,
    downloadUrl: SITE.download,
    publishedAt: null,
  }
}
