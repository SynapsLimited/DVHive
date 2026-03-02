import type { Metadata } from "next"
import { Suspense } from "react"
import { QuestionnaireForm } from "@/components/questionnaire/questionnaire-form"
import { Phone, ShieldCheck, Star, Lock } from "lucide-react"

export const metadata: Metadata = {
  title: "Free Estimate Questionnaire",
  description:
    "Complete our 60-second questionnaire to get a free diminished value or total loss estimate. No obligation.",
  openGraph: {
    title: "Free Estimate Questionnaire | DVHive",
    description:
      "Complete our 60-second questionnaire to get a free diminished value or total loss estimate.",
  },
}

export default function QuestionnairePage() {
  return (
    <section className="relative z-10 px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <h1 className="text-balance text-3xl font-extrabold text-foreground md:text-4xl lg:text-[48px] lg:leading-[1.15]">
            Get Your <span className="text-gold">Free Estimate</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-foreground/60">
            Complete the form below and one of our certified appraisers will contact
            you within 24 hours with a no-obligation assessment.
          </p>

          {/* Trust Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm font-medium text-foreground/80">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-gold" /> Certified Appraisers</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-gold" /> 5-Star Rated</span>
            <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-gold" /> 100% Secure</span>
          </div>
        </div>

        {/* Mobile-only Click-to-Call Above the Fold */}
        <div className="mb-8 overflow-hidden rounded-lg shadow-lg shadow-gold/10 md:hidden">
          <a
            href="tel:888-597-3282"
            className="flex flex-1 items-center justify-center gap-2 bg-gold py-3.5 text-sm font-bold text-dvhive-bg transition-colors hover:bg-gold/90"
            aria-label="Call DVHIVE at 888-597-3282"
          >
            <Phone className="h-4 w-4" />
            Call Now for Immediate Assistance
          </a>
        </div>

        <Suspense fallback={
          <div className="glass-light rounded-2xl p-10 text-center">
            <p className="text-foreground/50">Loading questionnaire...</p>
          </div>
        }>
          <QuestionnaireForm />
        </Suspense>
      </div>
    </section>
  )
}