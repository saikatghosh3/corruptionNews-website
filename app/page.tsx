import Link from 'next/link'
import { ArrowUpRight, ChevronRight } from 'lucide-react'
import { Header, Footer } from '@/components/site/site-shell'
import { NewsTicker } from '@/components/site/news-ticker'
import { TypingHeading } from '@/components/site/typing-heading'
import { NewsCard, NewsGrid } from '@/components/news/news-card'
import { getFeaturedNews, getLatestNews } from '@/lib/news'

export default function Home() {
  const featured = getFeaturedNews()[0]
  return (
    <>
      <Header/>
      <NewsTicker/>
      <main>
        <section className="mx-auto w-full max-w-[1160px] px-5 pb-20 pt-24">
          <div className="text-xs font-bold uppercase tracking-[1.4px] text-primary">দুর্নীতিবিরোধী সাংবাদিকতা <span className="px-2 text-accent">●</span> ২৪ আগস্ট ২০২৬</div>
          <TypingHeading/>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-subtle">নথি, তথ্য ও মাঠপর্যায়ের অনুসন্ধানে CorruptionNewsBD24 তুলে আনে জনস্বার্থের গল্প—যে গল্পগুলো জানা জরুরি।</p>
          <Link href="/category/investigative" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-deep">সব অনুসন্ধান দেখুন <ArrowUpRight size={17}/></Link>
        </section>

        <section className="mx-auto w-full max-w-[1160px] px-5 py-12">
          <div className="mb-7 flex items-end justify-between gap-5">
            <div><span className="block text-xs font-bold uppercase tracking-[1.4px] text-primary">প্রধান প্রতিবেদন</span><h2 className="mt-1.5 text-[34px] font-bold leading-tight tracking-tight">আজকের অনুসন্ধান</h2></div>
            <span className="mb-2 h-px flex-1 bg-line"/>
          </div>
          {featured && <NewsCard article={featured} featured/>}
        </section>

        <section className="mx-auto w-full max-w-[1160px] px-5 py-12">
          <div className="mb-7 flex items-end justify-between gap-5">
            <div><span className="block text-xs font-bold uppercase tracking-[1.4px] text-primary">সর্বশেষ</span><h2 className="mt-1.5 text-[34px] font-bold leading-tight tracking-tight">নিউজরুম থেকে</h2></div>
            <Link href="/search" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-deep">সব খবর <ChevronRight size={16}/></Link>
          </div>
          <NewsGrid articles={getLatestNews(6)}/>
        </section>

        <section className="mt-10 bg-primary text-white">
          <div className="mx-auto flex w-full max-w-[1160px] flex-col items-start justify-between gap-7 px-5 py-14 md:flex-row md:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[1.4px] text-[#b9ddc9]">আপনার তথ্য গুরুত্বপূর্ণ</span>
              <h2 className="mt-1.5 text-3xl font-bold tracking-tight">দুর্নীতির কোনো তথ্য বা নথি আছে?</h2>
              <p className="mt-2 text-[#d1e5db]">নিরাপদে আমাদের সঙ্গে শেয়ার করুন। আপনার পরিচয় গোপন রাখা হবে।</p>
            </div>
            <Link href="/send-tip" className="shrink-0 inline-flex items-center gap-2 bg-accent px-6 py-3.5 font-bold text-ink transition-colors hover:bg-white">গোপন তথ্য পাঠান <ArrowUpRight size={16}/></Link>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1160px] px-5 py-14">
          <div className="mb-7"><span className="block text-xs font-bold uppercase tracking-[1.4px] text-primary">সর্বশেষ যাচাইকৃত</span><h2 className="mt-1.5 text-[34px] font-bold leading-tight tracking-tight">সংবাদ প্রবাহ</h2></div>
          <NewsGrid articles={getLatestNews().slice(6)}/>
        </section>
      </main>
      <Footer/>
    </>
  )
}
