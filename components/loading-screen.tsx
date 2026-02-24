"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const DURATION = 2000
const SESSION_KEY = "dvhive_hasSeenIntro"

export function LoadingScreen() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Only show once per browser session
    if (sessionStorage.getItem(SESSION_KEY)) return

    setShow(true)
    sessionStorage.setItem(SESSION_KEY, "1")

    const timer = setTimeout(() => setShow(false), DURATION)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          aria-label="Loading"
          role="status"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/dvhive-logo.png"
              alt="DVHive"
              width={120}
              height={120}
              className="h-28 w-auto"
              priority
            />
          </motion.div>

          <div className="mt-6 flex gap-2">
            <span className="loading-dot-1 h-2 w-2 rounded-full bg-gold" />
            <span className="loading-dot-2 h-2 w-2 rounded-full bg-gold" />
            <span className="loading-dot-3 h-2 w-2 rounded-full bg-gold" />
          </div>

          <span className="sr-only">Loading DVHive</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
