"use client"

import Link from "next/link"
import { ArrowRight, ShieldCheck, Scale, FileSearch, BadgeDollarSign, GavelIcon } from "lucide-react"
import { FadeIn } from "@/components/fade-in"
import { BackgroundTexture } from "@/components/background-texture"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const helpPoints = [
  { icon: FileSearch, text: "Independent total loss auto valuation that establishes true fair market value" },
  { icon: Scale, text: "Side-by-side comparable vehicle analysis proving the insurer's lowball offer" },
  { icon: GavelIcon, text: "Strategic claim documentation and appraisal clause representation ready for the adjuster" },
  { icon: BadgeDollarSign, text: "Get Paid or Don't Pay guarantee - we only succeed when you do" },
]

const faqItems = [
  {
    question: "What exactly is considered a total loss vehicle by insurance standards?",
    answer: "A vehicle is declared a total loss when the estimated repair costs exceed a specific percentage of its pre-accident value, typically 75% to 80% depending on state law. Once totaled, the insurance company is required to pay you the 'Actual Cash Value' (ACV). However, many insurers use biased valuation software that intentionally undervalues vehicles, leaving you with a settlement that isn't enough to buy a comparable replacement."
  },
  {
    question: "How much more can I recover with an independent total loss appraisal?",
    answer: "On average, our clients recover between $2,500 and $5,000+ more than the insurance company's initial total loss offer. The final recovery amount depends on local market conditions, your vehicle's specific options/mileage, and the degree to which the insurer's initial valuation report was inaccurate. We provide the certified documentation needed to prove your car's true fair market value."
  },
  {
    question: "How long does the independent appraisal process for a totaled car take?",
    answer: "The independent appraisal process typically takes 5 to 10 business days to complete. This timeframe includes a thorough inspection of your vehicle's condition, a comprehensive analysis of local 'comparable' vehicle sales, and the preparation of a certified report. Having a professionally prepared report is the fastest way to resolve a total loss dispute and get your claim settled for the correct amount."
  },
  {
    question: "What can I do if the insurance company refuses to negotiate my total loss offer?",
    answer: "If an insurance company refuses to negotiate, you can invoke the 'Appraisal Clause' found in most auto policies. This allows you to hire an independent, certified appraiser to represent your interests. Our 'Get Paid or Don't Pay' guarantee ensures that if our certified appraisal doesn't lead to a higher settlement offer, you owe us nothing. This provides a risk-free path to recovering your vehicle's full value."
  },
  {
    question: "Am I legally required to use the insurance company's appraiser?",
    answer: "No, you have the legal right to hire your own independent, certified auto appraiser to dispute a total loss valuation. Under the appraisal clause of your insurance contract, you are entitled to a fair and unbiased assessment. Most states allow for binding appraisal arbitration, meaning the insurance company cannot simply ignore a certified independent report that proves their initial offer was too low."
  },
  {
    question: "How does the 'Get Paid or Don't Pay' guarantee work for total loss claims?",
    answer: "Our 'Get Paid or Don't Pay' guarantee means we only charge a fee if our independent appraisal successfully increases your settlement offer or proves your car was undervalued. If our certified valuation does not exceed the insurance company's initial offer, you pay nothing. This removes the financial risk of hiring a professional to ensure you receive the maximum Actual Cash Value (ACV) for your totaled vehicle."
  },
]

export function TotalLossContent() {
  return (
    <section className="relative z-10 px-4 py-16 lg:py-24">
      <BackgroundTexture variant={1} />
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
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/90 leading-relaxed">
  Insurance companies routinely undervalue totaled vehicles to save money. If you are facing a total loss dispute, our independent auto appraisers prove your car's actual worth so you can recover the full settlement you deserve.
</p>
          </div>
        </FadeIn>

        {/* What is Total Loss */}
        <FadeIn delay={0.1}>
          <div className="glass-light rounded-2xl p-8 md:p-10 mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              What is a <span className="text-gold">Total Loss</span>?
            </h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              A vehicle is declared a &quot;total loss&quot; when the insurance company determines the cost
              to repair it exceeds a certain percentage of the vehicle&apos;s value (typically 75-80%, depending
              on your state). When this happens, the insurer is supposed to pay you the fair market value
              of your vehicle immediately before the accident.
            </p>
            <p className="text-foreground/90 leading-relaxed mb-4">
              The problem? Insurance companies use automated valuation tools that often undervalue your vehicle
              by thousands of dollars. They may not account for your vehicle&apos;s specific options, low mileage,
              excellent maintenance, aftermarket upgrades, or local market conditions.
            </p>
            <p className="text-foreground/90 leading-relaxed">
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
                <Link
                  key={i}
                  href="/questionnaire"
                  className="glass-light rounded-xl p-6 flex items-start gap-4 hover:scale-[1.02] hover:bg-gold/5 hover:border-gold/40 transition-all cursor-pointer group border border-transparent"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold shrink-0 group-hover:bg-gold/20 transition-colors">
                    <point.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed">{point.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Total Loss Example */}
        <FadeIn delay={0.25}>
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Example of a <span className="text-gold">Total Loss Case</span>
            </h2>
            <div className="glass-light rounded-2xl p-8 md:p-10 border border-gold/10">
              <p className="text-foreground/90 leading-relaxed mb-6">
                A 2019 Honda CR-V with 45,000 miles and excellent maintenance was totaled in a collision. The owner had comprehensive coverage. The insurance company's automated valuation tool came back with an offer of <span className="font-semibold text-foreground">$14,200</span>.
              </p>
              <p className="text-foreground/90 leading-relaxed mb-6">
                The owner felt this was too low for a well-maintained vehicle with low mileage. They hired DVHIVE for an independent appraisal. Our certified appraiser conducted a thorough inspection, analyzed 8 comparable vehicles sold in the same market within the past 90 days, and documented the vehicle's excellent condition.
              </p>
              <p className="text-foreground/90 leading-relaxed mb-6">
                Our appraisal determined the fair market value to be <span className="font-semibold text-gold text-lg">$18,500</span>—<span className="font-bold text-gold">$4,300 more</span> than the insurance company's initial offer. We provided the insurer with a detailed demand letter and comprehensive appraisal documentation.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                <span className="font-semibold text-foreground">Result:</span> The insurance company agreed to settle at $17,800 after reviewing our appraisal. The owner recovered <span className="font-bold text-gold">$3,600 more</span> than the initial offer—money that helped them purchase a replacement vehicle. Our fee? $0. We only get paid when you win.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* CTA Banner */}
        <FadeIn delay={0.3}>
          <div className="rounded-2xl bg-gold/5 border border-gold/20 p-8 md:p-12 text-center mb-10">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Think Your Total Loss Offer is Too Low?
            </h3>
            <p className="text-foreground/90 mb-6 max-w-lg mx-auto">
              Start your free assessment today. It takes less than 60 seconds and there is absolutely no obligation.
            </p>
            <Link
              href="/questionnaire"
              className="group inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3.5 text-base font-bold text-dvhive-bg shadow-lg transition-all hover:scale-[1.03]"
            >
              Get Free Estimate
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>

        {/* FAQ Section */}
        <FadeIn delay={0.4}>
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Frequently Asked <span className="text-gold">Questions</span>
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="glass-light rounded-xl border border-border px-6 py-2">
                  <AccordionTrigger className="hover:text-gold transition-colors text-foreground font-semibold">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
