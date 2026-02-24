import type { Metadata } from "next"
import { BlogListingContent } from "@/components/pages/blog-listing-content"

export const metadata: Metadata = {
  title: "DVHIVEInsights | Blog",
  description:
    "Expert tips, auto law updates, and claims advice from DVHIVE. Learn how to maximize your diminished value and total loss insurance claims.",
  openGraph: {
    title: "DVHIVEInsights | Blog",
    description:
      "Expert tips, auto law updates, and claims advice from DVHIVE.",
  },
}

export default function BlogPage() {
  return <BlogListingContent />
}
