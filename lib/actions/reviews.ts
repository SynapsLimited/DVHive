"use server"

import { revalidatePath } from "next/cache"
import client from "@/lib/mongodb"
import fbReviews from "@/lib/data/dvhive-facebook-reviews.json"
import tpReviews from "@/lib/data/dvhive-trustpilot-reviews.json"
import googleReviews from "@/lib/data/dvhive-google-reviews.json"

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

export async function getUnifiedReviews(): Promise<Review[]> {
  let allReviews: Review[] = []

  // 1. Load Local JSON Data
  const fbMapped: Review[] = fbReviews.map((r: any) => ({
    id: r.id,
    name: r.name,
    platform: "facebook",
    date: new Date(r.date).toLocaleDateString(),
    rating: r.rating,
    text: r.text,
    location: r.location,
  }))

  const tpMapped: Review[] = tpReviews.map((r: any) => ({
    id: r.id,
    name: r.name,
    platform: "trustpilot",
    date: new Date(r.date).toLocaleDateString(),
    rating: r.rating,
    text: r.text,
    location: r.location,
  }))

  const googleMapped: Review[] = googleReviews.map((r: any) => ({
    id: r.review_id,
    name: r.author_title,
    platform: "google",
    date: new Date(r.review_datetime_utc).toLocaleDateString(),
    rating: r.review_rating,
    text: r.review_text,
  }))

  allReviews = [...fbMapped, ...tpMapped, ...googleMapped]

  // 2. Fetch Website Reviews from MongoDB using the native driver
  try {
    const db = client.db("dvhive"); // Targeting your specific database
    const dbReviews = await db.collection("reviews").find({}).sort({ date: -1 }).toArray();
    
    const websiteMapped: Review[] = dbReviews.map((r: any) => ({
      id: r._id.toString(),
      name: r.name,
      platform: "website",
      date: r.date ? new Date(r.date).toLocaleDateString() : new Date().toLocaleDateString(),
      rating: r.rating,
      text: r.text,
      location: r.location,
    }))

    allReviews = [...allReviews, ...websiteMapped]
  } catch (error) {
    console.error("Failed to fetch MongoDB reviews:", error)
  }

  // 3. Sort all merged reviews by Date (Newest first)
  return allReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function submitWebsiteReview(data: { name: string; location: string; rating: number; review: string }) {
  try {
    const db = client.db("dvhive");
    
    // Insert the document directly into the reviews collection
    await db.collection("reviews").insertOne({
      name: data.name,
      location: data.location,
      rating: data.rating,
      text: data.review,
      platform: "website",
      date: new Date()
    });

    // Tell Next.js to clear the cache and instantly show the new review on the page
    revalidatePath("/testimonials", "page")

    return { success: true }
  } catch (error) {
    console.error("Failed to submit review to MongoDB:", error)
    return { success: false, error: "Failed to submit review" }
  }
}