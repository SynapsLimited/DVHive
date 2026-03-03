import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogPostContent } from "@/components/pages/blog-post-content"
import { client } from "@/lib/sanity"

export const revalidate = 0;

interface Props {
  params: Promise<{ slug: string }>
}

const SINGLE_POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "category": category->title, 
  keywords,
  mainImage,
  content
}`

export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "post"]{ "slug": slug.current }`)
  return slugs.map((post: { slug: string }) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch(SINGLE_POST_QUERY, { slug })
  
  if (!post) return { title: "Post Not Found" }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords || [],
    openGraph: {
      title: `${post.title} | DVHIVE`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["DVHIVE Team"],
    },
  }
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params
  const post = await client.fetch(SINGLE_POST_QUERY, { slug })
  
  if (!post) notFound()

  return <BlogPostContent post={post} />
}