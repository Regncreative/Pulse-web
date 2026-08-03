import type { Metadata } from 'next'
import Link from 'next/link'
import { PulseLogo } from '@/components/icons/PulseLogo'
import { Footer } from '@/components/sections/Footer'
import { Container } from '@/components/ui/Container'
import { SITE } from '@/lib/constants'
import { LanguageProvider } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Pulse Diagnostics — what information the Windows app accesses, how it is used, and what is not shared.',
  alternates: {
    canonical: `${SITE.url}/privacy`,
  },
  openGraph: {
    title: `Privacy Policy · ${SITE.name}`,
    description:
      'How Pulse Diagnostics accesses and processes information on your Windows device.',
    url: `${SITE.url}/privacy`,
  },
}

const SECTIONS = [
  {
    title: 'Introduction',
    body: [
      'Thank you for using Pulse Diagnostics ("Pulse", "the Application", "we", "our", or "us").',
      'Pulse Diagnostics is a native Windows desktop application designed to help users monitor system health, analyze Windows Event Logs, inspect hardware information, and diagnose system issues. We are committed to protecting your privacy and ensuring transparency about how the application accesses and processes information.',
      'This Privacy Policy explains what information the application accesses, how it is used, and what data is—or is not—shared with third parties.',
    ],
  },
  {
    title: 'Information We Access',
    body: [
      'To provide its diagnostic functionality, Pulse Diagnostics may access information that is available through Windows system APIs, including:',
    ],
    list: [
      'Windows Event Logs',
      'Operating system version and build information',
      'Computer name',
      'Processor information',
      'Memory usage and capacity',
      'Storage devices and disk information',
      'Graphics hardware information',
      'Motherboard and BIOS information',
      'Running Windows services',
      'Performance counters',
      'System uptime',
      'Hardware inventory',
      'Device configuration information',
      'Diagnostic information exposed by Windows',
    ],
    after: [
      'This information is accessed only to display diagnostics, monitor system health, and provide troubleshooting features within the application.',
    ],
  },
  {
    title: 'Personal Information',
    body: [
      'Pulse Diagnostics does not collect, store, transmit, sell, rent, or share personally identifiable information (PII).',
      'The application does not require user accounts, registration, cloud synchronization, or login credentials.',
      'Pulse Diagnostics does not collect information such as:',
    ],
    list: [
      'Name',
      'Email address',
      'Phone number',
      'Postal address',
      'Payment information',
      'Government-issued identifiers',
      'Contacts',
      'Photos',
      'Messages',
      'Location data',
      'Browsing history',
    ],
  },
  {
    title: 'Local Processing',
    body: [
      'All diagnostic processing is performed locally on your Windows device.',
      'The information accessed by Pulse Diagnostics remains on your computer unless you explicitly choose to export or share it.',
      'No diagnostic information is uploaded to our servers.',
    ],
  },
  {
    title: 'Internet Connectivity',
    body: [
      'Pulse Diagnostics may establish internet connections only for optional functionality such as:',
    ],
    list: [
      'Checking for software updates',
      'Accessing official online documentation',
      'Opening external links requested by the user',
    ],
    after: [
      'The application does not transmit Windows Event Logs, hardware information, or personal information during these operations.',
    ],
  },
  {
    title: 'Data Sharing',
    body: [
      'Pulse Diagnostics does not sell, rent, or disclose user information to third parties.',
      'The application does not contain:',
    ],
    list: [
      'Advertising SDKs',
      'Analytics platforms',
      'User tracking technologies',
      'Behavioral profiling',
      'Third-party marketing services',
    ],
  },
  {
    title: 'Data Storage',
    body: [
      'Application settings and user preferences are stored locally on the user\'s computer.',
      'Diagnostic information remains on the device unless the user explicitly exports it.',
    ],
  },
  {
    title: 'Security',
    body: [
      'Pulse Diagnostics uses native Windows APIs to access diagnostic information securely.',
      'The application does not modify critical Windows configuration, install drivers, or execute arbitrary code as part of its normal diagnostic operations.',
    ],
  },
  {
    title: 'Third-Party Services',
    body: [
      'Pulse Diagnostics may rely on Microsoft Windows APIs and operating system components to retrieve diagnostic information.',
      'No third-party analytics or advertising services are integrated into the application.',
    ],
  },
  {
    title: "Children's Privacy",
    body: [
      'Pulse Diagnostics is not directed toward children under the age of 13 and does not knowingly collect personal information from children.',
    ],
  },
  {
    title: 'Changes to This Privacy Policy',
    body: [
      'This Privacy Policy may be updated from time to time to reflect application improvements, legal requirements, or operational changes.',
      'The updated version will always be published on this page together with its effective date.',
    ],
  },
] as const

export default function PrivacyPage() {
  return (
    <LanguageProvider>
      <header className="border-b border-[var(--line)] bg-[var(--bg-elevated)]/80 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Pulse home">
            <PulseLogo size={28} className="rounded-lg" />
            <span className="text-[15px] font-semibold tracking-tight text-[var(--fg)]">Pulse</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-[var(--fg-dim)] transition-colors hover:text-[var(--fg)]"
          >
            Back to home
          </Link>
        </Container>
      </header>

      <main className="flex-1 py-12 sm:py-16">
        <Container className="max-w-3xl">
          <p className="font-mono-pulse text-[11px] tracking-[0.18em] text-[var(--accent)] uppercase">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--fg)] sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-[var(--fg-dim)]">Last Updated: August 3, 2026</p>

          <div className="mt-10 space-y-10">
            {SECTIONS.map((section) => (
              <section key={section.title} className="space-y-3">
                <h2 className="text-xl font-semibold tracking-tight text-[var(--fg)]">
                  {section.title}
                </h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[15px] leading-relaxed text-[var(--fg-dim)]"
                  >
                    {paragraph}
                  </p>
                ))}
                {'list' in section && section.list ? (
                  <ul className="list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-[var(--fg-dim)]">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {'after' in section && section.after
                  ? section.after.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[15px] leading-relaxed text-[var(--fg-dim)]"
                      >
                        {paragraph}
                      </p>
                    ))
                  : null}
              </section>
            ))}

            <section className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight text-[var(--fg)]">Contact</h2>
              <p className="text-[15px] leading-relaxed text-[var(--fg-dim)]">
                If you have questions regarding this Privacy Policy or Pulse Diagnostics, please
                contact:
              </p>
              <ul className="space-y-2 text-[15px] leading-relaxed text-[var(--fg-dim)]">
                <li>
                  Email:{' '}
                  <a
                    href="mailto:info@regncreative.com"
                    className="font-medium text-[var(--accent)] hover:underline"
                  >
                    info@regncreative.com
                  </a>
                </li>
                <li>
                  Website:{' '}
                  <a
                    href={SITE.url}
                    className="font-medium text-[var(--accent)] hover:underline"
                  >
                    {SITE.url}
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </Container>
      </main>

      <Footer />
    </LanguageProvider>
  )
}
