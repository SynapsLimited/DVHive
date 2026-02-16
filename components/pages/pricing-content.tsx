"use client"

import Link from "next/link"
import { Phone, ArrowRight, Check } from "lucide-react"
import { FadeIn } from "@/components/fade-in"

const plans = [
  {
    name: "Free Consultation",
    price: "$0",
    description: "No obligation. Speak with an expert.",
    features: [
      "5-minute phone assessment",
      "Claim eligibility review",
      "State law overview",
      "Estimated recovery range",
      "No hidden fees",
    ],
    cta: { label: "Call Now", href: "tel:888-597-3282", primary: false },
  },
  {
    name: "Diminished Value",
    price: "$299",
    description: "For vehicles repaired after an accident.",
    features: [
      "Certified DV appraisal report",
      "Market comparable analysis",
      "Claim-ready documentation",
      "Insurance demand letter",
      "Expert negotiation support",
      "Get paid or don't pay guarantee",
    ],
    cta: { label: "Start Assessment", href: "/questionnaire?type=dv", primary: true },
    popular: true,
  },
  {
    name: "Total Loss",
    price: "$349",
    description: "For vehicles totaled by insurance.",
    features: [
      "Certified TL valuation report",
      "Comparable vehicle analysis",
      "Salvage value assessment",
      "Insurance demand letter",
      "Expert negotiation support",
      "Get paid or don't pay guarantee",
    ],
    cta: { label: "Start Assessment", href: "/questionnaire?type=tl", primary: true },
  },
]

export function PricingPageContent() {
  return (
    <section className="relative z-10 px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="text-center mb-14">
            <h1 className="text-balance text-3xl font-extrabold text-foreground md:text-4xl lg:text-[48px] lg:leading-[1.15]">
              Transparent Pricing.{" "}
              <span className="text-gold">No Hidden Fees.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-foreground/60">
              Simple, flat-rate pricing with our &quot;Get Paid or Don&apos;t Pay&quot; guarantee.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.1}>
              <div
                className={`glass-light relative flex flex-col rounded-2xl p-8 h-full transition-all ${
                  plan.popular ? "border-gold/30 ring-1 ring-gold/20" : ""
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold text-dvhive-bg">
                    Most Popular
                  </span>
                )}

                <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                <p className="mt-1 text-sm text-foreground/50">{plan.description}</p>

                <div className="mt-6 mb-6">
                  <span className="text-4xl font-extrabold text-gold">{plan.price}</span>
                  {plan.price !== "$0" && (
                    <span className="text-sm text-foreground/40 ml-1">/ per claim</span>
                  )}
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-foreground/70">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>

                {plan.cta.href.startsWith("tel:") ? (
                  <a
                    href={plan.cta.href}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all ${
                      plan.cta.primary
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
                    className={`group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all ${
                      plan.cta.primary
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
