"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, ShieldCheck, TrendingDown, FileText, DollarSign } from "lucide-react"
import { FadeIn } from "@/components/fade-in"
import { BackgroundTexture } from "@/components/background-texture"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const helpPoints = [
  { icon: FileText, text: "Certified appraisal report accepted by all major insurance carriers" },
  { icon: TrendingDown, text: "Detailed market analysis showing pre-accident vs. post-repair value" },
  { icon: ShieldCheck, text: "Claim-ready documentation with demand letter for the insurer" },
  { icon: DollarSign, text: "Get Paid or Don't Pay guarantee - zero risk to you" },
]

const dvTypes = [
  {
    id: "immediate",
    label: "Immediate Diminished Value",
    description: `The difference in market value before being involved in an accident and immediately after the loss (before repairs).

For example, a vehicle was worth $25,000 before the accident. Now, the car it's worth only $7,000 in its damaged state, as it has not been repaired yet.

$25,000 - $7,000 = $18,000 Immediate diminished value 

Most people will end up repairing their vehicle after an accident. Therefore, immediate diminished value is not a common claim that is made.`,
  },
  {
    id: "repair-related",
    label: "Repair-Related Diminished Value",
    description: `Despite the repairs, the vehicle’s value remains less than before the damage occurred. This is the most common type of diminished value. It’s also the type of diminished value that an insurance company will compensate you for.

For example, a vehicle was worth $30,000 just before being damaged. After being repaired, the car is worth $24,000.

$30,000 – $24,000 = $6,000 Inherent Diminished Value

Even with high-quality repairs, potential buyers are unwilling to pay as much for a car that has been previously damaged.`,
  },
  {
    id: "inherent",
    label: "Inherent Diminished Value",
    description: `Loss in market value due to substandard collision repairs. This may include mismatched paint or misaligned body panels where the gaps are noticeably off.

Repair-related diminished value is usually the responsibility of the repair facility and is the result of poor workmanship. Due to the repair shop’s mistake, it is not something that an insurance company would typically cover when filing a claim.`,
  },
]

const faqItems = [
  {
    question: "How much is my diminished value claim worth?",
    answer: "The value depends on several factors: your vehicle's pre-accident market value, the extent of the damage, repair costs, and the vehicle's age. Our certified appraisers use industry-standard methods and comparable vehicle sales data to calculate an accurate figure. Most diminished value claims range from $2,000 to $10,000, though luxury vehicles or severe damage can result in higher claims.",
  },
  {
    question: "Is diminished value covered in all states?",
    answer: "Diminished value laws vary significantly by state. Most states recognize it, but a few do not. States like Georgia, South Carolina, and Alabama are especially favorable for diminished value claims. We can assess your specific situation and advise whether your state recognizes diminished value claims.",
  },
  {
    question: "How long do I have to file a diminished value claim?",
    answer: "This depends on your state's statute of limitations, which typically ranges from 2 to 6 years. However, it's best to file as soon as possible while the accident is fresh and documentation is readily available. Delaying can make gathering evidence more difficult.",
  },
  {
    question: "Will filing a diminished value claim raise my insurance rates?",
    answer: "No. Since you're filing against the at-fault party's insurance (not your own), it won't affect your rates. This is a third-party claim for their negligence, not a claim on your own policy.",
  },
  {
    question: "What documentation do I need for a diminished value claim?",
    answer: "You'll need the police accident report, repair estimates and invoices, photos of the damage, your vehicle's maintenance records, and proof of your vehicle's pre-accident value (carfax report, receipt, or market research). Our team will help you gather everything needed.",
  },
]

