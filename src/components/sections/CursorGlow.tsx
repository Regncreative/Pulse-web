'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

export function CursorGlow() {
  const [pos, setPos] = useState({ x: 50, y: 30 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(media.matches && !reduce.matches)
    update()
    media.addEventListener('change', update)
    reduce.addEventListener('change', update)
    return () => {
      media.removeEventListener('change', update)
      reduce.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const onMove = (e: MouseEvent) => {
      setPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled])

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none fixed inset-0 -z-10 transition-opacity duration-500',
        enabled ? 'opacity-100' : 'opacity-0',
      )}
      style={{
        background: `radial-gradient(540px circle at ${pos.x}% ${pos.y}%, rgba(96, 205, 255, 0.08), transparent 55%)`,
      }}
    />
  )
}
