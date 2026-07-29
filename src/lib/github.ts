import { SITE } from './constants'

export type LatestRelease = {
  version: string
  url: string
  downloadUrl: string | null
  publishedAt: string | null
}

export async function fetchLatestRelease(): Promise<LatestRelease> {
  try {
    const res = await fetch(`https://api.github.com/repos/${SITE.repo}/releases/latest`, {
      next: { revalidate: 3600 },
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

    const setupAsset = data.assets?.find(
      (asset) =>
        /pulse.*setup.*\.exe$/i.test(asset.name) ||
        /Setup\.exe$/i.test(asset.name) ||
        /\.msix$/i.test(asset.name),
    )

    return {
      version: (data.tag_name ?? SITE.versionFallback).replace(/^v/, ''),
      url: data.html_url ?? SITE.latestRelease,
      downloadUrl: setupAsset?.browser_download_url ?? null,
      publishedAt: data.published_at ?? null,
    }
  } catch {
    return fallbackRelease()
  }
}

function fallbackRelease(): LatestRelease {
  return {
    version: SITE.versionFallback,
    url: SITE.latestRelease,
    downloadUrl: null,
    publishedAt: null,
  }
}
