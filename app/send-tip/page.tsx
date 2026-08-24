'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ShieldCheck, FileText, EyeOff, Mail, Lock, Send, CheckCircle2, ArrowLeft, Lightbulb, Paperclip } from 'lucide-react'
import { Header, Footer } from '@/components/site/site-shell'

const topics = ['অনুসন্ধানী প্রতিবেদন', 'জনপ্রশাসন', 'দুদক ও আইন', 'ডাটা ল্যাব', 'অন্যান্য']
const trust = [
  { icon: EyeOff, title: 'সম্পূর্ণ গোপনীয়তা', text: 'আপনি চাইলে নাম-পরিচয় ছাড়াই তথ্য পাঠাতে পারেন। উৎস রক্ষায় আমরা কঠোর।' },
  { icon: Lock, title: 'নিরাপদ সংরক্ষণ', text: 'পাঠানো তথ্য ও নথি এনক্রিপ্টেড চ্যানেলেই শুধুমাত্র অনুসন্ধানী দেশের কাছে পৌঁছায়।' },
  { icon: FileText, title: 'নথিও গ্রহণযোগ্য', text: 'ছবি, পিডিএফ, স্ক্রিনশট বা লিংক—যেকোনো রকমের প্রমাণ আমাদের কাছে সমান মূল্যবান।' },
]
const checklist = ['ঘটনার সময়, স্থান ও জড়িত ব্যক্তি বা প্রতিষ্ঠানের নাম', 'আপনার হাতে থাকা নথি, রশিদ, ইমেইল বা ছবি', 'তথ্যটি কীভাবে জনস্বার্থের সঙ্গে সম্পর্কিত']

