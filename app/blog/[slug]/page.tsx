import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { blogPosts, getPostBySlug } from "@/lib/blog-data"
import { BlogPostContent } from "@/components/pages/blog-post-content"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: "Post Not Found" }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | DVHIVE`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return <BlogPostContent post={post} />
}
