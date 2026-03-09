"use client"

import { useState } from "react"
import Image from "next/image"
import { FadeIn } from "@/components/fade-in"
import { BackgroundTexture } from "@/components/background-texture"
import { Star, MessageSquare } from "lucide-react"
import { ReviewSubmissionModal } from "@/components/review-submission-modal"
import type { Review } from "@/lib/actions/reviews"

export const platformStyles = {
  google: {
    bg: "bg-white",
    text: "text-slate-800",
    label: "Google",
    border: "border-slate-200",
    hoverBorder: "hover:border-[#4285F4]/40 hover:shadow-[#4285F4]/20",
    shadow: "shadow-sm shadow-[#4285F4]/10",
    logo: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  facebook: {
    bg: "bg-[#1877F2]",
    text: "text-white",
    label: "Facebook",
    border: "border-[#1877F2]",
    hoverBorder: "hover:border-[#1877F2]/60 hover:shadow-[#1877F2]/30",
    shadow: "shadow-md shadow-[#1877F2]/20",
    logo: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  trustpilot: {
    bg: "bg-[#00B67A]",
    text: "text-white",
    label: "Trustpilot",
    border: "border-[#00B67A]",
    hoverBorder: "hover:border-[#00B67A]/60 hover:shadow-[#00B67A]/30",
    shadow: "shadow-md shadow-[#00B67A]/20",
    logo: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.227 16.67l2.19 6.742-7.413-5.388 5.223-1.354zM24 9.31h-9.165L12.005.589l-2.83 8.723L0 9.3l7.422 5.397-2.84 8.714 7.422-5.388L19.427 23.4l-2.83-8.713L24 9.311z" />
      </svg>
    ),
  },
  website: {
    bg: "bg-gradient-to-br from-gold/20 to-gold/5",
    text: "text-foreground",
    label: "DVHive",
    border: "border-gold/30",
    hoverBorder: "hover:border-gold/60 hover:shadow-gold/20",
    shadow: "shadow-md shadow-gold/10",
    logo: (
      <div className="relative h-5 w-5">
        <Image src="/images/dvhive-logo.png" alt="DVHive Logo" fill sizes="20px" className="object-contain" />
      </div>
    ),
  },
}

export function TestimonialsContent({ initialReviews }: { initialReviews: Review[] }) {
  const [modalOpen, setModalOpen] = useState(false)

  if (!initialReviews || initialReviews.length === 0) return null

  // Rest of calculation logic remains identical
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
    { id: "google", avg: calculateAverage("google"), href: "https://www.google.com/search?q=DvHive+Reviews" },
    { id: "facebook", avg: calculateAverage("facebook"), href: "https://www.facebook.com/profile.php?id=61571719678230&sk=reviews" },
    { id: "trustpilot", avg: calculateAverage("trustpilot"), href: "https://www.trustpilot.com/review/dvhive.com" },
    { id: "website", avg: calculateAverage("website"), href: "#reviews-grid" },
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
              <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-foreground/70 md:text-lg leading-relaxed">
                Read verified reviews from vehicle owners who trusted our <strong>independent auto appraisers</strong> to successfully settle their <strong>diminished value claims</strong> and total loss disputes. 
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex my-6 items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-base font-bold text-dvhive-bg shadow-lg shadow-gold/20 transition-all hover:bg-gold/90 hover:scale-105"
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
                    className={`group block rounded-xl border glass-light p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 ${style.hoverBorder} ${p.id !== 'website' ? 'bg-white/5' : style.bg}`}
                  >
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center">
                      <div className="scale-150 transform transition-transform group-hover:scale-[1.6]">
                        {style.logo}
                      </div>
                    </div>
                    <div className="mb-3 flex items-center justify-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-6 w-6 ${i < Math.round(ratingValue) ? "fill-gold text-gold drop-shadow-sm" : "text-gold/20"}`} 
                        />
                      ))}
                    </div>
                    <p className="text-3xl font-extrabold text-foreground">{p.avg}<span className="text-lg text-foreground/50">/5</span></p>
                    <p className="mt-2 text-sm font-semibold text-foreground/60 transition-colors group-hover:text-foreground">
                      {p.id === "website" ? "Direct Reviews" : `View on ${style.label}`} &rarr;
                    </p>
                  </a>
                )
              })}
            </div>
          </FadeIn>

          {/* All Reviews Grid */}
          <FadeIn delay={0.2}>
            <div id="reviews-grid" className="mt-20">
              <h2 className="mb-10 text-center text-3xl font-bold text-foreground">
                All Verified Reviews
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {initialReviews.map((review) => {
                  const style = platformStyles[review.platform as keyof typeof platformStyles]
                  return (
                    <div key={review.id} className="glass-light rounded-2xl p-6 flex flex-col h-full shadow-lg border border-border/50 hover:border-border transition-colors">
                      <div className="mb-4 flex items-center justify-between">
                        <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold shadow-sm ${style.bg} ${style.text} ${style.border}`}>
                          <div className="scale-75">{style.logo}</div>
                          {style.label}
                        </div>
                      </div>
                      
                      <div className="mb-4 flex gap-0.5">
                        {Array.from({ length: review.rating }).map((_, idx) => (
                          <Star key={idx} className="h-4 w-4 fill-gold text-gold drop-shadow-sm" />
                        ))}
                      </div>
                        <span className="text-xs font-medium text-foreground/40">{review.date}</span>
                      
                      <p className="flex-1 text-sm leading-relaxed text-foreground/85 mb-6">
                        &quot;{review.text}&quot;
                      </p>
                      
                      <div className="flex items-center gap-3 border-t border-border/50 pt-5 mt-auto">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-sm font-bold text-gold ring-1 ring-gold/20">
                          {review.name[0]}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-foreground truncate">{review.name}</p>
                          <p className="text-xs font-medium text-foreground/50 truncate">{review.location || "Verified Client"}</p>
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
            <div className="mt-20 glass-light border border-border/50 rounded-3xl p-8 text-center shadow-xl md:p-14 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
              <MessageSquare className="mx-auto mb-6 h-12 w-12 text-gold drop-shadow-md" />
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Share Your Experience
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-lg text-foreground/70 leading-relaxed">
                Have you worked with our certified auto appraisers? We&apos;d love to hear about your experience. Your feedback helps us serve you better and helps other drivers make informed decisions when fighting the insurance companies.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gold px-8 py-4 text-base font-bold text-dvhive-bg shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all hover:bg-gold/90 hover:scale-105"
              >
                <MessageSquare className="h-5 w-5" />
                Leave a Review Today
              </button>
            </div>
          </FadeIn>

        </div>
      </section>

      <ReviewSubmissionModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}