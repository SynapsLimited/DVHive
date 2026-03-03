import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-03-03",
  useCdn: false,
  fetch: { cache: 'no-store' } 
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  category: string
  keywords?: string[]
  mainImage: any
  content: string
}