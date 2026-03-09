"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, ArrowRight, ShieldCheck, Building2, MessageCircle, ClipboardList } from "lucide-react"
import { motion } from "framer-motion"
import { ContactModal } from "@/components/contact-modal"

// Allow TypeScript to recognize the global dataLayer array
declare global {
  interface Window {
    dataLayer?: any[];
  }
}

export function HeroSection() {
  const [contactOpen, setContactOpen] = useState(false)

  // --- GOOGLE TAG MANAGER DATALAYER PUSH ---
  const handleCallClick = () => {
    if (typeof window !== "undefined") {
      const win = window as any;
      win.dataLayer = win.dataLayer || []
      win.dataLayer.push({
        event: "website_calls"
      })
    }
  }

  return (
    <section className="relative z-10 overflow-hidden px-4 pt-10 pb-16 lg:pt-16 lg:pb-24">
      
      <motion.div
        className="pointer-events-none absolute -inset-y-[25%] inset-x-0 z-0 opacity-40 blur-[4px] [mask-image:linear-gradient(to_bottom,black_0%,black_40%,transparent_80%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_40%,transparent_80%)]"
        aria-hidden="true"
      >
        <Image
          src="/images/car-crash.png"
          alt="Car crash background representing diminished value and total loss claims"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="mb-4 md:mb-6 flex flex-nowrap items-center justify-center gap-1.5 md:gap-3">
            <span className="inline-flex items-center gap-1 md:gap-1.5 rounded-full border border-gold/20 bg-gold/5 px-2 py-1 md:px-3 md:py-1 text-[10px] md:text-xs font-semibold text-gold whitespace-nowrap">
              <ShieldCheck className="h-3 w-3 md:h-3.5 md:w-3.5" />
              Certified Auto Appraisers
            </span>
            <span className="inline-flex items-center gap-1 md:gap-1.5 rounded-full border border-gold/20 bg-gold/5 px-2 py-1 md:px-3 md:py-1 text-[10px] md:text-xs font-semibold text-gold whitespace-nowrap">
              <Building2 className="h-3 w-3 md:h-3.5 md:w-3.5" />
              Accepted by Major Insurers
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-[56px]"
        >
          Claim-Ready Appraisal System
          <span className="inline-block align-top text-base font-bold text-gold leading-none ml-0.5">
            &trade;
          </span>
          <br />
          <span className="text-gold">Get Paid or Don&apos;t Pay.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-4 md:mt-6 max-w-3xl text-md leading-snug text-yellow-50/95 md:text-xl md:leading-relaxed"
        >
          Didn’t cause the accident but still paying the price? <br className="hidden md:block" />
          Our certified auto appraisers deliver independent, claim-ready vehicle appraisal reports designed to help drivers recover fair compensation from insurance companies for diminished value and total loss claims nationwide.
          {/* Hidden on mobile to make the text half the size and save vertical space */}
          <span className="hidden md:inline"> Through data-driven market analysis and defensible valuation methodology, we position you to pursue a fair and properly supported insurance settlement.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 w-full max-w-md mx-auto sm:max-w-none"
        >
          {/* --- MOBILE CTA LAYOUT --- */}
          <div className="flex sm:hidden w-full items-center justify-center gap-3">
            <a
              href="tel:888-597-3282"
              onClick={handleCallClick}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3.5 text-base font-bold text-dvhive-bg shadow-lg shadow-gold/20 transition-all active:scale-95"
              aria-label="Call DVHive at 888-597-3282"
            >
              <Phone className="h-5 w-5" />
              Call Now
            </a>
            <Link
              href="/questionnaire"
              className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-border bg-transparent transition-all active:scale-95 text-foreground hover:border-gold/30 hover:text-gold"
              aria-label="Get Free Estimate"
            >
              <ClipboardList className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setContactOpen(true)}
              className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-border bg-transparent transition-all active:scale-95 text-foreground hover:border-gold/30 hover:text-gold"
              aria-label="Contact Us"
            >
              <MessageCircle className="h-5 w-5" />
            </button>
          </div>

          {/* --- DESKTOP CTA LAYOUT --- */}
          <div className="hidden sm:flex items-center justify-center gap-4">
            <Link
              href="/questionnaire"
              className="group inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3.5 text-base font-bold text-dvhive-bg shadow-lg shadow-gold/20 transition-all hover:scale-[1.03] hover:shadow-gold/30"
            >
              Get Free Estimate
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:888-597-3282"
              onClick={handleCallClick}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3.5 text-base font-bold text-foreground transition-all hover:border-gold/30 hover:text-gold"
              aria-label="Call DVHive at 888-597-3282"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3.5 text-base font-bold text-foreground transition-all hover:border-gold/30 hover:text-gold"
            >
              <MessageCircle className="h-4 w-4" />
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  )
}