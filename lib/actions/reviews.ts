"use server"

export type ReviewPlatform = "google" | "facebook" | "trustpilot" | "website"

export interface Review {
  id: string | number
  name: string
  platform: ReviewPlatform
  date: string
  rating: number
  text: string
  location?: string
}

// MOCK DATA: Used as fallback and placeholder until APIs are connected
const MOCK_REVIEWS: Review[] = [
  {
    id: "t1",
    name: "Michael Thompson",
    platform: "trustpilot",
    date: "2 weeks ago",
    rating: 5,
    text: "DVHIVE recovered $8,200 in diminished value that my insurance company flat-out denied. Their appraisal was ironclad, professional, and backed by solid data.",
    location: "Miami, FL",
  },
  {
    id: "f1",
    name: "James Rodriguez",
    platform: "facebook",
    date: "3 weeks ago",
    rating: 5,
    text: "Professional, fast, and the appraisal held up perfectly in arbitration. Could not recommend DVHIVE enough. They turned a stressful situation into a win.",
    location: "Los Angeles, CA",
  },
  {
    id: "g1",
    name: "Emily Chen",
    platform: "google",
    date: "2 months ago",
    rating: 5,
    text: "I was skeptical at first, but DVHIVE delivered beyond my expectations. They recovered $6,500 in diminished value that I didn't even know I was entitled to.",
    location: "Seattle, WA",
  },
  {
    id: "w1",
    name: "Sarah K.",
    platform: "website",
    date: "1 month ago",
    rating: 5,
    text: "After my total loss, the insurance offered $14,000. DVHive's detailed appraisal proved my car was actually worth $22,000. I got every single dollar I deserved.",
    location: "Austin, TX",
  },
]

export async function getUnifiedReviews(): Promise<Review[]> {
  try {
    // INFRASTRUCTURE PLACEHOLDERS:
    // Once you have API keys, you will uncomment these and merge the arrays.

    // 1. Trustpilot API (Requires Trustpilot Business API Key)
    // const tpRes = await fetch("https://api.trustpilot.com/v1/business-units/YOUR_BU_ID/reviews", { headers: { apikey: "YOUR_KEY" }})
    // const tpData = await tpRes.json()

    // 2. Facebook Graph API (Requires Page Access Token)
    // const fbRes = await fetch("https://graph.facebook.com/v18.0/61571719678230/ratings?access_token=YOUR_TOKEN")
    // const fbData = await fbRes.json()

    // 3. Google Places API (Requires Google Cloud API Key & Place ID)
    // const googleRes = await fetch("https://maps.googleapis.com/maps/api/place/details/json?place_id=YOUR_PLACE_ID&fields=reviews&key=YOUR_KEY")
    // const googleData = await googleRes.json()

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    return MOCK_REVIEWS
  } catch (error) {
    console.error("Failed to fetch reviews:", error)
    return MOCK_REVIEWS // Fallback to mock data if APIs fail
  }
}

// Adapted to accept the state directly from your custom modal component
export async function submitWebsiteReview(data: { name: string; location: string; rating: number; review: string }) {
  // INFRASTRUCTURE: Save the submitted review to your database here (e.g., Prisma, Supabase)
  console.log("New Website Review Submitted to Backend:", data)

  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { success: true }
}