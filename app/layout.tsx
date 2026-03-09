import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import Script from 'next/script'

import './globals.css'
import { SiteLayoutWrapper } from '@/components/site-layout-wrapper'
import { Analytics } from "@vercel/analytics/next"
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'DVHIVE | Certified Diminished Value & Total Loss Appraisals - Nationwide',
    template: '%s | DVHive',
  },
  description:
    'Certified auto appraisers specializing in diminished value and total loss claims across the USA. Get your diminished value or total loss claim paid, or you don\'t pay. Claim-Ready Appraisal System accepted by major insurers.',
  keywords: ['diminished value', 'total loss', 'certified auto appraisers', 'auto appraisers', 'diminished value in USA', 'total loss in USA', 'car appraisal', 'vehicle value loss'],
  openGraph: {
    title: 'DVHIVE | Diminished Value & Total Loss Experts',
    description:
      'Certified auto appraisers specializing in diminished value and total loss claims across the USA. Get paid or don\'t pay.',
    type: 'website',
    locale: 'en_US',
    siteName: 'DVHive',
    url: 'https://www.dvhive.com',
    images: [
      {
        url: 'https://www.dvhive.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DVHIVE - Diminished Value & Total Loss Experts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DVHIVE | Certified Diminished Value & Total Loss Appraisals - Nationwide',
    description:
      'Certified auto appraisers specializing in diminished value and total loss claims across the USA. Get paid or don\'t pay.',
    images: ['https://www.dvhive.com/images/og-image.jpg'],
  },
  icons: {
    icon: '/images/dvhive-logo.ico',
    apple: '/images/dvhive-logo.ico',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://www.dvhive.com'),
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
      {/* --- Google Tag Manager --- */}
      <GoogleTagManager gtmId="GTM-MSXT6R6K" />
      
      <head>
        {/* --- Google Ads Tag --- */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-16780787359"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16780787359');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased relative min-h-screen">
        <SiteLayoutWrapper>
          {children}
        </SiteLayoutWrapper>
        
        {/* --- Vercel Analytics --- */}
        
        <Analytics />

        {/* --- Google Analytics --- */}
        <GoogleAnalytics gaId="G-5CZJLZ0M38" />
      </body>
    </html>
  )
}