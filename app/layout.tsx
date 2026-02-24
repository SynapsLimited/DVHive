import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'

import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FloatingCTA } from '@/components/floating-cta'
import { CookieConsent } from '@/components/cookie-consent'
import { BackgroundBlobs } from '@/components/background-blobs'
import { LoadingScreen } from '@/components/loading-screen'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'DVHIVE| Diminished Value & Total Loss Experts',
    template: '%s | DVHive',
  },
  description:
    'Claim-Ready Appraisal System. Get your diminished value or total loss claim paid, or you don\'t pay. Certified appraisals accepted by major insurers.',
  openGraph: {
    title: 'DVHIVE| Diminished Value & Total Loss Experts',
    description:
      'Claim-Ready Appraisal System. Get your diminished value or total loss claim paid, or you don\'t pay.',
    type: 'website',
    locale: 'en_US',
    siteName: 'DVHive',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DVHIVE| Diminished Value & Total Loss Experts',
    description:
      'Claim-Ready Appraisal System. Get your diminished value or total loss claim paid, or you don\'t pay.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#1C1917',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans antialiased relative min-h-screen">
        <LoadingScreen />
        <BackgroundBlobs />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingCTA />
        <CookieConsent />
      </body>
    </html>
  )
}
