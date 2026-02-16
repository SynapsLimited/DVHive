"use client"

import { FadeIn } from "@/components/fade-in"
import { Settings } from "lucide-react"

export function CookiePolicyContent() {
  function openCookiePreferences() {
    window.dispatchEvent(new CustomEvent("dvhive:open-cookie-consent"))
  }

  return (
    <section className="relative z-10 px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Hero */}
        <FadeIn>
          <div className="mb-12 text-center">
            <h1 className="text-balance text-3xl font-extrabold text-foreground md:text-4xl lg:text-[48px] lg:leading-[1.15]">
              Cookie <span className="text-gold">Policy</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-[#F2F2F2]/60">
              Last updated: February 12, 2026
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="space-y-10">

            <div>
              <h2 className="mb-4 text-xl font-bold text-foreground">What Are Cookies?</h2>
              <p className="text-[#F2F2F2]/70 leading-relaxed">
                Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, provide information to the site owners, and enhance the user experience. Cookies can be &quot;persistent&quot; (remaining on your device until they expire or are deleted) or &quot;session-based&quot; (deleted when you close your browser).
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-bold text-foreground">Essential Cookies</h2>
              <p className="text-[#F2F2F2]/70 leading-relaxed">
                These cookies are strictly necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt out of essential cookies as the website cannot operate without them. Examples include session cookies that keep you logged in, cookies that remember your cookie consent preferences, and security cookies that prevent fraudulent activity.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-bold text-foreground">Analytics Cookies</h2>
              <p className="text-[#F2F2F2]/70 leading-relaxed">
                Analytics cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This data allows us to improve the structure, content, and performance of our site. We use these cookies to track page views, bounce rates, average session duration, and user navigation patterns. Analytics cookies do not collect information that personally identifies you.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-bold text-foreground">Marketing Cookies</h2>
              <p className="text-[#F2F2F2]/70 leading-relaxed">
                Marketing cookies are used to track visitors across websites with the purpose of displaying relevant advertisements. These cookies may be set by us or by third-party advertising partners. They build a profile of your interests and show you relevant ads on other sites. If you do not allow these cookies, you will still see advertisements, but they will be less relevant to your interests.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-bold text-foreground">Managing Your Preferences</h2>
              <p className="text-[#F2F2F2]/70 leading-relaxed">
                You can manage your cookie preferences at any time. Most web browsers allow you to control cookies through their settings. You can set your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you disable essential cookies, some parts of the website may not function properly. You can also use the button below to manage your cookie preferences for this website specifically.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-bold text-foreground">Third-Party Cookies</h2>
              <p className="text-[#F2F2F2]/70 leading-relaxed">
                Some cookies on our website are set by third-party services that appear on our pages. We do not control the dissemination of these cookies. You can check the relevant third-party website for more information about these cookies and how to manage them. Third-party services we may use include Google Analytics, social media platforms, and advertising networks.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-bold text-foreground">Changes to This Policy</h2>
              <p className="text-[#F2F2F2]/70 leading-relaxed">
                We may update this Cookie Policy periodically to reflect changes in the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this page regularly to stay informed about our use of cookies and related technologies. The &quot;Last updated&quot; date at the top of this page indicates when this policy was last revised.
              </p>
            </div>

          </div>
        </FadeIn>

        {/* Manage Preferences Button */}
        <FadeIn delay={0.2}>
          <div className="mt-14 flex justify-center">
            <button
              onClick={openCookiePreferences}
              className="group inline-flex items-center gap-2.5 rounded-lg bg-gold px-6 py-3 text-sm font-bold text-dvhive-bg transition-all hover:bg-gold/90"
            >
              <Settings className="h-4 w-4 transition-transform group-hover:rotate-90 duration-300" />
              Manage Cookie Preferences
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
