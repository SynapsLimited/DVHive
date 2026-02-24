import type { Metadata } from "next"
import { FAQContent } from "@/components/pages/faq-content"

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about diminished value claims, total loss claims, and the DVHIVEappraisal process.",
}

export default function FAQPage() {
  return <FAQContent />
}
