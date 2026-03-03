"use client"

import { usePathname } from "next/navigation"
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FloatingCTA } from '@/components/floating-cta'
import { CookieConsent } from '@/components/cookie-consent'
import { BackgroundBlobs } from '@/components/background-blobs'
import { LoadingScreen } from '@/components/loading-screen'

export function SiteLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Check if we are currently on the Sanity Studio route
  const isStudio = pathname.startsWith("/studio")

  // If we are in the studio, ONLY render the children (the Sanity UI)
  if (isStudio) {
    return <main id="main-content">{children}</main>
  }

  // Otherwise, render the full website layout
  return (
    <>
      <LoadingScreen />
      <BackgroundBlobs />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <FloatingCTA />
      <CookieConsent />
    </>
  )
}