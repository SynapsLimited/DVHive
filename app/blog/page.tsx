import type { Metadata } from "next"
import { BlogListingContent } from "@/components/pages/blog-listing-content"
import { client } from "@/lib/sanity"

export const revalidate = 0;

export const metadata: Metadata = {
  title: "DVHIVE Insights | Blog",
  description: "Expert tips, auto law updates, and claims advice from DVHIVE. Learn how to maximize your diminished value and total loss insurance claims.",
}

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "category": category->title, 
  mainImage,
  content
}`

const CATEGORIES_QUERY = `*[_type == "category"] | order(title asc) {
  title
}`

export default async function BlogPage() {
  const posts = await client.fetch(POSTS_QUERY)
  const categoryDocs = await client.fetch(CATEGORIES_QUERY)
  
  const categories = ["All", ...categoryDocs.map((c: { title: string }) => c.title)]

  return <BlogListingContent initialPosts={posts} categories={categories} />
}