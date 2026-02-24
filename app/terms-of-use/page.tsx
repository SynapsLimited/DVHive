import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use | DVHIVE",
  description: "Review our terms and conditions for using DVHIVE services.",
}

export default function TermsOfUsePage() {
  return (
    <main className="bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          Terms of Use
        </h1>
        <p className="text-foreground/60 text-lg mb-12">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-12 space-y-8 text-foreground/80 leading-relaxed">
          {/* Section 1: Introduction */}
          <section>
            <h2 className="text-xl font-bold text-gold mb-4">1. Introduction</h2>
            <p>
              These terms and conditions govern your use of the DVHIVE website. By accessing or using this website, 
              you agree to be bound by these terms and conditions in full. If you do not agree with any part of these 
              terms, you must not use this website.
            </p>
          </section>

          {/* Section 2: SMS Terms */}
          <section>
            <h2 className="text-xl font-bold text-gold mb-4">2. DVHIVE Message Terms & Conditions</h2>
            <p className="mb-4">
              DVHIVE provides this policy to explain the use of SMS text messaging. By opting in through our website 
              forms, you consent to receive up to four text messages related to your inquiries or service requests at 
              the phone number you provide.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                Opting in to receive text messages is not a requirement for purchasing any services or products from 
                DVHIVE. By providing your phone number and opting in, you confirm that you have the right or permission 
                to use the provided number.
              </li>
              <li>
                DVHIVE does not charge for text messaging services, but you are responsible for any fees or charges 
                your mobile provider may impose, including message and data rates.
              </li>
            </ul>
          </section>

          {/* Section 3: No Warranties */}
          <section>
            <h2 className="text-xl font-bold text-gold mb-4">3. No Warranties</h2>
            <p className="mb-4">
              This website is provided "as is," without any representations or warranties, express or implied. DVHIVE 
              makes no representations or warranties regarding the website or the information and materials provided.
            </p>
            <p className="mb-4">
              Without limiting the foregoing, DVHIVE does not warrant that:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
              <li>This website will always be available, or available at all; or</li>
              <li>The information on this website is complete, accurate, or non-misleading.</li>
            </ul>
            <p>
              Nothing on this website constitutes, or is meant to constitute, legal, financial, or medical advice of 
              any kind. If you require advice, you should consult the appropriate professional.
            </p>
          </section>

          {/* Section 4: Limitations of Liability */}
          <section>
            <h2 className="text-xl font-bold text-gold mb-4">4. Limitations of Liability</h2>
            <p className="mb-4">
              DVHIVE will not be liable to you (whether under contract, tort, or otherwise) concerning your use of 
              this website:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>For any direct losses where the website is provided free of charge;</li>
              <li>For any indirect, special, or consequential loss; or</li>
              <li>For any business losses, including loss of revenue, income, profits, anticipated savings, business relationships, reputation, or data.</li>
            </ul>
            <p className="mt-4">
              These limitations apply even if DVHIVE has been specifically advised of potential loss.
            </p>
          </section>

          {/* Section 5: Service Terms */}
          <section>
            <h2 className="text-xl font-bold text-gold mb-4">5. Service and Report Terms</h2>
            <p>
              DVHIVE does not provide legal advice. Information on the website or in any reports, appraisals, or 
              documents available for purchase does not constitute legal advice. All reports are provided "as is" based 
              on our professional opinion, experience, and training.
            </p>
          </section>

          {/* Section 6: Your Consent */}
          <section>
            <h2 className="text-xl font-bold text-gold mb-4">6. Your Consent</h2>
            <p>
              By using this website, requesting services, or conducting any business with DVHIVE, you agree to the 
              terms and conditions outlined herein. You also agree to hold DVHIVE harmless for any errors or omissions 
              arising from our professional services.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