export function DiminishedValueContent() {
  const [activeDvType, setActiveDvType] = useState("immediate")
  const activeType = dvTypes.find((t) => t.id === activeDvType)

  return (
    <section className="relative z-10 px-4 py-16 lg:py-24">
      <BackgroundTexture variant={0} />
      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-xs font-semibold text-gold mb-4">
              <ShieldCheck className="h-3.5 w-3.5" />
              Diminished Value Claims
            </span>
            <h1 className="text-balance text-3xl font-extrabold text-foreground md:text-4xl lg:text-[48px] lg:leading-[1.15]">
              Your Car Lost Value.{" "}
              <span className="text-gold">Get Paid What You Deserve.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/90">
              Even after a perfect repair, your vehicle is worth less than before the accident.
              That loss is real, measurable, and in most states, the at-fault party&apos;s insurance owes it to you.
            </p>
          </div>
        </FadeIn>

        {/* What is Diminished Value */}
        <FadeIn delay={0.1}>
          <div className="glass-light rounded-2xl p-8 md:p-10 mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              What is <span className="text-gold">Diminished Value</span>?
            </h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Diminished value (DV) is the difference between what your vehicle was worth before the accident
              and what it is worth after being fully repaired. Think of it this way: would you pay the same
              price for a car that was in an accident versus one that was not? Neither would anyone else.
            </p>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Carfax, AutoCheck, and other vehicle history reports will always show the accident, no matter
              how well the repairs were done. This permanently reduces your vehicle&apos;s resale and trade-in value.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              In most states, you are legally entitled to recover this loss from the at-fault driver&apos;s
              insurance company. The challenge is proving how much value was lost -- and that is where we come in.
            </p>
          </div>
        </FadeIn>

        {/* How We Help - Clickable Cards */}
        <FadeIn delay={0.2}>
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              How <span className="text-gold">We Help</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {helpPoints.map((point, i) => (
                <Link key={i} href="/questionnaire">
                  <div className="glass-light rounded-xl p-6 flex items-start gap-4 transition-all duration-300 hover:scale-[1.02] hover:bg-gold/5 cursor-pointer h-full">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold shrink-0">
                      <point.icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed">{point.text}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Types of Diminished Value - Interactive Section */}
        <FadeIn delay={0.3}>
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
              Types of <span className="text-gold">Diminished Value</span>
            </h2>
            <p className="text-center text-foreground/90 mb-10">
              Understanding the different types of diminished value claims can help you determine which applies to your situation.
            </p>

            {/* Desktop Layout: Two Columns */}
            <div className="grid gap-8 lg:grid-cols-2 items-start mb-8">
              {/* Left Column: Dynamic Description */}
              <FadeIn delay={0.35}>
                <div className="glass-light rounded-2xl p-8 md:p-10">
                  <h3 className="text-xl font-bold text-gold mb-4">{activeType?.label}</h3>
                  <p className="text-foreground/90 leading-relaxed">{activeType?.description}</p>
                </div>
              </FadeIn>

              {/* Right Column: Type Selection Buttons */}
              <div className="flex flex-col gap-3">
                {dvTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveDvType(type.id)}
                    className={`rounded-xl p-4 text-left transition-all duration-300 ${activeDvType === type.id
                      ? "border-2 border-gold bg-gold/10 shadow-lg"
                      : "glass-light border-2 border-transparent hover:border-gold/30 hover:bg-gold/5"
                      }`}
                  >
                    <p className={`font-semibold ${activeDvType === type.id ? "text-gold" : "text-foreground"}`}>
                      {type.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Example of Diminished Value */}
            <div className="rounded-2xl border border-gold/20 bg-gold/5 p-8 md:p-10">
              <h3 className="text-lg font-bold text-gold mb-4">Real-World Example</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-foreground/10 px-4 py-3 text-center">
                    <p className="text-xs font-semibold text-foreground/60 uppercase">Before Accident</p>
                    <p className="text-2xl font-bold text-foreground">$25,000</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-gold/60" />
                  <div className="rounded-lg bg-foreground/10 px-4 py-3 text-center">
                    <p className="text-xs font-semibold text-foreground/60 uppercase">After Repairs</p>
                    <p className="text-2xl font-bold text-foreground">$20,000</p>
                  </div>
                </div>
                <p className="text-foreground/90 leading-relaxed">
                  A 2019 Honda Civic worth $25,000 before an accident is repaired for $4,000. The repairs are excellent and the car runs perfectly. However, the vehicle's market value after repairs is now only $20,000 due to the accident history. This $5,000 difference is the diminished value you can recover from the at-fault party's insurance.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* CTA Banner */}
        <FadeIn delay={0.4}>
          <div className="rounded-2xl bg-gold/5 border border-gold/20 p-8 md:p-12 text-center mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Ready to Recover Your Vehicle&apos;s Lost Value?
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

        {/* FAQ Section - Moved to Bottom */}
        <FadeIn delay={0.5}>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Frequently <span className="text-gold">Asked Questions</span>
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-xl border border-border bg-white/5 px-6 data-[state=open]:bg-gold/5 data-[state=open]:border-gold/20"
                >
                  <AccordionTrigger className="text-base font-semibold text-foreground hover:text-gold transition-colors py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-foreground/90 leading-relaxed pb-4">
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
