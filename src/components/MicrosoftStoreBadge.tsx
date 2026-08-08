'use client'

import { useEffect, useRef } from 'react'
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
  // Badge supports "tr", not "tr-tr". React also assigns .language as a property
  // (skipping attributeChangedCallback), so we must setAttribute explicitly.
  const language = lang === 'tr' ? 'tr' : 'en-us'
  const badgeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = badgeRef.current
    if (!el) return

    el.setAttribute('productid', SITE.microsoftStoreId)
    el.setAttribute('productname', 'Pulse Diagnostics')
    el.setAttribute('window-mode', 'direct')
    el.setAttribute('theme', 'auto')
    el.setAttribute('size', size)
    el.setAttribute('language', language)
    el.setAttribute('animation', 'on')
  }, [language, size])

  return (
    <div
      className={cn(
        'ms-store-badge-host inline-flex items-center justify-center [&_ms-store-badge]:inline-flex',
        size === 'small' && 'ms-store-badge-host--small',
        className,
      )}
    >
      <ms-store-badge ref={badgeRef} key={`${language}-${size}`} />
    </div>
  )
}
