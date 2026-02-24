"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { FadeIn } from "@/components/fade-in"
import { BackgroundTexture } from "@/components/background-texture"
import { Star, ShieldCheck, Award, DollarSign, Users, MessageSquare, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { getUnifiedReviews, type Review } from "@/lib/actions/reviews"
import { platformStyles } from "@/components/pages/testimonials-content"
import { ReviewSubmissionModal } from "@/components/review-submission-modal"

const stats = [
  { icon: DollarSign, value: "$20M+", label: "Recovered for Clients" },
  { icon: Users, value: "10,000+", label: "Claims Processed" },
  { icon: Star, value: "4.9/5", label: "Average Rating" },
]

// Framer Motion variants for the sliding animation
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  // Slider State
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    // Fetch unified reviews on mount (fetching top 10 for the slider)
    getUnifiedReviews().then((data) => {
      setReviews(data.slice(0, 10))
    })
  }, [])

  const nextReview = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const goToReview = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const currentReview = reviews[currentIndex]
  const platformStyle = currentReview ? platformStyles[currentReview.platform] : null

  return (
    <>
      <section className="relative z-10 px-4 py-16 lg:py-24 overflow-hidden">
        <BackgroundTexture variant={0} />
        <div className="mx-auto max-w-6xl">

          {/* Stats Section */}
          <FadeIn>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-light rounded-xl p-6 text-center"
                >
                  <stat.icon className="mx-auto mb-2 h-6 w-6 text-gold" />
                  <p className="text-2xl font-extrabold text-foreground md:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-foreground/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* 3D Art - Cash Stack */}
          <FadeIn delay={0.1}>
            <div
              className="relative z-0 mx-auto my-8 flex w-full items-center justify-center opacity-90 lg:my-12 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
              aria-hidden="true"
            >
              <Image
                src="/images/cash-stack.png"
                alt=""
                width={800}
                height={900}
                className="h-64 w-auto md:h-96 lg:h-[28rem]"
              />
            </div>
          </FadeIn>

          {/* Reviews Section Header & SEO Description */}
          <div className="text-center flex flex-col items-center justify-center">
            <FadeIn>
              <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-[48px] lg:leading-[1.15]">
                Trusted by <span className="text-gold">Thousands</span>
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-foreground/70 leading-relaxed md:text-lg">
                Our <strong>Certified Auto Appraisers</strong> have successfully guided thousands of clients in recovering maximum compensation for their <strong>Diminished Value</strong> and <strong>Total Loss</strong> claims nationwide. See what they have to say.
              </p>
            </FadeIn>
          </div>

          {/* Animated Sliding Show */}
          {reviews.length > 0 && platformStyle && (
            <FadeIn delay={0.2}>
              <div className="mx-auto mt-12 max-w-4xl relative glass-light rounded-2xl p-8 md:p-12 min-h-[400px] sm:min-h-[340px] flex flex-col justify-center">

                {/* Inner container to clip the sliding text animation ONLY */}
                <div className="relative w-full flex-1 overflow-hidden flex flex-col justify-center pb-8">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="flex flex-col items-center text-center sm:items-start sm:text-left w-full"
                    >
                      {/* Platform Badge */}
                      <div className="mb-4 inline-flex items-center gap-2">
                        <div className={`rounded-full px-3 py-1 text-xs font-semibold ${platformStyle.bg} ${platformStyle.text}`}>
                          {platformStyle.label}
                        </div>
                        <span className="text-xs text-foreground/50">{currentReview.date}</span>
                      </div>

                      <div className="mb-4 flex gap-1">
                        {Array.from({ length: currentReview.rating }).map((_, idx) => (
                          <Star key={idx} className="h-5 w-5 fill-gold text-gold" />
                        ))}
                      </div>

                      <p className="text-lg md:text-xl leading-relaxed text-foreground/90 mb-8 italic">
                        &quot;{currentReview.text}&quot;
                      </p>

                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-lg font-bold text-gold">
                          {currentReview.name[0]}
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-foreground">{currentReview.name}</p>
                          <p className="text-sm text-foreground/60">{currentReview.location || "Verified Client"}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Arrows (Z-index 20 ensures they stay on top) */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-5 sm:-left-6 md:-left-8 z-20">
                  <button onClick={prevReview} className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-background border border-border text-foreground/60 transition-all hover:bg-gold/10 hover:text-gold hover:border-gold/30 shadow-lg">
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 pr-0.5" />
                  </button>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -right-5 sm:-right-6 md:-right-8 z-20">
                  <button onClick={nextReview} className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-background border border-border text-foreground/60 transition-all hover:bg-gold/10 hover:text-gold hover:border-gold/30 shadow-lg">
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 pl-0.5" />
                  </button>
                </div>

                {/* Pagination Dots */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToReview(i)}
                      className={`h-2 rounded-full transition-all ${i === currentIndex ? "w-8 bg-gold" : "w-2 bg-foreground/20 hover:bg-foreground/40"}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* Action Buttons */}
          <FadeIn delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3 text-sm font-bold text-dvhive-bg shadow-lg shadow-gold/20 transition-all hover:scale-[1.03] hover:shadow-gold/30"
              >
                View All Reviews
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-gold/30 bg-gold/5 px-8 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold/10"
              >
                <MessageSquare className="h-4 w-4" />
                Leave a Review
              </button>
            </div>
          </FadeIn>

          {/* Trust Badges */}
          <FadeIn delay={0.4}>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-foreground/90">
                <ShieldCheck className="h-5 w-5 text-gold/90" />
                <span className="text-sm font-medium">BBB Accredited</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/90">
                <Award className="h-5 w-5 text-gold/90" />
                <span className="text-sm font-medium">Licensed Appraisers</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/90">
                <ShieldCheck className="h-5 w-5 text-gold/90" />
                <span className="text-sm font-medium">USPAP Compliant</span>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      <ReviewSubmissionModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}