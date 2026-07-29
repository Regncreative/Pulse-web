'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { PulseLogo, PulseMark } from '@/components/icons/PulseLogo'
import { useLang } from '@/lib/i18n'

const PEEK = [
  { tone: 'bg-amber-400', title: 'COM Permission Warning', tag: 'Warning' },
  { tone: 'bg-[#60CDFF]', title: 'IsolatedUserMode Event', tag: 'Info' },
  { tone: 'bg-[#60CDFF]', title: 'Service Configuration Changed', tag: 'Info' },
]

export function FloatingDemo() {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const { t } = useLang()

  return (
    <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 w-[min(100vw-2rem,340px)] overflow-hidden rounded-2xl border border-white/[0.07] bg-[#12151a] shadow-[var(--shadow-lg)]"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2.5">
              <div className="flex items-center gap-2">
                <PulseLogo size={28} className="rounded-lg" />
                <div>
                  <p className="text-[13px] font-semibold text-white">Pulse</p>
                  <p className="text-[10px] text-white/40">Windows diagnostics</p>
                </div>
              </div>
              <button
                type="button"
                className="rounded-lg p-1.5 text-white/40 hover:bg-white/8 hover:text-white"
                aria-label={t.floating.close}
                onClick={() => setOpen(false)}
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 border-b border-white/[0.05] px-3 py-2">
              <span className="live-dot size-1.5 rounded-full bg-[#3dd68c]" />
              <span className="text-[11px] text-[#3dd68c]">Live Monitoring</span>
            </div>
            <ul className="space-y-1.5 p-3">
              {PEEK.map((item) => (
                <li
                  key={item.title}
                  className="rounded-xl border border-white/[0.05] bg-[#0d0f12] px-2.5 py-2"
                >
                  <div className="flex items-center gap-2">
                    <span className={`size-1.5 rounded-full ${item.tone}`} />
                    <span className="text-[12px] font-medium text-white/90">{item.title}</span>
                  </div>
                  <p className="mt-1 pl-3.5 text-[10px] text-white/35">{item.tag}</p>
                </li>
              ))}
            </ul>
            <p className="border-t border-white/[0.06] px-3 py-2 font-mono-pulse text-[10px] text-white/35">
              {t.floating.note}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        aria-expanded={open}
        aria-label={t.floating.open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[#070a0e] shadow-[var(--accent-glow)] transition hover:brightness-110"
      >
        <PulseMark size={16} color="#070a0e" />
        Pulse
      </button>
    </div>
  )
}
