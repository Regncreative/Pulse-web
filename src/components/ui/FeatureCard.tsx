'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

type FeatureCardProps = {
  icon: LucideIcon
  title: string
  description: string
  className?: string
  index?: number
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
  index = 0,
}: FeatureCardProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      className={cn(
        'group relative rounded-2xl bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] shadow-[var(--shadow-sm)] transition-[transform,box-shadow,background-color] duration-300',
        'hover:-translate-y-1 hover:shadow-[var(--shadow-md)] hover:ring-[var(--accent-ring)]',
        className,
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_right,var(--accent-soft),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
          <Icon className="size-5" aria-hidden />
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{description}</p>
      </div>
    </motion.article>
  )
}
