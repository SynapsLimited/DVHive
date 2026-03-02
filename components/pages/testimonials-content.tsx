"use client"

import { useState } from "react"
import { FadeIn } from "@/components/fade-in"
import { BackgroundTexture } from "@/components/background-texture"
import { Star, MessageSquare } from "lucide-react"
import { ReviewSubmissionModal } from "@/components/review-submission-modal"
import type { Review } from "@/lib/actions/reviews"

export const platformStyles = {
  google: { bg: "bg-red-500", text: "text-white", label: "Google" },
  facebook: { bg: "bg-blue-500", text: "text-white", label: "Facebook" },
  trustpilot: { bg: "bg-green-500", text: "text-white", label: "Trustpilot" },
  website: { bg: "bg-gold", text: "text-dvhive-bg", label: "Website" },
}

export function TestimonialsContent({ initialReviews }: { initialReviews: Review[] }) {
  const [modalOpen, setModalOpen] = useState(false)

  if (!initialReviews || initialReviews.length === 0) return null

  // Calculate averages dynamically for all platforms
  const calculateAverage = (platform: string) => {
    const reviews = initialReviews.filter((r) => r.platform === platform)
    
    if (reviews.length === 0) return "5.0"

    // Trustpilot Bayesian Average Calculation
    if (platform === "trustpilot") {
      const realReviewsSum = reviews.reduce((sum, r) => sum + r.rating, 0)
      const realReviewsCount = reviews.length
      
      // Trustpilot adds 7 imaginary 3.5 star reviews to the baseline
      const bayesianSum = realReviewsSum + (7 * 3.5)
      const bayesianCount = realReviewsCount + 7
      
      // Calculate and round to 1 decimal place
      return (bayesianSum / bayesianCount).toFixed(1)
    }

    // Standard Arithmetic Average for Google and Facebook
    return (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
  }

  const googleAverage = calculateAverage("google")
  const facebookAverage = calculateAverage("facebook")
  const trustpilotAverage = calculateAverage("trustpilot")

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
                Read verified reviews from vehicle owners who trusted DVHIVE for independent diminished value and total loss appraisals. From insurance disputes to total loss settlement negotiations, our clients share their real experiences navigating the claim process with certified vehicle appraisal support.
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

          {/* Trust Badges / Aggregate Ratings */}
          <FadeIn delay={0.1}>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {/* Google Link */}
              <a
                href="https://www.google.com/search?sca_esv=3d8321d468ddc50c&hl=en-AL&sxsrf=ANbL-n70OuBh55dp7Nh_hHvVyXVxe11sGQ:1772271707206&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOUsHZ-hToGYqmmqiPF2Lan6R047EifElRxKtYu35SXlAKBTrU3czgc2qs6kBzJqkQsvbPewxWzVOF1iRg2c_WkJjN05e&q=DvHive+Reviews&sa=X&ved=2ahUKEwi6ybbM8vuSAxW7R_EDHTA7KrAQ0bkNegQIKRAF&biw=3383&bih=1268&dpr=1"
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-transparent glass-light p-6 text-center transition-all duration-300 hover:scale-[1.03] hover:border-red-500/40 hover:bg-white/10"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 transition-colors group-hover:bg-red-500/20">
                  <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </div>
                <div className="mb-2 flex items-center justify-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-gold text-gold" />)}
                </div>
                <p className="text-2xl font-bold text-foreground">{googleAverage}/5</p>
                <p className="mt-1 text-sm font-medium text-foreground/60 transition-colors group-hover:text-red-400">View on Google &rarr;</p>
              </a>

              {/* Facebook Link */}
              <a
                href="https://www.facebook.com/people/DvHive/61571719678230/?sk=reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-transparent glass-light p-6 text-center transition-all duration-300 hover:scale-[1.03] hover:border-blue-500/40 hover:bg-white/10"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 transition-colors group-hover:bg-blue-500/20">
                  <svg className="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <div className="mb-2 flex items-center justify-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-gold text-gold" />)}
                </div>
                <p className="text-2xl font-bold text-foreground">{facebookAverage}/5</p>
                <p className="mt-1 text-sm font-medium text-foreground/60 transition-colors group-hover:text-blue-400">View on Facebook &rarr;</p>
              </a>

              {/* Trustpilot Link */}
              <a
                href="https://www.trustpilot.com/review/dvhive.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-transparent glass-light p-6 text-center transition-all duration-300 hover:scale-[1.03] hover:border-green-500/40 hover:bg-white/10"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 transition-colors group-hover:bg-green-500/20">
                  <svg className="h-6 w-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.227 16.67l2.19 6.742-7.413-5.388 5.223-1.354zM24 9.31h-9.165L12.005.589l-2.83 8.723L0 9.3l7.422 5.397-2.84 8.714 7.422-5.388L19.427 23.4l-2.83-8.713L24 9.311z" />
                  </svg>
                </div>
                <div className="mb-2 flex items-center justify-center gap-0.5">
                  {/* Render stars based on the bayesian average */}
                  {Array.from({ length: Math.round(parseFloat(trustpilotAverage)) }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                  ))}
                  {Array.from({ length: 5 - Math.round(parseFloat(trustpilotAverage)) }).map((_, i) => (
                     <Star key={`empty-${i}`} className="h-5 w-5 text-gold" />
                  ))}
                </div>
                <p className="text-2xl font-bold text-foreground">{trustpilotAverage}/5</p>
                <p className="mt-1 text-sm font-medium text-foreground/60 transition-colors group-hover:text-green-500">View on Trustpilot &rarr;</p>
              </a>
            </div>
          </FadeIn>

          {/* All Reviews Grid */}
          <FadeIn delay={0.2}>
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