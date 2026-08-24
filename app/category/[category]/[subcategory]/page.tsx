import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Header, Footer } from '@/components/site/site-shell'
import { NewsGrid } from '@/components/news/news-card'
import { getCategories, getCategory, getNewsBySubcategory, getSubcategories } from '@/lib/news'

export function generateStaticParams() {
  return getCategories().flatMap(c => c.subcategories.map(s => ({ category: c.slug, subcategory: s.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; subcategory: string }> }) {
  const { category, subcategory } = await params
  const c = getCategory(category)
  const s = c?.subcategories.find(x => x.slug === subcategory)
  if (!c || !s) notFound()
  return { title: `${s.name} — ${c.name} | CorruptionNewsBD24`, description: s.description }
}

export default async function SubcategoryPage({ params }: { params: Promise<{ category: string; subcategory: string }> }) {
  const { category, subcategory } = await params
  const c = getCategory(category)
  const s = c?.subcategories.find(x => x.slug === subcategory)
  if (!c || !s) notFound()
  const articles = getNewsBySubcategory(category, subcategory)
  const siblings = getSubcategories(category).filter(x => x.slug !== subcategory)
  return (
    <>
      <Header/>
      <main className="mx-auto w-full max-w-[1160px] px-5 py-16">
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-subtle">
          <Link href="/" className="hover:text-primary">হোম</Link><ChevronRight size={12}/>
          <Link href={`/category/${c.slug}`} className="hover:text-primary">{c.name}</Link><ChevronRight size={12}/>
          <span className="font-medium text-ink">{s.name}</span>
        </nav>
        <span className="mt-8 block text-xs font-bold uppercase tracking-[1.4px] text-primary">{c.name}</span>
        <h1 className="mt-3 text-[clamp(36px,5vw,54px)] font-extrabold leading-tight tracking-tight">{s.name}</h1>
        <p className="mt-3 max-w-xl text-lg text-subtle">{s.description}</p>

        <div className="mt-10">
          {articles.length === 0
            ? <p className="border border-dashed border-line bg-white px-6 py-16 text-center text-subtle">এই বিষয়ে প্রতিবেদন শীঘ্রই প্রকাশিত হবে।</p>
            : <>
              <div><NewsGrid articles={articles.slice(0, 3)}/></div>
              {articles.length > 3 && <div className="mt-5"><NewsGrid articles={articles.slice(3)} cols={2}/></div>}
            </>}
        </div>

        <section className="mt-16 border-t border-line pt-10">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">{c.name}-এর অন্যান্য বিষয়</h2>
          <div className="flex flex-wrap gap-2">
            <Link href={`/category/${c.slug}`} className="border border-line bg-white px-4 py-2 text-[13px] font-medium text-subtle transition-colors hover:border-primary hover:bg-primary hover:text-white">{c.name}-এর সব প্রতিবেদন</Link>
            {siblings.map(x => (
              <Link key={x.slug} href={`/category/${c.slug}/${x.slug}`} className="border border-line bg-white px-4 py-2 text-[13px] font-medium text-subtle transition-colors hover:border-primary hover:bg-primary hover:text-white">{x.name}</Link>
            ))}
          </div>
        </section>
      </main>
      <Footer/>
    </>
  )
}
