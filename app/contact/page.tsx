import type { Metadata } from "next"
import { ContactPageContent } from "@/components/pages/contact-content"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with DVHive. Call (888) 597-3282 or send us a message for a free diminished value or total loss consultation.",
  openGraph: {
    title: "Contact Us | DVHive",
    description:
      "Get in touch with DVHive. Call (888) 597-3282 or send us a message for a free consultation.",
  },
}

export default function ContactPage() {
  return <ContactPageContent />
}
