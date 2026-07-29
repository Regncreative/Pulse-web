'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { Container } from './Container'

type SectionProps = {
  id?: string
  children: React.ReactNode
  className?: string
  containerClassName?: string
  eyebrow?: string
  title?: string
  description?: string
  align?: 'left' | 'center'
}

export function Section({
  id,
  children,
  className,
  containerClassName,
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section id={id} className={cn('relative py-20 sm:py-28', className)}>
      <Container className={containerClassName}>
        {(eyebrow || title || description) && (
          <motion.div
            className={cn(
              'mb-12 max-w-2xl sm:mb-16',
              align === 'center' ? 'mx-auto text-center' : 'text-left',
            )}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {eyebrow ? (
              <p className="mb-3 text-[13px] font-semibold tracking-[0.08em] text-[var(--accent)] uppercase">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-4 text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                {description}
              </p>
            ) : null}
          </motion.div>
        )}
        {children}
      </Container>
    </section>
  )
}
