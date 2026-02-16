import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getStateBySlug, getAllStateSlugs } from "@/lib/state-data"
import { StateContent } from "@/components/pages/state-content"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllStateSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const state = getStateBySlug(slug)

  if (!state) {
    return { title: "State Not Found" }
  }

  return {
    title: `${state.name} Diminished Value Laws & Appraisals`,
    description: `Learn about ${state.name} diminished value and total loss claim laws. Statute of limitations: ${state.statuteOfLimitations} years. Average payout: $${state.averagePayout.toLocaleString()}. Free certified appraisals by DVHive.`,
    openGraph: {
      title: `${state.name} Diminished Value Laws & Appraisals | DVHive`,
      description: `Recover the hidden value of your vehicle in ${state.name}. Certified appraisals compliant with ${state.name} insurance laws.`,
    },
  }
}

export default async function StatePage({ params }: PageProps) {
  const { slug } = await params
  const state = getStateBySlug(slug)

  if (!state) {
    notFound()
  }

  return <StateContent state={state} />
}
