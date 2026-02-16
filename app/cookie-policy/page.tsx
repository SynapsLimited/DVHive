import type { Metadata } from "next"
import { CookiePolicyContent } from "@/components/pages/cookie-policy-content"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "DVHive cookie policy. Understand how we use cookies to enhance your browsing experience.",
}

export default function CookiePolicyPage() {
  return <CookiePolicyContent />
}
