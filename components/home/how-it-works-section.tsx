"use client"

import { FadeIn } from "@/components/fade-in"
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
    <section className="relative z-10 px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-[48px] lg:leading-[1.15]">
              How It <span className="text-gold">Works</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-foreground/60">
              Three simple steps to recover the value you deserve.
            </p>
          </div>
        </FadeIn>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <FadeIn key={step.step} delay={i * 0.15}>
              <div className="group glass-light rounded-xl p-8 text-center transition-all hover:border-gold/20">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 transition-colors group-hover:bg-gold/20">
                  <step.icon className="h-7 w-7 text-gold" />
                </div>
                <span className="text-xs font-bold text-gold/60 uppercase tracking-widest">
                  Step {step.step}
                </span>
                <h3 className="mt-2 text-xl font-bold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/60">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
