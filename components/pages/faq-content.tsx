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
    question: "What is an auto diminished value claim?",
    answer:
      "An auto diminished value claim is a legal request for compensation to recover the permanent loss in a vehicle's market value after an accident. Even after high-quality repairs, a vehicle with a collision history on reports like Carfax is worth significantly less than an undamaged peer. Our certified appraisals document this loss in resale and trade-in value so you can recover it from the insurance company.",
  },
  {
    question: "How long does the certified auto appraisal process take?",
    answer:
      "Our certified auto appraisal process typically takes 48 to 72 hours once we receive your vehicle documentation and photos. We use an expedited 'Claim-Ready System' to ensure you receive your professional valuation report quickly, allowing you to dispute a total loss offer or file a diminished value claim without unnecessary delays.",
  },
  {
    question: "Is my diminished value payout guaranteed?",
    answer:
      "While no one can guarantee a specific settlement from an insurance company, we offer a 'Get Paid or Don't Pay' guarantee. If our certified appraisal doesn't result in a payout for your claim, you owe us nothing. Our reports use industry-standard methodology accepted by major insurers, which significantly increases the likelihood of a successful settlement.",
  },
  {
    question: "Do I need a lawyer for a diminished value or total loss claim?",
    answer:
      "In most cases, you do not need a lawyer to file a diminished value claim or dispute a total loss offer. Our 'claim-ready' appraisal reports provide the professional market analysis and demand letters required to negotiate directly with insurance adjusters. However, for high-value luxury vehicles or complex legal disputes, we can refer you to specialized insurance attorneys if necessary.",
  },
  {
    question: "Which states recognize diminished value insurance claims?",
    answer:
      "Diminished value claims are recognized in nearly all 50 states under third-party tort law (claims against the at-fault driver). Some states, such as Georgia, Florida, California, and Texas, have particularly strong consumer protections for vehicle value loss. We provide nationwide appraisal services and will assess the specific laws in your state during your free initial consultation.",
  },
  {
    question: "How much does a certified independent auto appraisal cost?",
    answer:
      "A certified independent auto appraisal at DVHIVE features transparent, flat-rate pricing starting at $299 for Diminished Value and $349 for Total Loss reports. Because we offer a 'Get Paid or Don't Pay' guarantee, the cost of the appraisal is risk-free; if you don't recover money from the insurance company, you don't pay our fee.",
  },
]

export function FAQContent() {
  return (
    <section className="relative z-10 px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Hero */}
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-extrabold text-foreground md:text-4xl lg:text-[48px] lg:leading-[1.15]">
              Frequently Asked <span className="text-gold">Questions</span>
            </h2>
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
