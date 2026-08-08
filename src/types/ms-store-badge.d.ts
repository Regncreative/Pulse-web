import type { DetailedHTMLProps, HTMLAttributes } from 'react'

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'ms-store-badge': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
          productid?: string
          productname?: string
          'window-mode'?: 'direct' | 'full'
          theme?: 'auto' | 'dark' | 'light'
          size?: 'large' | 'small'
          language?: string
          animation?: 'on' | 'off'
          cid?: string
        }
      }
    }
  }
}

export {}
