"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { ContactForm } from "./contact-form"

interface Props {
  open: boolean
  onClose: () => void
}

export function ContactModal({ open, onClose }: Props) {
  // We need to wait for the component to mount before we can access 'document.body'
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // --- SCROLL LOCK LOGIC ---
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  // Don't render anything on the server or before mounting
  if (!mounted) return null

  // createPortal moves this JSX outside of the parent hierarchy and into the body
  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop: Global blur and darkness */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            // High z-index here now works relative to the whole document
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
            <div className="glass relative w-full max-w-md rounded-2xl p-6 md:p-8 shadow-2xl bg-dvhive-bg/90 border border-white/10">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-foreground/40 hover:text-gold transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
              <h2 className="text-xl font-bold text-foreground mb-1">
                Contact Us to Help with your Appraisal
              </h2>
              <p className="text-sm text-foreground/50 mb-6">
                Fill out the form below and we will get back to you within 24
                hours.
              </p>
              {/* The Call Now button inside ContactForm automatically renders here */}
              <ContactForm onSuccess={() => setTimeout(onClose, 2000)} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body // This is the target container for the portal
  )
}