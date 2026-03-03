"use client"

import { useState } from "react"
import { FadeIn } from "@/components/fade-in"
import { BackgroundTexture } from "@/components/background-texture"
import { Star, MessageSquare, Globe } from "lucide-react"
import { ReviewSubmissionModal } from "@/components/review-submission-modal"
import type { Review } from "@/lib/actions/reviews"

export const platformStyles = {
  google: { 
    bg: "bg-red-500", 
    text: "text-white", 
    label: "Google", 
    hoverBorder: "hover:border-red-500/40", 
    iconColor: "text-red-500", 
    iconBg: "bg-red-500/10" 
  },
  facebook: { 
    bg: "bg-blue-500", 
    text: "text-white", 
    label: "Facebook", 
    hoverBorder: "hover:border-blue-500/40", 
    iconColor: "text-blue-500", 
    iconBg: "bg-blue-500/10" 
  },
  trustpilot: { 
    bg: "bg-green-500", 
    text: "text-white", 
    label: "Trustpilot", 
    hoverBorder: "hover:border-green-500/40", 
    iconColor: "text-green-500", 
    iconBg: "bg-green-500/10" 
  },
  website: { 
    bg: "bg-gold", 
    text: "text-dvhive-bg", 
    label: "Website", 
    hoverBorder: "hover:border-gold/40", 
    iconColor: "text-gold", 
    iconBg: "bg-gold/10" 
  },
}

export function TestimonialsContent({ initialReviews }: { initialReviews: Review[] }) {
  const [modalOpen, setModalOpen] = useState(false)

  if (!initialReviews || initialReviews.length === 0) return null

  // Calculate averages dynamically for all platforms
  const calculateAverage = (platform: string) => {
    const reviews = initialReviews.filter((r) => r.platform === platform)
    if (reviews.length === 0) return "5.0"

    if (platform === "trustpilot") {
      const realReviewsSum = reviews.reduce((sum, r) => sum + r.rating, 0)
      const bayesianSum = realReviewsSum + (7 * 3.5)
      const bayesianCount = reviews.length + 7
      return (bayesianSum / bayesianCount).toFixed(1)
    }

    return (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
  }

  const platformData = [
    {
      id: "google",
      avg: calculateAverage("google"),
      href: "https://www.google.com/search?q=DvHive+Reviews",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
        </svg>
      ),
    },
    {
      id: "facebook",
      avg: calculateAverage("facebook"),
      href: "https://www.facebook.com/profile.php?id=61571719678230&sk=reviews",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      id: "trustpilot",
      avg: calculateAverage("trustpilot"),
      href: "https://www.trustpilot.com/review/dvhive.com",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.227 16.67l2.19 6.742-7.413-5.388 5.223-1.354zM24 9.31h-9.165L12.005.589l-2.83 8.723L0 9.3l7.422 5.397-2.84 8.714 7.422-5.388L19.427 23.4l-2.83-8.713L24 9.311z" />
        </svg>
      ),
    },
    {
      id: "website",
      avg: calculateAverage("website"),
      href: "#reviews-grid", // Scrolls to the grid below
      icon: <Globe className="h-6 w-6" />,
    },
  ]

  return (
    <>
      <section className="relative z-10 px-4 py-16 lg:py-24">
        <BackgroundTexture variant={0} />
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <FadeIn>
            <div className="text-center">
              <h1 className="text-balance text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                What Our <span className="text-gold">Clients Say</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-foreground/70 md:text-lg">
                Read verified reviews from vehicle owners who trusted DVHIVE for independent diminished value and total loss appraisals. 
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex my-6 items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-base font-bold text-dvhive-bg shadow-lg transition-all hover:bg-gold/90"
              >
                <MessageSquare className="h-5 w-5" />
                Leave a Review
              </button>
            </div>
          </FadeIn>

          {/* Trust Badges - 4 Column Grid */}
          <FadeIn delay={0.1}>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {platformData.map((p) => {
                const style = platformStyles[p.id as keyof typeof platformStyles]
                const ratingValue = parseFloat(p.avg)
                
                return (
                  <a
                    key={p.id}
                    href={p.href}
                    target={p.id === "website" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className={`group block rounded-xl border border-transparent glass-light p-6 text-center transition-all duration-300 hover:scale-[1.03] ${style.hoverBorder} hover:bg-white/10`}
                  >
                    <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ${style.iconBg} transition-colors group-hover:bg-opacity-20`}>
                      <div className={style.iconColor}>{p.icon}</div>
                    </div>
                    <div className="mb-2 flex items-center justify-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < Math.round(ratingValue) ? "fill-gold text-gold" : "text-gold/30"}`} 
                        />
                      ))}
                    </div>
                    <p className="text-2xl font-bold text-foreground">{p.avg}/5</p>
                    <p className={`mt-1 text-sm font-medium text-foreground/60 transition-colors group-hover:${style.iconColor}`}>
                      {p.id === "website" ? "Direct Reviews" : `View on ${style.label}`} &rarr;
                    </p>
                  </a>
                )
              })}
            </div>
          </FadeIn>

          {/* All Reviews Grid */}
          <FadeIn delay={0.2}>
            <div id="reviews-grid" className="mt-16">
              <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
                All Reviews
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {initialReviews.map((review) => {
                  const style = platformStyles[review.platform]
                  return (
                    <div key={review.id} className="glass-light rounded-xl p-6 flex flex-col h-full">
                      <div className="mb-3 flex items-center justify-between">
                        <div className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${style.bg} ${style.text}`}>
                          {style.label}
                        </div>
                        <span className="text-xs text-foreground/50">{review.date}</span>
                      </div>
                      <div className="mb-3 flex gap-0.5">
                        {Array.from({ length: review.rating }).map((_, idx) => (
                          <Star key={idx} className="h-4 w-4 fill-gold text-gold" />
                        ))}
                      </div>
                      <p className="flex-1 text-sm leading-relaxed text-foreground/80 mb-4">
                        &quot;{review.text}&quot;
                      </p>
                      <div className="flex items-center gap-2 border-t border-border pt-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 text-sm font-bold text-gold">
                          {review.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{review.name}</p>
                          <p className="text-xs text-foreground/50">{review.location || "Verified Client"}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </FadeIn>

          {/* CTA Section */}
          <FadeIn delay={0.3}>
            <div className="mt-16 glass-light rounded-2xl p-8 text-center md:p-12">
              <MessageSquare className="mx-auto mb-4 h-12 w-12 text-gold" />
              <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
                Share Your Experience
              </h2>
              <p className="mx-auto mb-6 max-w-xl text-foreground/70">
                Have you worked with DVHive? We&apos;d love to hear about your experience. Your feedback helps us serve you better and helps others make informed decisions.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gold px-8 py-3.5 text-base font-bold text-dvhive-bg shadow-lg transition-all hover:bg-gold/90"
              >
                <MessageSquare className="h-5 w-5" />
                Leave a Review
              </button>
            </div>
          </FadeIn>

        </div>
      </section>

      <ReviewSubmissionModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}