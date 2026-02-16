import type { Metadata } from "next"
import { TotalLossContent } from "@/components/pages/total-loss-content"

export const metadata: Metadata = {
  title: "Total Loss Claims",
  description:
    "Insurance company totaled your car and the offer is too low? DVHive provides certified appraisals to help you get the full value you deserve.",
  openGraph: {
    title: "Total Loss Claims | DVHive",
    description:
      "Get the full value you deserve when your car is totaled. Expert appraisals accepted by major insurers.",
  },
}

export default function TotalLossPage() {
  return <TotalLossContent />
}
