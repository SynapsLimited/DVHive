"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { FadeIn } from "@/components/fade-in"
import { BackgroundTexture } from "@/components/background-texture"
import {
  Star,
  ShieldCheck,
  Award,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Phone,
  ClipboardList,
  MessageCircle
} from "lucide-react"
import { getUnifiedReviews, type Review } from "@/lib/actions/reviews"
import { platformStyles } from "@/components/pages/testimonials-content"
import { ReviewSubmissionModal } from "@/components/review-submission-modal"
import { ContactModal } from "@/components/contact-modal"

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
  const [contactOpen, setContactOpen] = useState(false)

  // Slider State
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
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
  const platformStyle = currentReview ? platformStyles[currentReview.platform as keyof typeof platformStyles] : null

  return (
    <>
      <section className="relative z-10 px-4 py-16 lg:py-24 overflow-hidden">
        <BackgroundTexture variant={0} />
        <div className="mx-auto max-w-6xl">

          {/* Company Expertise Card */}
          <FadeIn>
            <div className="mb-20 grid grid-cols-1 items-center gap-8 rounded-3xl border border-border bg-white/5 p-8 shadow-xl backdrop-blur-sm md:p-12 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-6">
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                  Professional <span className="text-gold">Auto Appraisal Experts</span>
                </h2>
                <p className="text-lg leading-relaxed text-foreground/80">
                  When your vehicle is damaged, insurance companies look out for their own bottom line. You need independent professionals on your side. We specialize in comprehensive, data-backed reports to help you navigate <strong>Diminished Value</strong> and <strong>Total Loss</strong> claims effortlessly.
                </p>
                <ul className="space-y-4 text-foreground/90">
                  <li className="flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-gold" />
                    <span className="font-medium">Industry-recognized appraisal methodology</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-gold" />
                    <span className="font-medium">Maximize your fair market value settlement</span>
                  </li>
                </ul>

                <div className="mt-6 flex flex-row items-center gap-3 sm:gap-4 w-full">
                  <a
                    href="tel:888-597-3282"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-4 sm:px-5 py-2.5 text-sm font-bold text-dvhive-bg shadow-lg shadow-gold/20 transition-all hover:scale-105 hover:shadow-gold/30 whitespace-nowrap"
                    aria-label="Call DVHIVE at 888-597-3282"
                  >
                    <Phone className="h-4 w-4 transition-transform group-hover:rotate-12" />
                    Call Now
                  </a>
                  <Link
                    href="/questionnaire"
                    className="inline-flex items-center justify-center rounded-lg border border-gold/20 bg-background/50 p-2.5 sm:px-5 sm:py-2.5 text-gold transition-all hover:scale-105 hover:bg-gold/10"
                    aria-label="Get a free estimate"
                    title="Free Estimate"
                  >
                    <ClipboardList className="h-5 w-5 sm:hidden" />
                    <span className="hidden sm:inline-flex items-center gap-2 text-sm font-bold">
                      <ClipboardList className="h-4 w-4" />
                      Free Estimate
                    </span>
                  </Link>
                  <button
                    onClick={() => setContactOpen(true)}
                    className="inline-flex items-center justify-center rounded-lg border border-gold/20 bg-background/50 p-2.5 sm:px-5 sm:py-2.5 text-gold transition-all hover:scale-105 hover:bg-gold/10"
                    aria-label="Contact us"
                    title="Contact Us"
                  >
                    <MessageCircle className="h-5 w-5 sm:hidden" />
                    <span className="hidden sm:inline-flex items-center gap-2 text-sm font-bold">
                      <MessageCircle className="h-4 w-4" />
                      Contact Us
                    </span>
                  </button>
                </div>
              </div>

              {/* Image Container fixed so it stays cleanly inside the card's border padding */}
              <div className="relative mx-auto w-full max-w-lg mt-8 lg:mt-0 flex items-center justify-center">
                <div className="w-full transition-all duration-300 ease-in-out group hover:scale-105 opacity-90 hover:opacity-100">
                  <Image
                    src="/images/car-crash-2.png"
                    alt="Car crash assessment visualization"
                    width={800}
                    height={400}
                    className="h-auto w-full rounded-2xl object-cover"
                    priority
                  />
                  <div className="absolute inset-0 rounded-2xl duration-300" />
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Reviews Section Header */}
          <div className="mt-32 flex flex-col items-center justify-center text-center">
            <FadeIn>
              <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-[48px] lg:leading-[1.15]">
                Trusted by <span className="text-gold">Thousands</span>
              </h2>
              <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-foreground/70 md:text-lg">
                Our <strong>Certified Auto Appraisers</strong> have successfully guided thousands of clients in recovering maximum compensation for their <strong>Diminished Value</strong> and <strong>Total Loss</strong> claims nationwide. See what they have to say.
              </p>
            </FadeIn>
          </div>

          {/* Animated Sliding Show */}
          {reviews.length > 0 && platformStyle && (
            <FadeIn delay={0.2}>
              <div className="relative mx-auto mt-12 flex min-h-[400px] max-w-4xl flex-col justify-center rounded-2xl p-8 pb-16 glass-light sm:min-h-[380px] md:p-12 md:pb-20">

                <div className="relative flex w-full flex-1 flex-col justify-center overflow-hidden pb-4">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      // Added px-8 on mobile to keep text away from the inner arrows, kept everything centered
                      className="flex w-full flex-col items-center text-center px-8 sm:px-0"
                    >
                      <div className="mb-5 inline-flex items-center justify-center gap-3">
                        {/* Branded Shiny Badge */}
                        <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold shadow-sm ${platformStyle.bg} ${platformStyle.text} ${platformStyle.border} ${platformStyle.shadow}`}>
                          {platformStyle.logo}
                          {platformStyle.label}
                        </div>
                      </div>

                      <div className="mb-4 flex gap-1 justify-center">
                        {Array.from({ length: currentReview.rating }).map((_, idx) => (
                          <Star key={idx} className="h-5 w-5 fill-gold text-gold drop-shadow-sm" />
                        ))}
                      </div>

                      <p className="mb-8 text-lg italic leading-relaxed text-foreground/90 md:text-xl">
                        &quot;{currentReview.text}&quot;
                      </p>

                      <div className="flex flex-col items-center gap-3 mt-auto">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-lg font-bold text-gold ring-1 ring-gold/20 shadow-inner">
                          {currentReview.name[0]}
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-foreground">{currentReview.name}</p>
                          <p className="text-sm text-foreground/60">{currentReview.location || "Verified Client"}</p>
                          {/* Date moved here to the bottom */}
                          <p className="mt-1 text-xs font-medium text-foreground/40">{currentReview.date}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Left Arrow: Pulled inside on mobile (left-2), smaller on mobile (h-9 w-9) */}
                <div className="absolute left-2 top-1/2 z-20 -translate-y-1/2 sm:-left-6 md:-left-8">
                 <button 
  onClick={prevReview} 
  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground/60 shadow-lg transition-all hover:border-gold/30 hover:bg-gold/10 hover:text-gold sm:h-12 sm:w-12"
  aria-label="Previous testimonial" // <-- Added this
>
  <ChevronLeft className="h-5 w-5 pr-0.5 sm:h-6 sm:w-6" />
</button>
                </div>
                
                {/* Right Arrow: Pulled inside on mobile (right-2), smaller on mobile (h-9 w-9) */}
                <div className="absolute right-2 top-1/2 z-20 -translate-y-1/2 sm:-right-6 md:-right-8">
                 <button 
  onClick={nextReview} 
  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground/60 shadow-lg transition-all hover:border-gold/30 hover:bg-gold/10 hover:text-gold sm:h-12 sm:w-12"
  aria-label="Next testimonial" // <-- Added this
>
  <ChevronRight className="pl-0.5 h-5 w-5 sm:h-6 sm:w-6" />
</button>
                </div>

                <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToReview(i)}
                      className={`h-2 rounded-full transition-all ${i === currentIndex ? "w-8 bg-gold shadow-[0_0_8px_rgba(255,215,0,0.5)]" : "w-2 bg-foreground/20 hover:bg-foreground/40"}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.3}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
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

          <FadeIn delay={0.5}>
            <div
              className="relative z-0 mx-auto mt-16 -mb-24 flex w-full items-center justify-center opacity-90 lg:mt-24 lg:-mb-40 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
              aria-hidden="true"
            >
              <Image
                src="/images/cash-stack.png"
                alt="Recovered Cash"
                width={800}
                height={900}
                className="h-64 w-auto md:h-96 lg:h-[28rem]"
              />
            </div>
          </FadeIn>

        </div>
      </section>

      <ReviewSubmissionModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}