"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FadeInProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: "up" | "down" | "left" | "right"
}

const directionMap = {
  up: { y: 30, x: 0 },
  down: { y: -30, x: 0 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
}

export function FadeIn({ children, delay = 0, className = "", direction = "up" }: FadeInProps) {
  const offset = directionMap[direction]

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
