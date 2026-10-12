'use client'

import { useEffect, useState } from 'react'
import { Bot, ChevronDown, Send, ShieldCheck, Sparkles } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { PageHeader, PulseAppShell } from './PulseAppShell'
import { DemoFrame, MIDNIGHT, ScaleToFit } from './shared'

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

export function AiDemo() {
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
        window.setTimeout(
          () => {
            setInputTyped(current.question.slice(0, i + 1))
          },
          t + i * 22,
        ),
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
        window.setTimeout(
          () => {
            setBulletCount(i + 1)
          },
          t + 280 + i * 520,
        ),
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
          <PulseAppShell active="assistant" className="h-full">
            <div className="flex h-full flex-col overflow-hidden pt-3 pr-3">
              <PageHeader title="Assistant" />

              <div className="mb-2 flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-white/[0.08] bg-[#111114] text-white/80">
                  <Bot className="size-4" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-white/90">
                    Local AI diagnostics chat
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/65">
                    <span className="live-dot size-1.5 rounded-full bg-[#34D399]" aria-hidden />
                    Local AI connected
                  </p>
                </div>
              </div>
              <p className="mb-2 flex items-center gap-1.5 text-[11px] text-white/65">
                <ShieldCheck className="size-3.5 shrink-0 text-[#34D399]" aria-hidden />
                Local AI · Your diagnostic data stays on this PC
              </p>
              <div className="mb-1.5 flex items-center justify-between">
                <p className="font-mono-pulse text-[10px] text-white/55">
                  {scene.provider} · {scene.model}
                </p>
                <span className="text-[11px] font-semibold" style={{ color: MIDNIGHT.lime }}>
                  Clear chat
                </span>
              </div>
              <div className="mb-3 grid grid-cols-2 gap-2.5">
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
                    {phase < 2 ? (
                      <div className="flex flex-1 flex-col items-center justify-center text-center">
                        <span className="mb-3 flex size-11 items-center justify-center rounded-[12px] bg-[#C8F04A]/15">
                          <Sparkles
                            className="size-5"
                            style={{ color: MIDNIGHT.lime }}
                            aria-hidden
                          />
                        </span>
                        <p className="text-[20px] font-semibold tracking-[-0.02em]">
                          Ask about this Windows PC
                        </p>
                        <p className="mt-1 text-[12px] text-white/60">
                          Pulse Assistant can inspect read-only diagnostics through your local
                          model.
                        </p>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                          {SCENES.map((item) => (
                            <span
                              key={item.question}
                              className={cn(
                                'rounded-full border px-3 py-1.5 text-[11px] font-medium',
                                item.question === scene.question
                                  ? 'border-[#C8F04A]/50 text-white'
                                  : 'border-white/[0.12] text-white/80',
                              )}
                            >
                              {item.question}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {phase >= 2 ? (
                      <motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="ml-auto max-w-[78%] rounded-[18px] rounded-br-[6px] bg-[#F4F4F5] px-4 py-2.5 text-[13px] leading-relaxed font-medium text-[#08080A]"
                      >
                        {scene.question}
                      </motion.div>
                    ) : null}

                    {phase >= 3 ? (
                      <motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-[88%] rounded-[18px] rounded-bl-[6px] border border-white/[0.08] bg-[#111114] px-4 py-3"
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
                              <span
                                className="mt-1.5 size-1 shrink-0 rounded-full"
                                style={{ background: MIDNIGHT.lime }}
                              />
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
                                <span
                                  className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse"
                                  style={{ background: MIDNIGHT.lime }}
                                />
                              ) : null}
                            </p>
                            <span className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-medium text-white/45">
                              Analyzed
                              <ChevronDown className="size-3" aria-hidden />
                            </span>
                          </>
                        ) : bulletCount < scene.bullets.length ? (
                          <p className="mt-2 text-[11px] text-white/45">
                            Reading local diagnostics…
                          </p>
                        ) : null}
                      </motion.div>
                    ) : null}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-3 -ml-3 flex items-center gap-2.5 border-t border-white/[0.08] pt-3 pl-3">
                <p
                  className={cn(
                    'min-w-0 flex-1 truncate rounded-full border border-white/[0.12] bg-[#111114] px-4 py-2 text-[12px]',
                    inputTyped ? 'text-white/90' : 'text-white/45',
                  )}
                >
                  {inputTyped || 'Ask about this PC…'}
                  {phase === 1 && !reduceMotion ? (
                    <span
                      className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse align-middle"
                      style={{ background: MIDNIGHT.lime }}
                    />
                  ) : null}
                </p>
                <span
                  className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-[12px] text-[#08080A] transition-opacity',
                    phase === 1 && inputTyped.length === scene.question.length
                      ? 'opacity-100'
                      : 'opacity-45',
                  )}
                  style={{ background: MIDNIGHT.lime }}
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
    <div>
      <p className="mb-1 text-[10px] text-white/60">{label}</p>
      <div className="flex items-center justify-between gap-2 rounded-full border border-white/[0.1] bg-[#111114] px-3.5 py-1.5">
        <p className="truncate text-[12px] font-semibold text-white/90">{value}</p>
        <ChevronDown className="size-3.5 shrink-0 text-white/60" aria-hidden />
      </div>
    </div>
  )
}
