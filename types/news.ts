export type Subcategory = { slug: string; name: string; description: string }
export type Category = { slug: string; name: string; description: string; subcategories: Subcategory[] }
export type NewsArticle = { slug: string; category: string; categorySlug: string; subcategory: string; subcategorySlug: string; title: string; summary: string; image: string; author: string; date: string; readTime: string; tags: string[]; content: string[]; featured?: boolean }
