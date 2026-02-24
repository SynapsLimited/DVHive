import { HeroSection } from "@/components/home/hero-section"
import { QualifierSection } from "@/components/home/qualifier-section"
import { USMapSection } from "@/components/home/us-map-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { VideoSection } from "@/components/home/video-section"
import { FAQContent } from "@/components/pages/faq-content"

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
