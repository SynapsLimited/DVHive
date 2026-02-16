"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { ContactForm } from "./contact-form"

interface Props {
  open: boolean
  onClose: () => void
}

export function ContactModal({ open, onClose }: Props) {
  // --- SCROLL LOCK LOGIC ---
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => { document.body.style.overflow = "unset" }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop: Global blur and darkness */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            // Use a massive z-index to stay on top of all sections
            className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Panel: Higher index than backdrop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Contact Us"
          >
            {/* The "Glass" container */}
            <div className="glass relative w-full max-w-md rounded-2xl p-6 md:p-8 shadow-2xl">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-foreground/40 hover:text-gold transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
              <h2 className="text-xl font-bold text-foreground mb-1">Contact Us</h2>
              <p className="text-sm text-foreground/50 mb-6">
                Fill out the form below and we will get back to you within 24 hours.
              </p>
              <ContactForm onSuccess={() => setTimeout(onClose, 2000)} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}