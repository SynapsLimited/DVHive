"use server"

import client from "@/lib/mongodb"
import nodemailer from "nodemailer"

// REPLACE THIS URL with your NEW Make.com Webhook URL later for the client
const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/91i2f8ivoi1w2tq0t1fevim5kxdtv7x2"

export async function submitContactForm(data: {
  name: string
  email: string
  phone: string
  message: string
}) {
  try {
    const db = client.db("dvhive")
    
    // 1. Insert the document directly into the contact-form collection
    await db.collection("contact-form").insertOne({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      formType: "contact",
      source: "Main Contact Form",
      submittedAt: new Date()
    })
    // ------------------------------------------------------------------
    // 2. SEND TO MAKE.COM WEBHOOK (Moved up!)
    // ------------------------------------------------------------------
    const makePayload = {
      ...data,
      formType: "contact", // This is the secret sauce for the Make.com Router
      source: "Main Contact Form",
      submittedAt: new Date().toISOString(),
    }

    const makeResponse = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(makePayload),
    })

    if (!makeResponse.ok) {
      console.error("Warning: Make.com webhook failed to receive contact form data")
    }

    return { success: true }
  } catch (error) {
    console.error("Failed to process contact form submission:", error)

    // 3. Setup the SMTP transporter for email notifications
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true", // true for port 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Format the phone number to (XXX) XXX-XXXX for the email readability
    const formattedPhone = data.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

    // 4. Configure and send the HTML email
    const mailOptions = {
      from: process.env.SMTP_FROM || '"DVHive Website" <noreply@yourdomain.com>',
      to: process.env.NOTIFICATION_EMAIL, 
      subject: `New Contact Lead: ${data.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">New Contact Submission</h2>
          <p>You have a new lead from the main contact form.</p>
          
          <h3 style="background-color: #f5f5f5; padding: 8px; border-radius: 4px;">Contact Details</h3>
          <ul style="list-style: none; padding-left: 0;">
            <li style="margin-bottom: 5px;"><strong>Name:</strong> ${data.name}</li>
            <li style="margin-bottom: 5px;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #d4af37;">${data.email}</a></li>
            <li style="margin-bottom: 5px;"><strong>Phone:</strong> <a href="tel:${data.phone}" style="color: #d4af37;">${formattedPhone}</a></li>
          </ul>

          <h3 style="background-color: #f5f5f5; padding: 8px; border-radius: 4px;">Message</h3>
          <p style="background-color: #fafafa; padding: 15px; border-left: 4px solid #d4af37; margin-top: 0; white-space: pre-wrap; font-style: italic;">"${data.message}"</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;" />
          <p style="font-size: 12px; color: #888;">Submitted At: ${new Date().toLocaleString()}</p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    // ------------------------------------------------------------------
    // 4. SEND TO MAKE.COM WEBHOOK
    // ------------------------------------------------------------------
    
    return { success: false, error: "Failed to submit form" }
  }
}