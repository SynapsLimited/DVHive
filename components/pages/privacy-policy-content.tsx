import { FadeIn } from "@/components/fade-in"

export function PrivacyPolicyContent() {
  return (
    <section className="relative z-10 px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Hero */}
        <FadeIn>
          <div className="mb-12 text-center">
            <h1 className="text-balance text-3xl font-extrabold text-foreground md:text-4xl lg:text-[48px] lg:leading-[1.15]">
              Privacy <span className="text-gold">Policy</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-[#F2F2F2]/60">
              Last updated: February 12, 2026
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="space-y-10">

            <div>
              <h2 className="mb-4 text-xl font-bold text-foreground">Information Collection</h2>
              <p className="text-[#F2F2F2]/70 leading-relaxed">
                DVHive collects personal information that you voluntarily provide when using our services, including but not limited to your name, email address, phone number, vehicle information, and accident details. We may also collect information automatically through cookies and similar tracking technologies, including your IP address, browser type, operating system, referring URLs, and browsing behavior on our website.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-bold text-foreground">Data Usage</h2>
              <p className="text-[#F2F2F2]/70 leading-relaxed">
                We use the information we collect to process your diminished value or total loss claims, communicate with you regarding your case, improve our services and website experience, send you relevant updates and marketing communications (with your consent), comply with legal obligations, and protect against fraudulent or unauthorized activity. We do not sell your personal information to third parties.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-bold text-foreground">Data Sharing</h2>
              <p className="text-[#F2F2F2]/70 leading-relaxed">
                We may share your information with trusted service providers who assist us in operating our business, such as payment processors, cloud hosting providers, and analytics platforms. We may also disclose your information when required by law, court order, or governmental regulation, or when necessary to protect our rights, property, or safety. Any third-party service providers are contractually obligated to protect your information and use it only for the purposes we specify.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-bold text-foreground">Data Security</h2>
              <p className="text-[#F2F2F2]/70 leading-relaxed">
                We implement industry-standard security measures to protect your personal information, including encryption of data in transit and at rest, secure server infrastructure, access controls, and regular security audits. While no method of electronic transmission or storage is 100% secure, we strive to use commercially acceptable means to protect your personal data.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-bold text-foreground">Your Rights</h2>
              <p className="text-[#F2F2F2]/70 leading-relaxed">
                Depending on your jurisdiction, you may have the right to access, correct, delete, or port your personal data. You may also have the right to opt out of certain data processing activities, including direct marketing communications. To exercise any of these rights, please contact us at support@dvhive.com. We will respond to your request within 30 days.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-bold text-foreground">Cookies</h2>
              <p className="text-[#F2F2F2]/70 leading-relaxed">
                Our website uses cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences through your browser settings or by using the cookie preference controls available on our website. For more detailed information about how we use cookies, please refer to our Cookie Policy.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-bold text-foreground">Children&apos;s Privacy</h2>
              <p className="text-[#F2F2F2]/70 leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child under 18, we will take steps to delete that information promptly.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-bold text-foreground">Changes to This Policy</h2>
              <p className="text-[#F2F2F2]/70 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. We will notify you of any material changes by posting the updated policy on our website with a revised &quot;Last updated&quot; date. Your continued use of our services after any changes indicates your acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-bold text-foreground">Contact Us</h2>
              <p className="text-[#F2F2F2]/70 leading-relaxed">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us at support@dvhive.com or call us at (888) 597-3282. You may also write to us at the address provided on our Contact page.
              </p>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  )
}
