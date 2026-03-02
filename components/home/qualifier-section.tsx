"use client"

import Image from "next/image"
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
    details: "We provide certified diminished value appraisal reports used to support insurance negotiations. Our reports include detailed market comparisons and documented valuation methodology.",
  },
  {
    value: "Total Loss",
    label: "Total Loss",
    icon: FileWarning,
    desc: "My car was declared a total loss",
    details: "If your insurer declared your vehicle a total loss and the settlement feels too low, we provide independent total loss valuation reports and appraisal clause representation.",
  },
  {
    value: "Not Sure",
    label: "Not Sure",
    icon: HelpCircle,
    desc: "I need help figuring it out",
    details: "If your car was in an accident and you're unsure whether you have a diminished value claim or total loss dispute, we’ll evaluate your situation and guide you in the right direction.",
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
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            What type of claim do you need help with?
          </h2>
          <p className="mt-2 text-m text-foreground/90">
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
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/5 transition-colors group-hover:bg-gold/10">
                  <opt.icon className="h-6 w-6 text-gold/70 transition-colors group-hover:text-gold" />
                </div>

                <span className="text-lg font-bold text-foreground transition-colors group-hover:text-gold">
                  {opt.label}
                </span>

                {/* Made description slightly bigger, italic, and quoted */}
                <span className="text-sm font-medium italic text-foreground/90">
                  &quot;{opt.desc}&quot;
                </span>

                {/* New detailed text added below */}
                <span className="text-xs leading-relaxed text-foreground/70">
                  {opt.details}
                </span>

                <span className="mt-auto pt-2 inline-flex items-center gap-1 text-sm font-semibold text-gold/0 transition-all group-hover:text-gold">
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            ))}
          </div>

          <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="hidden md:inline">Click to select</span>
            <span className="md:inline hidden mx-2">•</span>
            <span className="md:hidden">Tap to select</span>
          </p>

          {/* New Optimized Image Section with Negative Margins and Hover Effects */}
          <div className="relative mx-auto mt-16 max-w-2xl">
            {/* The negative margins here are applied to pull surrounding content closer */}
            <div className="group -mb-32 -mt-32 scale-90 opacity-90 transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-100">
              <Image
                src="/images/car-crash-3.png"
                alt="Car crash assessment visualization"
                width={800}
                height={400}
                className="h-auto w-full rounded-2xl object-cover"
                priority
              />
              {/* Optional detail shift overlay on hover */}
              <div className="absolute inset-0 rounded-2xl duration-300" />
            </div>
          </div>

        </div>
      </FadeIn>
    </section>
  )
}