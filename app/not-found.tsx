import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-[1160px] px-5 py-24">
      <span className="text-xs font-bold uppercase tracking-[1.4px] text-primary">৪০৪</span>
      <h1 className="mt-3 text-[clamp(36px,5vw,54px)] font-extrabold tracking-tight">এই প্রতিবেদনটি পাওয়া যায়নি</h1>
      <p className="mt-3 max-w-lg text-lg text-subtle">লিংকটি হয়তো বদলে গেছে, অথবা প্রতিবেদনটি এখনও প্রকাশিত হয়নি।</p>
      <Link href="/" className="mt-7 inline-flex items-center gap-2 font-bold text-primary hover:text-deep"><ArrowLeft size={17}/> প্রচ্ছদে ফিরুন</Link>
    </main>
  )
}
