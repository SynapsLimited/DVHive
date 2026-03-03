import type { MetadataRoute } from 'next'
import { getAllStateSlugs } from '@/lib/state-data'
import { client } from '@/lib/sanity' // Added Sanity client import

const BASE_URL = 'https://www.dvhive.com'

// Note: This must be an async function now so we can fetch from Sanity
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/diminished-value`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/total-loss`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/questionnaire`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/intake-form`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/testimonials`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/cookie-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms-of-use`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const statePages: MetadataRoute.Sitemap = getAllStateSlugs().map((slug) => ({
    url: `${BASE_URL}/states/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Fetch dynamic blog posts from Sanity
  const sanityPosts = await client.fetch(`*[_type == "post"]{ 
    "slug": slug.current, 
    _updatedAt,
    publishedAt
  }`)

  const blogPages: MetadataRoute.Sitemap = sanityPosts.map((post: { slug: string, _updatedAt: string, publishedAt: string }) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    // Prioritize the actual last updated time from Sanity for better SEO crawling
    lastModified: new Date(post._updatedAt || post.publishedAt || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...statePages, ...blogPages]
}