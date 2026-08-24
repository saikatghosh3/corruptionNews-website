'use client'
import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

const R = 21
const CIRC = 2 * Math.PI * R

export function ScrollToTop() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const visible = progress > 0.08

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
      title="উপরে যান"
      aria-label="উপরে যান"
      className={`fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-white text-primary shadow-xl shadow-ink/20 ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-5 opacity-0'}`}
    >
      <svg viewBox="0 0 48 48" className="pointer-events-none absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="24" cy="24" r={R} fill="none" stroke="#e5ebe4" strokeWidth="3"/>
        <circle cx="24" cy="24" r={R} fill="none" stroke="#176b52" strokeWidth="3" strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - progress)}/>
      </svg>
      <span className="grid h-7 w-7 place-items-center rounded-full bg-chip transition-colors group-hover:bg-transparent"><ArrowUp size={16}/></span>
    </button>
  )
}
