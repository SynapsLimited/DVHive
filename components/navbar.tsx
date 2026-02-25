"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Phone, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { href: "/", label: "DVHive" },
  { href: "/diminished-value", label: "Diminished Value" },
  { href: "/total-loss", label: "Total Loss" },
  { href: "/pricing", label: "Pricing" },
  { href: "/questionnaire", label: "Questionnaire" },
  { href: "/contact", label: "Contact" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2"
          aria-label="DVHIVE Home"
        >
          <Image
            src="/images/dvhive-logo.png"
            alt="DVHive - Diminished Value & Total Loss Experts Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain drop-shadow-[0_0_12px_#f59e0b99] transition-all duration-300 group-hover:drop-shadow-[0_0_16px_#f59e0bbb]"
            style={{ width: "40px", height: "40px" }}
            priority
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight text-foreground">DVHIVE</span>
            <span className="text-[10px] font-normal leading-tight text-foreground/60">Diminished value experts</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.slice(1).map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="tel:+1 (888)597-3282"
          className="hidden lg:inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-2.5 text-sm font-bold text-dvhive-bg transition-all hover:bg-gold/90 shadow-lg"
          aria-label="Call DVHIVE at +1 (888)597-3282"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-foreground p-2"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass overflow-hidden"
          >
            <ul className="flex flex-col px-4 pb-4 gap-1">
              {navLinks.slice(1).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-gold hover:bg-gold/5 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="tel:888-597-3282"
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-dvhive-bg bg-gold hover:bg-gold/90 transition-colors mt-2 shadow-lg"
                  aria-label="Call DVHIVE at 888-597-3282"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}