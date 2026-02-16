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

// HELPER: Use Vercel URL in preview, otherwise use your live domain
const getBaseUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'https://www.dvhive.com';
};

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: 'DVHive | Diminished Value & Total Loss Experts',
    template: '%s | DVHive',
  },
  description:
    "Claim-Ready Appraisal System. Get your diminished value or total loss claim paid, or you don't pay. Certified appraisals accepted by major insurers.",
  keywords: ['diminished value', 'total loss appraisal', 'car insurance claim', 'DVHive'],
  authors: [{ name: 'DVHive Team' }],
  openGraph: {
    title: 'DVHive | Diminished Value & Total Loss Experts',
    description:
      "Claim-Ready Appraisal System. Get your diminished value or total loss claim paid, or you don't pay.",
    siteName: 'DVHive',
    locale: 'en_US',
    type: 'website',
    // Explicitly listing images ensures they override any defaults
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DVHive Claim-Ready Appraisals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DVHive | Diminished Value & Total Loss Experts',
    description:
      "Claim-Ready Appraisal System. Get your diminished value or total loss claim paid, or you don't pay.",
    images: ['/twitter-image.jpg'], // Explicitly point to the twitter version
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#140303',
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