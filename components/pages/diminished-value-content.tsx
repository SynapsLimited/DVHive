"use client"

import Link from "next/link"
import { ArrowRight, Check, ShieldCheck, TrendingDown, FileText, DollarSign } from "lucide-react"
import { FadeIn } from "@/components/fade-in"

const helpPoints = [
  { icon: FileText, text: "Certified appraisal report accepted by all major insurance carriers" },
  { icon: TrendingDown, text: "Detailed market analysis showing pre-accident vs. post-repair value" },
  { icon: ShieldCheck, text: "Claim-ready documentation with demand letter for the insurer" },
  { icon: DollarSign, text: "Get Paid or Don't Pay guarantee - zero risk to you" },
]

export function DiminishedValueContent() {
  return (
    <section className="relative z-10 px-4 py-16 lg:py-24">
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
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/60">
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
            <p className="text-foreground/70 leading-relaxed mb-4">
              Diminished value (DV) is the difference between what your vehicle was worth before the accident
              and what it is worth after being fully repaired. Think of it this way: would you pay the same
              price for a car that was in an accident versus one that was not? Neither would anyone else.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Carfax, AutoCheck, and other vehicle history reports will always show the accident, no matter
              how well the repairs were done. This permanently reduces your vehicle&apos;s resale and trade-in value.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              In most states, you are legally entitled to recover this loss from the at-fault driver&apos;s
              insurance company. The challenge is proving how much value was lost -- and that is where we come in.
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
              Ready to Recover Your Vehicle&apos;s Lost Value?
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
