'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type Lang = 'en' | 'tr'

const en = {
  nav: {
    translate: 'Translate',
    demo: 'Demo',
    features: 'Features',
    why: 'Why Pulse',
    download: 'Download',
    faq: 'FAQ',
    githubBtn: 'Coming soon',
    downloadBtn: 'Coming soon',
  },
  hero: {
    tagline:
      'Read-only diagnostics for Windows — human-readable events, not Event Viewer XML.',
    primaryBtn: 'Coming soon',
    secondaryBtn: 'Notify me later',
    downloadBtn: 'Coming soon',
    promise: 'Observation only. No injection. No telemetry. No cloud.',
  },
  translate: {
    eyebrow: 'The Pulse idea',
    title: 'Windows already knows. Pulse explains.',
    description: 'Same events. Different language. Technical detail stays one click away.',
    badLabel: 'Event Viewer',
    goodLabel: 'Pulse',
    rows: [
      {
        bad: 'Application Error · Event ID 1000',
        good: 'Explorer unexpectedly closed. Windows restarted Explorer.',
      },
      {
        bad: 'Service Control Manager · 7036',
        good: 'Windows Update service entered the running state.',
      },
      {
        bad: 'Kernel-Power · 41',
        good: 'The system restarted without a clean shutdown.',
      },
    ],
  },
  productDemo: {
    eyebrow: 'Inside Pulse',
    title: 'Same chrome as the installed app',
    description: 'Sidebar, Live Monitoring, Timeline, Health, Diagnostics, and Settings.',
    timelineTitle: 'Timeline',
    timelineDesc: 'Human-readable events first. Technical detail and raw XML on demand.',
    healthTitle: 'System Health',
    healthDesc: 'CPU, memory, GPU, disk, and network — Task Manager–aligned where APIs allow.',
    diagnosticsTitle: 'Diagnostics',
    diagnosticsDesc: 'Service uptime, IPC stats, inject test event, and export report.',
    settingsTitle: 'Settings',
    settingsDesc: 'Live monitoring, auto-scroll, density, and animations — persisted locally.',
  },
  features: {
    eyebrow: 'Features',
    title: 'Everything you need to understand Windows.',
    description:
      'Built as a professional observability tool — not another cleaner, optimizer, or antivirus.',
    items: [
      {
        title: 'Human Timeline',
        description:
          'Level 1 plain language first — technical summary and raw XML only when you ask.',
      },
      {
        title: 'Live Monitoring',
        description: 'Windows Event Log via EvtSubscribe, pushed over named-pipe IPC in real time.',
      },
      {
        title: 'System Health',
        description: 'CPU, Memory, GPU, Disk, Network cards with process context and app icons.',
      },
      {
        title: 'Detail Panel',
        description: 'Metadata, process context, and expandable raw event payload side by side.',
      },
      {
        title: 'Diagnostics Export',
        description: 'Zip a support report without leaving the machine — nothing uploads itself.',
      },
      {
        title: 'Read-only',
        description: 'Never modifies OS behavior. No hooks, no patches, no process injection.',
      },
      {
        title: 'Local-first',
        description: 'No account, no sync, no telemetry. Preferences stay in SharedPreferences.',
      },
      {
        title: 'Fluent Dark UI',
        description: 'Custom title bar, acrylic/mica surfaces, DPI-aware — native Windows feel.',
      },
      {
        title: 'Native Service',
        description: 'C++20 PulseService collects and humanizes; Flutter Desktop renders the UI.',
      },
    ],
  },
  why: {
    eyebrow: 'Why Pulse',
    title: 'Stop decoding Event Viewer',
    description:
      'Windows already knows everything about itself. Pulse reveals it in language you can read.',
    withoutTitle: 'Without Pulse',
    withoutItems: [
      'Opaque Event IDs and XML',
      'Tool sprawl across Event Viewer and PerfMon',
      'No live human-readable stream',
      'Hard to explain what just happened',
    ],
    withTitle: 'With Pulse',
    withItems: [
      'Plain-language timeline',
      'Live system health in one place',
      'Detail on demand, not by default',
      'Observation only — nothing changes',
    ],
  },
  screens: {
    eyebrow: 'Interface',
    title: 'The real Pulse app',
    description: 'Timeline, System Health, Diagnostics, and Settings — captured from the Windows build.',
  },
  download: {
    eyebrow: 'Download',
    title: 'Get Pulse for Windows',
    description:
      'Public release is not available yet. Installer and source will open when Pulse ships — no account, no telemetry cloud.',
    latestVersion: 'Latest version',
    win10Badge: 'Windows 10 compatible',
    downloadBtn: 'Coming soon',
    githubBtn: 'Coming soon',
    releasesBtn: 'Coming soon',
    sourcePrefix: 'Source and installer',
    comingSoon: 'Public release coming soon — check back shortly.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Straight answers',
    description: 'The short version: read-only, local-first, open source.',
    items: [
      {
        q: 'Does Pulse change Windows?',
        a: 'No. Pulse is observation only — no injection, hooks, patches, or OS behavior changes.',
      },
      {
        q: 'Does it upload data?',
        a: 'No. There is no cloud, no telemetry, and no analytics. Data never leaves the machine unless you export a diagnostics zip.',
      },
      {
        q: 'Does it require an account?',
        a: 'No account, no sign-in. Install the service, launch the app, and open Timeline or System Health.',
      },
      {
        q: 'Is it open source?',
        a: 'Yes. Pulse is MIT-licensed and developed on GitHub.',
      },
      {
        q: 'Does it support Windows 10?',
        a: 'Yes. Pulse targets Windows 10/11 with a Fluent dark-first UI.',
      },
      {
        q: 'Is this a cleaner or antivirus?',
        a: 'No. Pulse never adds cleaner, optimizer, or antivirus features — only observability.',
      },
    ],
  },
  footer: {
    github: 'Coming soon',
    releases: 'Coming soon',
    license: 'Coming soon',
  },
  floating: {
    hint: 'Live timeline peek',
    note: 'Demo preview — events stay in this browser tab',
    open: 'Open Pulse demo',
    close: 'Close',
  },
  intro: {
    title: 'Pulse intro',
    subtitle: 'Optional — close anytime to browse the site',
    hint: 'Watch if you want, or skip straight to the site.',
    skip: 'Continue to site',
    close: 'Close video',
    mute: 'Mute',
    unmute: 'Unmute',
    unsupported: 'Your browser does not support this video.',
  },
  productHunt: {
    live: 'Coming soon',
    title: 'Pulse is launching on Product Hunt',
    subtitle: 'follow along and be ready to upvote',
  },
}

