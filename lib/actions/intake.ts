"use server"

import client from "@/lib/mongodb"
import nodemailer from "nodemailer"
import { put } from "@vercel/blob"

// Helper functions to safely format numbers that might already contain commas from the front-end
const safeFormatNumber = (val: any) => {
  if (!val) return 'N/A';
  const cleanNum = Number(String(val).replace(/,/g, ''));
  return isNaN(cleanNum) ? val : cleanNum.toLocaleString();
};

const safeFormatCurrency = (val: any) => {
  if (!val) return 'N/A';
  const cleanNum = Number(String(val).replace(/,/g, ''));
  return isNaN(cleanNum) ? `$${val}` : `$${cleanNum.toLocaleString()}`;
};

export async function submitIntakeForm(serverFormData: FormData) {
  try {
    // 1. Parse the main JSON data from the form
    const rawData = serverFormData.get("data") as string
    if (!rawData) throw new Error("No data provided")
    const payload = JSON.parse(rawData)

    // 2. Upload files to Vercel Blob securely on the server
    const fileUrls: string[] = []
    
    for (const [key, value] of serverFormData.entries()) {
      if (key.startsWith("file_") && value instanceof File) {
        const blob = await put(`intakes/${Date.now()}-${value.name.replace(/\s+/g, '-')}`, value, {
          access: 'public', 
        })
        fileUrls.push(blob.url)
      }
    }

    // Attach the file URLs to our payload
    payload.uploadedFiles = fileUrls

    // 3. SEND TO MAKE.COM (Server-side bypasses CORS)
    try {
      const makePayload = {
        ...payload,
        formType: "intake",
        files: fileUrls, 
      }
      
      // MAKE SURE TO REPLACE THIS URL WITH YOUR ACTUAL WEBHOOK URL
      await fetch("https://hook.eu1.make.com/YOUR_INTAKE_WEBHOOK_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(makePayload),
      })
    } catch (makeError) {
      console.error("Make.com Webhook failed:", makeError)
    }

    // 4. Save to MongoDB
    const db = client.db("dvhive")
    await db.collection("intake-forms").insertOne(payload)

    // 5. Send Email Notification via Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const formattedPhone = payload.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')

    const fileLinksHtml = fileUrls.length > 0 
      ? fileUrls.map(url => `<li style="margin-bottom: 5px;"><a href="${url}" target="_blank" style="color: #d4af37; text-decoration: none;">View Document / Image</a></li>`).join("")
      : "<li>No files uploaded</li>"

    const mailOptions = {
      from: process.env.SMTP_FROM || '"DVHive Website" <noreply@yourdomain.com>',
      to: process.env.NOTIFICATION_EMAIL,
      subject: `New Intake Form: ${payload.fullName} - ${payload.claimType}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">New Intake Submission</h2>
          
          <h3 style="background-color: #f5f5f5; padding: 8px; border-radius: 4px;">Contact Info</h3>
          <ul style="list-style: none; padding-left: 0;">
            <li style="margin-bottom: 5px;"><strong>Name:</strong> ${payload.fullName}</li>
            <li style="margin-bottom: 5px;"><strong>Phone:</strong> <a href="tel:${payload.phone}" style="color: #d4af37;">${formattedPhone}</a></li>
            <li style="margin-bottom: 5px;"><strong>Email:</strong> <a href="mailto:${payload.email}" style="color: #d4af37;">${payload.email}</a></li>
          </ul>

          <h3 style="background-color: #f5f5f5; padding: 8px; border-radius: 4px;">Vehicle Details</h3>
          <ul style="list-style: none; padding-left: 0;">
            <li style="margin-bottom: 5px;"><strong>Claim Type:</strong> ${payload.claimType}</li>
            <li style="margin-bottom: 5px;"><strong>VIN:</strong> ${payload.vin}</li>
            <li style="margin-bottom: 5px;"><strong>Vehicle:</strong> ${payload.year} ${payload.make} ${payload.model} ${payload.trim || ''}</li>
            <li style="margin-bottom: 5px;"><strong>Mileage:</strong> ${safeFormatNumber(payload.mileage)}</li>
          </ul>

          <h3 style="background-color: #f5f5f5; padding: 8px; border-radius: 4px;">Accident Details</h3>
          <ul style="list-style: none; padding-left: 0;">
            <li style="margin-bottom: 5px;"><strong>Date:</strong> ${payload.accidentDate}</li>
            <li style="margin-bottom: 5px;"><strong>State:</strong> ${payload.state}</li>
            <li style="margin-bottom: 5px;"><strong>Repair Cost:</strong> ${safeFormatCurrency(payload.repairCosts)}</li>
            <li style="margin-bottom: 5px;"><strong>Prior Accidents:</strong> ${payload.priorAccidents}</li>
            ${payload.priorAccidents === 'Yes' ? `<li style="margin-bottom: 5px;"><strong>Prior Repair Cost:</strong> ${safeFormatCurrency(payload.priorRepairCost)}</li>` : ''}
          </ul>

          <h3 style="background-color: #f5f5f5; padding: 8px; border-radius: 4px;">Insurance & Additional Info</h3>
          <ul style="list-style: none; padding-left: 0;">
            <li style="margin-bottom: 5px;"><strong>Leased Vehicle:</strong> ${payload.leasing || 'N/A'}</li>
            <li style="margin-bottom: 5px;"><strong>Your Insurance:</strong> ${payload.yourInsurance || 'N/A'}</li>
            <li style="margin-bottom: 5px;"><strong>At-Fault Insurance:</strong> ${payload.faultInsurance || 'N/A'}</li>
          </ul>

          ${payload.additionalInfo ? `
            <div style="background-color: #fafafa; padding: 15px; border-left: 4px solid #d4af37; margin-top: 15px; white-space: pre-wrap; font-style: italic;">
              <strong>Additional Info:</strong><br/>
              ${payload.additionalInfo}
            </div>
          ` : ''}

          <h3 style="background-color: #f5f5f5; padding: 8px; border-radius: 4px; margin-top: 20px;">Uploaded Documents</h3>
          <ul style="list-style: none; padding-left: 0;">
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
    console.error("Failed to process intake form submission:", error)
    return { success: false, error: "Failed to submit form" }
  }
}