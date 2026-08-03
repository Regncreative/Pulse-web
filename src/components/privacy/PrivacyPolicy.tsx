'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, Link2, Shield } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { PulseLogo } from '@/components/icons/PulseLogo'
import { Footer } from '@/components/sections/Footer'
import { Container } from '@/components/ui/Container'
import { PRIVACY_META, PRIVACY_SECTIONS } from '@/lib/privacy'
import { SITE } from '@/lib/constants'
import { cn } from '@/lib/cn'

export function PrivacyPolicy() {
  const reduceMotion = useReducedMotion()
  const [activeId, setActiveId] = useState(PRIVACY_SECTIONS[0]?.id ?? '')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    const nodes = PRIVACY_SECTIONS.map((section) =>
      document.getElementById(section.id),
    ).filter((node): node is HTMLElement => Boolean(node))

    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.15, 0.35, 0.55],
      },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  async function copySectionLink(id: string) {
    const url = `${PRIVACY_META.canonical}#${id}`
    try {
      await navigator.clipboard.writeText(url)
      setCopiedId(id)
      window.setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 1600)
    } catch {
      // Clipboard can fail in restricted contexts; ignore silently.
    }
  }

  return (
    <div className="privacy-theme min-h-full bg-[var(--bg)] text-[var(--fg)]">
      <a
        href="#privacy-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-[var(--accent)] focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to privacy policy content
      </a>

      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--bg-elevated)]/75 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Pulse home">
            <PulseLogo size={28} className="rounded-lg" />
            <span className="text-[15px] font-semibold tracking-tight">Pulse</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-[var(--fg-dim)] transition-colors hover:bg-white/[0.04] hover:text-[var(--fg)]"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to home
          </Link>
        </Container>
      </header>

      <section className="relative isolate overflow-hidden border-b border-[var(--line)] pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div aria-hidden className="privacy-wash absolute inset-0 -z-20" />
        <div aria-hidden className="privacy-grid absolute inset-0 -z-10" />

        <Container className="relative max-w-5xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/[0.03] px-3 py-1.5 text-[12px] font-medium text-[var(--fg-dim)] backdrop-blur-md">
              <Shield className="size-3.5 text-[var(--accent)]" aria-hidden />
              Legal · Pulse Diagnostics
            </div>
            <h1 className="text-balance text-[clamp(2.75rem,7vw,4.5rem)] font-semibold tracking-tight text-[var(--fg)]">
              {PRIVACY_META.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[var(--fg-dim)] sm:text-lg">
              {PRIVACY_META.subtitle}
            </p>
            <p className="mt-6 font-mono-pulse text-[12px] tracking-wide text-[var(--accent)] uppercase">
              Last updated · {PRIVACY_META.lastUpdated}
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="relative py-12 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav
              aria-label="Privacy policy table of contents"
              className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]/70 p-4 shadow-[var(--shadow-md)] backdrop-blur-xl"
            >
              <p className="mb-3 px-2 font-mono-pulse text-[10px] tracking-[0.16em] text-[var(--fg-dim)] uppercase">
                On this page
              </p>
              <ol className="max-h-[min(70vh,560px)] space-y-0.5 overflow-y-auto pr-1">
                {PRIVACY_SECTIONS.map((section, index) => {
                  const active = activeId === section.id
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className={cn(
                          'flex items-start gap-2.5 rounded-xl px-2.5 py-2 text-[13px] leading-snug transition-colors',
                          active
                            ? 'bg-[var(--accent-dim)] font-semibold text-[var(--accent)]'
                            : 'text-[var(--fg-dim)] hover:bg-white/[0.03] hover:text-[var(--fg)]',
                        )}
                        aria-current={active ? 'true' : undefined}
                      >
                        <span
                          className={cn(
                            'mt-0.5 font-mono-pulse text-[10px]',
                            active ? 'text-[var(--accent)]' : 'text-white/25',
                          )}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span>{section.title}</span>
                      </a>
                    </li>
                  )
                })}
              </ol>
            </nav>
          </aside>

          <div id="privacy-content" className="min-w-0 space-y-5">
            {PRIVACY_SECTIONS.map((section, index) => (
              <motion.article
                key={section.id}
                id={section.id}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: Math.min(index, 4) * 0.03 }}
                className="scroll-mt-28 rounded-3xl border border-[var(--line)] bg-[var(--surface)]/75 p-6 shadow-[var(--shadow-md)] backdrop-blur-xl sm:p-8"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <h2 className="text-balance text-2xl font-semibold tracking-tight text-[var(--fg)] sm:text-[1.7rem]">
                    {section.title}
                  </h2>
                  <button
                    type="button"
                    onClick={() => copySectionLink(section.id)}
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-[var(--line)] bg-white/[0.03] text-[var(--fg-dim)] transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                    aria-label={
                      copiedId === section.id
                        ? `Copied link to ${section.title}`
                        : `Copy link to ${section.title}`
                    }
                  >
                    {copiedId === section.id ? (
                      <Check className="size-4 text-[var(--ok)]" aria-hidden />
                    ) : (
                      <Link2 className="size-4" aria-hidden />
                    )}
                  </button>
                </div>

                <div className="space-y-4">
                  {section.blocks.map((block, blockIndex) => {
                    if (block.type === 'p') {
                      return (
                        <p
                          key={`${section.id}-p-${blockIndex}`}
                          className="text-pretty text-[15px] leading-[1.75] text-[var(--fg-dim)] sm:text-base"
                        >
                          {block.text}
                        </p>
                      )
                    }

                    return (
                      <ul
                        key={`${section.id}-ul-${blockIndex}`}
                        className="grid gap-2 sm:grid-cols-2"
                      >
                        {block.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 rounded-2xl border border-[var(--line)] bg-white/[0.02] px-3.5 py-3 text-[14px] leading-snug text-[var(--fg)]/90"
                          >
                            <span
                              className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                              aria-hidden
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  })}

                  {section.id === 'contact' ? (
                    <dl className="mt-2 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-[var(--line)] bg-white/[0.02] p-4">
                        <dt className="font-mono-pulse text-[10px] tracking-[0.14em] text-[var(--fg-dim)] uppercase">
                          Website
                        </dt>
                        <dd className="mt-2">
                          <a
                            href={PRIVACY_META.contactWebsite}
                            className="text-[15px] font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                          >
                            {PRIVACY_META.contactWebsite}
                          </a>
                        </dd>
                      </div>
                      <div className="rounded-2xl border border-[var(--line)] bg-white/[0.02] p-4">
                        <dt className="font-mono-pulse text-[10px] tracking-[0.14em] text-[var(--fg-dim)] uppercase">
                          Email
                        </dt>
                        <dd className="mt-2">
                          <a
                            href={`mailto:${PRIVACY_META.contactEmail}`}
                            className="text-[15px] font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                          >
                            {PRIVACY_META.contactEmail}
                          </a>
                        </dd>
                      </div>
                    </dl>
                  ) : null}
                </div>
              </motion.article>
            ))}

            <p className="px-1 pt-2 text-sm text-[var(--fg-dim)]">
              © {new Date().getFullYear()} {SITE.author}. Pulse Diagnostics is local-first and
              observation-only.
            </p>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  )
}
