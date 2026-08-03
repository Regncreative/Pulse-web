import type { Metadata } from 'next'
import { PrivacyPolicy } from '@/components/privacy/PrivacyPolicy'
import { PRIVACY_META, PRIVACY_SECTIONS } from '@/lib/privacy'
import { SITE } from '@/lib/constants'
import { LanguageProvider } from '@/lib/i18n'

const description =
  'Privacy Policy for Pulse Diagnostics — local-first Windows monitoring with no accounts, no telemetry, and no diagnostic data uploads.'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description,
  alternates: {
    canonical: PRIVACY_META.canonical,
  },
  openGraph: {
    type: 'article',
    title: `${PRIVACY_META.title} · ${SITE.name}`,
    description,
    url: PRIVACY_META.canonical,
    siteName: SITE.name,
    locale: 'en_US',
    modifiedTime: PRIVACY_META.lastUpdatedIso,
    images: [
      {
        url: '/brand/logo-512.png',
        width: 512,
        height: 512,
        alt: 'Pulse Diagnostics',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: `${PRIVACY_META.title} · ${SITE.name}`,
    description,
    images: ['/brand/logo-512.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

function PrivacyJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: PRIVACY_META.title,
    description,
    url: PRIVACY_META.canonical,
    dateModified: PRIVACY_META.lastUpdatedIso,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
    },
    about: {
      '@type': 'SoftwareApplication',
      name: 'Pulse Diagnostics',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Windows 10, Windows 11',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.author,
      url: SITE.url,
      email: PRIVACY_META.contactEmail,
    },
    hasPart: PRIVACY_SECTIONS.map((section) => ({
      '@type': 'WebPageElement',
      name: section.title,
      url: `${PRIVACY_META.canonical}#${section.id}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default function PrivacyPage() {
  return (
    <LanguageProvider>
      <PrivacyJsonLd />
      <PrivacyPolicy />
    </LanguageProvider>
  )
}
