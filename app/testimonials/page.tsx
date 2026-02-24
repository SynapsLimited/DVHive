import { TestimonialsContent } from "@/components/pages/testimonials-content"
import { getUnifiedReviews } from "@/lib/actions/reviews"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Client Testimonials - DVHIVE Reviews | Diminished Value Experts",
  description:
    "Read real reviews from clients who recovered thousands in diminished value claims with DVHive. See our 5-star ratings on Google, Facebook, and Trustpilot.",
  keywords: [
    "DVHIVE reviews",
    "diminished value testimonials",
    "client reviews",
    "car appraisal reviews",
    "DVHIVE Google reviews",
    "DVHIVE Trustpilot",
    "customer testimonials",
  ],
  openGraph: {
    title: "Client Testimonials - DVHIVE Reviews",
    description:
      "Read real reviews from clients who recovered thousands in diminished value claims with DVHive.",
    type: "website",
  },
}

export default async function TestimonialsPage() {
  const initialReviews = await getUnifiedReviews()

  return <TestimonialsContent initialReviews={initialReviews} />
}