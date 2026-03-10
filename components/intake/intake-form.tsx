"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Loader2, Upload, X, FileText, Image as ImageIcon, ChevronDown, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isAfter } from "date-fns"
import { z } from "zod"
import { stripPhone, formatPhone, formatNumber } from "@/lib/form-utils"
import { FieldError } from "./field-error"

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
]

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const claimTypes = ["Diminished Value", "Total Loss", "Not Sure"]
const priorAccidentOptions = ["Yes", "No", "Unknown"]

/* ── Zod Schema ── */
const intakeSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  phone: z.string().refine((val) => stripPhone(val).length === 10, "Enter a valid 10-digit phone number"),
  email: z.string().email("Enter a valid email address"),
  claimType: z.string().min(1, "Please select a claim type"),
  vin: z.string().min(1, "VIN is required"),
  year: z.string().min(1, "Year is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  trim: z.string().optional(),
  mileage: z.string().min(1, "Mileage is required"),
  accidentDate: z.string().min(1, "Accident date is required"),
  state: z.string().min(1, "Please select a state"),
  repairCosts: z.string().min(1, "Estimated repair cost is required"),
  priorAccidents: z.string().min(1, "Please select an option"),
  priorRepairCost: z.string().optional(),
  leasing: z.string().optional(),
  yourInsurance: z.string().optional(),
  faultInsurance: z.string().optional(),
  additionalInfo: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to continue",
  }),
})

type FormData = z.infer<typeof intakeSchema> & { files: File[] }

const initialData: FormData = {
  fullName: "",
  phone: "",
  email: "",
  claimType: "",
  vin: "",
  year: "",
  make: "",
  model: "",
  trim: "",
  mileage: "",
  accidentDate: "",
  state: "",
  repairCosts: "",
  priorAccidents: "",
  priorRepairCost: "",
  leasing: "",
  yourInsurance: "",
  faultInsurance: "",
  additionalInfo: "",
  files: [],
  consent: false,
}

const inputCls = (hasError: boolean) =>
  `w-full rounded-lg border bg-dvhive-bg/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 ${hasError ? "border-red-400/50" : "border-border"
  }`

