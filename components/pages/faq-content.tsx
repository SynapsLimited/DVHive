"use client"

import { FadeIn } from "@/components/fade-in"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const faqs = [
  {
    question: "What is a diminished value claim?",
    answer:
      "A diminished value claim is a request for compensation for the loss in your vehicle's market value after it has been involved in an accident and repaired. Even with perfect repairs, a vehicle with an accident history is worth less than an identical vehicle without one. This loss is documented through services like Carfax and affects resale and trade-in value permanently.",
  },
  {
    question: "How long does the appraisal process take?",
    answer:
      "Our Claim-Ready Appraisal System typically delivers your completed appraisal within 48 to 72 hours after we receive all necessary documentation and photos. The entire process from initial questionnaire to receiving your appraisal report is designed to be fast and straightforward, so you can submit your claim as quickly as possible.",
  },
  {
    question: "Is my claim guaranteed to be paid?",
    answer:
      "We operate under our \"Get Paid or Don't Pay\" guarantee. If your claim does not result in a payout, you owe us nothing. While no company can guarantee a specific settlement amount, our certified appraisals are accepted by major insurance carriers, and the vast majority of our clients receive compensation for their diminished value or total loss underpayment.",
  },
  {
    question: "Do I need a lawyer to file a diminished value claim?",
    answer:
      "In most cases, no. Our appraisal reports are designed to be \"claim-ready,\" meaning they include all the documentation, comparable vehicle analysis, and professional formatting needed to submit directly to the insurance company. Many of our clients settle their claims without legal representation. However, if your claim is complex or involves a dispute, we can recommend attorneys who specialize in insurance claims.",
  },
  {
    question: "Which states allow diminished value claims?",
    answer:
      "Third-party diminished value claims (filed against the at-fault driver's insurance) are recognized in nearly all 50 states under standard tort law. First-party claims (filed against your own insurance) are more limited and vary significantly by state. States like Georgia, California, Florida, Texas, and Virginia have particularly strong case law supporting DV claims. Contact us for a free assessment specific to your state.",
  },
  {
    question: "How much does your service cost?",
    answer:
      "Our pricing depends on the type of claim and your vehicle. We offer transparent, flat-rate pricing with no hidden fees. Most importantly, our \"Get Paid or Don't Pay\" guarantee means you only pay if your claim results in a payout. Visit our pricing page for detailed information, or start a free questionnaire to get a personalized estimate.",
  },
]

export function FAQContent() {
  return (
    <section className="relative z-10 px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Hero */}
        <FadeIn>
          <div className="mb-12 text-center">
            <h1 className="text-balance text-3xl font-extrabold text-foreground md:text-4xl lg:text-[48px] lg:leading-[1.15]">
              Frequently Asked <span className="text-gold">Questions</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-foreground/60 leading-relaxed">
              Everything you need to know about diminished value and total loss claims. Can not find your answer? Contact us directly.
            </p>
          </div>
        </FadeIn>

        {/* Accordion */}
        <FadeIn delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-border"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-gold hover:no-underline py-5 [&[data-state=open]]:text-gold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#F2F2F2]/70 leading-relaxed text-sm pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.2}>
          <div className="mt-14 rounded-2xl bg-gold/5 border border-gold/20 p-8 text-center">
            <h2 className="text-xl font-bold text-foreground mb-2">
              Still have questions?
            </h2>
            <p className="text-sm text-foreground/60 mb-5 max-w-md mx-auto">
              Our team is ready to help. Get a free assessment or reach out directly.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/questionnaire"
                className="group inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-bold text-dvhive-bg transition-all hover:bg-gold/90"
              >
                Start Free Assessment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground/80 transition-colors hover:text-gold hover:border-gold/30"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
