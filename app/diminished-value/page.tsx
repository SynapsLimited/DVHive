import type { Metadata } from "next"
import { DiminishedValueContent } from "@/components/pages/diminished-value-content"

export const metadata: Metadata = {
  title: "Diminished Value Claims",
  description:
    "Your car loses value after an accident, even when fully repaired. DVHive helps you recover every dollar of diminished value from insurance companies.",
  openGraph: {
    title: "Diminished Value Claims | DVHive",
    description:
      "Recover what your car lost in value after an accident. Expert appraisals accepted by major insurers.",
  },
}

export default function DiminishedValuePage() {
  return <DiminishedValueContent />
}
