"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, ArrowRight, ShieldCheck, Building2, MessageCircle, ClipboardList } from "lucide-react"
import { motion } from "framer-motion"
import { ContactModal } from "@/components/contact-modal"

export function HeroSection() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <section className="relative z-10 overflow-hidden px-4 pt-10 pb-16 lg:pt-16 lg:pb-24">
      
      <motion.div
        className="pointer-events-none absolute -inset-y-[25%] inset-x-0 z-0 opacity-40 blur-[4px] [mask-image:linear-gradient(to_bottom,black_0%,black_40%,transparent_80%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_40%,transparent_80%)]"
        aria-hidden="true"
      >
        <Image
          src="/images/car-crash.webp"
          alt="Car crash background representing diminished value and total loss claims"
          fill
          priority
          fetchPriority="high"
          unoptimized
          quality={50}
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
          className="mt-10 flex flex-row items-center justify-center gap-3 sm:gap-4 w-full"
        >
          {/* Call Now - Text + Icon always visible */}
          <a
            href="tel:888-597-3282"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3.5 sm:px-8 text-sm sm:text-base font-bold text-dvhive-bg shadow-lg shadow-gold/20 transition-all hover:scale-[1.03] hover:shadow-gold/30 whitespace-nowrap"
            aria-label="Call DVHive at 888-597-3282"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
          
          {/* Free Estimate - Icon only on mobile, text on sm+ */}
          <Link
            href="/questionnaire"
            className="group inline-flex items-center justify-center rounded-lg border border-border p-3.5 sm:px-8 sm:py-3.5 text-foreground transition-all hover:border-gold/30 hover:text-gold"
            title="Get Free Estimate"
          >
            <ClipboardList className="h-5 w-5 sm:hidden" />
            <span className="hidden sm:inline-flex items-center gap-2 font-bold text-sm sm:text-base">
              Get Free Estimate
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
          
          {/* Contact Us - Icon only on mobile, text on sm+ */}
          <button
            onClick={() => setContactOpen(true)}
            className="inline-flex items-center justify-center rounded-lg border border-border p-3.5 sm:px-8 sm:py-3.5 text-foreground transition-all hover:border-gold/30 hover:text-gold"
            title="Contact Us"
          >
            <MessageCircle className="h-5 w-5 sm:hidden" />
            <span className="hidden sm:inline-flex items-center gap-2 font-bold text-sm sm:text-base">
              <MessageCircle className="h-4 w-4" />
              Contact Us
            </span>
          </button>
        </motion.div>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  )
}