export type Dict = typeof en

const tr: Dict = {
  nav: {
    translate: 'Çeviri',
    demo: 'Demo',
    features: 'Özellikler',
    why: 'Neden Pulse',
    download: 'İndir',
    faq: 'SSS',
    githubBtn: 'Yakında',
    downloadBtn: 'Yakında',
  },
  hero: {
    tagline:
      'Windows için salt okunur tanılama — Event Viewer XML’i değil, okunabilir olaylar.',
    primaryBtn: 'Yakında',
    secondaryBtn: 'Daha sonra',
    downloadBtn: 'Yakında',
    promise: 'Yalnızca gözlem. Enjeksiyon yok. Telemetri yok. Bulut yok.',
  },
  translate: {
    eyebrow: 'Pulse fikri',
    title: 'Windows zaten biliyor. Pulse anlatıyor.',
    description: 'Aynı olaylar. Farklı dil. Teknik detay bir tık uzağınızda.',
    badLabel: 'Event Viewer',
    goodLabel: 'Pulse',
    rows: [
      {
        bad: 'Application Error · Event ID 1000',
        good: 'Explorer beklenmedik şekilde kapandı. Windows Explorer’ı yeniden başlattı.',
      },
      {
        bad: 'Service Control Manager · 7036',
        good: 'Windows Update servisi çalışan duruma geçti.',
      },
      {
        bad: 'Kernel-Power · 41',
        good: 'Sistem temiz kapanış olmadan yeniden başladı.',
      },
    ],
  },
  productDemo: {
    eyebrow: 'Pulse’un içi',
    title: 'Yüklü uygulamayla aynı arayüz',
    description: 'Sidebar, Live Monitoring, Timeline, Sağlık, Tanılama ve Ayarlar.',
    timelineTitle: 'Timeline',
    timelineDesc: 'Önce insan dilinde olaylar. Teknik özet ve ham XML isteğe bağlı.',
    healthTitle: 'Sistem Sağlığı',
    healthDesc: 'CPU, bellek, GPU, disk ve ağ — API’lerin izin verdiği yerde Görev Yöneticisi hizalı.',
    diagnosticsTitle: 'Tanılama',
    diagnosticsDesc: 'Servis uptime, IPC istatistikleri, test olayı ve rapor dışa aktarma.',
    settingsTitle: 'Ayarlar',
    settingsDesc: 'Canlı izleme, otomatik kaydırma, yoğunluk ve animasyonlar — yerelde saklanır.',
  },
  features: {
    eyebrow: 'Özellikler',
    title: 'Windows’u anlamak için gereken her şey.',
    description:
      'Profesyonel bir gözlemlenebilirlik aracı olarak tasarlandı — başka bir temizleyici veya antivirüs değil.',
    items: [
      {
        title: 'İnsan Timeline’ı',
        description: 'Önce düz dil — teknik özet ve ham XML yalnızca istediğinizde.',
      },
      {
        title: 'Canlı İzleme',
        description: 'EvtSubscribe ile Windows Olay Günlüğü; named-pipe IPC üzerinden gerçek zamanlı.',
      },
      {
        title: 'Sistem Sağlığı',
        description: 'CPU, Bellek, GPU, Disk, Ağ kartları; süreç bağlamı ve uygulama simgeleri.',
      },
      {
        title: 'Detay Paneli',
        description: 'Meta veri, süreç bağlamı ve genişletilebilir ham olay yükü yan yana.',
      },
      {
        title: 'Tanılama Dışa Aktarma',
        description: 'Makineden çıkmadan destek zipi — kendiliğinden hiçbir şey yüklenmez.',
      },
      {
        title: 'Salt Okunur',
        description: 'İşletim sistemi davranışını asla değiştirmez. Hook, yama veya enjeksiyon yok.',
      },
      {
        title: 'Yerel Öncelikli',
        description: 'Hesap yok, senkron yok, telemetri yok. Tercihler SharedPreferences’te kalır.',
      },
      {
        title: 'Fluent Koyu Arayüz',
        description: 'Özel başlık çubuğu, acrylic/mica yüzeyler, DPI farkındalığı — yerel Windows hissi.',
      },
      {
        title: 'Yerel Servis',
        description: 'C++20 PulseService toplar ve insanlaştırır; Flutter Desktop arayüzü çizer.',
      },
    ],
  },
  why: {
    eyebrow: 'Neden Pulse',
    title: 'Event Viewer’ı çözmeyi bırakın',
    description:
      'Windows kendisi hakkında her şeyi zaten biliyor. Pulse bunu okuyabileceğiniz dilde gösterir.',
    withoutTitle: 'Pulse olmadan',
    withoutItems: [
      'Opak Event ID’ler ve XML',
      'Event Viewer ve PerfMon arasında dağılmış araçlar',
      'Canlı, okunabilir bir akış yok',
      'Az önce ne olduğunu anlatmak zor',
    ],
    withTitle: 'Pulse ile',
    withItems: [
      'Düz dilde timeline',
      'Tek yerde canlı sistem sağlığı',
      'Detay varsayılan değil, isteğe bağlı',
      'Yalnızca gözlem — hiçbir şey değişmez',
    ],
  },
  screens: {
    eyebrow: 'Arayüz',
    title: 'Gerçek Pulse uygulaması',
    description: 'Timeline, Sistem Sağlığı, Tanılama ve Ayarlar — Windows derlemesinden.',
  },
  download: {
    eyebrow: 'İndir',
    title: 'Pulse’u Windows için edinin',
    description:
      'Herkese açık sürüm henüz yok. Kurulum ve kaynak Pulse yayınlandığında açılacak — hesap yok, telemetri bulutu yok.',
    latestVersion: 'En son sürüm',
    win10Badge: 'Windows 10 uyumlu',
    downloadBtn: 'Yakında',
    githubBtn: 'Yakında',
    releasesBtn: 'Yakında',
    sourcePrefix: 'Kaynak ve kurulum',
    comingSoon: 'Herkese açık sürüm yakında — kısa süre sonra tekrar bakın.',
  },
  faq: {
    eyebrow: 'SSS',
    title: 'Net cevaplar',
    description: 'Kısaca: salt okunur, yerel öncelikli, açık kaynak.',
    items: [
      {
        q: 'Pulse Windows’u değiştirir mi?',
        a: 'Hayır. Pulse yalnızca gözlem yapar — enjeksiyon, hook, yama veya OS davranışı değişikliği yok.',
      },
      {
        q: 'Veri yüklüyor mu?',
        a: 'Hayır. Bulut, telemetri ve analitik yok. Tanılama zipi dışa aktarmadığınız sürece veri makineden çıkmaz.',
      },
      {
        q: 'Hesap gerektiriyor mu?',
        a: 'Hesap yok, oturum açma yok. Servisi kurun, uygulamayı açın, Timeline veya Sistem Sağlığı’na bakın.',
      },
      {
        q: 'Açık kaynak mı?',
        a: 'Evet. Pulse MIT lisanslıdır ve GitHub’da geliştirilir.',
      },
      {
        q: 'Windows 10’u destekliyor mu?',
        a: 'Evet. Pulse, Fluent koyu öncelikli arayüzle Windows 10/11’i hedefler.',
      },
      {
        q: 'Bu bir temizleyici veya antivirüs mü?',
        a: 'Hayır. Pulse temizleyici, optimizasyon veya antivirüs özellikleri eklemez — yalnızca gözlemlenebilirlik.',
      },
    ],
  },
  footer: {
    github: 'Yakında',
    releases: 'Yakında',
    license: 'Yakında',
  },
  floating: {
    hint: 'Canlı timeline önizleme',
    note: 'Demo önizlemesi — olaylar yalnızca bu sekmede kalır',
    open: 'Pulse demosunu aç',
    close: 'Kapat',
  },
  intro: {
    title: 'Pulse tanıtımı',
    subtitle: 'İsteğe bağlı — istediğiniz an kapatıp siteye bakabilirsiniz',
    hint: 'İzlemek isterseniz izleyin, istemezseniz siteye geçin.',
    skip: 'Siteye geç',
    close: 'Videoyu kapat',
    mute: 'Sesi kapat',
    unmute: 'Sesi aç',
    unsupported: 'Tarayıcınız bu videoyu desteklemiyor.',
  },
  productHunt: {
    live: 'Yakında',
    title: 'Pulse yakında Product Hunt’ta',
    subtitle: 'takipte kal, upvote için hazır ol',
  },
}

export const COPY: Record<Lang, Dict> = { en, tr }

const STORAGE_KEY = 'pulse-lang'

type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Dict
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => undefined,
  t: en,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'tr' || saved === 'en') {
      setLang(saved)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t: COPY[lang] }}>{children}</LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
