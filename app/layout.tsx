import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import Script from 'next/script'

import './globals.css'
import { SiteLayoutWrapper } from '@/components/site-layout-wrapper'
import { ConditionalVercelAnalytics } from '@/components/conditional-vercel-analytics' 
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

// BULLETPROOF BASE URL: Uses Vercel URL for previews, but locks in your live domain for production
const getBaseUrl = () => {
  if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'https://www.dvhive.com'
}

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DVHIVE | Certified Diminished Value & Total Loss Appraisals - Nationwide',
    description:
      'Certified auto appraisers specializing in diminished value and total loss claims across the USA. Get paid or don\'t pay.',
  },
  icons: {
    icon: '/images/dvhive-logo.ico',
    apple: '/images/dvhive-logo.ico',
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "DVHive",
    "image": `${getBaseUrl()}/opengraph-image.png`, 
    "description": "Certified auto appraisers specializing in diminished value and total loss claims across the USA. Claim-Ready Appraisal System accepted by major insurers.",
    "url": "https://www.dvhive.com",
    "telephone": "+1-888-597-3282",
    "priceRange": "$$",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "knowsAbout": [
      "Diminished Value Claims",
      "Total Loss Claims",
      "Auto Appraisals",
      "Vehicle Valuation"
    ]
  }
  
   return (
    <html lang="en" className={manrope.variable}>
      <GoogleTagManager gtmId="GTM-MSXT6R6K" />
      
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'wait_for_update': 500
              });
            `,
          }}
        />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteLayoutWrapper>
          {children}
        </SiteLayoutWrapper>
        <ConditionalVercelAnalytics />
        <GoogleAnalytics gaId="G-5CZJLZ0M38" />
      </body>
    </html>
  )
}