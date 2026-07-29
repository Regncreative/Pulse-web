import { FloatingDemo } from '@/components/FloatingDemo'
import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Translate } from '@/components/sections/Translate'
import { ProductDemo } from '@/components/sections/ProductDemo'
import { Features } from '@/components/sections/Features'
import { WhyPulse } from '@/components/sections/WhyPulse'
import { Screens } from '@/components/sections/Screens'
import { DownloadSection } from '@/components/sections/DownloadSection'
import { FAQ } from '@/components/sections/FAQ'
import { Footer } from '@/components/sections/Footer'
import { JsonLd } from '@/components/JsonLd'
import { fetchLatestRelease } from '@/lib/github'
import { LanguageProvider } from '@/lib/i18n'
import { SITE } from '@/lib/constants'

export default async function Home() {
  const release = await fetchLatestRelease()
  const ctaUrl = release.downloadUrl ?? SITE.github

  return (
    <LanguageProvider>
      <JsonLd version={release.version} />
      <Navbar ctaUrl={ctaUrl} hasInstaller={Boolean(release.downloadUrl)} />
      <main className="flex-1">
        <Hero version={release.version} downloadUrl={release.downloadUrl} />
        <Translate />
        <ProductDemo />
        <Features />
        <WhyPulse />
        <Screens />
        <DownloadSection
          version={release.version}
          downloadUrl={release.downloadUrl}
          releaseUrl={release.url}
        />
        <FAQ />
      </main>
      <Footer />
      <FloatingDemo />
    </LanguageProvider>
  )
}