/* ── Custom Select Component ── */
function CustomSelect({
  value,
  options,
  placeholder,
  onChange,
  error
}: {
  value: string
  options: string[]
  placeholder: string
  onChange: (val: string) => void
  error?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between rounded-lg border bg-dvhive-bg/50 px-4 py-2.5 text-sm transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 ${error ? "border-red-400/50" : "border-border"
          } ${value ? "text-foreground" : "text-muted-foreground"}`}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-foreground/50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-lg border border-border bg-[#1C1917] p-1.5 shadow-xl ring-1 ring-black/20"
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt)
                  setIsOpen(false)
                }}
                className={`flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors ${value === opt
                  ? "bg-gold/20 text-gold font-medium"
                  : "text-foreground/80 hover:bg-gold/10 hover:text-gold"
                  }`}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Custom DatePicker (MiniCalendar logic) ── */
function MiniCalendar({ selected, onSelect }: { selected: string; onSelect: (date: string) => void }) {
  const today = new Date()
  const currentYear = today.getFullYear()
  const minYear = 2015
  const [currentMonth, setCurrentMonth] = useState(selected ? new Date(selected + "T00:00:00") : today)
  const selectedDate = selected ? new Date(selected + "T00:00:00") : null

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const startPad = getDay(monthStart)

  const handleMonthSelect = (monthIndex: number) => {
    const next = new Date(currentMonth)
    next.setMonth(monthIndex)
    setCurrentMonth(next)
  }

  const handleYearSelect = (year: number) => {
    const next = new Date(currentMonth)
    next.setFullYear(year)
    setCurrentMonth(next)
  }

  const selectClass =
    "appearance-none rounded-md border border-border bg-[#1C1917] px-2 py-1 text-xs font-semibold text-gold focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 cursor-pointer"

  return (
    <div className="rounded-xl border border-border bg-[#1C1917] p-4 w-full max-w-xs shadow-xl ring-1 ring-black/20">
      <div className="flex items-center justify-between mb-3 gap-1">
        <button type="button" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="shrink-0 p-1 text-foreground/50 hover:text-gold transition-colors">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1.5">
          <select value={currentMonth.getMonth()} onChange={(e) => handleMonthSelect(Number(e.target.value))} className={selectClass}>
            {MONTH_NAMES.map((name, i) => <option key={name} value={i}>{name}</option>)}
          </select>
          <select value={currentMonth.getFullYear()} onChange={(e) => handleYearSelect(Number(e.target.value))} className={selectClass}>
            {Array.from({ length: currentYear - minYear + 1 }, (_, i) => currentYear - i).map((yr) => <option key={yr} value={yr}>{yr}</option>)}
          </select>
        </div>
        <button type="button" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="shrink-0 p-1 text-foreground/50 hover:text-gold transition-colors">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <span key={d} className="text-[10px] font-medium text-foreground/40 pb-1">{d}</span>
        ))}
        {Array.from({ length: startPad }).map((_, i) => <span key={`pad-${i}`} />)}
        {days.map((day) => {
          const isSelected = selectedDate ? isSameDay(day, selectedDate) : false
          const isFuture = isAfter(day, today)
          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={isFuture}
              onClick={() => onSelect(format(day, "yyyy-MM-dd"))}
              className={`h-8 w-8 rounded-md text-xs font-medium transition-all mx-auto ${isSelected ? "bg-gold text-dvhive-bg" : isFuture ? "text-foreground/15 cursor-not-allowed" : "text-foreground/70 hover:bg-gold/10 hover:text-gold"
                }`}
            >
              {format(day, "d")}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function CustomDatePicker({ value, onChange, error }: { value: string; onChange: (val: string) => void; error?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-2 rounded-lg border bg-dvhive-bg/50 px-4 py-2.5 text-sm text-left transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 ${error ? "border-red-400/50" : "border-border"
          }`}
      >
        <CalendarDays className="h-4 w-4 text-foreground/40 shrink-0" />
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value ? format(new Date(value + "T00:00:00"), "MMMM d, yyyy") : "mm/dd/yyyy"}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2"
          >
            <MiniCalendar
              selected={value}
              onSelect={(date) => {
                onChange(date)
                setIsOpen(false)
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function IntakeForm() {
  const [data, setData] = useState<FormData>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const update = (fields: Partial<FormData>) => {
    setData((prev) => ({ ...prev, ...fields }))
    const keys = Object.keys(fields)
    setErrors((prev) => {
      const next = { ...prev }
      keys.forEach((k) => delete next[k])
      return next
    })
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const dropped = Array.from(e.dataTransfer.files)
    update({ files: [...data.files, ...dropped] })
  }, [data.files])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files)
      update({ files: [...data.files, ...selected] })
    }
  }, [data.files])

  const removeFile = (index: number) => {
    update({ files: data.files.filter((_, i) => i !== index) })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 1. Run Zod Validation first
    const result = intakeSchema.safeParse(data)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string
        if (!fieldErrors[key]) fieldErrors[key] = issue.message
      })
      setErrors(fieldErrors)

      const firstErrorKey = Object.keys(fieldErrors)[0]
      const element = document.getElementById(`field-${firstErrorKey}`)
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setSubmitting(true)

    try {
      // 2. Prepare the Payload
      // We exclude the actual File objects for now, as sending raw files 
      // to Notion via Webhook requires a slightly more advanced setup.
      const payload = {
        ...data,
        files: data.files.map(f => f.name), // Send the filenames so the client knows what's coming
        submittedAt: new Date().toISOString(),
      }

      // 3. YOUR MAKE.COM WEBHOOK URL
      // Create a NEW Webhook in Make for this specific form!
      const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/YOUR_INTAKE_WEBHOOK_ID"

      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error("Failed to send to Notion")

      // --- GOOGLE ADS CONVERSION TRACKING ---
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "conversion", {
          "send_to": "AW-16780787359/1DUSCNK4m4UcEJ_92cE-",
        })
      }

      setSubmitted(true)
    } catch (error) {
      console.error("[DVHive Intake] Error:", error)
      alert("Submission failed. Please check your connection or call us directly.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-light rounded-2xl p-10 text-center"
      >
        <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-gold" />
        <h2 className="text-2xl font-bold text-foreground">Intake Form Received!</h2>
        <p className="mt-3 text-foreground/80 max-w-md mx-auto">
          Thank you for providing your information. Our team is reviewing your details and will be in touch shortly.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass-light rounded-2xl p-6 md:p-10 space-y-8">

      {/* ── Contact Info ── */}
      <div className="space-y-4" id="field-fullName">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-foreground/80">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => update({ fullName: e.target.value })}
              placeholder="Full Name"
              className={inputCls(!!errors.fullName)}
            />
            <FieldError message={errors.fullName} />
          </div>

          <div id="field-phone">
            <label className="mb-1.5 block text-sm font-medium text-foreground/80">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => update({ phone: formatPhone(e.target.value) })}
              placeholder="Enter Phone Number"
              maxLength={14}
              className={inputCls(!!errors.phone)}
            />
            <FieldError message={errors.phone} />
          </div>

          <div id="field-email">
            <label className="mb-1.5 block text-sm font-medium text-foreground/80">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => update({ email: e.target.value })}
              placeholder="Enter Email"
              className={inputCls(!!errors.email)}
            />
            <FieldError message={errors.email} />
          </div>
        </div>
      </div>

      <hr className="border-border" />

      {/* ── Claim & Vehicle ── */}
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          <div id="field-claimType">
            <label className="mb-1.5 block text-sm font-medium text-foreground/80">
              Claim Type <span className="text-red-500">*</span>
            </label>
            <CustomSelect
              value={data.claimType}
              options={claimTypes}
              placeholder="Select Claim Type"
              onChange={(v) => update({ claimType: v })}
              error={errors.claimType}
            />
            <FieldError message={errors.claimType} />
          </div>

          <div id="field-vin">
            <label className="mb-1.5 block text-sm font-medium text-foreground/80">
              VIN Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.vin}
              onChange={(e) => update({ vin: e.target.value.toUpperCase() })}
              placeholder="VIN Number"
              className={inputCls(!!errors.vin)}
            />
            <FieldError message={errors.vin} />
          </div>
        </div>

        <div id="field-year">
          <label className="mb-1.5 block text-sm font-medium text-foreground/80">
            Vehicle Details <span className="text-red-500">*</span>
          </label>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            <input type="text" placeholder="Year" value={data.year} onChange={(e) => update({ year: e.target.value })} className={inputCls(!!errors.year)} />
            <input type="text" placeholder="Make" value={data.make} onChange={(e) => update({ make: e.target.value })} className={inputCls(!!errors.make)} />
            <input type="text" placeholder="Model" value={data.model} onChange={(e) => update({ model: e.target.value })} className={inputCls(!!errors.model)} />
            <input type="text" placeholder="Trim Level (SE, LE, Base, etc)" value={data.trim} onChange={(e) => update({ trim: e.target.value })} className={inputCls(false)} />
          </div>
          {(errors.year || errors.make || errors.model) && (
            <p className="mt-1 text-xs font-medium text-red-400">Please complete all required vehicle details.</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          <div id="field-mileage">
            <label className="mb-1.5 block text-sm font-medium text-foreground/80">
              Approximate mileage on accident date <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.mileage}
              onChange={(e) => update({ mileage: formatNumber(e.target.value.replace(/\D/g, "")) })}
              placeholder="Enter Vehicle Mileage"
              className={inputCls(!!errors.mileage)}
            />
            <FieldError message={errors.mileage} />
          </div>

          <div id="field-accidentDate">
            <label className="mb-1.5 block text-sm font-medium text-foreground/80">
              Date of Accident <span className="text-red-500">*</span>
            </label>
            <CustomDatePicker
              value={data.accidentDate}
              onChange={(v) => update({ accidentDate: v })}
              error={errors.accidentDate}
            />
            <FieldError message={errors.accidentDate} />
          </div>

          <div id="field-state">
            <label className="mb-1.5 block text-sm font-medium text-foreground/80">
              State where the accident happened <span className="text-red-500">*</span>
            </label>
            <CustomSelect
              value={data.state}
              options={states}
              placeholder="Select State"
              onChange={(v) => update({ state: v })}
              error={errors.state}
            />
            <FieldError message={errors.state} />
          </div>

          <div id="field-repairCosts">
            <label className="mb-1.5 block text-sm font-medium text-foreground/80">
              Estimated repair costs <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-foreground/80">$</span>
              <input
                type="text"
                value={data.repairCosts}
                onChange={(e) => update({ repairCosts: formatNumber(e.target.value.replace(/\D/g, "")) })}
                placeholder="Enter Estimated Repair Cost"
                className={`w-full rounded-lg border bg-dvhive-bg/50 py-2.5 pl-7 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 ${errors.repairCosts ? "border-red-400/50" : "border-border"}`}
              />
            </div>
            <FieldError message={errors.repairCosts} />
          </div>

          <div id="field-priorAccidents">
            <label className="mb-1.5 block text-sm font-medium text-foreground/80">
              Any prior accidents or repairs? <span className="text-red-500">*</span>
            </label>
            <CustomSelect
              value={data.priorAccidents}
              options={priorAccidentOptions}
              placeholder="Select Option"
              onChange={(v) => update({ priorAccidents: v })}
              error={errors.priorAccidents}
            />
            <FieldError message={errors.priorAccidents} />
          </div>

          <div id="field-priorRepairCost">
            <label className="mb-1.5 block text-sm font-medium text-foreground/80">
              If yes, estimated repair cost of previous accident
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-foreground/80">$</span>
              <input
                type="text"
                disabled={data.priorAccidents !== "Yes"}
                value={data.priorRepairCost}
                onChange={(e) => update({ priorRepairCost: formatNumber(e.target.value.replace(/\D/g, "")) })}
                placeholder="Enter Previous Repair Estimate"
                className={`w-full rounded-lg border bg-dvhive-bg/50 py-2.5 pl-7 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 disabled:opacity-50 disabled:cursor-not-allowed border-border`}
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="border-border" />

      {/* ── Insurance & Leasing ── */}
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground/80">
            Are you leasing your vehicle? (Vehicle will be turned back in on a set date)
          </label>
          <div className="flex gap-4">
            {["Yes", "No"].map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="leasing"
                  value={opt}
                  checked={data.leasing === opt}
                  onChange={(e) => update({ leasing: e.target.value })}
                  className="h-4 w-4 text-gold border-border bg-dvhive-bg focus:ring-gold/50"
                />
                <span className="text-sm text-foreground/80">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 mt-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground/80">
              Name of your insurance company?
            </label>
            <input
              type="text"
              value={data.yourInsurance}
              onChange={(e) => update({ yourInsurance: e.target.value })}
              placeholder="Enter Insurance Company"
              className={inputCls(false)}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground/80">
              Name of at-fault insurance company?
            </label>
            <input
              type="text"
              value={data.faultInsurance}
              onChange={(e) => update({ faultInsurance: e.target.value })}
              placeholder="Enter Fault Insurance Details"
              className={inputCls(false)}
            />
          </div>
        </div>
      </div>

      <hr className="border-border" />

      {/* ── Uploads & Extras ── */}
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground/80">
            File Upload (repair estimate, supplement, final bill, total loss valuation, etc)
          </label>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border p-6 text-center transition-colors hover:border-gold/30"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
              <Upload className="h-4 w-4 text-gold" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground/80">Drag & drop files here</p>
              <p className="text-xs text-foreground/40 mt-1">or click to browse</p>
            </div>
            <label className="cursor-pointer rounded-lg border border-border px-4 py-2 text-xs font-medium text-foreground/60 hover:border-gold/30 hover:text-gold transition-colors">
              Choose Files
              <input type="file" multiple accept="image/*,.pdf,.doc,.docx" onChange={handleFileInput} className="sr-only" />
            </label>
          </div>

          {data.files.length > 0 && (
            <ul className="mt-3 space-y-2">
              {data.files.map((file, i) => (
                <li key={`${file.name}-${i}`} className="flex items-center gap-3 rounded-lg border border-border bg-muted/20 px-4 py-2.5">
                  {file.type.startsWith("image/") ? <ImageIcon className="h-4 w-4 text-gold/60 shrink-0" /> : <FileText className="h-4 w-4 text-gold/60 shrink-0" />}
                  <span className="flex-1 truncate text-sm text-foreground/80">{file.name}</span>
                  <span className="text-xs text-foreground/40">{(file.size / 1024).toFixed(0)} KB</span>
                  <button type="button" onClick={() => removeFile(i)} className="text-foreground/30 hover:text-destructive transition-colors"><X className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground/80">
            Any additional information to add?
          </label>
          <textarea
            value={data.additionalInfo}
            onChange={(e) => update({ additionalInfo: e.target.value })}
            placeholder="Enter additional information here..."
            rows={4}
            className={`w-full resize-none rounded-lg border bg-dvhive-bg/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 border-border`}
          />
        </div>

        <div id="field-consent">
          <label className="flex items-start gap-3 cursor-pointer group mt-4">
            <div className="relative mt-0.5 shrink-0">
              <input
                type="checkbox"
                checked={data.consent}
                onChange={(e) => update({ consent: e.target.checked })}
                className="sr-only peer"
              />
              <div className={`h-5 w-5 rounded border bg-dvhive-bg/50 transition-all peer-checked:border-gold peer-checked:bg-gold/20 peer-focus-visible:ring-2 peer-focus-visible:ring-gold/30 ${errors.consent ? "border-red-400/50" : "border-border"}`}>
                {data.consent && (
                  <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-xs leading-relaxed text-foreground/60 group-hover:text-foreground/80 transition-colors">
              Check this box to give DVHIVE consent to send text messages related to your free estimate request. Consent is not a condition to any purchase. Message and data rates may apply. View Terms of Use.
            </span>
          </label>
          <FieldError message={errors.consent} />
        </div>
      </div>

      <div className="pt-4 text-center sm:text-left">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-gold px-10 py-3.5 text-sm font-bold text-dvhive-bg transition-all hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-gold/20"
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
      </div>
    </form>
  )
}