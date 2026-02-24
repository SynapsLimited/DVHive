import type { Metadata } from "next"
import { Suspense } from "react"
import { IntakeForm } from "@/components/intake/intake-form"

export const metadata: Metadata = {
  title: "Client Intake Form | DVHive",
  description:
    "Complete our detailed intake form to initiate your diminished value or total loss claim process. Secure and confidential.",
  openGraph: {
    title: "Client Intake Form | DVHive",
    description:
      "Complete our detailed intake form to initiate your diminished value or total loss claim process.",
  },
}

export default function IntakeFormPage() {
  return (
    <section className="relative z-10 px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="text-balance text-3xl font-extrabold text-foreground md:text-4xl lg:text-[48px] lg:leading-[1.15]">
            Client <span className="text-gold">Intake Form</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/60">
            Please provide detailed information about your vehicle and the accident.
            This allows our certified appraisers to build a comprehensive and accurate valuation for your claim.
          </p>
        </div>
        <Suspense fallback={
          <div className="glass-light rounded-2xl p-10 text-center">
            <p className="text-foreground/50">Loading form...</p>
          </div>
        }>
          <IntakeForm />
        </Suspense>
      </div>
    </section>
  )
}