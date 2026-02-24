import type { Metadata } from "next"
import { PrivacyPolicyContent } from "@/components/pages/privacy-policy-content"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "DVHIVEprivacy policy. Learn how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />
}
