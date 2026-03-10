"use server"

import client from "@/lib/mongodb"
import nodemailer from "nodemailer"
import { put } from "@vercel/blob"

// REPLACE THIS URL with your NEW Make.com Webhook URL later for the client
const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/91i2f8ivoi1w2tq0t1fevim5kxdtv7x2"

export async function submitQuestionnaireForm(serverFormData: FormData) {
  try {

    const rawData = serverFormData.get("data") as string
    if (!rawData) throw new Error("No data provided")
    const payload = JSON.parse(rawData)

    const fileUrls: string[] = []
    
    for (const [key, value] of serverFormData.entries()) {
      if (key.startsWith("file_") && value instanceof File) {
        const blob = await put(`questionnaires/${Date.now()}-${value.name.replace(/\s+/g, '-')}`, value, {
          access: 'public', 
        })
        fileUrls.push(blob.url)
      }
    }

    payload.uploadedFiles = fileUrls
    delete payload.uploads 

    // ------------------------------------------------------------------
    // SEND TO MAKE.COM WEBHOOK (Moved up for speed!)
    // ------------------------------------------------------------------
    try {
      const makePayload = {
        ...payload,
        formType: "questionnaire", // Crucial for the Make.com Router!
        files: fileUrls, 
      }
      
      await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(makePayload),
      })
    } catch (makeError) {
      console.error("Make.com Webhook failed:", makeError)
    }

    // Save to MongoDB
    const db = client.db("dvhive")
    await db.collection("questionnaires").insertOne(payload)

    // Send Email Notification via Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Generate HTML for the file links
    const fileLinksHtml = fileUrls.length > 0 
      ? fileUrls.map(url => `<li><a href="${url}" target="_blank" style="color: #d4af37; text-decoration: none;">View Document / Image</a></li>`).join("")
      : "<li>No files uploaded</li>"

    // Map through the details object and format the keys nicely
    const detailsHtml = Object.entries(payload.details || {}).map(([key, val]) => {
      // Convert camelCase key to Title Case (e.g., "repairCost" -> "Repair Cost")
      const formattedLabel = key
        .replace(/([A-Z])/g, ' $1') // insert a space before all caps
        .replace(/^./, (str) => str.toUpperCase()) // uppercase the first character
        .trim();

      // Add a dollar sign to cost values if they exist
      const isFinancialField = ['repairCost', 'offerAmount', 'fairValue'].includes(key);
      
      // Format the display value (add commas back for readability)
      let displayValue = val || 'N/A';
      if (isFinancialField && val) {
        displayValue = `$${Number(val).toLocaleString()}`;
      }

      return `<li><strong>${formattedLabel}:</strong> ${displayValue}</li>`;
    }).join("")

    const mailOptions = {
      from: process.env.SMTP_FROM || '"DVHive Website" <noreply@yourdomain.com>',
      to: process.env.NOTIFICATION_EMAIL,
      subject: `New Questionnaire Lead: ${payload.contact?.name || 'Unknown'} - ${payload.claimType || 'Unknown'}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">New Questionnaire Submission</h2>
          <p><strong>Claim Type:</strong> ${payload.claimType}</p>
          
          <h3 style="background-color: #f5f5f5; padding: 8px; border-radius: 4px;">Contact Info</h3>
          <ul style="list-style: none; padding-left: 0;">
            <li style="margin-bottom: 5px;"><strong>Name:</strong> ${payload.contact?.name || 'N/A'}</li>
            <li style="margin-bottom: 5px;"><strong>Phone:</strong> ${payload.contact?.phone || 'N/A'}</li>
            <li style="margin-bottom: 5px;"><strong>Email:</strong> ${payload.contact?.email || 'N/A'}</li>
            <li style="margin-bottom: 5px;"><strong>Preferred Method:</strong> ${payload.contact?.preferredMethod || 'N/A'}</li>
          </ul>

          <h3 style="background-color: #f5f5f5; padding: 8px; border-radius: 4px;">Location & Accident</h3>
          <ul style="list-style: none; padding-left: 0;">
            <li style="margin-bottom: 5px;"><strong>State:</strong> ${payload.location?.state || 'N/A'}</li>
            <li style="margin-bottom: 5px;"><strong>Zip:</strong> ${payload.location?.zip || 'N/A'}</li>
            <li style="margin-bottom: 5px;"><strong>Accident Date:</strong> ${payload.accidentDate || 'N/A'}</li>
            <li style="margin-bottom: 5px;"><strong>Fault:</strong> ${payload.fault || 'N/A'}</li>
          </ul>

          <h3 style="background-color: #f5f5f5; padding: 8px; border-radius: 4px;">Vehicle Details</h3>
          <ul style="list-style: none; padding-left: 0;">
            <li style="margin-bottom: 5px;"><strong>Vehicle:</strong> ${payload.vehicle?.year || ''} ${payload.vehicle?.make || ''} ${payload.vehicle?.model || ''} ${payload.vehicle?.trim || ''}</li>
            <li style="margin-bottom: 5px;"><strong>Mileage:</strong> ${payload.vehicle?.mileage ? Number(payload.vehicle.mileage).toLocaleString() : 'N/A'}</li>
            <li style="margin-bottom: 5px;"><strong>Drivable:</strong> ${payload.vehicle?.drivable || 'N/A'}</li>
          </ul>

          <h3 style="background-color: #f5f5f5; padding: 8px; border-radius: 4px;">Claim Specifics</h3>
          <ul style="list-style: none; padding-left: 0;">
            ${detailsHtml}
          </ul>

          <h3 style="background-color: #f5f5f5; padding: 8px; border-radius: 4px;">Uploaded Documents</h3>
          <ul style="padding-left: 20px;">
            ${fileLinksHtml}
          </ul>
          
          <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;" />
          <p style="font-size: 12px; color: #888;">Submitted At: ${new Date(payload.submittedAt).toLocaleString()}</p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    return { success: true }
  } catch (error) {
    console.error("Failed to process questionnaire submission:", error)
    return { success: false, error: "Failed to submit form" }
  }
}