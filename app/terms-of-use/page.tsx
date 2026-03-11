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
            <div className="space-y-4">
              <p>
                <strong>SMS Consent Communication:</strong> The information (phone numbers) obtained as part of the SMS consent process will not be shared with third parties or affiliates for marketing purposes.
              </p>
              <p>
                <strong>Types of SMS Communications:</strong> If you have consented to receive text messages from DVHIVE, you may receive messages related to claim updates, follow-up messages, appointment reminders, and billing inquiries. <em>Example: "Hello, this is a friendly reminder regarding your active claim with DVHIVE. You can reply STOP to opt out of SMS messaging from DVHIVE at any time."</em>
              </p>
              <p>
                <strong>Message Frequency:</strong> Message frequency may vary depending on the type of communication. You may receive up to 4 SMS messages per week regarding your inquiries, account status, or claim progress.
              </p>
              <p>
                <strong>Potential Fees for SMS Messaging:</strong> DVHIVE does not charge for text messaging services, but please note that standard message and data rates may apply, depending on your carrier’s pricing plan. These fees may vary if the message is sent domestically or internationally.
              </p>
              <p>
                <strong>Opt-In Method:</strong> You may opt-in to receive SMS messages from DVHIVE by submitting an online form on our website and checking the designated SMS consent box. Opting in is not a requirement for purchasing any services or products from DVHIVE. By opting in, you confirm that you have the right or permission to use the provided number.
              </p>
              <p>
                <strong>Opt-Out Method:</strong> You can opt out of receiving SMS messages at any time. To do so, simply reply "STOP" to any SMS message you receive. Alternatively, you can contact us directly to request removal from our messaging list. If you do not wish to receive SMS messages, you can choose not to check the SMS consent box on our forms.
              </p>
              <p>
                <strong>Help & Support:</strong> If you are experiencing any issues, you can reply with the keyword "HELP". For further assistance, contact us directly at info@dvhive.com.
              </p>
            </div>
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