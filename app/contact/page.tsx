import type { Metadata } from "next"
import { ContactPageContent } from "@/components/pages/contact-content"

export const metadata: Metadata = {
  title: "Contact Us | Free Diminished Value & Total Loss Consultation",
  description:
    "Get in touch with DVHIVE's certified auto appraisers. Call +1 (888) 597-3282 for a free diminished value assessment or total loss appraisal consultation. Serving all 50 states.",
  keywords: [
    "contact auto appraiser",
    "free diminished value consultation",
    "total loss help phone number",
    "certified auto appraiser nationwide",
    "DVHIVE customer service"
  ],
  openGraph: {
    title: "Contact DVHIVE | Free Expert Auto Appraisal Consultation",
    description:
      "Have questions about your insurance claim? Reach out to our independent certified appraisers for expert guidance on diminished value and total loss.",
    url: "https://dvhive.com/contact", // Update with your final domain
    type: "website",
    siteName: "DVHIVE",
  },
}

export default function ContactPage() {
  return <ContactPageContent />
}