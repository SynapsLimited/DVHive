import type { Metadata } from "next"
import { BlogListingContent } from "@/components/pages/blog-listing-content"

export const metadata: Metadata = {
  title: "DVHive Insights | Blog",
  description:
    "Expert tips, auto law updates, and claims advice from DVHive. Learn how to maximize your diminished value and total loss insurance claims.",
  openGraph: {
    title: "DVHive Insights | Blog",
    description:
      "Expert tips, auto law updates, and claims advice from DVHive.",
  },
}

export default function BlogPage() {
  return <BlogListingContent />
}
