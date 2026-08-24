'use client'
import { useEffect, useRef, useState } from 'react'
import { Share2, Link2, Check } from 'lucide-react'

const Fb = () => <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.6-.1-1.4-.2-2.2-.2-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.5v7h3Z"/></svg>
const XLogo = () => <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M17.8 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.3L5.6 21h-3l7.1-8.1L2 3h6.3l4.3 5.7L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z"/></svg>
const Wa = () => <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Zm0 16.3c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-2.7.7.7-2.6-.2-.3A7.3 7.3 0 1 1 12 19.3Zm4.1-5.4c-.2-.1-1.3-.7-1.5-.7-.2-.1-.4-.1-.5.1-.2.2-.6.7-.7.8-.1.2-.3.2-.5.1a6 6 0 0 1-3-2.6c-.2-.4.2-.4.6-1.2 0-.2 0-.3-.1-.4l-.7-1.6c-.2-.4-.3-.4-.5-.4h-.4c-.2 0-.5.1-.7.3-.9.9-.7 2 .1 3.2.8 1.2 2.3 2.9 4.5 3.7 1.7.7 2.4.6 3.2.5.5-.1 1.3-.5 1.5-1 .2-.5.2-1 .1-1.1l-.4-.3Z"/></svg>
const Tg = () => <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M20.7 4.6 2.9 11.4c-.9.4-.9 1 0 1.3l4.4 1.4 1.7 5.2c.2.6.5.7 1 .3l2.5-1.9 4.5 3.3c.7.4 1.2.2 1.4-.7l2.7-14.4c.2-1-.4-1.4-1.4-.9ZM8.9 13.9l8.7-5.5c.4-.3.8-.1.5.2l-7.3 6.6-.3 3.1-1.6-4.4Z"/></svg>
const Ig = () => <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none"/></svg>

export function ShareButton({ title }: { title: string }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false) }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc) }
  }, [open])

  const getUrl = () => (typeof window !== 'undefined' ? window.location.href : '')
  const copy = async () => {
    try { await navigator.clipboard.writeText(getUrl()); setCopied(true); setTimeout(() => setCopied(false), 1600) } catch {}
  }

  const targets = [
    { name: 'ফেসবুক', icon: <Fb/>, color: 'text-[#1877f2]', href: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}` },
    { name: 'X (টুইটার)', icon: <XLogo/>, color: 'text-ink', href: () => `https://twitter.com/intent/tweet?url=${encodeURIComponent(getUrl())}&text=${encodeURIComponent(title)}` },
    { name: 'হোয়াটসঅ্যাপ', icon: <Wa/>, color: 'text-[#25d366]', href: () => `https://wa.me/?text=${encodeURIComponent(title + ' ' + getUrl())}` },
    { name: 'লিংকডইন', icon: null, color: 'text-[#0a66c2]', linkedin: true },
    { name: 'টেলিগ্রাম', icon: <Tg/>, color: 'text-[#229ed9]', href: () => `https://t.me/share/url?url=${encodeURIComponent(getUrl())}&text=${encodeURIComponent(title)}` },
    { name: 'ইনস্টাগ্রাম', icon: <Ig/>, color: 'text-[#e1306c]', instagram: true },
  ]

  const act = async (t: (typeof targets)[number]) => {
    const url = getUrl()
    if (t.linkedin) { window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'noopener') }
    else if (t.instagram) { await copy(); window.open('https://www.instagram.com/', '_blank', 'noopener') }
    else if (t.href) window.open(t.href(), '_blank', 'noopener,width=600,height=520')
    setOpen(false)
  }

  return (
    <div ref={box} className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}>
      <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-haspopup="true"
        className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${open ? 'border-primary bg-primary text-white' : 'border-line bg-white hover:border-primary hover:text-primary'}`}>
        <Share2 size={15}/> শেয়ার করুন
      </button>

      <div role="menu"
        className={`absolute bottom-full left-0 z-30 mb-2 w-52 origin-bottom-left rounded-lg border border-line bg-white p-1.5 shadow-[0_16px_40px_rgba(23,32,29,.16)] transition-all duration-150 ${open ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'}`}>
        {targets.map(t => (
          <button key={t.name} type="button" role="menuitem" onClick={() => act(t)}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-subtle transition-colors hover:bg-paper hover:text-ink">
            <span className={t.color}>{t.icon ?? <span className={`inline-block h-4 w-4 rounded-sm ${t.name === 'লিংকডইন' ? 'bg-[#0a66c2]' : ''}`}/>}</span>
            {t.name}
          </button>
        ))}
        <div className="my-1 h-px bg-line"/>
        <button type="button" onClick={copy}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-subtle transition-colors hover:bg-paper hover:text-ink">
          <span className="text-primary">{copied ? <Check size={15}/> : <Link2 size={15}/>}</span>
          {copied ? 'লিংক কপি হয়েছে!' : 'লিংক কপি করুন'}
        </button>
      </div>
    </div>
  )
}
