import Link from 'next/link'
import { getLatestNews } from '@/lib/news'

export function NewsTicker() {
  const items = getLatestNews(8)
  const track = [...items, ...items]

  return (
    <div className="relative border-b border-black/20 bg-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      {/* Gold top hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent"
      />

      <div className="mx-auto flex w-full max-w-[1160px] items-stretch">
        {/* Badge */}
        <div className="group relative z-10 flex shrink-0 items-stretch">
          <div className="flex items-center gap-2 bg-gradient-to-r from-[#c8912f] via-accent to-[#eec277] pl-3 pr-6 [clip-path:polygon(0_0,100%_0,calc(100%-16px)_100%,0_100%)] max-sm:pl-2.5 max-sm:pr-5 max-sm:[clip-path:polygon(0_0,100%_0,calc(100%-12px)_100%,0_100%)]">
            <span className="relative flex h-2 w-2 motion-reduce:hidden">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
            </span>

            <span className="whitespace-nowrap py-2 text-[12px] font-extrabold uppercase tracking-wide text-ink max-sm:text-[11px] sm:py-2.5">
              সর্বশেষ
            </span>
          </div>
        </div>

        {/* Marquee */}
        <div className="group relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_28px,black_calc(100%-28px),transparent)]">
          <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:[animation:none]">
            {track.map((a, i) => (
              <div key={`${a.slug}-${i}`} className="flex shrink-0 items-center">
                <Link
                  href={`/news/${a.slug}`}
                  className="inline-flex items-baseline gap-2.5 py-2.5 text-[13.5px] leading-snug text-white/85 transition-colors hover:text-accent max-sm:text-[12.5px]"
                >
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-accent/90">
                    {a.category}
                  </span>

                  <span className="font-medium">{a.title}</span>
                </Link>

                {/* Diamond separator */}
                <span
                  aria-hidden="true"
                  className="mx-4 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent/40 sm:mx-6"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
