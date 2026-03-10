"use client"

import { useState } from "react"
import { z } from "zod"
import { formatPhone, stripPhone } from "@/lib/form-utils"
import { Loader2, CheckCircle2, Send, Phone } from "lucide-react"
import { submitContactForm } from "@/lib/actions/contact"

// Allow TypeScript to recognize the global gtag function
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().refine((v) => stripPhone(v).length === 10, "Please enter a complete phone number"),
  message: z.string().min(1, "Message is required"),
})

type LeadData = z.infer<typeof leadSchema>

export function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
  const [data, setData] = useState<LeadData>({ name: "", email: "", phone: "", message: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function update(field: keyof LeadData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

 async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    // 1. Validate the form data
    const result = leadSchema.safeParse(data)
    if (!result.success) {
      const errs: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string
        if (!errs[key]) errs[key] = issue.message
      })
      setErrors(errs)
      return
    }

    setSubmitting(true)
    
    try {
      // 2. SEND TO DATABASE, EMAIL, AND MAKE.COM VIA SECURE SERVER ACTION
      const actionResult = await submitContactForm({
        name: data.name,
        email: data.email,
        phone: stripPhone(data.phone),
        message: data.message,
      })

      if (!actionResult.success) {
        throw new Error(actionResult.error || "Failed to process submission")
      }

      // 3. Success state
      setSubmitted(true)

      // --- GOOGLE ADS CONVERSION TRACKING ---
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "conversion", {
          "send_to": "AW-16780787359/VH7uCOPppYUcEJ_92cE-",
        })
      }
      
      onSuccess?.()

    } catch (error) {
      console.error("[DVHive] Submission Error:", error)
      setErrors({ form: "Service temporarily unavailable. Please call us directly." })
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center animate-in fade-in zoom-in duration-300">
        <CheckCircle2 className="h-12 w-12 text-gold" />
        <h3 className="text-xl font-bold text-foreground">Message Sent!</h3>
        <p className="text-sm text-foreground/60 max-w-sm">
          Thank you for reaching out. We will get back to you within 24 hours.
        </p>
      </div>
    )
  }

  const inputCls = (field: keyof LeadData) =>
    `w-full rounded-lg border bg-dvhive-bg/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 ${errors[field] ? "border-red-400/50" : "border-border"
    }`

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {errors.form && (
        <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
          {errors.form}
        </div>
      )}

      <div>
        <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium text-foreground/80">Name</label>
        <input
          id="cf-name"
          type="text"
          value={data.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="John Doe"
          className={inputCls("name")}
        />
        {errors.name && <p className="mt-1 text-xs font-medium text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium text-foreground/80">Email</label>
        <input
          id="cf-email"
          type="email"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="john@example.com"
          className={inputCls("email")}
        />
        {errors.email && <p className="mt-1 text-xs font-medium text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="cf-phone" className="mb-1.5 block text-sm font-medium text-foreground/80">Phone</label>
        <input
          id="cf-phone"
          type="tel"
          value={data.phone}
          onChange={(e) => update("phone", formatPhone(e.target.value))}
          placeholder="(555) 555-5555"
          maxLength={14}
          className={inputCls("phone")}
        />
        {errors.phone && <p className="mt-1 text-xs font-medium text-red-400">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium text-foreground/80">Message</label>
        <textarea
          id="cf-message"
          rows={4}
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell us about your situation..."
          className={`${inputCls("message")} resize-none`}
        />
        {errors.message && <p className="mt-1 text-xs font-medium text-red-400">{errors.message}</p>}
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-bold text-dvhive-bg transition-all hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Get Help for Appraisal Now!
            </>
          )}
        </button>

        <div className="relative flex items-center py-1">
          <div className="flex-grow border-t border-border"></div>
          <span className="shrink-0 px-4 text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Or</span>
          <div className="flex-grow border-t border-border"></div>
        </div>

        <a
          href="tel:888-597-3282"
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-bold text-foreground transition-all hover:border-gold/30 hover:text-gold"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>
      </div>
    </form>
  )
}