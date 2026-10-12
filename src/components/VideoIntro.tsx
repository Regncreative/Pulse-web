'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Volume2, VolumeX, X } from 'lucide-react'
import { PulseLogo } from '@/components/icons/PulseLogo'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/cn'

const STORAGE_KEY = 'pulse-intro-dismissed'
const VIDEO = {
  en: { src: '/media/pulse-intro-en.mp4', poster: '/media/pulse-intro-en.jpg' },
  tr: { src: '/media/pulse-intro-tr.mp4', poster: '/media/pulse-intro-tr.jpg' },
} as const

export function VideoIntro() {
  const { t, lang } = useLang()
  const intro = VIDEO[lang]
  const reduceMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [open, setOpen] = useState(false)
  const [muted, setMuted] = useState(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === '1') return
    } catch {
      // ignore private mode / blocked storage
    }
    setOpen(true)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!open) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // (Re)start playback when the dialog opens and when the language swaps the video.
  useEffect(() => {
    if (!open) return
    const video = videoRef.current
    if (!video) return
    video.muted = muted
    void video.play().catch(() => {
      // Autoplay may be blocked — user can press play on controls
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, intro.src])

  function dismiss() {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore
    }
    const video = videoRef.current
    if (video) {
      video.pause()
    }
    setOpen(false)
  }

  function toggleMute() {
    const video = videoRef.current
    if (!video) return
    const next = !muted
    video.muted = next
    setMuted(next)
    if (!next) {
      void video.play().catch(() => undefined)
    }
  }

  if (!ready) return null

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={t.intro.title}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            aria-label={t.intro.skip}
            onClick={dismiss}
          />

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111114] shadow-[0_40px_100px_rgba(0,0,0,0.65)]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-2.5">
                <PulseLogo size={28} className="rounded-lg" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{t.intro.title}</p>
                  <p className="truncate text-[11px] text-white/40">{t.intro.subtitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={dismiss}
                className="rounded-lg p-2 text-white/45 transition hover:bg-white/8 hover:text-white"
                aria-label={t.intro.close}
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="relative aspect-video bg-black">
              <video
                key={intro.src}
                ref={videoRef}
                className="h-full w-full object-contain"
                src={intro.src}
                poster={intro.poster}
                autoPlay
                playsInline
                muted={muted}
                controls
                preload="metadata"
                onEnded={dismiss}
              >
                {t.intro.unsupported}
              </video>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] px-4 py-3 sm:px-5">
              <p className="text-[12px] text-white/40">{t.intro.hint}</p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5',
                  )}
                >
                  {muted ? (
                    <VolumeX className="size-4" aria-hidden />
                  ) : (
                    <Volume2 className="size-4" aria-hidden />
                  )}
                  {muted ? t.intro.unmute : t.intro.mute}
                </button>
                <button
                  type="button"
                  onClick={dismiss}
                  className="inline-flex items-center rounded-xl bg-[#C8F04A] px-4 py-2 text-sm font-semibold text-[#08080A] transition hover:brightness-110"
                >
                  {t.intro.skip}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
