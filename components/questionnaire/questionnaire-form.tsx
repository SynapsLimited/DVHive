"use client"

import { useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import { z } from "zod"
import { stripPhone, stripCommas } from "@/lib/form-utils"
import { StepTriage } from "./step-triage"
import { StepVehicle } from "./step-vehicle"
import { StepDetails } from "./step-details"
import { StepUploads } from "./step-uploads"
import { StepContact } from "./step-contact"

/* ── Zod Schemas per step ── */

const triageSchema = z.object({
  claimType: z.string().min(1, "Please select a claim type"),
  state: z.string().min(1, "Please select a state"),
  zip: z.string().regex(/^\d{5}$/, "Enter a valid 5-digit zip code"),
  accidentDate: z.string().min(1, "Please select the accident date"),
  fault: z.string().min(1, "Please select who was at fault"),
})

const vehicleSchema = z.object({
  year: z.string().min(1, "Please select a year"),
  make: z.string().min(1, "Vehicle make is required"),
  model: z.string().min(1, "Vehicle model is required"),
  trim: z.string().optional(),
  mileage: z.string().min(1, "Mileage is required"),
  drivable: z.string().min(1, "Please select an option"),
})

const dvDetailsSchema = z.object({
  repairsDone: z.string().min(1, "Please select an option"),
  repairCost: z.string().optional(),
  frameDamage: z.string().min(1, "Please select an option"),
  priorAccidents: z.string().min(1, "Please select an option"),
})

const tlDetailsSchema = z.object({
  offerReceived: z.string().min(1, "Please select an option"),
  offerAmount: z.string().optional(),
  keepingSalvage: z.string().min(1, "Please select an option"),
  fairValue: z.string().optional(),
})

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().refine(
    (val) => stripPhone(val).length === 10,
    "Please enter a complete phone number"
  ),
  email: z.string().email("Please enter a valid email address"),
  contactMethod: z.string().min(1, "Please select a preferred method"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to continue" }),
  }),
})

/* ── Full FormData type ── */

export interface FormData {
  claimType: string
  state: string
  zip: string
  accidentDate: string
  fault: string
  year: string
  make: string
  model: string
  trim: string
  mileage: string
  drivable: string
  repairsDone: string
  repairCost: string
  frameDamage: string
  priorAccidents: string
  offerReceived: string
  offerAmount: string
  keepingSalvage: string
  fairValue: string
  files: File[]
  firstName: string
  lastName: string
  phone: string
  email: string
  contactMethod: string
  consent: boolean
}

const initialData: FormData = {
  claimType: "",
  state: "",
  zip: "",
  accidentDate: "",
  fault: "",
  year: "",
  make: "",
  model: "",
  trim: "",
  mileage: "",
  drivable: "",
  repairsDone: "",
  repairCost: "",
  frameDamage: "",
  priorAccidents: "",
  offerReceived: "",
  offerAmount: "",
  keepingSalvage: "",
  fairValue: "",
  files: [],
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  contactMethod: "",
  consent: false,
}

const TOTAL_STEPS = 5

const stepLabels = ["Triage", "Vehicle", "Details", "Uploads", "Contact"]

function buildPayload(d: FormData) {
  return {
    claimType: d.claimType,
    location: { state: d.state, zip: d.zip },
    accidentDate: d.accidentDate,
    fault: d.fault,
    vehicle: {
      year: d.year,
      make: d.make,
      model: d.model,
      trim: d.trim,
      mileage: stripCommas(d.mileage),
      drivable: d.drivable,
    },
    details:
      d.claimType === "Diminished Value"
        ? {
            repairsDone: d.repairsDone,
            repairCost: stripCommas(d.repairCost),
            frameDamage: d.frameDamage,
            priorAccidents: d.priorAccidents,
          }
        : {
            offerReceived: d.offerReceived,
            offerAmount: stripCommas(d.offerAmount),
            keepingSalvage: d.keepingSalvage,
            fairValue: stripCommas(d.fairValue),
          },
    uploads: d.files.map((f) => f.name),
    contact: {
      name: `${d.firstName} ${d.lastName}`,
      phone: stripPhone(d.phone),
      email: d.email,
      preferredMethod: d.contactMethod,
    },
    submittedAt: new Date().toISOString(),
  }
}

