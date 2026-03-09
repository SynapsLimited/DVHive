import type { Metadata } from "next"
import { PricingPageContent } from "@/components/pages/pricing-content"

export const metadata: Metadata = {
  title: "Pricing & Guarantee | DVHIVE Certified Auto Appraisers",
  description:
    "Transparent, flat-rate pricing for certified diminished value reports and total loss appraisals. View our $299 and $349 packages with a money-back guarantee.",
  keywords: [
    "auto appraiser cost",
    "diminished value report price",
    "total loss appraisal fee",
    "certified auto appraiser pricing",
    "car appraisal cost"
  ],
  openGraph: {
    title: "Pricing & Guarantee | DVHIVE",
    description:
      "Flat-rate pricing for certified auto appraisals. Free consultation, Diminished Value $299, Total Loss $349.",
    url: "https://dvhive.com/pricing", // Update with your final production domain
    type: "website",
    siteName: "DVHIVE",
  },
}

export default function PricingPage() {
  return <PricingPageContent />
}