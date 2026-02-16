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
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop: High Z-Index and full coverage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Panel: Higher Z-Index than backdrop */}
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
            <div className="glass relative w-full max-w-md rounded-2xl p-6 md:p-8">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
              <h2 className="text-xl font-bold text-white mb-1">Contact Us</h2>
              <p className="text-sm text-white/50 mb-6">
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