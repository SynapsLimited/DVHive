"use client"

import Link from "next/link"
import { ArrowRight, ShieldCheck, Scale, FileSearch, BadgeDollarSign, GavelIcon } from "lucide-react"
import { FadeIn } from "@/components/fade-in"

const helpPoints = [
  { icon: FileSearch, text: "Independent certified appraisal that establishes your vehicle's true market value" },
  { icon: Scale, text: "Side-by-side comparable vehicle analysis proving the insurer's offer is too low" },
  { icon: GavelIcon, text: "Demand letter and claim documentation ready for submission to the adjuster" },
  { icon: BadgeDollarSign, text: "Get Paid or Don't Pay guarantee - we only succeed when you do" },
]

export function TotalLossContent() {
  return (
    <section className="relative z-10 px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-xs font-semibold text-gold mb-4">
              <ShieldCheck className="h-3.5 w-3.5" />
              Total Loss Claims
            </span>
            <h1 className="text-balance text-3xl font-extrabold text-foreground md:text-4xl lg:text-[48px] lg:leading-[1.15]">
              Your Car Was Totaled.{" "}
              <span className="text-gold">Get Paid What You Deserve.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/60">
              Insurance companies routinely undervalue totaled vehicles. Our certified appraisals
              prove what your car was actually worth and help you recover the full amount.
            </p>
          </div>
        </FadeIn>

        {/* What is Total Loss */}
        <FadeIn delay={0.1}>
          <div className="glass-light rounded-2xl p-8 md:p-10 mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              What is a <span className="text-gold">Total Loss</span>?
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              A vehicle is declared a &quot;total loss&quot; when the insurance company determines the cost
              to repair it exceeds a certain percentage of the vehicle&apos;s value (typically 75-80%, depending
              on your state). When this happens, the insurer is supposed to pay you the fair market value
              of your vehicle immediately before the accident.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-4">
              The problem? Insurance companies use automated valuation tools that often undervalue your vehicle
              by thousands of dollars. They may not account for your vehicle&apos;s specific options, low mileage,
              excellent maintenance, aftermarket upgrades, or local market conditions.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              You have the legal right to challenge the insurance company&apos;s valuation. An independent,
              certified appraisal is the most effective tool to prove your vehicle was worth more than
              what they offered.
            </p>
          </div>
        </FadeIn>

        {/* How We Help */}
        <FadeIn delay={0.2}>
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              How <span className="text-gold">We Help</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {helpPoints.map((point, i) => (
                <div key={i} className="glass-light rounded-xl p-6 flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold shrink-0">
                    <point.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">{point.text}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* CTA Banner */}
        <FadeIn delay={0.3}>
          <div className="rounded-2xl bg-gold/5 border border-gold/20 p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Think Your Total Loss Offer is Too Low?
            </h3>
            <p className="text-foreground/60 mb-6 max-w-lg mx-auto">
              Start your free assessment today. It takes less than 60 seconds and there is absolutely no obligation.
            </p>
            <Link
              href="/questionnaire"
              className="group inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3.5 text-base font-bold text-dvhive-bg shadow-lg shadow-gold/20 transition-all hover:scale-[1.03] hover:shadow-gold/30"
            >
              Get Free Estimate
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
