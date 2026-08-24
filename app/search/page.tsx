'use client'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { Header, Footer } from '@/components/site/site-shell'
import { NewsGrid } from '@/components/news/news-card'
import { searchNews } from '@/lib/news'

export default function SearchPage() {
  const [q, setQ] = useState('')
  const results = searchNews(q)
  return (
    <>
      <Header/>
      <main className="mx-auto w-full max-w-[1160px] px-5 py-16">
        <span className="text-xs font-bold uppercase tracking-[1.4px] text-primary">নিউজরুম খুঁজুন</span>
        <h1 className="mt-3 text-[clamp(38px,5vw,58px)] font-extrabold tracking-tight">অনুসন্ধান</h1>
        <div className="mt-8 flex max-w-2xl items-center gap-3 border-b-2 border-ink py-4">
          <Search size={20} className="shrink-0 text-subtle"/>
          <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="শিরোনাম, বিষয় বা কীওয়ার্ড লিখুন" aria-label="অনুসন্ধান" className="w-full bg-transparent text-lg outline-none placeholder:text-subtle/70"/>
        </div>
        {q ? (
          <>
            <p className="mt-5 text-sm text-subtle">{results.length}টি প্রতিবেদন পাওয়া গেছে</p>
            <div className="mt-6">
              {results.length
                ? <NewsGrid articles={results}/>
                : <div className="py-14 text-subtle">এই শব্দে কোনো প্রতিবেদন পাওয়া যায়নি।</div>}
            </div>
          </>
        ) : (
          <p className="mt-5 text-sm text-subtle">শিরোনাম, সারাংশ বা ট্যাগ দিয়ে খুঁজুন।</p>
        )}
      </main>
      <Footer/>
    </>
  )
}
