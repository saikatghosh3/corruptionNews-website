import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ChevronRight, Clock3, Send, Quote, User } from 'lucide-react'
import { Header, Footer } from '@/components/site/site-shell'
import { ShareButton } from '@/components/site/share-button'
import { NewsGrid } from '@/components/news/news-card'
import { getAllNews, getNewsBySlug, getRelatedNews } from '@/lib/news'

export function generateStaticParams() { return getAllNews().map(a => ({ slug: a.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = getNewsBySlug(slug)
  return { title: a ? `${a.title} — CorruptionNewsBD24` : 'প্রতিবেদন পাওয়া যায়নি', description: a?.summary }
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = getNewsBySlug(slug)
  if (!a) notFound()
  const related = getRelatedNews(a)
  const [lead, ...rest] = a.content
  return (
    <>
      <Header/>
      <main>
        {/* ── Hero header ─────────────────────────── */}
        <section className="border-b border-line bg-white">
          <div className="mx-auto w-full max-w-[1160px] px-5 pb-12 pt-7">
            <nav aria-label="ব্রেডক্রাম্ব" className="flex flex-wrap items-center gap-1.5 text-xs text-subtle">
              <Link href="/" className="transition-colors hover:text-primary">প্রচ্ছদ</Link>
              <ChevronRight size={13} className="text-line"/>
              <Link href={`/category/${a.categorySlug}`} className="transition-colors hover:text-primary">{a.category}</Link>
              <ChevronRight size={13} className="text-line"/>
              <span className="font-medium text-ink/70">{a.subcategory}</span>
            </nav>

            <div className="mx-auto mt-10 max-w-[860px] text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[1.5px] text-white">{a.category}</span>
                <span className="bg-chip px-3 py-1 text-[11px] font-bold uppercase tracking-[1.5px] text-primary">{a.subcategory}</span>
              </div>

              <h1 className="mt-6 font-serif text-[clamp(30px,4.5vw,50px)] font-bold leading-[1.25] tracking-tight">
                {a.title}
                <span className="mt-4 block h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-primary via-accent to-primary" aria-hidden="true"/>
              </h1>

              {/* highlighted summary */}
              <p className="relative mt-7 border-y border-accent/40 bg-accent/[0.07] px-5 py-4 text-left text-[17px] leading-relaxed text-ink/80 md:text-lg">
                <Quote size={18} className="absolute -top-2.5 left-6 bg-white p-0.5 text-accent" aria-hidden="true"/>
                {a.summary}
              </p>

              {/* author meta */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13px] text-subtle">
                <span className="inline-flex items-center gap-2.5 font-semibold text-ink">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-chip text-primary"><User size={16}/></span>
                  {a.author}
                </span>
                <span>{a.date}</span>
                <span className="inline-flex items-center gap-1.5"><Clock3 size={14} className="text-accent"/>{a.readTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cover image ─────────────────────────── */}
        <figure className="mx-auto w-full max-w-[840px] px-5 pt-9">
          <div className="overflow-hidden rounded-sm border border-line bg-chip shadow-[0_10px_28px_rgba(23,32,29,.08)]">
            <Image src={a.image} alt={a.title} width={1200} height={675} priority sizes="(max-width: 880px) 100vw, 840px" className="aspect-[16/9] w-full object-cover"/>
          </div>
          <figcaption className="flex items-center gap-2 pt-2.5 text-xs text-subtle"><span className="h-3 w-0.5 bg-accent" aria-hidden="true"/>ছবি: প্রতীকী — CorruptionNewsBD24</figcaption>
        </figure>

        {/* ── Body ────────────────────────────────── */}
        <div className="mx-auto grid w-full max-w-[1160px] gap-12 px-5 py-12 lg:grid-cols-[minmax(0,760px)_280px] lg:justify-center lg:gap-16">
          <article>
            {lead && (
              <p className="border-l-4 border-accent pl-5 font-serif text-xl font-medium leading-[1.9] text-ink md:text-[22px]">{lead}</p>
            )}
            <div className="mt-8 space-y-7">
              {rest.map((p, i) => (
                <p key={i} className={`font-serif text-lg leading-loose text-ink/85 md:text-xl md:leading-[2] ${i === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1.5 first-letter:font-serif first-letter:text-[64px] first-letter:font-extrabold first-letter:leading-[0.85] first-letter:text-primary' : ''}`}>{p}</p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {a.tags.map(t => (
                <Link key={t} href={`/search?query=${encodeURIComponent(t)}`} className="rounded-full border border-line bg-white px-4 py-1.5 text-xs font-medium text-subtle transition-all hover:border-primary hover:bg-chip hover:text-primary">#{t}</Link>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-7">
              <ShareButton title={a.title}/>
              <Link href="/send-tip" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-deep">দুর্নীতির তথ্য আছে? জানান <Send size={14}/></Link>
            </div>
          </article>

          {/* ── Sidebar ─────────────────────────────── */}
          <aside className="lg:pt-2">
            <div className="sticky top-28 space-y-6">
              <div className="border border-line bg-white p-6 shadow-[0_10px_30px_rgba(23,32,29,.06)]">
                <h3 className="text-[11px] font-bold uppercase tracking-[1.6px] text-primary">সম্পাদকের নোট</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-subtle">এই প্রতিবেদনটি নথি ও যাচাইকৃত তথ্যের ভিত্তিতে জনস্বার্থে প্রকাশিত।</p>
              </div>
              <div className="bg-ink p-6 text-white">
                <h3 className="text-[11px] font-bold uppercase tracking-[1.6px] text-accent">আপনারও তথ্য আছে?</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-white/70">দুর্নীতির প্রমাণ থাকলে নিরাপদে পাঠান — পরিচয় সম্পূর্ণ গোপন থাকবে।</p>
                <Link href="/send-tip" className="mt-5 inline-flex items-center gap-2 bg-accent px-4 py-2.5 text-[13px] font-bold text-ink transition-colors hover:bg-white">গোপন তথ্য পাঠান<Send size={13}/></Link>
              </div>
              <Link href="/" className="flex items-center justify-center gap-2 border border-line bg-white py-3 text-[13px] font-medium text-subtle transition-colors hover:border-primary hover:text-primary"><ArrowLeft size={15}/> প্রচ্ছদে ফিরুন</Link>
            </div>
          </aside>
        </div>

        {/* ── Related ─────────────────────────────── */}
        {related.length > 0 && (
          <section className="mx-auto w-full max-w-[1160px] px-5 pb-24">
            <div className="mb-8 flex items-end gap-5">
              <div><span className="block text-xs font-bold uppercase tracking-[1.4px] text-primary">পরবর্তী পড়ুন</span><h2 className="mt-1.5 text-[30px] font-bold tracking-tight">সম্পর্কিত অনুসন্ধান</h2></div>
              <span className="mb-2 h-px flex-1 bg-line"/>
            </div>
            <NewsGrid articles={related}/>
          </section>
        )}
      </main>
      <Footer/>
    </>
  )
}
