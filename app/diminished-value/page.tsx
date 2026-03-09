import type { Metadata } from "next"
import { DiminishedValueContent } from "@/components/pages/diminished-value-content"

export const metadata: Metadata = {
  title: "Diminished Value Appraisals | DVHIVE Certified Auto Appraisers",
  description:
    "Your car loses value after an accident, even when fully repaired. DVHIVE helps you recover every dollar of diminished value with claim-ready certified appraisal reports.",
  keywords: [
    "diminished value claim", 
    "auto diminished value appraisal", 
    "post-repair loss of value", 
    "independent auto appraiser",
    "car accident loss of value"
  ],
  openGraph: {
    title: "Diminished Value Appraisals | DVHIVE",
    description:
      "Recover what your car lost in value after an accident. Expert diminished value appraisals accepted by all major insurers.",
    url: "https://dvhive.com/diminished-value", // Make sure this matches your final production domain!
    type: "website",
    siteName: "DVHIVE",
  },
}

export default function DiminishedValuePage() {
  return <DiminishedValueContent />
}