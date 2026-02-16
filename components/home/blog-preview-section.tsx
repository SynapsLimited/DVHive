"use client"

import Link from "next/link"
import Image from "next/image"
import { FadeIn } from "@/components/fade-in"
import { ArrowRight, Calendar } from "lucide-react"

const posts = [
  {
    slug: "what-is-diminished-value",
    title: "What Is Diminished Value & Why It Matters",
    excerpt:
      "Your vehicle loses value after an accident, even when fully repaired. Learn how diminished value claims work.",
    date: "Jan 15, 2026",
    category: "Tips",
    image: "/images/blog/diminished-value.jpg",
  },
  {
    slug: "total-loss-claim-guide",
    title: "The Complete Guide to Total Loss Claims",
    excerpt:
      "Insurance companies often undervalue totaled vehicles. Here is how to fight back and get what your car is worth.",
    date: "Jan 8, 2026",
    category: "Claims",
    image: "/images/blog/total-loss.jpg",
  },
  {
    slug: "insurance-negotiation-tactics",
    title: "5 Tactics Insurers Use to Underpay Claims",
    excerpt:
      "Discover the common strategies insurance adjusters use and how to counter each one effectively.",
    date: "Dec 28, 2025",
    category: "Auto Law",
    image: "/images/blog/insurance-tactics.jpg",
  },
]

export function BlogPreviewSection() {
  return (
    <section className="relative z-10 px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-[48px] lg:leading-[1.15]">
                Latest <span className="text-gold">Insights</span>
              </h2>
              <p className="mt-2 text-foreground/60">Stay informed with expert tips and industry news.</p>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold/80 transition-colors"
            >
              View All Posts
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="glass-light rounded-xl overflow-hidden h-full flex flex-col transition-all hover:border-gold/20">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
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
                  <h3 className="text-lg font-bold text-foreground group-hover:text-gold transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/60">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold/70 group-hover:text-gold transition-colors">
                    Read More
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  </div>
                </article>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
