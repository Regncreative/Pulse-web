'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'

/** Midnight palette from the Pulse 1.2 Windows app (ADR-012). */
export const MIDNIGHT = {
  canvas: '#08080A',
  surface: '#111114',
  elevated: '#17171B',
  hover: '#1E1E23',
  lime: '#C8F04A',
  ok: '#34D399',
  warn: '#FFB224',
  err: '#FF6B6B',
  info: '#6BA4FF',
  /** System Health utilization bands: 0–49, 50–69, 70–89, 90–100 %. */
  low: '#34D399',
  medium: '#FACC15',
  high: '#FB923C',
  critical: '#FF6B6B',
} as const

export function utilizationColor(percent: number): string {
  if (percent >= 90) return MIDNIGHT.critical
  if (percent >= 70) return MIDNIGHT.high
  if (percent >= 50) return MIDNIGHT.medium
  return MIDNIGHT.low
}

export function ScaleToFit({
  width,
  height,
  children,
  className,
}: {
  width: number
  height: number
  children: React.ReactNode
  className?: string
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const update = (w: number) => {
      if (w <= 0) return
      setScale(Math.min(1, w / width))
    }

    update(host.clientWidth)
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) update(entry.contentRect.width)
    })
    ro.observe(host)
    return () => ro.disconnect()
  }, [width])

  return (
    <div
      ref={hostRef}
      className={cn('relative mx-auto w-full overflow-hidden', className)}
      style={{ height: height * scale }}
    >
      <div
        className="absolute top-0 left-1/2"
        style={{
          width,
          height,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export function DemoFrame({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={cn('mx-auto w-full max-w-5xl', className)}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
