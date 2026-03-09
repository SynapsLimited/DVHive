import { Metadata } from "next"
import { HeroSection } from "@/components/home/hero-section"
import { QualifierSection } from "@/components/home/qualifier-section"
import { USMapSection } from "@/components/home/us-map-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { VideoSection } from "@/components/home/video-section"
import { FAQContent } from "@/components/pages/faq-content"

export const metadata: Metadata = {
  title: "DVHIVE | Certified Diminished Value & Total Loss Appraisals",
  description: "Independent certified auto appraisers helping drivers recover maximum compensation for diminished value and total loss claims nationwide. Get a free estimate today.",
  keywords: [
    "diminished value appraisal",
    "total loss auto appraiser",
    "certified auto appraiser",
    "independent vehicle valuation",
    "appraisal clause representation",
    "car accident value loss"
  ],
  openGraph: {
    title: "DVHIVE | Certified Diminished Value & Total Loss Appraisals", 
    description: "Don't let insurance companies underpay. We provide independent, claim-ready appraisal reports for diminished value and total loss.",
    url: "https://dvhive.com/", // <-- Done!
    siteName: "DVHIVE",
    images: [
      {
        url: "/images/social-preview.png", 
        width: 1200,
        height: 630,
        alt: "DVHIVE Certified Auto Appraisers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DVHIVE | Diminished Value & Total Loss Experts",
    description: "Independent appraisal reports to help you get paid what you're owed.",
    images: ["/images/social-preview.png"],
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QualifierSection />
      <USMapSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <VideoSection />
      <FAQContent />
    </>
  )
}