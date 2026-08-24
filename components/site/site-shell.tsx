'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, Search, X, Send, ArrowUpRight, ChevronDown, Globe, AtSign, Rss, Mail, MapPin } from 'lucide-react'
import { getCategories } from '@/lib/news'

export function BrandMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="cnbg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1c8a6a"/>
          <stop offset="1" stopColor="#0f5540"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#cnbg)"/>
      <circle cx="28" cy="28" r="14.5" fill="none" stroke="#fff" strokeWidth="3.4"/>
      <line x1="38.5" y1="38.5" x2="50" y2="50" stroke="#fff" strokeWidth="4.6" strokeLinecap="round"/>
      <text x="28" y="33.5" textAnchor="middle" fontFamily="'Noto Sans Bengali','Segoe UI',Arial,sans-serif" fontSize="13.5" fontWeight="800" fill="#fff">২৪</text>
      <circle cx="49" cy="16" r="3" fill="#d9a441"/>
    </svg>
  )
}

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`flex shrink-0 items-center gap-2.5 ${light ? 'text-white' : 'text-ink'}`}>
      <BrandMark/>
      <span className="leading-none">
        <span className="block text-[21px] font-extrabold tracking-tight">
          CorruptionNews<span className="text-primary">BD24</span>
        </span>
        <span className="mt-1 block text-[10px] font-medium tracking-wide text-subtle">দুর্নীতিবিরোধী অনুসন্ধানী সংবাদমাধ্যম</span>
      </span>
    </Link>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [openCat, setOpenCat] = useState<string | null>(null)
  const cats = getCategories()
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1160px] items-center gap-6 px-5 py-3.5">
        <button className="lg:hidden" aria-label="মেনু খুলুন" onClick={() => setOpen(!open)}>
          {open ? <X size={22}/> : <Menu size={22}/>}
        </button>
        <Brand/>
        <nav className="ml-auto hidden items-center lg:flex">
          {cats.map(c => (
            <div key={c.slug} className="group relative">
              <Link href={`/category/${c.slug}`} className="flex items-center gap-1 px-4 py-5 text-sm font-medium text-subtle transition-colors group-hover:text-primary hover:!text-primary">
                {c.name}<ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180"/>
              </Link>
              <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-2 rounded-md border border-line bg-white opacity-0 shadow-2xl shadow-ink/10 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <Link href={`/category/${c.slug}`} className="flex items-center justify-between border-b border-line bg-chip/60 px-4 py-3 text-[13px] font-bold text-primary">
                  সব প্রতিবেদন <ArrowUpRight size={14}/>
                </Link>
                {c.subcategories.map(s => (
                  <Link key={s.slug} href={`/category/${c.slug}/${s.slug}`} className="block px-4 py-2.5 text-[13px] text-subtle transition-colors hover:bg-paper hover:text-primary">
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4 lg:ml-2">
          <Link href="/send-tip" className="hidden items-center gap-2 rounded bg-primary px-4 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-deep sm:inline-flex">
            গোপন তথ্য পাঠান<Send size={14}/>
          </Link>
          <Link href="/search" aria-label="অনুসন্ধান" className="text-ink transition-colors hover:text-primary"><Search size={19}/></Link>
        </div>
      </div>
      {open && (
        <div className="border-t border-line px-5 pb-6 pt-4 lg:hidden">
          {cats.map(c => (
            <div key={c.slug} className="border-b border-line last:border-0">
              <button onClick={() => setOpenCat(openCat === c.slug ? null : c.slug)} className="flex w-full items-center justify-between py-3.5 text-[15px] font-semibold">
                {c.name}
                <ChevronDown size={16} className={`text-subtle transition-transform ${openCat === c.slug ? 'rotate-180' : ''}`}/>
              </button>
              {openCat === c.slug && (
                <div className="pb-3 pl-3">
                  <Link onClick={() => setOpen(false)} href={`/category/${c.slug}`} className="block py-1.5 text-sm font-bold text-primary">— সব প্রতিবেদন</Link>
                  {c.subcategories.map(s => (
                    <Link key={s.slug} onClick={() => setOpen(false)} href={`/category/${c.slug}/${s.slug}`} className="block py-1.5 pl-3 text-sm text-subtle">{s.name}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link onClick={() => setOpen(false)} href="/send-tip" className="mt-4 flex items-center justify-center gap-2 rounded bg-primary px-4 py-3 text-sm font-bold text-white">
            গোপন তথ্য পাঠান <ArrowUpRight size={15}/>
          </Link>
        </div>
      )}
    </header>
  )
}

export function Footer() {
  const cats = getCategories()
  return (
    <footer className="mt-20 bg-ink text-[#aab9af]">
      <div className="mx-auto grid w-full max-w-[1160px] gap-10 px-5 py-14 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        <div>
          <Brand light/>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">নথি, তথ্য ও অনুসন্ধানের মাধ্যমে দুর্নীতিবিরোধী জনস্বার্থের সাংবাদিকতা। যে সত্য লুকিয়ে থাকে, তা-ই আমাদের অনুসন্ধানের শুরু।</p>
          <div className="mt-6 flex gap-2.5">
            {[{ i: Globe, l: 'ওয়েব' }, { i: AtSign, l: 'সোশ্যাল' }, { i: Rss, l: 'আরএসএস' }, { i: Mail, l: 'ইমেইল' }].map(({ i: Icon, l }) => (
              <a key={l} href="#" aria-label={l} className="grid h-9 w-9 place-items-center rounded-full border border-[#39463f] transition-all hover:border-accent hover:bg-accent hover:text-ink"><Icon size={16}/></a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-[13px] font-bold uppercase tracking-wider text-white">বিভাগসমূহ</h3>
          <ul className="space-y-2.5">{cats.map(c => <li key={c.slug}><Link href={`/category/${c.slug}`} className="text-sm transition-colors hover:text-accent">{c.name}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className="mb-4 text-[13px] font-bold uppercase tracking-wider text-white">সংস্থা</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/search" className="transition-colors hover:text-accent">সব প্রতিবেদন</Link></li>
            <li><Link href="/send-tip" className="transition-colors hover:text-accent">গোপন তথ্য পাঠান</Link></li>
            <li><Link href="/category/data-lab" className="transition-colors hover:text-accent">ডাটা ল্যাব</Link></li>
            <li><Link href="/" className="transition-colors hover:text-accent">প্রচ্ছদ</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-[13px] font-bold uppercase tracking-wider text-white">যোগাযোগ</h3>
          <p className="flex items-center gap-2 text-sm"><Mail size={15} className="text-accent"/> info@corruptionnewsbd24.com</p>
          <p className="mt-2.5 flex items-center gap-2 text-sm"><MapPin size={15} className="text-accent"/> ঢাকা, বাংলাদেশ</p>
          <p className="mt-4 text-xs leading-relaxed">দুর্নীতির তথ্য পাঠাতে <Link href="/send-tip" className="font-bold text-accent underline underline-offset-2">গোপন তথ্য ফর্ম</Link> ব্যবহার করুন। আপনার পরিচয় গোপন থাকবে।</p>
        </div>
      </div>
      <div className="border-t border-[#39463f]">
        <div className="mx-auto flex w-full max-w-[1160px] flex-col justify-between gap-2 px-5 py-4 text-xs sm:flex-row sm:items-center">
          <span>© ২০২৬ CorruptionNewsBD24 — সর্বস্বত্ব সংরক্ষিত</span>
          <Link href="/send-tip" className="inline-flex items-center gap-2 font-bold text-accent transition-colors hover:text-white"><Send size={14}/> গোপন তথ্য পাঠান</Link>
        </div>
      </div>
    </footer>
  )
}
