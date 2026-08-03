export type PrivacyBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }

export type PrivacySection = {
  id: string
  title: string
  blocks: PrivacyBlock[]
}

export const PRIVACY_META = {
  title: 'Privacy Policy',
  lastUpdated: 'August 3, 2026',
  lastUpdatedIso: '2026-08-03',
  subtitle:
    'How Pulse Diagnostics accesses system information, what stays on your device, and what never leaves your PC.',
  canonical: 'https://pulse.regncreative.com/privacy',
  contactEmail: 'support@regncreative.com',
  contactWebsite: 'https://pulse.regncreative.com',
} as const

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const RAW: Array<{ title: string; blocks: PrivacyBlock[] }> = [
  {
    title: 'Introduction',
    blocks: [
      {
        type: 'p',
        text: 'Thank you for using Pulse Diagnostics ("Pulse", "the Application", "we", "our", or "us").',
      },
      {
        type: 'p',
        text: 'Pulse Diagnostics is a native Windows desktop application that helps users monitor system health, inspect Windows Event Logs, analyze hardware information, and diagnose Windows issues. We are committed to protecting user privacy and being transparent about how the application accesses and uses system information.',
      },
    ],
  },
  {
    title: 'Information We Access',
    blocks: [
      {
        type: 'p',
        text: 'To provide its diagnostic features, Pulse Diagnostics may access information exposed by Windows, including:',
      },
      {
        type: 'ul',
        items: [
          'Windows Event Logs',
          'Operating system version and build',
          'Computer name',
          'CPU information',
          'GPU information',
          'Memory information',
          'Storage devices',
          'Motherboard and BIOS information',
          'Installed hardware',
          'Running Windows services',
          'Performance counters',
          'System uptime',
          'Device configuration information',
          'Hardware inventory',
        ],
      },
      {
        type: 'p',
        text: 'This information is accessed only to provide diagnostics, monitoring, and troubleshooting features.',
      },
    ],
  },
  {
    title: 'Local Processing',
    blocks: [
      {
        type: 'p',
        text: 'All diagnostic processing is performed locally on your device.',
      },
      {
        type: 'p',
        text: 'Pulse Diagnostics does not upload Windows Event Logs, hardware information, or diagnostic data to our servers.',
      },
      {
        type: 'p',
        text: 'Unless you explicitly export information yourself, all accessed data remains on your computer.',
      },
    ],
  },
  {
    title: 'Personal Information',
    blocks: [
      {
        type: 'p',
        text: 'Pulse Diagnostics does not require user accounts.',
      },
      {
        type: 'p',
        text: 'The application does not collect or store:',
      },
      {
        type: 'ul',
        items: [
          'Name',
          'Email address',
          'Phone number',
          'Payment information',
          'Contacts',
          'Photos',
          'Messages',
          'Browser history',
          'Precise location',
          'Advertising identifiers',
        ],
      },
    ],
  },
  {
    title: 'Internet Connectivity',
    blocks: [
      {
        type: 'p',
        text: 'Pulse Diagnostics may access the internet only for optional features, including:',
      },
      {
        type: 'ul',
        items: [
          'Checking for application updates',
          'Opening official documentation',
          'Opening links requested by the user',
        ],
      },
      {
        type: 'p',
        text: 'Diagnostic information is never transmitted as part of these operations.',
      },
    ],
  },
  {
    title: 'Data Sharing',
    blocks: [
      {
        type: 'p',
        text: 'Pulse Diagnostics does not sell, rent, or share user information.',
      },
      {
        type: 'p',
        text: 'The application does not include:',
      },
      {
        type: 'ul',
        items: [
          'Advertising SDKs',
          'Analytics SDKs',
          'User tracking',
          'Behavioral profiling',
          'Third-party marketing tools',
        ],
      },
    ],
  },
  {
    title: 'Data Storage',
    blocks: [
      {
        type: 'p',
        text: "Application settings are stored locally on the user's computer.",
      },
      {
        type: 'p',
        text: "Exported reports are created only when initiated by the user and remain under the user's control.",
      },
    ],
  },
  {
    title: 'Security',
    blocks: [
      {
        type: 'p',
        text: 'Pulse Diagnostics uses native Windows APIs and Windows security mechanisms to retrieve diagnostic information.',
      },
      {
        type: 'p',
        text: 'The application uses the minimum permissions necessary to provide its features.',
      },
      {
        type: 'p',
        text: 'It does not modify system settings, execute arbitrary code, or access information unrelated to diagnostics.',
      },
    ],
  },
  {
    title: 'Third-Party Components',
    blocks: [
      {
        type: 'p',
        text: 'Pulse Diagnostics relies on Windows system APIs and open-source software components where applicable.',
      },
      {
        type: 'p',
        text: 'Each third-party component remains subject to its respective license.',
      },
    ],
  },
  {
    title: 'Microsoft Store Version',
    blocks: [
      {
        type: 'p',
        text: 'The Microsoft Store version uses the Windows runFullTrust capability to access Windows Event Logs, retrieve hardware information, and monitor system events through native Windows APIs.',
      },
      {
        type: 'p',
        text: 'This capability is used exclusively to provide diagnostic and monitoring features.',
      },
    ],
  },
  {
    title: "Children's Privacy",
    blocks: [
      {
        type: 'p',
        text: 'Pulse Diagnostics is not intended for children under 13 years of age and does not knowingly collect personal information from children.',
      },
    ],
  },
  {
    title: 'Changes to this Privacy Policy',
    blocks: [
      {
        type: 'p',
        text: 'We may update this Privacy Policy periodically.',
      },
      {
        type: 'p',
        text: 'Any changes will be published on this page together with the updated effective date.',
      },
    ],
  },
  {
    title: 'Contact',
    blocks: [
      {
        type: 'p',
        text: 'If you have questions regarding this Privacy Policy or Pulse Diagnostics, please contact us.',
      },
    ],
  },
]

export const PRIVACY_SECTIONS: PrivacySection[] = RAW.map((section) => ({
  id: slugify(section.title),
  title: section.title,
  blocks: section.blocks,
}))
