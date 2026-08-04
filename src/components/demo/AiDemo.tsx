'use client'

import { useEffect, useState } from 'react'
import { Cable, Check, Sparkles, Terminal, Wrench } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { PulseLogo } from '@/components/icons/PulseLogo'
import { SITE } from '@/lib/constants'
import { cn } from '@/lib/cn'
import { DemoFrame, ScaleToFit } from './shared'

type Client = 'Cursor' | 'Claude' | 'ChatGPT'

type Scene = {
  client: Client
  question: string
  tools: Array<{ name: string; label: string; result: string }>
  answer: string
}

const CLIENT_STYLE: Record<
  Client,
  { badge: string; ring: string; label: string }
> = {
  Cursor: {
    badge: 'bg-[#f54e00]/15 text-[#ff8a5c]',
    ring: 'ring-[#f54e00]/40',
    label: 'Cursor',
  },
  Claude: {
    badge: 'bg-[#d4a27f]/15 text-[#e6c2a0]',
    ring: 'ring-[#d4a27f]/40',
    label: 'Claude',
  },
  ChatGPT: {
    badge: 'bg-[#10a37f]/15 text-[#5eead4]',
    ring: 'ring-[#10a37f]/40',
    label: 'ChatGPT',
  },
}

const SCENES: Scene[] = [
  {
    client: 'Cursor',
    question: 'Why did my PC restart earlier — anything in the event log?',
    tools: [
      {
        name: 'pulse_timeline',
        label: 'Recent events',
        result: 'Kernel-Power 41 · unexpected shutdown · 1h ago',
      },
      {
        name: 'pulse_health',
        label: 'System health',
        result: 'Score 94 · Healthy · uptime 3h 8m',
      },
    ],
    answer:
      'Pulse shows Kernel-Power 41 about an hour ago — unclean restart. Health is fine now (94).',
  },
  {
    client: 'Claude',
    question: 'Is BITS healthy, and what else looks off in services?',
    tools: [
      {
        name: 'pulse_inventory',
        label: 'Service lookup',
        result: 'BITS · running · automatic',
      },
      {
        name: 'pulse_timeline',
        label: 'Service events',
        result: 'No recent service crashes · 0 critical',
      },
    ],
    answer:
      'BITS is running (automatic). Timeline has no recent service crashes — looks stable.',
  },
  {
    client: 'ChatGPT',
    question: 'Summarize CPU / memory pressure for the last minute.',
    tools: [
      {
        name: 'pulse_health',
        label: 'Live metrics',
        result: 'CPU 43% · Memory 16.5 / 32 GB · GPU 1%',
      },
    ],
    answer:
      'From Pulse health: CPU ~43%, memory about half full, GPU idle. No pressure spike right now.',
  },
  {
    client: 'Cursor',
    question: 'Any USB or driver noise I should care about?',
    tools: [
      {
        name: 'pulse_inventory',
        label: 'Devices',
        result: 'USB hub OK · 0 failed drivers',
      },
      {
        name: 'pulse_timeline',
        label: 'Device events',
        result: '2 info · 0 errors in last hour',
      },
    ],
    answer:
      'Inventory looks clean — no failed drivers. Timeline only has info-level device events.',
  },
  {
    client: 'Claude',
    question: 'Give me a one-line status I can paste into a support note.',
    tools: [
      {
        name: 'pulse_health',
        label: 'Health score',
        result: '94 · Healthy',
      },
      {
        name: 'pulse_timeline',
        label: 'Latest critical',
        result: 'Last critical: Kernel-Power 41 · 1h ago',
      },
    ],
    answer:
      'Pulse status: Healthy (94). Last critical was Kernel-Power 41 (~1h). MCP tools local-only.',
  },
]

const ALL_TOOLS = [
  'pulse_timeline',
  'pulse_health',
  'pulse_inventory',
  'pulse_reports',
  'pulse_diagnostics',
]

