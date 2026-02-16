"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, User, ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/fade-in"
import type { BlogPost } from "@/lib/blog-data"

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
        } text-foreground/70 leading-relaxed`}
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
        <h2
          key={`h2-${i}`}
          className="mt-8 mb-4 text-2xl font-bold text-foreground"
        >
          {line.replace("## ", "")}
        </h2>
      )
    } else if (line.startsWith("### ")) {
      flushList()
      elements.push(
        <h3
          key={`h3-${i}`}
          className="mt-6 mb-3 text-lg font-bold text-gold"
        >
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
          className="mb-4 text-foreground/70 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: inlineFormat(line) }}
        />
      )
    }
  }
  flushList()
  return elements
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <section className="relative z-10 px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <FadeIn>
          <Link
            href="/blog"
            className="group mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/50 hover:text-gold transition-colors"
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
              <span className="flex items-center gap-1 text-xs text-foreground/40">
                <Calendar className="h-3 w-3" />
                {post.date}
              </span>
              <span className="flex items-center gap-1 text-xs text-foreground/40">
                <User className="h-3 w-3" />
                {post.author}
              </span>
            </div>
            <h1 className="text-balance text-3xl font-extrabold text-foreground md:text-4xl lg:text-[44px] lg:leading-[1.15]">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-foreground/60 leading-relaxed">
              {post.excerpt}
            </p>
          </header>
        </FadeIn>

        {/* Featured Image */}
        <FadeIn delay={0.1}>
          <div className="relative mb-10 aspect-[2/1] w-full overflow-hidden rounded-xl">
            <Image
              src={post.image}
              alt={`Featured image for ${post.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
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

        {/* CTA Banner */}
        <FadeIn delay={0.25}>
          <div className="mt-12 rounded-2xl bg-gold/5 border border-gold/20 p-8 text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Ready to Start Your Claim?
            </h3>
            <p className="text-sm text-foreground/60 mb-5 max-w-md mx-auto">
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
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground/50 hover:text-gold transition-colors"
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
