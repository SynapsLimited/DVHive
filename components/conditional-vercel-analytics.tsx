"use client"

import { Analytics } from "@vercel/analytics/next"
import { useEffect, useState } from "react"

export function ConditionalVercelAnalytics() {
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    // 1. Check existing cookie on mount
    const match = document.cookie.match(/dvhive-cookie-consent=([^;]+)/)
    if (match) {
      try {
        const saved = JSON.parse(decodeURIComponent(match[1]))
        if (saved.analytics) setHasConsent(true)
      } catch {
        // ignore errors
      }
    }

    // 2. Listen for live updates from the CookieConsent component
    const handleUpdate = (e: CustomEvent) => {
      if (e.detail?.analytics) {
        setHasConsent(true)
      } else {
        setHasConsent(false)
      }
    }

    window.addEventListener("dvhive:cookie-consent-updated", handleUpdate as EventListener)
    return () => window.removeEventListener("dvhive:cookie-consent-updated", handleUpdate as EventListener)
  }, [])

  if (!hasConsent) return null

  return <Analytics />
}