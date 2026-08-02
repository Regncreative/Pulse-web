'use client'

import { useEffect, useState } from 'react'
import { Bot, Cable, Check, Sparkles, Terminal, Wrench } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { PulseLogo } from '@/components/icons/PulseLogo'
import { SITE } from '@/lib/constants'
import { cn } from '@/lib/cn'
import { DemoFrame, ScaleToFit } from './shared'

const TOOLS = [
  { name: 'pulse_timeline', label: 'Recent events', result: '3 errors · 1 unexpected shutdown' },
  { name: 'pulse_health', label: 'System health', result: 'Score 94 · CPU 43% · Memory 16.5 GB' },
  { name: 'pulse_inventory', label: 'Service lookup', result: 'BITS running · automatic' },
]

const ANSWER =
  'Kernel-Power 41 fired about an hour ago — the machine restarted without a clean shutdown. Health looks fine now (94). BITS is running normally.'

export function AiDemo() {
  const reduceMotion = useReducedMotion()
  const [step, setStep] = useState(0)
  const [toolCount, setToolCount] = useState(0)
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (reduceMotion) {
      setStep(4)
      setToolCount(TOOLS.length)
      setTyped(ANSWER)
      return
    }

    const timers = [
      window.setTimeout(() => setStep(1), 350),
      window.setTimeout(() => {
        setStep(2)
        setToolCount(1)
      }, 1100),
      window.setTimeout(() => setToolCount(2), 1800),
      window.setTimeout(() => setToolCount(3), 2500),
      window.setTimeout(() => setStep(3), 3200),
      window.setTimeout(() => setStep(4), 3900),
    ]

    return () => timers.forEach(clearTimeout)
  }, [reduceMotion])

  useEffect(() => {
    if (step < 4 || reduceMotion) return

    setTyped('')
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setTyped(ANSWER.slice(0, i))
      if (i >= ANSWER.length) window.clearInterval(id)
    }, 16)

    return () => window.clearInterval(id)
  }, [step, reduceMotion])

  return (
    <DemoFrame>
      <ScaleToFit width={960} height={560}>
        <div className="h-[560px] w-[960px]">
          <div className="flex h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0f12] text-white shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
            <aside className="flex w-[240px] shrink-0 flex-col border-r border-white/[0.06] bg-[#12151a]">
              <div className="flex items-center gap-2.5 px-4 pt-4 pb-4">
                <PulseLogo size={32} className="rounded-[8px]" />
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold leading-none">Pulse MCP</p>
                  <p className="mt-1 text-[10px] text-white/40">Local Model Context Protocol</p>
                </div>
              </div>

              <div className="mx-3 mb-3 rounded-xl border border-[#3DDA7A]/25 bg-[#3DDA7A]/08 p-3">
                <div className="flex items-center gap-2">
                  <span className="live-dot size-1.5 rounded-full bg-[#3DDA7A]" aria-hidden />
                  <span className="text-[11px] font-semibold text-[#6EE7A0]">Server online</span>
                </div>
                <p className="mt-2 text-[10px] leading-relaxed text-white/45">
                  Tools stay on this PC. No cloud relay.
                </p>
                <p className="mt-2 font-mono-pulse text-[9px] text-white/30">
                  v{SITE.versionFallback}
                </p>
              </div>

              <p className="px-4 pb-2 text-[10px] font-semibold tracking-[0.14em] text-white/30 uppercase">
                Exposed tools
              </p>
              <ul className="space-y-1 px-3">
                {TOOLS.map((tool, i) => (
                  <motion.li
                    key={tool.name}
                    initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 + i * 0.08 }}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px]',
                      toolCount > i ? 'bg-[#3DDA7A]/12 text-[#6EE7A0]' : 'text-white/55',
                    )}
                  >
                    <Wrench className="size-3 shrink-0 opacity-70" aria-hidden />
                    <span className="truncate font-mono-pulse text-[10px]">{tool.name}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto border-t border-white/[0.06] p-3">
                <div className="flex items-center gap-2 text-[10px] text-white/40">
                  <Cable className="size-3.5 text-[#3DDA7A]" aria-hidden />
                  <span>stdio · localhost only</span>
                </div>
              </div>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
              <header className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-full bg-[#0078d4]/20 text-[#7ab7ef]">
                    <Bot className="size-4" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold">AI assistant</p>
                    <p className="text-[10px] text-white/40">Asking Pulse over MCP</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3DDA7A]/12 px-2.5 py-1 text-[10px] font-semibold text-[#3DDA7A]">
                  <Sparkles className="size-3" aria-hidden />
                  Local tools
                </span>
              </header>

              <div className="flex flex-1 flex-col gap-3 overflow-hidden p-5">
                {step >= 1 ? (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="ml-auto max-w-[78%] rounded-2xl rounded-br-md bg-[#1c2430] px-4 py-3 text-[13px] leading-relaxed text-white/90"
                  >
                    Why did my PC restart earlier, and is everything healthy now?
                  </motion.div>
                ) : null}

                {step >= 2 ? (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-[88%] space-y-2"
                  >
                    <div className="mb-1 flex items-center gap-2 text-[11px] text-white/40">
                      <Terminal className="size-3.5" aria-hidden />
                      Calling Pulse MCP tools…
                    </div>
                    {TOOLS.slice(0, toolCount).map((tool, i) => {
                      const done = step >= 3 || i < toolCount - 1 || toolCount === TOOLS.length
                      return (
                        <motion.div
                          key={tool.name}
                          initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
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
                          {(done || step >= 3) && (
                            <p className="mt-1.5 text-[11px] text-white/70">{tool.result}</p>
                          )}
                        </motion.div>
                      )
                    })}
                  </motion.div>
                ) : null}

                {step >= 4 ? (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-[88%] rounded-2xl rounded-bl-md border border-white/[0.06] bg-[#15181e] px-4 py-3"
                  >
                    <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold tracking-wide text-[#6EE7A0] uppercase">
                      <Bot className="size-3.5" aria-hidden />
                      Answer grounded in Pulse
                    </div>
                    <p className="text-[13px] leading-relaxed text-white/85">
                      {typed}
                      {!reduceMotion && typed.length < ANSWER.length ? (
                        <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-[#3DDA7A]" />
                      ) : null}
                    </p>
                  </motion.div>
                ) : null}
              </div>

              <footer className="border-t border-white/[0.06] px-5 py-3 text-[11px] text-white/35">
                Read-only tools · Observation only · Nothing leaves this machine
              </footer>
            </div>
          </div>
        </div>
      </ScaleToFit>
    </DemoFrame>
  )
}
