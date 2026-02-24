"use client"

import { FadeIn } from "@/components/fade-in"
import { BackgroundTexture } from "@/components/background-texture"
import { ClipboardList, FileSearch, Banknote } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Submit Your Claim",
    description:
      "Complete our 60-second questionnaire with your vehicle and accident details. It's free and takes no time.",
  },
  {
    icon: FileSearch,
    step: "02",
    title: "We Build Your Case",
    description:
      "Our certified appraisers create a comprehensive, claim-ready report that insurance companies respect.",
  },
  {
    icon: Banknote,
    step: "03",
    title: "Get Paid",
    description:
      "Present our appraisal to the insurer and collect what you are owed. If you don't get paid, you don't pay us.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="relative z-10 overflow-hidden px-4 py-20 lg:py-32">
      <BackgroundTexture variant={1} />
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-balance text-4xl font-extrabold text-foreground md:text-5xl lg:text-[56px] lg:leading-[1.15]">
              How It <span className="text-gold">Works</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/60">
              Three simple steps to recover the value you deserve.
            </p>
          </div>
        </FadeIn>

        <div className="relative mt-20 grid gap-8 md:grid-cols-3 lg:gap-12">
          {/* Subtle connecting line behind cards (desktop only) */}
          <div className="absolute left-[15%] right-[15%] top-28 z-0 hidden h-[2px] bg-gradient-to-r from-transparent via-gold/20 to-transparent md:block" />

          {steps.map((step, i) => (
            <FadeIn key={step.step} delay={i * 0.15} className="relative z-10">
              <div className="group relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-border bg-black/20 p-10 text-center backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-gold/30 hover:shadow-[0_20px_40px_-15px_rgba(245,207,96,0.15)] lg:p-12">

                {/* Background Watermark Number */}
                <div className="pointer-events-none absolute -right-6 -top-10 select-none text-[140px] font-black text-foreground/[0.03] transition-transform duration-500 group-hover:scale-110 group-hover:text-gold/[0.05]">
                  {step.step}
                </div>

                {/* Icon Container */}
                <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 shadow-inner shadow-gold/20 transition-all duration-500 group-hover:scale-110 group-hover:shadow-gold/40">
                  <step.icon className="h-10 w-10 text-gold" />
                </div>

                {/* Step Badge */}
                <span className="mb-4 inline-flex items-center rounded-full border border-gold/20 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold">
                  Step {step.step}
                </span>

                {/* Content */}
                <h3 className="mb-4 text-2xl font-bold text-foreground">{step.title}</h3>
                <p className="text-base leading-relaxed text-foreground/70">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}