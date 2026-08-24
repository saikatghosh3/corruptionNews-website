import Image from 'next/image'
import Link from 'next/link'
import type { NewsArticle } from '@/types/news'

export function NewsCard({ article, featured = false }: { article: NewsArticle; featured?: boolean }) {
  const featuredCls = featured
    ? 'grid lg:grid-cols-[1.35fr_1fr] bg-white border border-line shadow-[0_14px_34px_rgba(23,32,29,.07)]'
    : 'bg-white border border-line hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10'
  return (
    <article className={`transition-all duration-300 ${featuredCls}`}>
      <Link href={`/news/${article.slug}`} className={`group relative block overflow-hidden ${featured ? 'aspect-video lg:aspect-auto lg:h-full lg:min-h-[340px]' : 'aspect-video'}`}>
        <Image src={article.image} alt={article.title} fill sizes={featured ? '(max-width:1024px) 100vw, 58vw' : '(max-width:768px) 100vw, 33vw'} className="object-cover transition-transform duration-500 group-hover:scale-105"/>
        <span className="absolute bottom-3.5 left-3.5 bg-primary px-2.5 py-1 text-[11px] font-semibold text-white">{article.category}</span>
      </Link>
      <div className={`flex flex-col justify-center ${featured ? 'p-7 lg:p-10' : 'p-5'}`}>
        <div className="flex items-center gap-2 text-xs text-subtle">{article.date}<i className="h-1 w-1 rounded-full bg-accent"/>{article.readTime}</div>
        <h2 className={`${featured ? 'mt-3 text-2xl leading-snug lg:text-[38px] lg:leading-tight' : 'mt-2.5 text-[21px] leading-snug'} font-bold`}>
          <Link href={`/news/${article.slug}`} className="transition-colors hover:text-primary">{article.title}</Link>
        </h2>
        <p className={`text-sm leading-relaxed text-subtle ${featured ? 'mt-3' : 'mt-2 mb-4 line-clamp-3'}`}>{article.summary}</p>
        <div className="border-t border-line pt-3 text-xs font-medium text-subtle">{article.author}</div>
      </div>
    </article>
  )
}

export function NewsGrid({ articles, cols = 3 }: { articles: NewsArticle[]; cols?: number }) {
  return (
    <div className={`grid gap-5 ${cols === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'}`}>
      {articles.map(a => <NewsCard key={a.slug} article={a}/>)}
    </div>
  )
}
