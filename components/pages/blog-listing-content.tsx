"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { FadeIn } from "@/components/fade-in"
import { ArrowRight, Calendar, Search } from "lucide-react"
import { blogPosts, getPostsByCategory } from "@/lib/blog-data"

const categories = ["All", "Tips", "Auto Law", "Claims"]

export function BlogListingContent() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredByCategory = getPostsByCategory(activeCategory)
  const filtered = searchQuery
    ? filteredByCategory.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : filteredByCategory

  return (
    <section className="relative z-10 px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="text-center mb-10">
            <h1 className="text-balance text-3xl font-extrabold text-foreground md:text-4xl lg:text-[48px] lg:leading-[1.15]">
              DVHIVE<span className="text-gold">Insights</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-foreground/60">
              Expert tips, auto law updates, and claims advice to help you maximize your insurance recovery.
            </p>
          </div>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.1}>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${activeCategory === cat
                    ? "bg-gold text-dvhive-bg"
                    : "border border-border text-foreground/60 hover:text-gold hover:border-gold/30"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/30" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-dvhive-bg/50 py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30"
              />
            </div>
          </div>
        </FadeIn>

        {/* Posts grid */}
        {filtered.length === 0 ? (
          <FadeIn>
            <div className="glass-light rounded-2xl p-12 text-center">
              <p className="text-lg font-semibold text-foreground/60">No articles found.</p>
              <p className="mt-1 text-sm text-foreground/40">Try a different category or search term.</p>
            </div>
          </FadeIn>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.05}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="glass-light rounded-xl overflow-hidden h-full flex flex-col transition-all hover:border-gold/20">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dvhive-bg/60 to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-xs font-semibold text-gold">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-foreground/40">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-foreground group-hover:text-gold transition-colors">
                        {post.title}
                      </h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/60">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-foreground/40">By {post.author}</span>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold/70 group-hover:text-gold transition-colors">
                          Read
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