export default function SendTip() {
  const [sent, setSent] = useState(false)
  return (
    <>
      <Header/>
      <main className="bg-gradient-to-b from-[#eef3ee] to-paper">
        <section className="mx-auto w-full max-w-[1160px] px-5 pb-12 pt-16">
          <span className="text-xs font-bold uppercase tracking-[1.4px] text-primary">জনস্বার্থে অংশ নিন</span>
          <h1 className="mt-3 text-[clamp(38px,6vw,68px)] font-extrabold leading-tight tracking-tight">গোপন তথ্য পাঠান</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-subtle">আপনার কাছে এমন কোনো দুর্নীতির তথ্য, নথি বা গল্প আছে যা জনসাধারণের জানা উচিত? CorruptionNewsBD24-এর অনুসন্ধানী দল প্রতিটি তথ্য যাচাই করে দায়িত্বশীলভাবে প্রকাশ করে। আপনার একটি ইঙ্গিতই হতে পারে পরের বড় অনুসন্ধানের শুরু।</p>
          <div className="mt-9 grid max-w-4xl gap-4 sm:grid-cols-3">
            {trust.map(t => (
              <div key={t.title} className="flex flex-col gap-2 border border-line border-t-primary border-t-[3px] bg-white p-5 shadow-sm">
                <t.icon size={20} className="text-primary"/>
                <strong className="text-[15px]">{t.title}</strong>
                <span className="text-[13px] leading-relaxed text-subtle">{t.text}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-[1160px] items-start gap-8 px-5 pb-24 pt-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="flex flex-col gap-4 lg:sticky lg:top-28">
            <div className="bg-white p-6 shadow-sm border border-line">
              <h3 className="mb-3.5 flex items-center gap-2 font-bold"><Lightbulb size={17} className="text-accent"/> কী কী লিখবেন?</h3>
              <ul className="list-disc space-y-1 pl-4 text-[13px] leading-loose text-subtle">{checklist.map(c => <li key={c}>{c}</li>)}</ul>
            </div>
            <div className="border border-line border-t-accent border-t-[3px] bg-white p-6 shadow-sm">
              <h3 className="mb-2 flex items-center gap-2 font-bold"><Mail size={17} className="text-primary"/> সরাসরি যোগাযোগ</h3>
              <p className="text-[13px] text-subtle">সংবেদনশীল নথির জন্য ইমেইল:</p>
              <a href="mailto:info@corruptionnewsbd24.com" className="text-[15px] font-bold text-primary hover:underline">info@corruptionnewsbd24.com</a>
              <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-subtle"><ShieldCheck size={14} className="mt-0.5 shrink-0 text-primary"/> ফরওয়ার্ড করা মেইলে আপনার পরিচয় মুছে পাঠাতে ভুলবেন না।</p>
            </div>
            <blockquote className="border-l-[3px] border-primary py-1 pl-4 font-serif text-base leading-loose text-subtle">“দুর্নীতির বিরুদ্ধে সত্য বলার সাহসই আসল অনুসন্ধানের প্রথম ধাপ।”</blockquote>
          </aside>

          {sent ? (
            <div className="flex flex-col items-center gap-4 border border-line border-t-primary border-t-4 bg-white px-7 py-16 text-center shadow-lg shadow-ink/5 md:px-12">
              <CheckCircle2 size={46} className="text-primary"/>
              <h2 className="m-0 text-3xl font-extrabold tracking-tight">ধন্যবাদ!</h2>
              <p className="max-w-md leading-relaxed text-subtle">আপনার তথ্যটি আমাদের অনুসন্ধানী দলের কাছে পৌঁছেছে (ডেমো)। প্রয়োজন হলে যাচাইয়ের জন্য আমরা যোগাযোগ করতে পারি। আপনার সাহসী পদক্ষেপের জন্য কৃতজ্ঞ।</p>
              <Link href="/" className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-deep"><ArrowLeft size={16}/> প্রচ্ছদে ফিরুন</Link>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="border border-line bg-white p-7 shadow-xl shadow-ink/5 md:p-9">
              <h2 className="mb-6 text-2xl font-bold tracking-tight">তথ্য পাঠানোর ফর্ম</h2>
              <label className="mb-4 block text-[13.5px] font-semibold">বিষয়টি কোন ক্যাটাগরিতে পড়ে?
                <select required defaultValue="" className="mt-1.5 block w-full rounded-sm border border-line bg-paper px-3 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-3 focus:ring-primary/15">
                  {topics.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </label>
              <label className="mb-4 block text-[13.5px] font-semibold">আপনার তথ্য / ঘটনার বিবরণ
                <textarea required rows={7} placeholder="ঘটনাটি যত বিস্তারিত পারেন লিখুন—সময়, স্থান, জড়িত ব্যক্তি..." className="mt-1.5 block w-full rounded-sm border border-line bg-paper px-3 py-3 text-sm leading-relaxed outline-none transition-all focus:border-primary focus:ring-3 focus:ring-primary/15"/>
              </label>
              <label className="mb-4 block text-[13.5px] font-semibold"><span className="inline-flex items-center gap-1.5"><Paperclip size={14}/> নথি, ছবি বা লিংক (ঐচ্ছিক)</span>
                <input placeholder="ড্রাইভ/ফাইল লিংক দিন" className="mt-1.5 block w-full rounded-sm border border-line bg-paper px-3 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-3 focus:ring-primary/15"/>
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-[13.5px] font-semibold">আপনার নাম (ঐচ্ছিক)
                  <input placeholder="নাম লিখতে না-ও পারেন" className="mt-1.5 block w-full rounded-sm border border-line bg-paper px-3 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-3 focus:ring-primary/15"/>
                </label>
                <label className="block text-[13.5px] font-semibold">যোগাযোগের মাধ্যম (ঐচ্ছিক)
                  <input placeholder="ইমেইল / ফোন / সিগন্যাল" className="mt-1.5 block w-full rounded-sm border border-line bg-paper px-3 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-3 focus:ring-primary/15"/>
                </label>
              </div>
              <label className="mt-2 mb-4 flex cursor-pointer items-center gap-2.5 text-[13.5px] font-semibold">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary"/> আমি চাই আমার পরিচয় সম্পূর্ণ গোপন থাকুক
              </label>
              <p className="mb-5 flex items-center gap-1.5 text-xs text-subtle"><ShieldCheck size={14} className="shrink-0 text-primary"/> এটি একটি ডেমো ফর্ম—কোনো তথ্য সার্ভারে পাঠানো হয় না।</p>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-accent px-5 py-4 text-[15px] font-bold text-ink transition-colors hover:bg-deep hover:text-white"><Send size={16}/> নিরাপদে পাঠিয়ে দিন</button>
            </form>
          )}
        </section>
      </main>
      <Footer/>
    </>
  )
}
