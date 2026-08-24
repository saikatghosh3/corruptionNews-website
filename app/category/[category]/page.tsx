import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight, ChevronRight } from 'lucide-react'
import { Header, Footer } from '@/components/site/site-shell'
import { NewsGrid } from '@/components/news/news-card'
import { getCategories, getCategory, getNewsByCategory } from '@/lib/news'

export function generateStaticParams() { return getCategories().map(c => ({ category: c.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const c = getCategory(category)
  if (!c) notFound()
  return { title: `${c.name} — CorruptionNewsBD24`, description: c.description }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const c = getCategory(category)
  if (!c) notFound()
  const articles = getNewsByCategory(category)
  return (
    <>
      <Header/>
      <main className="mx-auto w-full max-w-[1160px] px-5 py-16">
        <nav className="flex items-center gap-1.5 text-xs text-subtle"><Link href="/" className="hover:text-primary">হোম</Link><ChevronRight size={12}/><span className="font-medium text-ink">{c.name}</span></nav>
        <span className="mt-8 block text-xs font-bold uppercase tracking-[1.4px] text-primary">বিষয়ভিত্তিক প্রতিবেদন</span>
        <h1 className="mt-3 text-[clamp(38px,5vw,58px)] font-extrabold leading-tight tracking-tight">{c.name}</h1>
        <p className="mt-3 max-w-xl text-lg text-subtle">{c.description}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link href={`/category/${c.slug}`} className="border border-primary bg-primary px-4 py-2 text-[13px] font-semibold text-white">সব</Link>
          {c.subcategories.map(s => (
            <Link key={s.slug} href={`/category/${c.slug}/${s.slug}`} className="group inline-flex items-center gap-1 border border-line bg-white px-4 py-2 text-[13px] font-medium text-subtle transition-colors hover:border-primary hover:bg-primary hover:text-white">
              {s.name}
            </Link>
          ))}
        </div>

        <div className="mt-10">
          {articles.length === 0 && <p className="py-14 text-subtle">এই বিভাগে শীঘ্রই প্রতিবেদন যুক্ত হবে।</p>}
          {articles.length > 0 && <NewsGrid articles={articles.slice(0, 6)}/>}
        </div>

        {articles.length > 6 && (
          <div className="mt-10"><NewsGrid articles={articles.slice(6)} cols={2}/></div>
        )}

        <section className="mt-16 border-t border-line pt-10">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">{c.name}-এর সাব-ক্যাটাগরি</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.subcategories.map(s => (
              <Link key={s.slug} href={`/category/${c.slug}/${s.slug}`} className="group border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-lg hover:shadow-ink/5">
                <div className="flex items-center justify-between"><span className="font-bold group-hover:text-primary">{s.name}</span><ArrowUpRight size={16} className="text-subtle transition-colors group-hover:text-primary"/></div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-subtle">{s.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer/>
    </>
  )
}
