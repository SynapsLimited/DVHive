import type { Metadata } from "next"
import { Suspense } from "react"
import { QuestionnaireForm } from "@/components/questionnaire/questionnaire-form"

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
