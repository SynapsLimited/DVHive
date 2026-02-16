import type { Metadata } from "next"
import { PricingPageContent } from "@/components/pages/pricing-content"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for DVHive appraisal services. Free consultation, Diminished Value $299, Total Loss $349. No hidden fees.",
  openGraph: {
    title: "Pricing | DVHive",
    description:
      "Transparent pricing. Free consultation, Diminished Value $299, Total Loss $349.",
  },
}

export default function PricingPage() {
  return <PricingPageContent />
}
