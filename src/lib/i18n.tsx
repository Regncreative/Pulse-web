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
    githubBtn: 'See on GitHub',
    downloadBtn: 'See on GitHub',
  },
  hero: {
    tagline:
      'Read-only Windows diagnostics — connect Cursor, Claude, or ChatGPT to Pulse over local MCP. No built-in chat.',
    primaryBtn: 'See on GitHub',
    secondaryBtn: 'Download',
    downloadBtn: 'Download',
    promise: 'Observation only. Local MCP bridge. No Pulse AI chat. No telemetry cloud.',
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
    description:
      'Timeline, System Health, Inventory, Reports, Diagnostics, Settings — plus local MCP for AI assistants.',
    timelineTitle: 'Timeline',
    timelineDesc: 'Live human-readable events with severity filters — detail on demand.',
    healthTitle: 'System Health',
    healthDesc: 'CPU, memory, GPU, disk, and network with live sparklines and a health score.',
    inventoryTitle: 'Inventory',
    inventoryDesc: 'Browse system, devices, and software — services, drivers, and hardware trees.',
    reportsTitle: 'Reports',
    reportsDesc: 'Export templates as JSON, CSV, HTML, or PDF — everything stays on this PC.',
    diagnosticsTitle: 'Diagnostics',
    diagnosticsDesc: 'IPC latency, throughput, reconnect history, and recovery actions.',
    settingsTitle: 'Settings',
    settingsDesc: 'Theme modes, accent colors, density, and animation speed — stored locally.',
  },
  features: {
    eyebrow: 'Features',
    title: 'Everything you need to understand Windows.',
    description:
      'Built as a professional observability tool — not another cleaner, optimizer, or antivirus.',
    items: [
      {
        title: 'Local MCP for AI',
        description:
          'Bridge Cursor, Claude, or ChatGPT to Pulse over MCP — read-only tools on-device. Pulse is not a chat app.',
      },
      {
        title: 'Human Timeline',
        description:
          'Live event feed with severity filters — plain language first, raw detail when you ask.',
      },
      {
        title: 'Live Monitoring',
        description: 'Windows Event Log via EvtSubscribe, pushed over named-pipe IPC in real time.',
      },
      {
        title: 'System Health',
        description: 'Health score, uptime, and live CPU / memory / GPU / disk / network charts.',
      },
      {
        title: 'Hardware Inventory',
        description:
          'System, devices, and software trees — services, drivers, USB, PCI, and more.',
      },
      {
        title: 'Local Reports',
        description: 'Export health, timeline, diagnostics, or inventory as JSON, CSV, HTML, or PDF.',
      },
      {
        title: 'Deep Diagnostics',
        description: 'IPC health, latency, throughput, collectors, pipeline stages, and ping tools.',
      },
      {
        title: 'Appearance Control',
        description: 'System / Light / Dark themes, accent colors, compact mode, and motion speed.',
      },
      {
        title: 'Read-only',
        description: 'Never modifies OS behavior. No hooks, no patches, no process injection.',
      },
      {
        title: 'Local-first',
        description: 'No account, no sync, no telemetry. Preferences, exports, and MCP stay on-device.',
      },
      {
        title: 'Native Service',
        description: 'C++ PulseService collects and humanizes; Flutter Desktop renders the UI.',
      },
    ],
  },
  why: {
    eyebrow: 'Why Pulse',
    title: 'Stop decoding Event Viewer',
    description:
      'Windows already knows everything about itself. Pulse reveals it — to you and to local AI tools.',
    withoutTitle: 'Without Pulse',
    withoutItems: [
      'Opaque Event IDs and XML',
      'Tool sprawl across Event Viewer, Device Manager, and PerfMon',
      'AI assistants guess without real Windows context',
      'Hard to export a clean support package',
    ],
    withTitle: 'With Pulse',
    withItems: [
      'Plain-language timeline + live health',
      'Local MCP tools for AI assistants',
      'Inventory and reports in one workspace',
      'Observation only — nothing leaves the PC',
    ],
  },
  screens: {
    eyebrow: 'Interface',
    title: 'The real Pulse app',
    description:
      'Timeline, Health, Inventory, Reports, Diagnostics, and Settings — captured from the latest Windows build.',
  },
  download: {
    eyebrow: 'Download',
    title: 'Get Pulse for Windows',
    description:
      'The latest stable release is on GitHub. No account, no telemetry cloud — install and run locally.',
    latestVersion: 'Latest version',
    win10Badge: 'Windows 10 compatible',
    downloadBtn: 'Download Setup.exe',
    githubBtn: 'See on GitHub',
    releasesBtn: 'Download',
    sourcePrefix: 'Source and installer',
    comingSoon: 'Free and open source on GitHub — version and download links update with each release.',
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
        a: 'No. There is no cloud, no telemetry, and no analytics. Data never leaves the machine unless you export a local report.',
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
      {
        q: 'Does Pulse work with AI assistants?',
        a: 'Yes — via MCP, not a built-in chat. Connect Cursor, Claude, or ChatGPT to the local Pulse MCP server so they can query timeline, health, and inventory on your machine. Nothing is sent to a Pulse cloud.',
      },
    ],
  },
  footer: {
    github: 'GitHub',
    releases: 'Releases',
    license: 'License',
    privacy: 'Privacy',
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
    githubBtn: 'GitHub’da gör',
    downloadBtn: 'GitHub’da gör',
  },
  hero: {
    tagline:
      'Windows için salt okunur tanılama — Cursor, Claude veya ChatGPT’yi yerel MCP ile Pulse’a bağlayın. Yerleşik sohbet yok.',
    primaryBtn: 'GitHub’da gör',
    secondaryBtn: 'İndir',
    downloadBtn: 'İndir',
    promise: 'Yalnızca gözlem. Yerel MCP köprüsü. Pulse AI sohbeti yok. Telemetri bulutu yok.',
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
    description:
      'Timeline, Sistem Sağlığı, Envanter, Raporlar, Tanılama, Ayarlar — ve AI asistanlar için yerel MCP.',
    timelineTitle: 'Timeline',
    timelineDesc: 'Canlı, okunabilir olaylar ve şiddet filtreleri — detay isteğe bağlı.',
    healthTitle: 'Sistem Sağlığı',
    healthDesc: 'CPU, bellek, GPU, disk ve ağ için canlı sparkline’lar ve sağlık skoru.',
    inventoryTitle: 'Envanter',
    inventoryDesc: 'Sistem, cihaz ve yazılım ağaçları — servisler, sürücüler ve donanım.',
    reportsTitle: 'Raporlar',
    reportsDesc: 'Şablonları JSON, CSV, HTML veya PDF olarak dışa aktarın — her şey bu PC’de kalır.',
    diagnosticsTitle: 'Tanılama',
    diagnosticsDesc: 'IPC gecikmesi, throughput, yeniden bağlanma geçmişi ve kurtarma aksiyonları.',
    settingsTitle: 'Ayarlar',
    settingsDesc: 'Tema modları, accent renkleri, yoğunluk ve animasyon hızı — yerelde saklanır.',
  },
  features: {
    eyebrow: 'Özellikler',
    title: 'Windows’u anlamak için gereken her şey.',
    description:
      'Profesyonel bir gözlemlenebilirlik aracı olarak tasarlandı — başka bir temizleyici veya antivirüs değil.',
    items: [
      {
        title: 'Yapay zekâ için yerel MCP',
        description:
          'Cursor, Claude veya ChatGPT’yi MCP ile Pulse’a bağlayın — salt okunur araçlar cihazda. Pulse bir sohbet uygulaması değil.',
      },
      {
        title: 'İnsan Timeline’ı',
        description:
          'Şiddet filtreli canlı akış — önce düz dil, ham detay yalnızca istediğinizde.',
      },
      {
        title: 'Canlı İzleme',
        description: 'EvtSubscribe ile Windows Olay Günlüğü; named-pipe IPC üzerinden gerçek zamanlı.',
      },
      {
        title: 'Sistem Sağlığı',
        description: 'Sağlık skoru, uptime ve canlı CPU / bellek / GPU / disk / ağ grafikleri.',
      },
      {
        title: 'Donanım Envanteri',
        description: 'Sistem, cihaz ve yazılım ağaçları — servisler, sürücüler, USB, PCI ve daha fazlası.',
      },
      {
        title: 'Yerel Raporlar',
        description: 'Sağlık, timeline, tanılama veya envanteri JSON, CSV, HTML veya PDF olarak aktarın.',
      },
      {
        title: 'Derin Tanılama',
        description: 'IPC sağlığı, gecikme, throughput, collector’lar, pipeline aşamaları ve ping araçları.',
      },
      {
        title: 'Görünüm Kontrolü',
        description: 'Sistem / Açık / Koyu temalar, accent renkleri, kompakt mod ve hareket hızı.',
      },
      {
        title: 'Salt Okunur',
        description: 'İşletim sistemi davranışını asla değiştirmez. Hook, yama veya enjeksiyon yok.',
      },
      {
        title: 'Yerel Öncelikli',
        description: 'Hesap yok, senkron yok, telemetri yok. Tercihler, dışa aktarımlar ve MCP cihazda kalır.',
      },
      {
        title: 'Yerel Servis',
        description: 'C++ PulseService toplar ve insanlaştırır; Flutter Desktop arayüzü çizer.',
      },
    ],
  },
  why: {
    eyebrow: 'Neden Pulse',
    title: 'Event Viewer’ı çözmeyi bırakın',
    description:
      'Windows kendisi hakkında her şeyi zaten biliyor. Pulse bunu size ve yerel AI araçlarına gösterir.',
    withoutTitle: 'Pulse olmadan',
    withoutItems: [
      'Opak Event ID’ler ve XML',
      'Event Viewer, Aygıt Yöneticisi ve PerfMon arasında dağılmış araçlar',
      'AI asistanlar gerçek Windows bağlamı olmadan tahmin eder',
      'Temiz bir destek paketi dışa aktarmak zor',
    ],
    withTitle: 'Pulse ile',
    withItems: [
      'Düz dilde timeline + canlı sağlık',
      'AI asistanlar için yerel MCP araçları',
      'Tek çalışma alanında envanter ve raporlar',
      'Yalnızca gözlem — hiçbir şey PC’den çıkmaz',
    ],
  },
  screens: {
    eyebrow: 'Arayüz',
    title: 'Gerçek Pulse uygulaması',
    description:
      'Timeline, Sağlık, Envanter, Raporlar, Tanılama ve Ayarlar — en son Windows derlemesinden.',
  },
  download: {
    eyebrow: 'İndir',
    title: 'Pulse’u Windows için edinin',
    description:
      'En son kararlı sürüm GitHub’da. Hesap yok, telemetri bulutu yok — yerel kurup çalıştırın.',
    latestVersion: 'En son sürüm',
    win10Badge: 'Windows 10 uyumlu',
    downloadBtn: 'Setup.exe indir',
    githubBtn: 'GitHub’da gör',
    releasesBtn: 'İndir',
    sourcePrefix: 'Kaynak ve kurulum',
    comingSoon: 'Ücretsiz ve açık kaynak GitHub’da — sürüm ve indirme linkleri her release ile güncellenir.',
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
        a: 'Hayır. Bulut, telemetri ve analitik yok. Yerel bir rapor dışa aktarmadığınız sürece veri makineden çıkmaz.',
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
      {
        q: 'Pulse yapay zekâ asistanlarıyla çalışır mı?',
        a: 'Evet — yerleşik sohbetle değil, MCP ile. Cursor, Claude veya ChatGPT’yi yerel Pulse MCP sunucusuna bağlayın; timeline, sağlık ve envanteri makinenizde sorabilirler. Pulse bulutuna veri gitmez.',
      },
    ],
  },
  footer: {
    github: 'GitHub',
    releases: 'Sürümler',
    license: 'Lisans',
    privacy: 'Gizlilik',
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
