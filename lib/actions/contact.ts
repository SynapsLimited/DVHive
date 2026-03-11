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
    
    // 1. Insert the document directly into MongoDB
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
    // 2. SEND TO MAKE.COM WEBHOOK
    // ------------------------------------------------------------------
    const makePayload = {
      ...data,
      formType: "contact", // This is the secret sauce for the Make.com Router
      source: "Main Contact Form",
      submittedAt: new Date().toISOString(),
    }

    try {
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
    } catch (makeError) {
      console.error("Make.com fetch error:", makeError)
    }

    // ------------------------------------------------------------------
    // 3. SEND EMAILS VIA NODEMAILER
    // ------------------------------------------------------------------
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

    // --- A. Email to Admin ---
    const adminMailOptions = {
      from: process.env.SMTP_FROM || '"DVHive Website" <noreply@dvhive.com>',
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

    // --- B. Auto-responder to User ---
    const userMailOptions = {
      from: process.env.SMTP_FROM || '"DVHive" <noreply@dvhive.com>',
      to: data.email,
      subject: "We've Received Your Request - DVHive",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <h2 style="color: #d4af37;">We've Received Your Request!</h2>
          <p>Hi ${data.name},</p>
          <p>Thank you for reaching out to DVHive. This email is to confirm that we have successfully received your information.</p>
          <p>One of our certified auto appraisers is reviewing your details and will be in touch with you shortly.</p>
          <p>In the meantime, here are a few resources you might find helpful:</p>
          <ul>
            <li style="margin-bottom: 10px;"><a href="https://www.dvhive.com/blog" style="color: #d4af37; font-weight: bold; text-decoration: none;">Explore our Blog</a> for expert tips and guides on maximizing your claim.</li>
            <li><a href="https://www.dvhive.com" style="color: #d4af37; font-weight: bold; text-decoration: none;">Visit our Homepage</a> to view our interactive state map and learn more about local regulations.</li>
          </ul>
          <p style="margin-top: 30px;">If you need immediate assistance, please don't hesitate to call us at <a href="tel:8885973282" style="color: #d4af37; font-weight: bold; text-decoration: none;">(888) 597-3282</a> or email us at <a href="mailto:info@dvhive.com" style="color: #d4af37; font-weight: bold; text-decoration: none;">info@dvhive.com</a>.</p>          <p>Best regards,<br/><strong>The DVHive Team</strong></p>
        </div>
      `,
    }

    // Send both emails (using Promise.all for speed, and catching user email errors so it doesn't break the submission)
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions).catch(e => console.error("Failed to send auto-reply:", e))
    ])

    return { success: true }

  } catch (error) {
    console.error("Failed to process contact form submission:", error)
    return { success: false, error: "Failed to submit form" }
  }
}