"use client"

import type { FormData } from "./questionnaire-form"
import { FieldError } from "./field-error"
import { formatPhone } from "@/lib/form-utils"
import { Phone, Mail, MessageSquare } from "lucide-react"

interface Props {
  data: FormData
  update: (fields: Partial<FormData>) => void
  errors: Record<string, string>
}

const contactMethods = [
  { value: "Call", label: "Phone Call", icon: Phone },
  { value: "Text", label: "Text Message", icon: MessageSquare },
  { value: "Email", label: "Email", icon: Mail },
]

const inputCls = (hasError: boolean) =>
  `w-full rounded-lg border bg-dvhive-bg/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 ${hasError ? "border-red-400/50" : "border-border"
  }`

export function StepContact({ data, update, errors }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-foreground mb-1">Your Contact Information</h3>
        <p className="text-sm text-foreground/80">
          We will use this information to reach out about your claim.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-first" className="mb-1.5 block text-sm font-medium text-foreground/80">First Name</label>
          <input
            id="c-first"
            type="text"
            value={data.firstName}
            onChange={(e) => update({ firstName: e.target.value })}
            placeholder="John"
            className={inputCls(!!errors.firstName)}
          />
          <FieldError message={errors.firstName} />
        </div>
        <div>
          <label htmlFor="c-last" className="mb-1.5 block text-sm font-medium text-foreground/80">Last Name</label>
          <input
            id="c-last"
            type="text"
            value={data.lastName}
            onChange={(e) => update({ lastName: e.target.value })}
            placeholder="Doe"
            className={inputCls(!!errors.lastName)}
          />
          <FieldError message={errors.lastName} />
        </div>
      </div>

      <div>
        <label htmlFor="c-phone" className="mb-1.5 block text-sm font-medium text-foreground/80">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          id="c-phone"
          type="tel"
          value={data.phone}
          onChange={(e) => {
            const formatted = formatPhone(e.target.value)
            update({ phone: formatted })
          }}
          placeholder="(555) 555-5555"
          maxLength={14}
          className={inputCls(!!errors.phone)}
        />
        <FieldError message={errors.phone} />
      </div>

      <div>
        <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium text-foreground/80">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="c-email"
          type="email"
          value={data.email}
          onChange={(e) => update({ email: e.target.value })}
          placeholder="john@example.com"
          className={inputCls(!!errors.email)}
        />
        <FieldError message={errors.email} />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-foreground/80">Preferred Contact Method</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {contactMethods.map((cm) => (
            <button
              key={cm.value}
              type="button"
              onClick={() => update({ contactMethod: cm.value })}
              className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-all ${data.contactMethod === cm.value
                ? "border-gold bg-gold/10 text-gold"
                : errors.contactMethod
                  ? "border-red-400/50 text-foreground/60 hover:border-gold/30"
                  : "border-border text-foreground/60 hover:border-gold/30"
                }`}
              aria-pressed={data.contactMethod === cm.value}
            >
              <cm.icon className="h-4 w-4" />
              {cm.label}
            </button>
          ))}
        </div>
        <FieldError message={errors.contactMethod} />
      </div>

      {/* Consent checkbox */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5">
            <input
              type="checkbox"
              checked={data.consent}
              onChange={(e) => update({ consent: e.target.checked })}
              className="sr-only peer"
            />
            <div className={`h-5 w-5 rounded border bg-dvhive-bg/50 transition-all peer-checked:border-gold peer-checked:bg-gold/20 peer-focus-visible:ring-2 peer-focus-visible:ring-gold/30 ${errors.consent ? "border-red-400/50" : "border-border"
              }`}>
              {data.consent && (
                <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-xs leading-relaxed text-foreground/80 group-hover:text-foreground/80 transition-colors">
            I consent to DVHIVE contacting me via the method selected above regarding my claim.
            I understand that this is a free consultation and I am under no obligation. I have
            read and agree to the Privacy Policy.
          </span>
        </label>
        <FieldError message={errors.consent} />
      </div>
    </div>
  )
}