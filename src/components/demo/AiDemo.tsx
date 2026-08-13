'use client'

import { useEffect, useState } from 'react'
import { Bot, ChevronDown, Send, ShieldCheck } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { SITE } from '@/lib/constants'
import { cn } from '@/lib/cn'
import { PageHeader, PulseAppShell } from './PulseAppShell'
import { DemoFrame, ScaleToFit } from './shared'

type Scene = {
  question: string
  bullets: string[]
  summary: string
  provider: string
  model: string
}

const SCENES: Scene[] = [
  {
    question: 'Are there any critical issues?',
    provider: 'LM Studio',
    model: 'google/gemma-4-12b-qat',
    bullets: [
      'GPU Usage: High at 84.7% — primarily llama-server.exe.',
      'Memory: 75.6% used (25.7 GB of 34 GB).',
      'CPU: Relatively low at 16.5%.',
      'Pulse Service: Healthy and running normally.',
    ],
    summary:
      'No critical errors. The PC is busy with local AI work, otherwise within normal parameters.',
  },
  {
    question: 'Why did my PC restart earlier?',
    provider: 'Ollama',
    model: 'llama3.2:latest',
    bullets: [
      'Timeline: Kernel-Power 41 about 1h ago — unclean restart.',
      'No follow-up crash dumps in the last hour.',
      'Health score recovered to 94 after reboot.',
      'Uptime now 3h 8m — stable since boot.',
    ],
    summary:
      'Unexpected shutdown earlier (Kernel-Power 41). System looks healthy now after the restart.',
  },
  {
    question: 'What is using the most memory?',
    provider: 'LM Studio',
    model: 'google/gemma-4-12b-qat',
    bullets: [
      'Top process: llama-server.exe · ~6.2 GB working set.',
      'chrome.exe · ~1.8 GB across tabs.',
      'PulseService.exe · ~180 MB · normal.',
      'Available RAM: ~8.3 GB free.',
    ],
    summary:
      'Local AI runtime leads memory use. Nothing looks like a leak — headroom remains for normal work.',
  },
  {
    question: 'Is disk or thermal pressure a concern?',
    provider: 'Ollama',
    model: 'qwen2.5:14b',
    bullets: [
      'Disk C: 42% used · write ~5 MB/s · no SMART warnings.',
      'CPU package temp: 58°C under light load.',
      'GPU temp: 71°C while llama-server is active.',
      'No thermal throttling events in Timeline.',
    ],
    summary:
      'Storage and thermals look fine. GPU warmth matches local inference — not an overheating alert.',
  },
]

