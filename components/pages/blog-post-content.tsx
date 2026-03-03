"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, User, ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/fade-in"
import { BlogPost, urlFor } from "@/lib/sanity"

interface BlogPostContentProps {
  post: BlogPost
}

function renderMarkdown(content: string) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let listItems: string[] = []
  let listOrdered = false

  function flushList() {
    if (listItems.length === 0) return
    const Tag = listOrdered ? "ol" : "ul"
    elements.push(
      <Tag
        key={`list-${elements.length}`}
        className={`mb-4 space-y-1.5 pl-6 ${
          listOrdered ? "list-decimal" : "list-disc"
        } leading-relaxed text-foreground/80`}
      >
        {listItems.map((item, j) => (
          <li key={j} dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
        ))}
      </Tag>
    )
    listItems = []
  }

  function inlineFormat(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
      .replace(/--/g, "\u2014")
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith("## ")) {
      flushList()
      elements.push(
        <h2 key={`h2-${i}`} className="mb-4 mt-8 text-2xl font-bold text-foreground">
          {line.replace("## ", "")}
        </h2>
      )
    } else if (line.startsWith("### ")) {
      flushList()
      elements.push(
        <h3 key={`h3-${i}`} className="mb-3 mt-6 text-lg font-bold text-gold">
          {line.replace("### ", "")}
        </h3>
      )
    } else if (/^\d+\.\s/.test(line)) {
      if (!listOrdered && listItems.length > 0) flushList()
      listOrdered = true
      listItems.push(line.replace(/^\d+\.\s/, ""))
    } else if (line.startsWith("- ")) {
      if (listOrdered && listItems.length > 0) flushList()
      listOrdered = false
      listItems.push(line.replace(/^-\s/, ""))
    } else if (line.trim() === "") {
      flushList()
    } else {
      flushList()
      elements.push(
        <p
          key={`p-${i}`}
          className="mb-4 leading-relaxed text-foreground/80"
          dangerouslySetInnerHTML={{ __html: inlineFormat(line) }}
        />
      )
    }
  }
  flushList()
  return elements
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <section className="relative z-10 px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <FadeIn>
          <Link
            href="/blog"
            className="group mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Blog
          </Link>
        </FadeIn>

        {/* Header */}
        <FadeIn delay={0.05}>
          <header className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-foreground/80">
                <Calendar className="h-3 w-3" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1 text-xs text-foreground/80">
                <User className="h-3 w-3" />
                DVHIVE Team
              </span>
            </div>
            <h1 className="text-balance text-3xl font-extrabold text-foreground md:text-4xl lg:text-[44px] lg:leading-[1.15]">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-foreground/80">
              {post.excerpt}
            </p>
          </header>
        </FadeIn>

        {/* Featured Image */}
        <FadeIn delay={0.1}>
          <div className="relative mb-10 aspect-[2/1] w-full overflow-hidden rounded-xl">
            {post.mainImage && (
              <Image
                src={urlFor(post.mainImage).url()}
                alt={`Featured image for ${post.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-dvhive-bg/40 to-transparent" />
          </div>
        </FadeIn>

        {/* Divider */}
        <FadeIn delay={0.15}>
          <div className="mb-10 h-px bg-border" />
        </FadeIn>

        {/* Article body */}
        <FadeIn delay={0.2}>
          <article className="prose-dvhive">
            {renderMarkdown(post.content)}
          </article>
        </FadeIn>

        {/* SEO Keywords Display */}
        {post.keywords && post.keywords.length > 0 && (
          <FadeIn delay={0.22}>
            <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-8">
              <span className="my-auto mr-2 text-sm font-semibold text-foreground/80">Tags:</span>
              {post.keywords.map((keyword, index) => (
                <span 
                  key={index}
                  className="rounded-md bg-foreground/5 px-2.5 py-1 text-xs font-medium text-foreground/70"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </FadeIn>
        )}

        {/* CTA Banner */}
        <FadeIn delay={0.25}>
          <div className="mt-12 rounded-2xl border border-gold/20 bg-gold/5 p-8 text-center">
            <h3 className="mb-2 text-xl font-bold text-foreground">
              Ready to Start Your Claim?
            </h3>
            <p className="mx-auto mb-5 max-w-md text-sm text-foreground/80">
              Get your free assessment in under 60 seconds. No obligation, no hidden fees.
            </p>
            <Link
              href="/questionnaire"
              className="group inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-bold text-dvhive-bg transition-all hover:bg-gold/90"
            >
              Start Free Assessment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>

        {/* Back to blog */}
        <FadeIn delay={0.3}>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Back to all articles
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}