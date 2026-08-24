'use client'
import { useEffect, useMemo, useState } from 'react'

const LINE1 = 'দুর্নীতির প্রতিটি'
const LINE2 = 'আড়াল উন্মোচন করি।'

const TYPE_MS = 72
const TYPE_JITTER = 34
const DELETE_MS = 26
const PAUSE_LINE = 320
const HOLD_MS = 2800
const RESTART_MS = 520

function graphemes(text: string): string[] {
  const Seg = (Intl as unknown as { Segmenter?: new (l: string, o: object) => { segment: (s: string) => Iterable<{ segment: string }> } }).Segmenter
  if (Seg) return Array.from(new Seg('bn', { granularity: 'grapheme' }).segment(text), x => x.segment)
  return Array.from(text)
}

export function TypingHeading() {
  const g1 = useMemo(() => graphemes(LINE1), [])
  const g2 = useMemo(() => graphemes(LINE2), [])
  const [n1, setN1] = useState(0)
  const [n2, setN2] = useState(0)
  const [idle, setIdle] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN1(g1.length); setN2(g2.length); setIdle(true)
      return
    }
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const wait = (ms: number) => new Promise<void>(res => { timers.push(setTimeout(res, ms)) })

    ;(async () => {
      while (!cancelled) {
        setN1(0); setN2(0); setIdle(true)
        await wait(RESTART_MS)
        if (cancelled) return
        setIdle(false)
        for (let i = 1; i <= g1.length; i++) {
          if (cancelled) return
          setN1(i)
          await wait(TYPE_MS + Math.random() * TYPE_JITTER)
        }
        await wait(PAUSE_LINE)
        for (let j = 1; j <= g2.length; j++) {
          if (cancelled) return
          setN2(j)
          await wait(TYPE_MS * 0.75 + Math.random() * TYPE_JITTER * 0.6)
        }
        setIdle(true)
        await wait(HOLD_MS)
        if (cancelled) return
        setIdle(false)
        const total = g1.length + g2.length
        for (let t = total - 1; t >= 0; t--) {
          if (cancelled) return
          setN1(Math.min(t, g1.length))
          setN2(Math.max(0, t - g1.length))
          await wait(DELETE_MS)
        }
      }
    })()

    return () => { cancelled = true; timers.forEach(clearTimeout) }
  }, [g1, g2])

  const typed = n1 + n2 > 0
  const caret = (
    <span
      aria-hidden="true"
      className={`ml-0.5 inline-block h-[0.82em] w-[3px] translate-y-[0.14em] rounded-sm bg-accent ${idle ? 'animate-caret' : ''}`}
    />
  )

  return (
    <h1 aria-label={LINE1 + ' ' + LINE2} className="mt-5 max-w-3xl text-[clamp(32px,4.2vw,54px)] font-extrabold leading-[1.18] tracking-tight md:text-[clamp(36px,4.6vw,60px)]" style={{ minHeight: '2.45em' }}>
      {typed || n2 === 0 ? (
        <>
          <span aria-hidden="true">{g1.slice(0, n1).join('')}</span>
          {n2 === 0 && caret}
          {n2 > 0 && (
            <>
              <br/>
              <em aria-hidden="true" className="not-italic text-primary">{g2.slice(0, n2).join('')}</em>
              {caret}
            </>
          )}
        </>
      ) : null}
    </h1>
  )
}
