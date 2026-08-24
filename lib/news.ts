import articles from '@/data/news.json'
import categories from '@/data/categories.json'
import type { NewsArticle, Category } from '@/types/news'

const all = articles as NewsArticle[]
export const getAllNews = () => all
export const getCategories = () => categories as Category[]
export const getCategory = (slug: string) => getCategories().find((c) => c.slug === slug)
export const getSubcategories = (catSlug: string) => getCategory(catSlug)?.subcategories ?? []
export const getSubcategory = (catSlug: string, subSlug: string) => getSubcategories(catSlug).find((s) => s.slug === subSlug)
export const getNewsBySlug = (slug: string) => all.find((item) => item.slug === slug)
export const getNewsByCategory = (slug: string) => all.filter((item) => item.categorySlug === slug)
export const getNewsBySubcategory = (catSlug: string, subSlug: string) => all.filter((item) => item.categorySlug === catSlug && item.subcategorySlug === subSlug)
export const getFeaturedNews = () => all.filter((item) => item.featured)
export const getLatestNews = (limit?: number) => { const list = all.filter((item) => !item.featured); return limit ? list.slice(0, limit) : list }
export const searchNews = (query: string) => { const q = query.trim().toLocaleLowerCase('bn-BD'); return q ? all.filter((item) => [item.title, item.summary, ...item.tags, ...item.content].join(' ').toLocaleLowerCase('bn-BD').includes(q)) : [] }
export const getRelatedNews = (article: NewsArticle) => all.filter((item) => item.slug !== article.slug && (item.categorySlug === article.categorySlug || item.tags.some((tag) => article.tags.includes(tag)))).slice(0, 3)
