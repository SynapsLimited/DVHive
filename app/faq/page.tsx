import type { Metadata } from "next"
import { FAQContent } from "@/components/pages/faq-content"

export const metadata: Metadata = {
  title: "Auto Appraisal FAQ | Diminished Value & Total Loss Questions",
  description:
    "Find expert answers to common questions about auto diminished value claims, total loss insurance disputes, and the DVHIVE certified appraisal process.",
  keywords: [
    "diminished value faq",
    "total loss claim questions",
    "auto appraisal help",
    "insurance claim dispute faq",
    "how to file diminished value"
  ],
  openGraph: {
    title: "Frequently Asked Questions | DVHIVE",
    description: "Everything you need to know about recovering your vehicle's lost value after an accident.",
    url: "https://www.dvhive.com/faq",
    siteName: "DVHIVE",
  },
}

export default function FAQPage() {
  return <FAQContent />
}