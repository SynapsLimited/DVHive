"use client"

import Link from "next/link"
import { Phone, ArrowRight, Check, ChevronDown, FileText } from "lucide-react"
import { FadeIn } from "@/components/fade-in"
import { BackgroundTexture } from "@/components/background-texture"

// Allow TypeScript to recognize the global dataLayer array for GTM
declare global {
  interface Window {
    dataLayer?: any[];
  }
}

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
  
  // --- GOOGLE TAG MANAGER DATALAYER PUSH ---
  const handleCallClick = () => {
    if (typeof window !== "undefined") {
      const win = window as any;
      win.dataLayer = win.dataLayer || []
      win.dataLayer.push({
        event: "website_calls"
      })
    }
  }

  return (
    <section className="relative z-10 px-4 py-16 lg:py-24">
      <BackgroundTexture variant={2} />
      <div className="mx-auto max-w-6xl">
        
        {/* Page Header */}
        <FadeIn>
          <div className="text-center mb-14">
            <h1 className="text-balance text-3xl font-extrabold text-foreground md:text-4xl lg:text-[48px] lg:leading-[1.15]">
              Transparent <span className="text-gold">Pricing</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-foreground/80">
              Flat-rate, claim-ready appraisal reports with no hidden fees.
            </p>
          </div>
        </FadeIn>

        {/* Pricing Grid */}
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
                    onClick={handleCallClick}
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

        {/* FAQ Section */}
        <div className="mx-auto mt-24 max-w-3xl">
          <FadeIn>
            <h2 className="text-center text-3xl font-extrabold text-foreground mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              
              <details className="group glass-light rounded-2xl [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-lg font-bold text-foreground transition-colors hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-2xl">
                  What’s the difference between a free estimate and your paid service?
                  <span className="shrink-0 rounded-full bg-gold/10 p-2 text-gold transition-colors group-hover:bg-gold/20">
                    <ChevronDown className="h-5 w-5 transition duration-300 group-open:-rotate-180" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-foreground/80 leading-relaxed border-t border-border/30 pt-4 mt-2">
                  Our free estimate provides a quick assessment of your claim's viability and an estimated range of your vehicle's value loss. Our paid service delivers a comprehensive, certified appraisal report, complete with market analysis and an insurance demand letter, giving you the documentation needed to formally pursue your claim.
                </div>
              </details>

              <details className="group glass-light rounded-2xl [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-lg font-bold text-foreground transition-colors hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-2xl">
                  When will I receive my appraisal?
                  <span className="shrink-0 rounded-full bg-gold/10 p-2 text-gold transition-colors group-hover:bg-gold/20">
                    <ChevronDown className="h-5 w-5 transition duration-300 group-open:-rotate-180" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-foreground/80 leading-relaxed border-t border-border/30 pt-4 mt-2">
                  Once we have received all necessary documentation from you, our certified appraisers typically complete your comprehensive diminished value or total loss report within 24 to 48 business hours.
                </div>
              </details>

              <details className="group glass-light rounded-2xl [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-lg font-bold text-foreground transition-colors hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-2xl">
                  Do you offer any guarantees?
                  <span className="shrink-0 rounded-full bg-gold/10 p-2 text-gold transition-colors group-hover:bg-gold/20">
                    <ChevronDown className="h-5 w-5 transition duration-300 group-open:-rotate-180" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-foreground/80 leading-relaxed border-t border-border/30 pt-4 mt-2">
                  We stand behind our services with a money-back guarantee, ensuring that you will recover at least the amount you paid for our report. To be eligible for a refund, simply present our appraisal in small claims court and provide us with the court’s ruling.
                </div>
              </details>

            </div>

            <div className="text-center mt-10">
              <p className="text-foreground/80">
                Still have questions? Please feel free to contact us at <a href="tel:888-597-3282" onClick={handleCallClick} className="text-gold font-bold hover:underline">(888) 597-3282</a>.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Global Bottom CTA Section */}
        <div className="mt-20">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl glass border border-border/50 p-8 md:p-12 text-center shadow-2xl max-w-4xl mx-auto">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gold/5 pointer-events-none" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
                  Get Your <span className="text-gold">FREE</span> Estimate
                </h2>
                <p className="text-foreground/80 mb-10 max-w-xl mx-auto text-lg">
                  Our quick and simple appraisal process can help you recoup vehicle-related losses.
                </p>
                
                <div className="flex flex-col items-center justify-center gap-4">
                  {/* Primary Prominent Call Button */}
                  <a
                    href="tel:888-597-3282"
                    onClick={handleCallClick}
                    className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gold px-10 py-4 text-lg font-bold text-dvhive-bg shadow-lg shadow-gold/20 transition-all hover:scale-[1.03] hover:shadow-gold/40"
                  >
                    <Phone className="h-5 w-5 transition-transform group-hover:rotate-12" />
                    Call Now: (888) 597-3282
                  </a>

                  {/* Secondary Buttons Row */}
                  <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center justify-center gap-3 mt-2">
                    <Link
                      href="/questionnaire"
                      className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border-2 border-border bg-transparent px-6 py-3 text-sm font-bold text-foreground transition-all hover:border-gold/50 hover:text-gold"
                    >
                      Get Free Estimate
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      href="/intake-form"
                      className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border-2 border-border bg-transparent px-6 py-3 text-sm font-bold text-foreground transition-all hover:border-gold/50 hover:text-gold"
                    >
                      <FileText className="h-4 w-4" />
                      Fill Intake Form
                    </Link>
                  </div>
                </div>
                
                <p className="mt-8 text-sm font-bold text-foreground/50 tracking-wider uppercase">
                  No hassle. No risk.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  )
}