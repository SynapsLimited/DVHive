"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Star, Send, Loader2 } from "lucide-react"
import { submitWebsiteReview } from "@/lib/actions/reviews"

interface Props {
  open: boolean
  onClose: () => void
}

export function ReviewSubmissionModal({ open, onClose }: Props) {
  const [rating, setRating] = useState(5)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [review, setReview] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setRating(5)
        setName("")
        setLocation("")
        setReview("")
        setSubmitted(false)
        setIsSubmitting(false)
      }, 300)
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Sends the data to your unified backend action
    await submitWebsiteReview({ name, location, rating, review })

    setIsSubmitting(false)
    setSubmitted(true)

    setTimeout(() => {
      onClose()
    }, 2000)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Leave a Review"
          >
            <div className="glass relative w-full max-w-lg rounded-2xl p-6 md:p-8">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-foreground/40 hover:text-foreground transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>

              {!submitted ? (
                <>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Leave a Review</h2>
                  <p className="text-sm text-foreground/60 mb-6">
                    Share your experience working with DVHive. Your feedback is valuable to us and helps others.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Rating */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-foreground">
                        Your Rating
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`h-8 w-8 ${star <= (hoveredRating || rating)
                                ? "fill-gold text-gold"
                                : "fill-transparent text-foreground/30"
                                }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label htmlFor="review-name" className="mb-2 block text-sm font-semibold text-foreground">
                        Your Name
                      </label>
                      <input
                        id="review-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-border bg-black/20 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label htmlFor="review-location" className="mb-2 block text-sm font-semibold text-foreground">
                        Location
                      </label>
                      <input
                        id="review-location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        placeholder="Miami, FL"
                        className="w-full rounded-xl border border-border bg-black/20 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                      />
                    </div>

                    {/* Review Text */}
                    <div>
                      <label htmlFor="review-text" className="mb-2 block text-sm font-semibold text-foreground">
                        Your Review
                      </label>
                      <textarea
                        id="review-text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                        rows={5}
                        placeholder="Tell us about your experience with DVHive..."
                        className="w-full rounded-xl border border-border bg-black/20 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-base font-bold text-dvhive-bg shadow-lg transition-all hover:bg-gold/90 disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      {isSubmitting ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                    <Star className="h-8 w-8 fill-gold text-gold" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">Thank You!</h3>
                  <p className="text-foreground/70">
                    Your review has been submitted successfully. We appreciate your feedback!
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}