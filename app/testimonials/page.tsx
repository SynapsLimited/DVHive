import { TestimonialsContent } from "@/components/pages/testimonials-content"
import { getUnifiedReviews } from "@/lib/actions/reviews"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Client Testimonials & Reviews | DVHIVE Certified Auto Appraisers",
  description:
    "Read verified reviews from clients who recovered thousands in diminished value claims and total loss disputes with DVHIVE's independent auto appraisers.",
  keywords: [
    "DVHIVE reviews",
    "diminished value testimonials",
    "independent auto appraiser reviews",
    "car appraisal reviews",
    "total loss dispute success stories",
    "DVHIVE Google reviews",
    "DVHIVE Trustpilot",
    "customer testimonials",
  ],
  openGraph: {
    title: "Client Testimonials & Reviews | DVHIVE",
    description:
      "Read real reviews from clients who successfully recovered their car's lost value with our certified appraisal reports.",
    url: "https://dvhive.com/testimonials", // Update with your final production domain
    type: "website",
    siteName: "DVHIVE",
  },
}

export default async function TestimonialsPage() {
  const initialReviews = await getUnifiedReviews()

  return <TestimonialsContent initialReviews={initialReviews} />
}