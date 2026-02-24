"use client"

import { useState } from "react"
import { FadeIn } from "@/components/fade-in"
import { BackgroundTexture } from "@/components/background-texture"
import { Star, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react"
import { ReviewSubmissionModal } from "@/components/review-submission-modal"
import type { Review } from "@/lib/actions/reviews"

export const platformStyles = {
  google: { bg: "bg-blue-500", text: "text-white", label: "Google" },
  facebook: { bg: "bg-blue-600", text: "text-white", label: "Facebook" },
  trustpilot: { bg: "bg-green-500", text: "text-white", label: "Trustpilot" },
  website: { bg: "bg-gold", text: "text-dvhive-bg", label: "Website" },
}

export function TestimonialsContent({ initialReviews }: { initialReviews: Review[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  if (!initialReviews || initialReviews.length === 0) return null

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % initialReviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + initialReviews.length) % initialReviews.length)
  }

  const currentReview = initialReviews[currentIndex]
  const platformStyle = platformStyles[currentReview.platform]

  return (
    <>
      <section className="relative z-10 px-4 py-16 lg:py-24">
        <BackgroundTexture variant={0} />
        <div className="mx-auto max-w-6xl">

          {/* Header */}
          <FadeIn>
            <div className="text-center">
              <h1 className="text-balance text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                What Our <span className="text-gold">Clients Say</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-foreground/70 md:text-lg">
                Read real reviews from clients who recovered thousands in diminished value claims with DVHive.
              </p>
            </div>
          </FadeIn>

          {/* Trust Badges / Aggregate Ratings */}
          <FadeIn delay={0.1}>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="glass-light rounded-xl p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                  <svg className="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </div>
                <div className="flex items-center justify-center gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-gold text-gold" />)}
                </div>
                <p className="text-2xl font-bold text-foreground">4.9/5</p>
                <p className="text-sm text-foreground/60">Google Reviews</p>
              </div>

              <div className="glass-light rounded-xl p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/10">
                  <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <div className="flex items-center justify-center gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-gold text-gold" />)}
                </div>
                <p className="text-2xl font-bold text-foreground">5.0/5</p>
                <p className="text-sm text-foreground/60">Facebook Reviews</p>
              </div>

              <div className="glass-light rounded-xl p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                  <svg className="h-6 w-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.227 16.67l2.19 6.742-7.413-5.388 5.223-1.354zM24 9.31h-9.165L12.005.589l-2.83 8.723L0 9.3l7.422 5.397-2.84 8.714 7.422-5.388L19.427 23.4l-2.83-8.713L24 9.311z" />
                  </svg>
                </div>
                <div className="flex items-center justify-center gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-gold text-gold" />)}
                </div>
                <p className="text-2xl font-bold text-foreground">4.8/5</p>
                <p className="text-sm text-foreground/60">Trustpilot</p>
              </div>
            </div>
          </FadeIn>

          {/* Featured Review Carousel */}
          <FadeIn delay={0.2}>
            <div className="mt-16">
              <div className="relative glass-light rounded-2xl p-8 md:p-12">
                <div className="mb-4 inline-flex items-center gap-2">
                  <div className={`rounded-full px-3 py-1 text-xs font-semibold ${platformStyle.bg} ${platformStyle.text}`}>
                    {platformStyle.label}
                  </div>
                  <span className="text-xs text-foreground/50">{currentReview.date}</span>
                </div>

                <div className="mb-4 flex gap-1">
                  {Array.from({ length: currentReview.rating }).map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-gold text-gold" />
                  ))}
                </div>

                <p className="text-lg leading-relaxed text-foreground/90 mb-6">
                  &quot;{currentReview.text}&quot;
                </p>

                <div className="flex items-center gap-3 border-t border-border pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-lg font-bold text-gold">
                    {currentReview.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{currentReview.name}</p>
                    <p className="text-sm text-foreground/60">{currentReview.location || "Verified Client"}</p>
                  </div>
                </div>

                <div className="absolute right-4 top-4 flex gap-2">
                  <button onClick={prevReview} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-foreground/60 transition-all hover:bg-white/10 hover:text-gold">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button onClick={nextReview} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-foreground/60 transition-all hover:bg-white/10 hover:text-gold">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-6 flex justify-center gap-2">
                  {initialReviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-2 rounded-full transition-all ${i === currentIndex ? "w-8 bg-gold" : "w-2 bg-foreground/20"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* All Reviews Grid */}
          <FadeIn delay={0.3}>
            <div className="mt-16">
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
          <FadeIn delay={0.4}>
            <div className="mt-16 glass-light rounded-2xl p-8 text-center md:p-12">
              <MessageSquare className="mx-auto mb-4 h-12 w-12 text-gold" />
              <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
                Share Your Experience
              </h2>
              <p className="mx-auto mb-6 max-w-xl text-foreground/70">
                Have you worked with DVHive? We'd love to hear about your experience. Your feedback helps us serve you better and helps others make informed decisions.
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