export function QuestionnaireForm() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(() => ({
    ...initialData,
    zip: searchParams.get("zip") || "",
    claimType: searchParams.get("claimType") || "",
  }))
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({})

  const update = useCallback(
    (fields: Partial<FormData>) => {
      setFormData((prev) => ({ ...prev, ...fields }))
      // Clear errors for fields being updated
      const keys = Object.keys(fields)
      setStepErrors((prev) => {
        const next = { ...prev }
        keys.forEach((k) => delete next[k])
        return next
      })
    },
    []
  )

  function validateStep(): boolean {
    let schema: z.ZodObject<Record<string, z.ZodTypeAny>> | null = null

    switch (step) {
      case 1:
        schema = triageSchema as z.ZodObject<Record<string, z.ZodTypeAny>>
        break
      case 2:
        schema = vehicleSchema as z.ZodObject<Record<string, z.ZodTypeAny>>
        break
      case 3:
        schema = (formData.claimType === "Total Loss" ? tlDetailsSchema : dvDetailsSchema) as z.ZodObject<Record<string, z.ZodTypeAny>>
        break
      case 4:
        return true // uploads are optional
      case 5:
        schema = contactSchema as z.ZodObject<Record<string, z.ZodTypeAny>>
        break
    }

    if (!schema) return true

    const result = schema.safeParse(formData)
    if (result.success) {
      setStepErrors({})
      return true
    }

    const errors: Record<string, string> = {}
    result.error.issues.forEach((issue) => {
      const key = issue.path[0] as string
      if (!errors[key]) errors[key] = issue.message
    })
    setStepErrors(errors)
    return false
  }

  function next() {
    if (validateStep()) {
      setStep((s) => Math.min(s + 1, TOTAL_STEPS))
    }
  }

  function prev() {
    setStepErrors({})
    setStep((s) => Math.max(s - 1, 1))
  }

  async function handleSubmit() {
    if (!validateStep()) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    const payload = buildPayload(formData)
    console.log("[DVHive] Notion Payload:", JSON.stringify(payload, null, 2))
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-light rounded-2xl p-10 text-center"
      >
        <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-gold" />
        <h2 className="text-2xl font-bold text-foreground">Submission Received!</h2>
        <p className="mt-3 text-foreground/60 max-w-md mx-auto">
          Thank you for reaching out. One of our certified appraisers will
          contact you within 24 hours. If your case is urgent, call us now.
        </p>
        <a
          href="tel:888-597-3282"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-bold text-dvhive-bg hover:bg-gold/90 transition-colors"
        >
          Call (888) 597-3282
        </a>
      </motion.div>
    )
  }

  return (
    <div className="glass-light rounded-2xl p-6 md:p-10">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gold">
            Step {step} of {TOTAL_STEPS}
          </span>
          <span className="text-xs text-foreground/40">
            {Math.round((step / TOTAL_STEPS) * 100)}%
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gold"
            initial={false}
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>
        <div className="mt-3 flex justify-between">
          {stepLabels.map((label, i) => (
            <span
              key={label}
              className={`text-[10px] font-medium transition-colors ${
                i + 1 <= step ? "text-gold" : "text-foreground/30"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && <StepTriage data={formData} update={update} errors={stepErrors} />}
          {step === 2 && <StepVehicle data={formData} update={update} errors={stepErrors} />}
          {step === 3 && <StepDetails data={formData} update={update} errors={stepErrors} />}
          {step === 4 && <StepUploads data={formData} update={update} />}
          {step === 5 && <StepContact data={formData} update={update} errors={stepErrors} />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={prev}
          disabled={step === 1}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-gold/30 hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Go to previous step"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {step < TOTAL_STEPS ? (
          <button
            onClick={next}
            className="group inline-flex items-center gap-1.5 rounded-lg bg-gold px-6 py-2.5 text-sm font-bold text-dvhive-bg transition-all hover:bg-gold/90"
            aria-label="Go to next step"
          >
            Next
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting || !formData.consent}
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-2.5 text-sm font-bold text-dvhive-bg transition-all hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Submit questionnaire"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
        )}
      </div>
    </div>
  )
}
