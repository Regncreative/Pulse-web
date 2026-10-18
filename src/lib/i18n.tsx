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
    downloadBtn: 'Get it from Microsoft Store',
  },
  hero: {
    tagline:
      'Read-only Windows diagnostics with a local AI Assistant — Ollama or LM Studio on this PC. No cloud AI required.',
    primaryBtn: 'See on GitHub',
    secondaryBtn: 'Get it from Microsoft Store',
    downloadBtn: 'Get it from Microsoft Store',
    promise: 'Observation only. Local AI Assistant. No telemetry cloud. Read-only tools.',
    whatsNew: 'New in 1.4.3: pick any date range',
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
      'Timeline, System Health, Inventory, Reports, Diagnostics, Settings — plus the built-in local AI Assistant.',
    timelineTitle: 'Timeline',
    timelineDesc:
      'A plain-language summary of the last hour, a 24-hour activity strip, and a story feed — detail on demand.',
    healthTitle: 'System Health',
    healthDesc:
      'An overview bento with health score, memory ring, CPU, GPU, and network — plus 60-second charts.',
    inventoryTitle: 'Inventory',
    inventoryDesc: 'Browse system, devices, and software — services, drivers, and hardware trees.',
    reportsTitle: 'Reports',
    reportsDesc: 'Export templates as JSON, CSV, HTML, or PDF — everything stays on this PC.',
    diagnosticsTitle: 'Diagnostics',
    diagnosticsDesc: 'IPC latency, throughput, reconnect history, and recovery actions.',
    settingsTitle: 'Settings',
    assistantTitle: 'Assistant',
    settingsDesc:
      'Theme, accents, tray background monitoring, and local notifications — stored on this PC.',
  },
  features: {
    eyebrow: 'Features',
    title: 'Everything you need to understand Windows.',
    description:
      'Built as a professional observability tool — not another cleaner, optimizer, or antivirus.',
    items: [
      {
        title: 'Local AI Assistant',
        description:
          'Ask about this PC in-app via Ollama or LM Studio — read-only diagnostics, streaming replies, no cloud AI required.',
      },
      {
        title: 'Human Timeline',
        description:
          'Live event feed with severity filters — plain language first, raw detail when you ask.',
      },
      {
        title: 'Crash Explainer',
        description:
          'Blue screens with the stop code and its usual cause, forced power-offs, power loss and hardware errors — in one plain sentence.',
      },
      {
        title: 'System Health',
        description:
          'Live charts with semantic colors — green 0–49%, yellow 50–69%, orange 70–89%, red 90–100%.',
      },
      {
        title: 'Hardware Inventory',
        description: 'System, devices, and software trees — services, drivers, USB, PCI, and more.',
      },
      {
        title: 'Local Reports',
        description:
          'Export health, timeline, diagnostics, or inventory as JSON, CSV, HTML, or PDF — with names, IPs and serial numbers masked so they are safe to share.',
      },
      {
        title: 'Background & tray',
        description:
          'Keep Pulse in the system tray with background monitoring and local Windows alerts for critical conditions.',
      },
      {
        title: 'Deep Diagnostics',
        description:
          'IPC health, latency, throughput, collectors, pipeline stages, and ping tools.',
      },
      {
        title: 'Appearance Control',
        description: 'System / Light / Dark themes, accent colors, compact mode, and motion speed.',
      },
      {
        title: 'Read-only',
        description:
          'Never modifies OS behavior. Assistant cannot run commands or change the system.',
      },
      {
        title: 'Local-first',
        description:
          'No account, no sync, no telemetry. Preferences, exports, and local AI stay on-device.',
      },
      {
        title: 'Logs From Other PCs',
        description:
          'Open an .evtx exported from another computer and read it in plain language — handy for IT support.',
      },
    ],
  },
  why: {
    eyebrow: 'Why Pulse',
    title: 'Stop decoding Event Viewer',
    description:
      'Windows already knows everything about itself. Pulse reveals it — to you and to a local AI on this PC.',
    withoutTitle: 'Without Pulse',
    withoutItems: [
      'Opaque Event IDs and XML',
      'Tool sprawl across Event Viewer, Device Manager, and PerfMon',
      'Cloud AI guesses without real Windows context',
      'Hard to export a clean support package',
    ],
    withTitle: 'With Pulse',
    withItems: [
      'Plain-language timeline + live health',
      'Built-in local AI Assistant (Ollama / LM Studio)',
      'Inventory, reports, and tray monitoring in one workspace',
      'Observation only — nothing leaves the PC',
    ],
  },
  screens: {
    eyebrow: 'Interface',
    title: 'The real Pulse app',
    description:
      'Timeline, Health, Inventory, Reports, Diagnostics, Settings, and Assistant — from the latest Windows build.',
  },
  download: {
    eyebrow: 'Download',
    title: 'Get Pulse for Windows',
    description:
      'Install from the Microsoft Store. No account for Pulse itself, no telemetry cloud — local-first on your PC.',
    latestVersion: 'Latest version',
    win10Badge: 'Windows 10 compatible',
    downloadBtn: 'Get it from Microsoft Store',
    githubBtn: 'See on GitHub',
    releasesBtn: 'Release notes',
    sourcePrefix: 'Source and installer',
    comingSoon:
      'Preferred install path is Microsoft Store — source and release notes stay on GitHub.',
    signing: 'Free code signing provided by SignPath.io, certificate by SignPath Foundation.',
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
        a: 'Yes. Pulse targets Windows 10/11 with the dark-first Midnight interface.',
      },
      {
        q: 'Is this a cleaner or antivirus?',
        a: 'No. Pulse never adds cleaner, optimizer, or antivirus features — only observability.',
      },
      {
        q: 'Can Pulse explain a blue screen or a random restart?',
        a: 'Yes. Pulse reads the stop code and the restart event and says what happened in one sentence — a blue screen (with its usual cause), a forced power-off, or a power loss or hardware fault — plus what to check next.',
      },
      {
        q: 'Does Pulse include AI?',
        a: 'Yes — Pulse Assistant runs locally through Ollama or LM Studio. It can analyze CPU, memory, GPU, storage, network, processes, and events with read-only tools. No cloud AI is required, and it cannot execute commands or modify the system.',
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
  press: {
    label: 'In the press',
    by: 'by',
    read: 'Read the article',
  },
  whatsNew: {
    eyebrow: 'New in 1.4',
    title: 'Pulse 1.4 explains the crash.',
    description:
      'Blue screens and sudden restarts in plain language, logs from other PCs, and reports you can share safely.',
    videoLabel: 'Pulse 1.4 release video',
    items: [
      {
        title: 'Blue screens, explained',
        description:
          'The stop code, what usually causes it and what to check next — not just “Kernel-Power 41”.',
      },
      {
        title: 'Power loss or hardware?',
        description:
          'Tells a blue screen, a forced power-off, a power loss and WHEA hardware errors apart.',
      },
      {
        title: 'Logs from another PC',
        description:
          'Open an .evtx exported from the PC you are helping and read it the same way.',
      },
      {
        title: 'Reports you can share',
        description:
          'User and computer names, IPs and serial numbers are masked in exports by default.',
      },
    ],
    latestTitle: 'New in 1.4.3',
    latestItems: [
      {
        title: 'Any date range',
        description:
          'Pick a from and to time in the Timeline. Saved searches keep the range.',
      },
      {
        title: 'Readable Assistant replies',
        description:
          'Bold, lists and code blocks render properly, and Enter sends your message.',
      },
      {
        title: 'Closes cleanly',
        description:
          'Fixed a crash that could happen when Pulse closed.',
      },
      {
        title: 'Clean uninstall',
        description:
          'The uninstaller closes Pulse first, so nothing is left running.',
      },
    ],
    patchTitle: 'Also new in 1.4.1',
    patchItems: [
      {
        title: 'Health for every disk',
        description:
          'Temperature and SMART for each disk; wear, spare capacity and power-on time for NVMe drives.',
      },
      {
        title: 'What woke your PC',
        description:
          'The device or scheduled task behind a wake from sleep, and how to stop it.',
      },
      {
        title: 'Secure Boot events, explained',
        description:
          'Certificate and SBAT update events in plain language, following Microsoft’s documentation.',
      },
      {
        title: 'A deeper Assistant',
        description:
          'Command lines, CPU time, private memory and Windows services. Still only a local AI on this PC.',
      },
    ],
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
    live: 'Live',
    title: 'Pulse is live on Product Hunt',
    subtitle: 'take a look and share your feedback',
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
    downloadBtn: 'Microsoft Store’dan edinin',
  },
  hero: {
    tagline:
      'Yerel AI Assistant ile salt okunur Windows tanılama — Ollama veya LM Studio bu PC’de. Bulut AI gerekmez.',
    primaryBtn: 'GitHub’da gör',
    secondaryBtn: 'Microsoft Store’dan edinin',
    downloadBtn: 'Microsoft Store’dan edinin',
    promise: 'Yalnızca gözlem. Yerel AI Assistant. Telemetri bulutu yok. Salt okunur araçlar.',
    whatsNew: '1.4.3’te yeni: istediğiniz tarih aralığı',
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
      'Timeline, Sistem Sağlığı, Envanter, Raporlar, Tanılama, Ayarlar — ve yerleşik yerel AI Assistant.',
    timelineTitle: 'Timeline',
    timelineDesc:
      'Son bir saatin sade bir özeti, 24 saatlik etkinlik şeridi ve olay akışı — detay isteğe bağlı.',
    healthTitle: 'Sistem Sağlığı',
    healthDesc:
      'Sağlık skoru, bellek halkası, CPU, GPU ve ağ ile genel bakış panosu — ve 60 saniyelik grafikler.',
    inventoryTitle: 'Envanter',
    inventoryDesc: 'Sistem, cihaz ve yazılım ağaçları — servisler, sürücüler ve donanım.',
    reportsTitle: 'Raporlar',
    reportsDesc:
      'Şablonları JSON, CSV, HTML veya PDF olarak dışa aktarın — her şey bu PC’de kalır.',
    diagnosticsTitle: 'Tanılama',
    diagnosticsDesc: 'IPC gecikmesi, throughput, yeniden bağlanma geçmişi ve kurtarma aksiyonları.',
    settingsTitle: 'Ayarlar',
    assistantTitle: 'Asistan',
    settingsDesc: 'Tema, accent, tepsi arka plan izleme ve yerel bildirimler — bu PC’de saklanır.',
  },
  features: {
    eyebrow: 'Özellikler',
    title: 'Windows’u anlamak için gereken her şey.',
    description:
      'Profesyonel bir gözlemlenebilirlik aracı olarak tasarlandı — başka bir temizleyici veya antivirüs değil.',
    items: [
      {
        title: 'Yerel AI Assistant',
        description:
          'Uygulama içinde bu PC hakkında sorun — Ollama veya LM Studio ile salt okunur tanılama, akan yanıtlar, bulut AI gerekmez.',
      },
      {
        title: 'İnsan Timeline’ı',
        description: 'Şiddet filtreli canlı akış — önce düz dil, ham detay yalnızca istediğinizde.',
      },
      {
        title: 'Çökme Açıklayıcı',
        description:
          'Stop kodu ve olası sebebiyle mavi ekranlar, zorla kapatmalar, elektrik kesintileri ve donanım hataları — tek bir sade cümlede.',
      },
      {
        title: 'Sistem Sağlığı',
        description:
          'Anlamsal renkli canlı grafikler — yeşil 0–49%, sarı 50–69%, turuncu 70–89%, kırmızı 90–100%.',
      },
      {
        title: 'Donanım Envanteri',
        description:
          'Sistem, cihaz ve yazılım ağaçları — servisler, sürücüler, USB, PCI ve daha fazlası.',
      },
      {
        title: 'Yerel Raporlar',
        description:
          'Sağlık, timeline, tanılama veya envanteri JSON, CSV, HTML veya PDF olarak aktarın — paylaşmak için isimler, IP’ler ve seri numaraları gizlenir.',
      },
      {
        title: 'Arka plan ve tepsi',
        description:
          'Pulse’u sistem tepsisinde tutun; arka plan izleme ve kritik durumlar için yerel Windows bildirimleri.',
      },
      {
        title: 'Derin Tanılama',
        description:
          'IPC sağlığı, gecikme, throughput, collector’lar, pipeline aşamaları ve ping araçları.',
      },
      {
        title: 'Görünüm Kontrolü',
        description: 'Sistem / Açık / Koyu temalar, accent renkleri, kompakt mod ve hareket hızı.',
      },
      {
        title: 'Salt Okunur',
        description:
          'İşletim sistemi davranışını asla değiştirmez. Assistant komut çalıştıramaz veya sistemi değiştiremez.',
      },
      {
        title: 'Yerel Öncelikli',
        description:
          'Hesap yok, senkron yok, telemetri yok. Tercihler, dışa aktarımlar ve yerel AI cihazda kalır.',
      },
      {
        title: 'Başka PC’lerin Günlükleri',
        description:
          'Başka bir bilgisayardan alınan .evtx dosyasını açın ve sade dille okuyun — teknik destek için ideal.',
      },
    ],
  },
  why: {
    eyebrow: 'Neden Pulse',
    title: 'Event Viewer’ı çözmeyi bırakın',
    description:
      'Windows kendisi hakkında her şeyi zaten biliyor. Pulse bunu size ve bu PC’deki yerel AI’ya gösterir.',
    withoutTitle: 'Pulse olmadan',
    withoutItems: [
      'Opak Event ID’ler ve XML',
      'Event Viewer, Aygıt Yöneticisi ve PerfMon arasında dağılmış araçlar',
      'Bulut AI gerçek Windows bağlamı olmadan tahmin eder',
      'Temiz bir destek paketi dışa aktarmak zor',
    ],
    withTitle: 'Pulse ile',
    withItems: [
      'Düz dilde timeline + canlı sağlık',
      'Yerleşik yerel AI Assistant (Ollama / LM Studio)',
      'Tek alanda envanter, raporlar ve tepsi izleme',
      'Yalnızca gözlem — hiçbir şey PC’den çıkmaz',
    ],
  },
  screens: {
    eyebrow: 'Arayüz',
    title: 'Gerçek Pulse uygulaması',
    description:
      'Timeline, Sağlık, Envanter, Raporlar, Tanılama, Ayarlar ve Assistant — en son Windows derlemesinden.',
  },
  download: {
    eyebrow: 'İndir',
    title: 'Pulse’u Windows için edinin',
    description:
      'Microsoft Store’dan kurun. Pulse için hesap yok, telemetri bulutu yok — bilgisayarınızda yerel kalır.',
    latestVersion: 'En son sürüm',
    win10Badge: 'Windows 10 uyumlu',
    downloadBtn: 'Microsoft Store’dan edinin',
    githubBtn: 'GitHub’da gör',
    releasesBtn: 'Sürüm notları',
    sourcePrefix: 'Kaynak ve kurulum',
    comingSoon: 'Önerilen kurulum Microsoft Store — kaynak ve sürüm notları GitHub’da.',
    signing: 'Ücretsiz kod imzalama SignPath.io, sertifika SignPath Foundation tarafından sağlanır.',
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
        a: 'Evet. Pulse, koyu öncelikli Midnight arayüzüyle Windows 10/11’i hedefler.',
      },
      {
        q: 'Bu bir temizleyici veya antivirüs mü?',
        a: 'Hayır. Pulse temizleyici, optimizasyon veya antivirüs özellikleri eklemez — yalnızca gözlemlenebilirlik.',
      },
      {
        q: 'Pulse mavi ekranı veya rastgele yeniden başlamayı açıklayabilir mi?',
        a: 'Evet. Pulse stop kodunu ve yeniden başlama olayını okuyup ne olduğunu tek cümleyle söyler — mavi ekran (olası sebebiyle), zorla kapatma ya da elektrik kesintisi / donanım arızası — ve neye bakmanız gerektiğini gösterir.',
      },
      {
        q: 'Pulse yapay zekâ içeriyor mu?',
        a: 'Evet — Pulse Assistant yerelde Ollama veya LM Studio ile çalışır. CPU, bellek, GPU, depolama, ağ, süreç ve olayları salt okunur araçlarla analiz eder. Bulut AI gerekmez; komut çalıştıramaz veya sistemi değiştiremez.',
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
  press: {
    label: 'Basında',
    by: 'Yazar:',
    read: 'Makaleyi oku',
  },
  whatsNew: {
    eyebrow: '1.4’te yeni',
    title: 'Pulse 1.4 çökmeyi açıklıyor.',
    description:
      'Mavi ekranlar ve ani yeniden başlamalar sade dille, başka bilgisayarların günlükleri ve güvenle paylaşılabilen raporlar.',
    videoLabel: 'Pulse 1.4 tanıtım videosu',
    items: [
      {
        title: 'Mavi ekranlar açıklanıyor',
        description:
          'Stop kodu, genellikle neden kaynaklandığı ve neye bakmanız gerektiği — yalnızca “Kernel-Power 41” değil.',
      },
      {
        title: 'Elektrik mi, donanım mı?',
        description:
          'Mavi ekranı, zorla kapatmayı, elektrik kesintisini ve WHEA donanım hatalarını birbirinden ayırır.',
      },
      {
        title: 'Başka PC’lerin günlükleri',
        description:
          'Yardım ettiğiniz bilgisayardan alınan .evtx dosyasını açın, aynı şekilde okuyun.',
      },
      {
        title: 'Paylaşılabilir raporlar',
        description:
          'Kullanıcı ve bilgisayar adları, IP’ler ve seri numaraları dışa aktarmalarda varsayılan olarak gizlenir.',
      },
    ],
    latestTitle: '1.4.3’te yeni',
    latestItems: [
      {
        title: 'İstediğiniz tarih aralığı',
        description:
          'Timeline’da başlangıç ve bitiş zamanını seçin. Kayıtlı aramalar aralığı korur.',
      },
      {
        title: 'Okunaklı Asistan yanıtları',
        description:
          'Kalın yazı, listeler ve kod blokları düzgün görünür; Enter mesajı gönderir.',
      },
      {
        title: 'Sorunsuz kapanış',
        description:
          'Pulse kapanırken oluşabilen çökme giderildi.',
      },
      {
        title: 'Temiz kaldırma',
        description:
          'Kaldırıcı önce Pulse’u kapatır, arkada çalışan bir şey kalmaz.',
      },
    ],
    patchTitle: '1.4.1’de ayrıca',
    patchItems: [
      {
        title: 'Her disk için sağlık',
        description:
          'Her diskin sıcaklığı ve SMART durumu; NVMe disklerde aşınma, yedek alan ve açık kalma süresi.',
      },
      {
        title: 'Bilgisayarı ne uyandırdı',
        description:
          'Uykudan uyandıran aygıt ya da zamanlanmış görev ve bunun nasıl durdurulacağı.',
      },
      {
        title: 'Secure Boot olayları sade dille',
        description:
          'Sertifika ve SBAT güncelleme olayları, Microsoft belgelerine göre anlaşılır başlıklarla.',
      },
      {
        title: 'Daha yetenekli Asistan',
        description:
          'Komut satırları, CPU süresi, özel bellek ve Windows servisleri. Hâlâ yalnızca bu bilgisayardaki yerel yapay zekâ.',
      },
    ],
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
    live: 'Yayında',
    title: 'Pulse Product Hunt’ta yayında',
    subtitle: 'göz at, yorumunu paylaş',
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
