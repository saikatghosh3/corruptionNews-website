import { Analytics } from '@vercel/analytics/next'
import { Noto_Sans_Bengali, Noto_Serif_Bengali } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ScrollToTop } from '@/components/site/scroll-to-top'
const bengaliSans = Noto_Sans_Bengali({ subsets: ['bengali'], variable: '--font-bengali-sans' })
const bengaliSerif = Noto_Serif_Bengali({ subsets: ['bengali'], variable: '--font-bengali-serif' })
export const metadata: Metadata = {title:{default:'CorruptionNewsBD24 — দুর্নীতিবিরোধী অনুসন্ধানী সংবাদমাধ্যম',template:'%s | CorruptionNewsBD24'},description:'নথি, তথ্য ও অনুসন্ধানের মাধ্যমে দুর্নীতিবিরোধী জনস্বার্থের সাংবাদিকতা।',metadataBase:new URL('https://corruptionnewsbd24.com'),openGraph:{type:'website',locale:'bn_BD',siteName:'CorruptionNewsBD24'}}
export const viewport: Viewport = {themeColor:'#f7f6f2',colorScheme:'light'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="bn" className={bengaliSans.variable + ' ' + bengaliSerif.variable} suppressHydrationWarning><body className="font-sans" suppressHydrationWarning>{children}<ScrollToTop/>{process.env.NODE_ENV==='production'&&<Analytics/>}</body></html>}
