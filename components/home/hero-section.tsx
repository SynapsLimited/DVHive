"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, ArrowRight, ShieldCheck, Building2, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { ContactModal } from "@/components/contact-modal"

export function HeroSection() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <section className="relative z-10 overflow-hidden px-4 pt-20 pb-16 lg:pt-32 lg:pb-24">
      {/* 3D Art Background - Car Crash with 50% transparency */}
      <div
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-40"
        aria-hidden="true"
      >
        <div className="relative h-full w-full max-w-7xl">
          <Image
            src="/images/car-crash.png"
            alt=""
            fill
            priority
            className="object-contain drop-shadow-[0_10px_30px_rgba(245,207,96,0.2)]"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-xs font-semibold text-gold">
              <ShieldCheck className="h-3.5 w-3.5" />
              Certified & Credited
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-xs font-semibold text-gold">
              <Building2 className="h-3.5 w-3.5" />
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
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70 md:text-xl"
        >
          Did you not cause the crash, yet you are paying the price? Our expert
          appraisals recover what insurance companies owe you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/questionnaire"
            className="group inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3.5 text-base font-bold text-dvhive-bg shadow-lg shadow-gold/20 transition-all hover:scale-[1.03] hover:shadow-gold/30"
          >
            Get Free Estimate
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="tel:888-597-3282"
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
        </motion.div>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  )
}