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

    // Send Email Notifications via Nodemailer
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

    // --- A. Email to Admin ---
    const adminMailOptions = {
      from: process.env.SMTP_FROM || '"DVHive Website" <noreply@dvhive.com>',
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

const emailPromises: Promise<any>[] = [transporter.sendMail(adminMailOptions)];


    // --- B. Auto-responder to User ---
    if (payload.contact?.email) {
      const userMailOptions = {
        from: process.env.SMTP_FROM || '"DVHive" <noreply@dvhive.com>',
        to: payload.contact.email,
        subject: "Estimate Request Received - DVHive",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
            <h2 style="color: #d4af37;">We've Received Your Request!</h2>
            <p>Hi ${payload.contact.name || 'there'},</p>
            <p>Thank you for submitting your estimate request to DVHive. This email is to confirm that we have successfully received your information.</p>
            <p>One of our certified auto appraisers is reviewing your case and will be in touch with you shortly (typically within 24 hours).</p>
            <p>In the meantime, here are a few resources you might find helpful:</p>
            <ul>
              <li style="margin-bottom: 10px;"><a href="https://www.dvhive.com/blog" style="color: #d4af37; font-weight: bold; text-decoration: none;">Explore our Blog</a> for expert tips and guides on maximizing your claim.</li>
              <li><a href="https://www.dvhive.com" style="color: #d4af37; font-weight: bold; text-decoration: none;">Visit our Homepage</a> to view our interactive state map and learn more about local regulations.</li>
            </ul>
              <p style="margin-top: 30px;">If you need immediate assistance, please don't hesitate to call us at <a href="tel:8885973282" style="color: #d4af37; font-weight: bold; text-decoration: none;">(888) 597-3282</a> or email us at <a href="mailto:info@dvhive.com" style="color: #d4af37; font-weight: bold; text-decoration: none;">info@dvhive.com</a>.</p>            <p>Best regards,<br/><strong>The DVHive Team</strong></p>
          </div>
        `,
      }
      emailPromises.push(transporter.sendMail(userMailOptions).catch(e => console.error("Failed to send auto-reply:", e)));
    }

    await Promise.all(emailPromises);

    return { success: true }
  } catch (error) {
    console.error("Failed to process questionnaire submission:", error)
    return { success: false, error: "Failed to submit form" }
  }
}