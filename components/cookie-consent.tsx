"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, ChevronDown, ChevronUp } from "lucide-react"

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

interface Preferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [prefs, setPrefs] = useState<Preferences>({
    essential: true,
    analytics: false,
    marketing: false,
  })

  // Function to update Google Consent Mode v2 live
  const updateGoogleConsent = (preferences: Preferences) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: preferences.analytics ? "granted" : "denied",
        ad_storage: preferences.marketing ? "granted" : "denied",
        ad_user_data: preferences.marketing ? "granted" : "denied",
        ad_personalization: preferences.marketing ? "granted" : "denied",
      })
    }
  }

  useEffect(() => {
    const match = document.cookie.match(/dvhive-cookie-consent=([^;]+)/)
    if (!match) {
      const timer = setTimeout(() => setVisible(true), 2000)
      return () => clearTimeout(timer)
    } else {
      // If cookie exists on load, apply the saved preferences to Google Consent Mode immediately
      try {
        const saved = JSON.parse(decodeURIComponent(match[1]))
        updateGoogleConsent({ essential: true, analytics: !!saved.analytics, marketing: !!saved.marketing })
      } catch {
        // ignore parse errors
      }
    }
  }, [])

  // Listen for reopen events from the Cookie Policy page
  useEffect(() => {
    function handleOpenEvent() {
      const match = document.cookie.match(/dvhive-cookie-consent=([^;]+)/)
      if (match) {
        try {
          const saved = JSON.parse(decodeURIComponent(match[1]))
          setPrefs({ essential: true, analytics: !!saved.analytics, marketing: !!saved.marketing })
        } catch {
          // ignore parse errors
        }
      }
      setShowCustomize(true)
      setVisible(true)
    }

    window.addEventListener("dvhive:open-cookie-consent", handleOpenEvent)
    return () => window.removeEventListener("dvhive:open-cookie-consent", handleOpenEvent)
  }, [])

  function savePreferences(overrides?: Partial<Preferences>) {
    const final = { ...prefs, ...overrides }
    document.cookie = `dvhive-cookie-consent=${JSON.stringify(final)}; max-age=31536000; path=/`
    
    // Update live tools without requiring a page refresh
    updateGoogleConsent(final)
    window.dispatchEvent(new CustomEvent("dvhive:cookie-consent-updated", { detail: final }))
    
    setVisible(false)
  }

  function acceptAll() {
    savePreferences({ analytics: true, marketing: true })
  }

  function rejectAll() {
    savePreferences({ analytics: false, marketing: false })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          className="fixed bottom-16 md:bottom-4 left-4 right-4 z-[60] mx-auto max-w-lg glass rounded-xl p-4"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="flex items-start gap-3">
            <Cookie className="h-5 w-5 text-gold shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-foreground/80 leading-relaxed">
                We use cookies to enhance your browsing experience and analyze site traffic. By clicking
                &quot;Accept All&quot;, you consent to our use of cookies.
              </p>

              {/* Main buttons */}
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={acceptAll}
                  className="rounded-md bg-gold px-4 py-1.5 text-xs font-bold text-dvhive-bg hover:bg-gold/90 transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={rejectAll}
                  className="rounded-md border border-border px-4 py-1.5 text-xs font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={() => setShowCustomize(!showCustomize)}
                  className="inline-flex items-center gap-1 rounded-md border border-border px-4 py-1.5 text-xs font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Customize
                  {showCustomize ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>
              </div>

              {/* Customize panel */}
              <AnimatePresence>
                {showCustomize && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-3 border-t border-border pt-4">
                      {/* Essential - locked */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-foreground/80">Essential</p>
                          <p className="text-[10px] text-foreground/40">Required for the site to function</p>
                        </div>
                        <div className="relative">
                          <div className="h-5 w-9 rounded-full bg-gold/30 cursor-not-allowed">
                            <div className="absolute top-0.5 left-[18px] h-4 w-4 rounded-full bg-gold transition-all" />
                          </div>
                        </div>
                      </div>

                      {/* Analytics */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-foreground/80">Analytics</p>
                          <p className="text-[10px] text-foreground/40">Help us understand how you use the site</p>
                        </div>
                        <button
                          onClick={() => setPrefs((p) => ({ ...p, analytics: !p.analytics }))}
                          className="relative h-5 w-9 rounded-full transition-colors"
                          style={{ backgroundColor: prefs.analytics ? "rgba(245, 207, 96, 0.3)" : "rgba(255,255,255,0.1)" }}
                          role="switch"
                          aria-checked={prefs.analytics}
                          aria-label="Toggle analytics cookies"
                        >
                          <div
                            className={`absolute top-0.5 h-4 w-4 rounded-full transition-all ${
                              prefs.analytics ? "left-[18px] bg-gold" : "left-0.5 bg-foreground/40"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Marketing */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-foreground/80">Marketing</p>
                          <p className="text-[10px] text-foreground/40">Personalized ads and content</p>
                        </div>
                        <button
                          onClick={() => setPrefs((p) => ({ ...p, marketing: !p.marketing }))}
                          className="relative h-5 w-9 rounded-full transition-colors"
                          style={{ backgroundColor: prefs.marketing ? "rgba(245, 207, 96, 0.3)" : "rgba(255,255,255,0.1)" }}
                          role="switch"
                          aria-checked={prefs.marketing}
                          aria-label="Toggle marketing cookies"
                        >
                          <div
                            className={`absolute top-0.5 h-4 w-4 rounded-full transition-all ${
                              prefs.marketing ? "left-[18px] bg-gold" : "left-0.5 bg-foreground/40"
                            }`}
                          />
                        </button>
                      </div>

                      <button
                        onClick={() => savePreferences()}
                        className="w-full rounded-md bg-gold px-4 py-1.5 text-xs font-bold text-dvhive-bg hover:bg-gold/90 transition-colors mt-2"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}