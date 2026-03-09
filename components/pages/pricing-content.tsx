"use client"

import Link from "next/link"
import { Phone, ArrowRight, Check } from "lucide-react"
import { FadeIn } from "@/components/fade-in"
import { BackgroundTexture } from "@/components/background-texture"

const plans = [
  {
    name: "Free Consultation",
    price: "$0",
    description: "No obligation. Speak with a certified appraiser.",
    features: [
      "5-minute claim assessment",
      "Diminished value eligibility review",
      "State appraisal law overview",
      "Estimated fair market value range",
      "No hidden fees",
    ],
    cta: { label: "Call Now", href: "tel:888-597-3282", primary: true },
  },
  {
    name: "Diminished Value",
    price: "$299",
    description: "For vehicles repaired after an accident.",
    features: [
      "Certified diminished value report",
      "Post-repair market analysis",
      "Claim-ready documentation",
      "Insurance demand letter",
      "Expert negotiation support",
      "Get paid or don't pay guarantee",
    ],
    cta: { label: "Start Assessment", href: "/questionnaire?type=dv", primary: false },
    popular: true,
  },
  {
    name: "Total Loss",
    price: "$349",
    description: "For vehicles declared a total loss.",
    features: [
      "Independent total loss valuation",
      "Comparable vehicle market analysis",
      "Salvage value assessment",
      "Appraisal clause demand letter",
      "Expert dispute support",
      "Get paid or don't pay guarantee",
    ],
    cta: { label: "Start Assessment", href: "/questionnaire?type=tl", primary: false },
  },
]

export function PricingPageContent() {
  return (
    <section className="relative z-10 px-4 py-16 lg:py-24">
      <BackgroundTexture variant={2} />
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="text-center mb-14">
            <h1 className="text-balance text-3xl font-extrabold text-foreground md:text-4xl lg:text-[48px] lg:leading-[1.15]">
              <span className="text-gold">Our Guarantee</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-foreground/80">
              We stand behind our services with a money-back guarantee, ensuring that you will recover at least the amount you paid for our report. To be eligible for a refund, simply present our appraisal in small claims court and provide us with the court’s ruling.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.1}>
              <div
                className={`glass-light relative flex flex-col rounded-2xl p-8 h-full transition-all ${plan.popular ? "border-gold/30 ring-1 ring-gold/20" : ""
                  }`}
              >
                <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                <p className="mt-1 text-sm text-foreground/90">{plan.description}</p>

                <div className="mt-6 mb-6">
                  <span className="text-4xl font-extrabold text-gold">{plan.price}</span>
                  {plan.price !== "$0" && (
                    <span className="text-sm text-foreground/90 ml-1">/ per claim</span>
                  )}
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-foreground/90">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>

                {plan.cta.href.startsWith("tel:") ? (
                  <a
                    href={plan.cta.href}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all ${plan.cta.primary
                      ? "bg-gold text-dvhive-bg hover:bg-gold/90"
                      : "border border-border text-foreground hover:border-gold/30 hover:text-gold"
                      }`}
                  >
                    <Phone className="h-4 w-4" />
                    {plan.cta.label}
                  </a>
                ) : (
                  <Link
                    href={plan.cta.href}
                    className={`group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all ${plan.cta.primary
                      ? "bg-gold text-dvhive-bg hover:bg-gold/90"
                      : "border border-border text-foreground hover:border-gold/30 hover:text-gold"
                      }`}
                  >
                    {plan.cta.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}