export function AiDemo({ version = SITE.versionFallback }: { version?: string }) {
  const reduceMotion = useReducedMotion()
  const [sceneIndex, setSceneIndex] = useState(0)
  const [phase, setPhase] = useState(0)
  const [toolCount, setToolCount] = useState(0)
  const [typed, setTyped] = useState('')

  const scene = SCENES[sceneIndex]
  const clientStyle = CLIENT_STYLE[scene.client]
  const activeToolNames = new Set(scene.tools.slice(0, toolCount).map((t) => t.name))

  useEffect(() => {
    if (reduceMotion) {
      setPhase(3)
      setToolCount(scene.tools.length)
      setTyped(scene.answer)
      return
    }

    setPhase(0)
    setToolCount(0)
    setTyped('')

    const timers: number[] = []
    let t = 280
    const current = SCENES[sceneIndex]

    timers.push(window.setTimeout(() => setPhase(1), t))
    t += 900

    current.tools.forEach((_, i) => {
      const at = t
      timers.push(
        window.setTimeout(() => {
          setPhase(2)
          setToolCount(i + 1)
        }, at),
      )
      t += 700
    })

    timers.push(window.setTimeout(() => setPhase(3), t))
    t += 2400 + current.answer.length * 14

    timers.push(
      window.setTimeout(() => {
        setSceneIndex((prev) => (prev + 1) % SCENES.length)
      }, t),
    )

    return () => timers.forEach(clearTimeout)
  }, [sceneIndex, reduceMotion, scene.answer, scene.tools.length])

  useEffect(() => {
    if (phase < 3 || reduceMotion) return

    setTyped('')
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setTyped(scene.answer.slice(0, i))
      if (i >= scene.answer.length) window.clearInterval(id)
    }, 14)

    return () => window.clearInterval(id)
  }, [phase, scene.answer, sceneIndex, reduceMotion])

  return (
    <DemoFrame>
      <ScaleToFit width={960} height={560}>
        <div className="h-[560px] w-[960px]">
          <div className="flex h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0f12] text-white">
            <aside className="flex w-[236px] shrink-0 flex-col border-r border-white/[0.06] bg-[#12151a]">
              <div className="flex items-center gap-2.5 px-4 pt-4 pb-3">
                <PulseLogo size={32} className="rounded-[8px]" />
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold leading-none">Pulse MCP</p>
                  <p className="mt-1 text-[10px] text-white/40">Tool server · not a chat app</p>
                </div>
              </div>

              <div className="mx-3 mb-3 rounded-xl border border-[#3DDA7A]/25 bg-[#3DDA7A]/08 p-3">
                <div className="flex items-center gap-2">
                  <span className="live-dot size-1.5 rounded-full bg-[#3DDA7A]" aria-hidden />
                  <span className="text-[11px] font-semibold text-[#6EE7A0]">MCP online</span>
                </div>
                <p className="mt-2 text-[10px] leading-relaxed text-white/45">
                  Connect Cursor, Claude, or ChatGPT. Pulse only exposes read-only tools.
                </p>
                <p className="mt-2 font-mono-pulse text-[9px] text-white/30">
                  v{version}
                </p>
              </div>

              <p className="px-4 pb-2 text-[10px] font-semibold tracking-[0.14em] text-white/30 uppercase">
                Tools for clients
              </p>
              <ul className="space-y-1 px-3">
                {ALL_TOOLS.map((name) => (
                  <li
                    key={name}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px]',
                      activeToolNames.has(name)
                        ? 'bg-[#3DDA7A]/12 text-[#6EE7A0]'
                        : 'text-white/45',
                    )}
                  >
                    <Wrench className="size-3 shrink-0 opacity-70" aria-hidden />
                    <span className="truncate font-mono-pulse text-[10px]">{name}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto space-y-2 border-t border-white/[0.06] p-3">
                <p className="text-[10px] font-semibold tracking-wide text-white/30 uppercase">
                  Active client
                </p>
                <div
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-2.5 py-2 text-[12px] font-semibold ring-1',
                    clientStyle.badge,
                    clientStyle.ring,
                  )}
                >
                  <span className="live-dot size-1.5 rounded-full bg-current" aria-hidden />
                  {clientStyle.label}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-white/40">
                  <Cable className="size-3.5 text-[#3DDA7A]" aria-hidden />
                  <span>stdio · localhost only</span>
                </div>
              </div>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
              <header className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold">External AI client</p>
                  <p className="text-[10px] text-white/40">
                    Chat lives in {scene.client} — Pulse is only the MCP backend
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {(['Cursor', 'Claude', 'ChatGPT'] as const).map((name) => (
                    <span
                      key={name}
                      className={cn(
                        'rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors',
                        scene.client === name
                          ? CLIENT_STYLE[name].badge
                          : 'bg-white/[0.04] text-white/30',
                      )}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </header>

              <div className="relative flex flex-1 flex-col gap-3 overflow-hidden p-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={sceneIndex}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-1 flex-col gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-1 text-[10px] font-semibold',
                          clientStyle.badge,
                        )}
                      >
                        {scene.client}
                      </span>
                      <span className="text-[10px] text-white/35">via Pulse MCP</span>
                      <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-white/30">
                        <Sparkles className="size-3" aria-hidden />
                        Scene {sceneIndex + 1}/{SCENES.length}
                      </span>
                    </div>

                    {phase >= 1 ? (
                      <motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-[#1c2430] px-4 py-3 text-[13px] leading-relaxed text-white/90"
                      >
                        <p className="mb-1 text-[10px] font-semibold tracking-wide text-white/35 uppercase">
                          You · in {scene.client}
                        </p>
                        {scene.question}
                      </motion.div>
                    ) : null}

                    {phase >= 2 ? (
                      <motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-[90%] space-y-2"
                      >
                        <div className="mb-1 flex items-center gap-2 text-[11px] text-white/40">
                          <Terminal className="size-3.5" aria-hidden />
                          {scene.client} called Pulse MCP…
                        </div>
                        {scene.tools.slice(0, toolCount).map((tool, i) => {
                          const done = i < toolCount - 1 || phase >= 3
                          return (
                            <motion.div
                              key={`${sceneIndex}-${tool.name}`}
                              initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="rounded-xl border border-[#3DDA7A]/35 bg-[#3DDA7A]/08 px-3 py-2.5"
                            >
                              <div className="flex items-center gap-2">
                                {done ? (
                                  <Check className="size-3.5 text-[#3DDA7A]" aria-hidden />
                                ) : (
                                  <span
                                    className="live-dot size-2 rounded-full bg-[#3DDA7A]"
                                    aria-hidden
                                  />
                                )}
                                <span className="font-mono-pulse text-[11px] text-[#6EE7A0]">
                                  {tool.name}
                                </span>
                                <span className="text-[10px] text-white/35">{tool.label}</span>
                              </div>
                              {done ? (
                                <p className="mt-1.5 text-[11px] text-white/70">{tool.result}</p>
                              ) : null}
                            </motion.div>
                          )
                        })}
                      </motion.div>
                    ) : null}

                    {phase >= 3 ? (
                      <motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-[90%] rounded-2xl rounded-bl-md border border-white/[0.06] bg-[#15181e] px-4 py-3"
                      >
                        <p className="mb-1.5 text-[10px] font-semibold tracking-wide text-white/35 uppercase">
                          {scene.client} · using Pulse tools
                        </p>
                        <p className="text-[13px] leading-relaxed text-white/85">
                          {typed}
                          {!reduceMotion && typed.length < scene.answer.length ? (
                            <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-[#3DDA7A]" />
                          ) : null}
                        </p>
                      </motion.div>
                    ) : null}
                  </motion.div>
                </AnimatePresence>
              </div>

              <footer className="border-t border-white/[0.06] px-5 py-3 text-[11px] text-white/35">
                No built-in Pulse chat · MCP bridge to Cursor / Claude / ChatGPT · data stays local
              </footer>
            </div>
          </div>
        </div>
      </ScaleToFit>
    </DemoFrame>
  )
}
