"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { FadeIn } from "@/components/fade-in"
import { BackgroundTexture } from "@/components/background-texture"
import { MapPin, Loader2, ChevronDown } from "lucide-react"

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
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
  "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
]

function toSlug(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-")
}

// Custom Branded Dropdown Component
function StateSelect({
  value,
  options,
  onChange,
}: {
  value: string
  options: string[]
  onChange: (val: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    // Added z-[100] here to ensure the parent container doesn't trap the dropdown
    <div className="relative z-[100] w-full max-w-xs text-left" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex w-full items-center justify-between rounded-lg border border-gold bg-black/20 py-3 pl-10 pr-4 text-sm transition-all focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
        aria-label="Select your state"
      >
        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/60" />
        <span className={`block truncate ${value ? "text-gold font-medium" : "text-gold/60"}`}>
          {value || "Select Your State"}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-gold/60 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            // Increased to z-[100] for maximum priority
            className="absolute z-[100] mt-2 max-h-60 w-full overflow-y-auto rounded-lg border border-gold/30 bg-[#121212] p-1.5 shadow-xl shadow-black/50 ring-1 ring-black/20"
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt)
                  setIsOpen(false)
                }}
                className={`flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors ${value === opt
                    ? "bg-gold/20 font-bold text-gold"
                    : "text-foreground/80 hover:bg-gold/10 hover:text-gold"
                  }`}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
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
    // Bumped relative z-index from z-10 to z-20 to sit above subsequent sections
    <section className="relative z-20 px-4 py-16 lg:py-24">
      <BackgroundTexture variant={2} />
      <FadeIn>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-[48px] lg:leading-[1.15]">
            We Serve All <span className="text-gold">50 States</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-foreground/60">
          Select your state to learn about local <strong>auto diminished value laws</strong> and <strong>total loss appraisal clause</strong> guidelines specific to your jurisdiction.
          </p>

          {/* Interactive SVG Map -- visible on all screen sizes */}
          <div className="mt-10" aria-label="Interactive US map">
            <InteractiveUSAMap />
          </div>

          {/* Custom Branded Dropdown -- visible on all screen sizes */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-xs font-medium text-foreground/40">Or pick from the list</p>

            <StateSelect
              value={selectedState}
              options={states}
              onChange={setSelectedState}
            />

            <button
              onClick={handleGo}
              disabled={!selectedState}
              className="mt-2 rounded-lg bg-gold px-6 py-2.5 text-sm font-bold text-dvhive-bg transition-all hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              View State Info
            </button>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}