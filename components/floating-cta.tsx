"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, ClipboardList, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { ContactModal } from "./contact-modal"

export function FloatingCTA() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
      {/* Desktop: Bottom-Right floating */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50 hidden md:flex flex-col gap-3"
      >
        <a
          href="tel:888-597-3282"
          className="group flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-dvhive-bg shadow-lg shadow-gold/20 transition-all hover:scale-105 hover:shadow-gold/30"
          aria-label="Call DVHive at 888-597-3282"
        >
          <Phone className="h-4 w-4 transition-transform group-hover:rotate-12" />
          Call Now
        </a>
        <Link
          href="/questionnaire"
          className="group flex items-center gap-2 rounded-full glass-light px-5 py-3 text-sm font-bold text-gold transition-all hover:scale-105 hover:bg-gold/10"
          aria-label="Get a free estimate"
        >
          <ClipboardList className="h-4 w-4" />
          Free Estimate
        </Link>
        <button
          onClick={() => setContactOpen(true)}
          className="group flex items-center gap-2 rounded-full glass-light px-5 py-3 text-sm font-bold text-gold transition-all hover:scale-105 hover:bg-gold/10"
          aria-label="Contact us"
        >
          <MessageCircle className="h-4 w-4" />
          Contact Us
        </button>
      </motion.div>

      {/* Mobile: Fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden glass border-t border-gold/10">
        <a
          href="tel:888-597-3282"
          className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-bold text-dvhive-bg bg-gold"
          aria-label="Call DVHive at 888-597-3282"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>
        <Link
          href="/questionnaire"
          className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-bold text-gold border-r border-gold/10"
          aria-label="Get a free estimate"
        >
          <ClipboardList className="h-4 w-4" />
          Estimate
        </Link>
        <button
          onClick={() => setContactOpen(true)}
          className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-bold text-gold"
          aria-label="Contact us"
        >
          <MessageCircle className="h-4 w-4" />
          Contact
        </button>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}
