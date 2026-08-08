'use client'

import { useLang } from '@/lib/i18n'
import { SITE } from '@/lib/constants'
import { cn } from '@/lib/cn'

type MicrosoftStoreBadgeProps = {
  size?: 'large' | 'small'
  className?: string
}

export function MicrosoftStoreBadge({
  size = 'large',
  className,
}: MicrosoftStoreBadgeProps) {
  const { lang } = useLang()
  const language = lang === 'tr' ? 'tr-tr' : 'en-us'

  return (
    <div
      className={cn(
        'ms-store-badge-host inline-flex items-center justify-center [&_ms-store-badge]:inline-flex',
        size === 'small' && 'ms-store-badge-host--small',
        className,
      )}
    >
      <ms-store-badge
        key={`${language}-${size}`}
        productid={SITE.microsoftStoreId}
        productname="Pulse Diagnostics"
        window-mode="direct"
        theme="auto"
        size={size}
        language={language}
        animation="on"
      />
    </div>
  )
}
