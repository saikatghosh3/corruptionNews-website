import Link from 'next/link'
import { getLatestNews } from '@/lib/news'

export function NewsTicker() {
  const items = getLatestNews(8)
  const track = [...items, ...items]
  return (
    <div className="border-b border-line bg-white">
      <div className="mx-auto flex w-full max-w-[1160px] items-stretch">
        <div className="relative z-10 flex shrink-0 items-center gap-2.5 bg-primary px-4 py-2.5 text-[13px] font-bold text-white">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"/>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"/>
          </span>
          সর্বশেষ
        </div>
        <div className="group relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_32px,black_calc(100%-32px),transparent)]">
          <div className="flex w-max animate-marquee items-center whitespace-nowrap py-2.5 pl-8 group-hover:[animation-play-state:paused]">
            {track.map((a, i) => (
              <Link key={`${a.slug}-${i}`} href={`/news/${a.slug}`} className="inline-flex items-center gap-3 text-[13.5px] font-medium text-subtle transition-colors hover:text-primary">
                <span className="text-xs font-bold uppercase tracking-wide text-accent">{a.category}</span>
                <span>{a.title}</span>
                <span className="ml-5 inline-block h-1.5 w-1.5 rounded-full bg-line" aria-hidden="true"/>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
