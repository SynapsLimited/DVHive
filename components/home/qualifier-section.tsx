"use client"

import { useRouter } from "next/navigation"
import { FadeIn } from "@/components/fade-in"
import { BackgroundTexture } from "@/components/background-texture"
import { Car, FileWarning, HelpCircle, ArrowRight } from "lucide-react"

const options = [
  {
    value: "Diminished Value",
    label: "Diminished Value",
    icon: Car,
    desc: "My car was repaired but lost value",
  },
  {
    value: "Total Loss",
    label: "Total Loss",
    icon: FileWarning,
    desc: "My car was declared a total loss",
  },
  {
    value: "Not Sure",
    label: "Not Sure",
    icon: HelpCircle,
    desc: "I need help figuring it out",
  },
]

export function QualifierSection() {
  const router = useRouter()

  function handleSelect(value: string) {
    router.push(`/questionnaire?claimType=${encodeURIComponent(value)}`)
  }

  return (
    <section className="relative z-0 px-4 py-16">
      <BackgroundTexture variant={1} />
      <FadeIn>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            What type of claim do you need help with?
          </h2>
          <p className="mt-2 text-sm text-foreground/80">
            Select your situation and we will guide you through the process.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-white/5 p-6 text-center transition-all hover:border-gold/40 hover:bg-gold/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/20 bg-gold/5 transition-colors group-hover:bg-gold/10">
                  <opt.icon className="h-6 w-6 text-gold/70 group-hover:text-gold transition-colors" />
                </div>
                <span className="text-base font-bold text-foreground group-hover:text-gold transition-colors">
                  {opt.label}
                </span>
                <span className="text-xs text-foreground/80">{opt.desc}</span>
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-gold/0 group-hover:text-gold transition-all">
                  Get Started
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            ))}
          </div>

          <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="hidden md:inline">Click to select</span>
            <span className="md:hidden">Tap to select</span>
          </p>
        </div>
      </FadeIn>
    </section>
  )
}
