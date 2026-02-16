"use client"

import Image from "next/image"
import { FadeIn } from "@/components/fade-in"
import { Star, ShieldCheck, Award, DollarSign, Users } from "lucide-react"

const stats = [
  { icon: DollarSign, value: "$20M+", label: "Recovered for Clients" },
  { icon: Users, value: "10,000+", label: "Claims Processed" },
  { icon: Star, value: "4.9/5", label: "Average Rating" },
  { icon: Award, value: "BBB A+", label: "BBB Accredited" },
]

const reviews = [
  {
    name: "Michael T.",
    state: "Florida",
    text: "DVHive recovered $8,200 in diminished value that my insurance flat-out denied. Their appraisal was ironclad.",
    rating: 5,
  },
  {
    name: "Sarah K.",
    state: "Texas",
    text: "After my total loss, the insurance offered $14k. DVHive's appraisal proved it was worth $22k. I got every dollar.",
    rating: 5,
  },
  {
    name: "James R.",
    state: "California",
    text: "Professional, fast, and the appraisal held up in arbitration. Could not recommend enough.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="relative z-10 overflow-hidden px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">

        {/* 1. Stats Section */}
        <FadeIn>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-light rounded-xl p-6 text-center"
              >
                <stat.icon className="mx-auto mb-2 h-6 w-6 text-gold" />
                <p className="text-2xl font-extrabold text-foreground md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-foreground/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* 2. 3D Art - Cash Stack (Placed in the Middle, 2x Bigger) */}
        <FadeIn delay={0.1}>
          <div
            // Increased vertical margin to accommodate larger image
            className="relative z-0 mx-auto my-8 flex w-full items-center justify-center opacity-90 lg:my-12"
            aria-hidden="true"
          >
            <Image
              src="/images/cash-stack.png"
              alt=""
              // Increased intrinsic width/height props for larger base size
              width={800}
              height={900}
              // Updated height classes to be ~2x bigger (h-64, md:h-96, lg:h-[28rem])
              className="h-64 w-auto drop-shadow-[0_10px_20px_rgba(245,207,96,0.15)] md:h-96 lg:h-[28rem]"
            />
          </div>
        </FadeIn>

        {/* 3. Reviews Section */}
        <div className="text-center">
          <FadeIn>
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-[48px] lg:leading-[1.15]">
              Trusted by <span className="text-gold">Thousands</span>
            </h2>
          </FadeIn>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((review, i) => (
            <FadeIn key={review.name} delay={i * 0.1}>
              <div className="glass-light rounded-xl p-6 h-full flex flex-col">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-foreground/80">&quot;{review.text}&quot;</p>
                <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 text-sm font-bold text-gold">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{review.name}</p>
                    <p className="text-xs text-foreground/50">{review.state}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* 4. Trust Badges */}
        <FadeIn delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-foreground/90">
              <ShieldCheck className="h-5 w-5 text-gold/90" />
              <span className="text-sm font-medium">BBB Accredited</span>
            </div>
            <div className="flex items-center gap-2 text-foreground/90">
              <Award className="h-5 w-5 text-gold/90" />
              <span className="text-sm font-medium">Licensed Appraisers</span>
            </div>
            <div className="flex items-center gap-2 text-foreground/90">
              <ShieldCheck className="h-5 w-5 text-gold/90" />
              <span className="text-sm font-medium">USPAP Compliant</span>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}