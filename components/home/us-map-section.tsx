"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { FadeIn } from "@/components/fade-in"
import { BackgroundTexture } from "@/components/background-texture"
import { MapPin, Loader2 } from "lucide-react"

const InteractiveUSAMap = dynamic(
  () =>
    import("@/components/home/interactive-usa-map").then(
      (mod) => mod.InteractiveUSAMap
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gold/40" />
      </div>
    ),
  }
)

const states = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota",
  "Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey",
  "New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon",
  "Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah",
  "Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"
]

function toSlug(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-")
}

export function USMapSection() {
  const router = useRouter()
  const [selectedState, setSelectedState] = useState("")

  function handleGo() {
    if (selectedState) {
      router.push(`/state/${toSlug(selectedState)}`)
    }
  }

  return (
    <section className="relative z-10 px-4 py-16 lg:py-24">
      <BackgroundTexture variant={2} />
      <FadeIn>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-[48px] lg:leading-[1.15]">
            We Serve All <span className="text-gold">50 States</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-foreground/60">
            Select your state to learn about local diminished value and total loss laws.
          </p>

          {/* Interactive SVG Map -- visible on all screen sizes */}
          <div className="mt-10" aria-label="Interactive US map">
            <InteractiveUSAMap />
          </div>

          {/* Mobile dropdown -- below map, only on small screens */}
          <div className="mt-6 flex flex-col items-center gap-3 md:hidden">
            <p className="text-xs text-foreground/40 font-medium">Or pick from the list</p>
            <div className="relative w-full max-w-xs">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/60" />
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gold bg-black/20 py-3 pl-10 pr-4 text-sm text-gold focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
                aria-label="Select your state"
              >
                <option value="">Select Your State</option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleGo}
              disabled={!selectedState}
              className="rounded-lg bg-gold px-6 py-2.5 text-sm font-bold text-dvhive-bg transition-all hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              View State Info
            </button>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
