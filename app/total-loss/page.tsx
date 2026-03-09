import type { Metadata } from "next"
import { TotalLossContent } from "@/components/pages/total-loss-content"

export const metadata: Metadata = {
  title: "Total Loss Auto Valuations & Disputes | DVHIVE",
  description:
    "Is your insurance company's total loss offer too low? DVHIVE provides independent certified auto appraisals to invoke the appraisal clause and prove your car's true fair market value.",
  keywords: [
    "total loss dispute", 
    "appraisal clause representation", 
    "independent total loss auto valuations", 
    "fair market value car",
    "total loss appraisal"
  ],
  openGraph: {
    title: "Total Loss Disputes & Valuations | DVHIVE",
    description:
      "Get the full value you deserve when your car is totaled. Fight lowball insurance offers with a certified total loss appraisal.",
    url: "https://dvhive.com/total-loss", // Make sure this matches your final production domain!
    type: "website",
    siteName: "DVHIVE",
  },
}

export default function TotalLossPage() {
  return <TotalLossContent />
}