export function AiDemo({ version = SITE.versionFallback }: { version?: string }) {
  const reduceMotion = useReducedMotion()
  const [sceneIndex, setSceneIndex] = useState(0)
  const [phase, setPhase] = useState(0)
  const [bulletCount, setBulletCount] = useState(0)
  const [typedSummary, setTypedSummary] = useState('')
  const [inputTyped, setInputTyped] = useState('')

  const scene = SCENES[sceneIndex]

  useEffect(() => {
    if (reduceMotion) {
      setPhase(4)
      setBulletCount(scene.bullets.length)
      setTypedSummary(scene.summary)
      setInputTyped(scene.question)
      return
    }

    setPhase(0)
    setBulletCount(0)
    setTypedSummary('')
    setInputTyped('')

    const timers: number[] = []
    let t = 200
    const current = SCENES[sceneIndex]

    // Type question into input
    timers.push(window.setTimeout(() => setPhase(1), t))
    t += 80
    current.question.split('').forEach((_, i) => {
      timers.push(
        window.setTimeout(() => {
          setInputTyped(current.question.slice(0, i + 1))
        }, t + i * 22),
      )
    })
    t += current.question.length * 22 + 350

    // Send → show user bubble
    timers.push(
      window.setTimeout(() => {
        setPhase(2)
        setInputTyped('')
      }, t),
    )
    t += 550

    // Stream bullets
    timers.push(window.setTimeout(() => setPhase(3), t))
    current.bullets.forEach((_, i) => {
      timers.push(
        window.setTimeout(() => {
          setBulletCount(i + 1)
        }, t + 280 + i * 520),
      )
    })
    t += 280 + current.bullets.length * 520 + 200

    // Summary + analyzed
    timers.push(window.setTimeout(() => setPhase(4), t))
    t += 1800 + current.summary.length * 12

    timers.push(
      window.setTimeout(() => {
        setSceneIndex((prev) => (prev + 1) % SCENES.length)
      }, t),
    )

    return () => timers.forEach(clearTimeout)
  }, [sceneIndex, reduceMotion, scene.bullets.length, scene.question, scene.summary])

  useEffect(() => {
    if (phase < 4 || reduceMotion) return

    setTypedSummary('')
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setTypedSummary(scene.summary.slice(0, i))
      if (i >= scene.summary.length) window.clearInterval(id)
    }, 12)

    return () => window.clearInterval(id)
  }, [phase, scene.summary, sceneIndex, reduceMotion])

  return (
    <DemoFrame>
      <ScaleToFit width={960} height={560}>
        <div className="h-[560px] w-[960px]">
          <PulseAppShell active="assistant" version={version} className="h-full">
            <div className="flex h-full flex-col overflow-hidden p-5">
              <PageHeader title="Assistant" />

              <div className="mb-3 flex flex-wrap items-center gap-3 rounded-xl border border-white/[0.06] bg-[#15181e] px-3.5 py-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#60CDFF]/12 text-[#9ADCFB]">
                  <Bot className="size-4" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-white">Local AI diagnostics chat</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-[#6EE7A0]">
                    <span className="live-dot size-1.5 rounded-full bg-[#3DDA7A]" aria-hidden />
                    Local AI connected
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#6EE7A0]">
                  <ShieldCheck className="size-3.5 shrink-0" aria-hidden />
                  <span>Local AI · data stays on this PC</span>
                </div>
                <button
                  type="button"
                  tabIndex={-1}
                  className="ml-auto rounded-lg bg-[#60CDFF]/15 px-2.5 py-1.5 text-[11px] font-semibold text-[#9ADCFB]"
                >
                  Clear chat
                </button>
              </div>

              <div className="mb-3 grid grid-cols-2 gap-2">
                <SelectRow label="Provider" value={scene.provider} />
                <SelectRow label="Model" value={scene.model} />
              </div>

              <div className="relative min-h-0 flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={sceneIndex}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-full flex-col gap-3 overflow-hidden"
                  >
                    {phase >= 2 ? (
                      <motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="ml-auto max-w-[78%] rounded-2xl rounded-br-md bg-[#1c2430] px-4 py-3 text-[13px] leading-relaxed text-white/90"
                      >
                        {scene.question}
                      </motion.div>
                    ) : null}

                    {phase >= 3 ? (
                      <motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-[92%] rounded-2xl rounded-bl-md border border-white/[0.06] bg-[#15181e] px-4 py-3"
                      >
                        <p className="text-[13px] leading-relaxed text-white/85">
                          Based on current system health:
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {scene.bullets.slice(0, bulletCount).map((bullet) => (
                            <motion.li
                              key={bullet}
                              initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex gap-2 text-[12px] leading-relaxed text-white/75"
                            >
                              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#3DDA7A]" />
                              <span>{bullet}</span>
                            </motion.li>
                          ))}
                        </ul>

                        {phase >= 4 ? (
                          <>
                            <p className="mt-3 text-[13px] leading-relaxed text-white/90">
                              <span className="font-semibold text-white">Summary: </span>
                              {typedSummary}
                              {!reduceMotion && typedSummary.length < scene.summary.length ? (
                                <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-[#3DDA7A]" />
                              ) : null}
                            </p>
                            <button
                              type="button"
                              tabIndex={-1}
                              className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-medium text-white/40"
                            >
                              Analyzed
                              <ChevronDown className="size-3" aria-hidden />
                            </button>
                          </>
                        ) : bulletCount < scene.bullets.length ? (
                          <p className="mt-2 text-[11px] text-white/35">Reading local diagnostics…</p>
                        ) : null}
                      </motion.div>
                    ) : null}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#12151a] px-3 py-2">
                <p
                  className={cn(
                    'min-w-0 flex-1 truncate text-[13px]',
                    inputTyped ? 'text-white/90' : 'text-white/35',
                  )}
                >
                  {inputTyped || 'Ask about this PC...'}
                  {phase === 1 && !reduceMotion ? (
                    <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-[#60CDFF]" />
                  ) : null}
                </p>
                <span
                  className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-full transition-colors',
                    phase === 1 && inputTyped.length === scene.question.length
                      ? 'bg-[#60CDFF] text-[#0b1220]'
                      : 'bg-[#60CDFF]/80 text-white',
                  )}
                  aria-hidden
                >
                  <Send className="size-4" />
                </span>
              </div>
            </div>
          </PulseAppShell>
        </div>
      </ScaleToFit>
    </DemoFrame>
  )
}

function SelectRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#15181e] px-3 py-2">
      <p className="text-[10px] text-white/35">{label}</p>
      <div className="mt-0.5 flex items-center justify-between gap-2">
        <p className="truncate text-[12px] font-medium text-white/85">{value}</p>
        <ChevronDown className="size-3.5 shrink-0 text-white/35" aria-hidden />
      </div>
    </div>
  )
}
