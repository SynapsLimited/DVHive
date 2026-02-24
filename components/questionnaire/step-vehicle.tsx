"use client"

import { useState, useRef, useEffect } from "react"
import type { FormData } from "./questionnaire-form"
import { FieldError } from "./field-error"
import { formatNumber } from "@/lib/form-utils"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Props {
  data: FormData
  update: (fields: Partial<FormData>) => void
  errors: Record<string, string>
}

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 30 }, (_, i) => String(currentYear - i))

const inputCls = (hasError: boolean) =>
  `w-full rounded-lg border bg-dvhive-bg/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 ${hasError ? "border-red-400/50" : "border-border"
  }`

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
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
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

export function StepVehicle({ data, update, errors }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-foreground mb-1">Tell us about your vehicle</h3>
        <p className="text-sm text-foreground/50">Provide details about the vehicle involved in the accident.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground/80">
            Year <span className="text-red-500">*</span>
          </label>
          <CustomSelect
            value={data.year}
            options={years}
            placeholder="Select Year"
            onChange={(v) => update({ year: v })}
            error={errors.year}
          />
          <FieldError message={errors.year} />
        </div>
        <div>
          <label htmlFor="v-make" className="mb-1.5 block text-sm font-medium text-foreground/80">Make</label>
          <input
            id="v-make"
            type="text"
            value={data.make}
            onChange={(e) => update({ make: e.target.value })}
            placeholder="e.g. Toyota"
            className={inputCls(!!errors.make)}
          />
          <FieldError message={errors.make} />
        </div>
        <div>
          <label htmlFor="v-model" className="mb-1.5 block text-sm font-medium text-foreground/80">Model</label>
          <input
            id="v-model"
            type="text"
            value={data.model}
            onChange={(e) => update({ model: e.target.value })}
            placeholder="e.g. Camry"
            className={inputCls(!!errors.model)}
          />
          <FieldError message={errors.model} />
        </div>
        <div>
          <label htmlFor="v-trim" className="mb-1.5 block text-sm font-medium text-foreground/80">
            Trim <span className="text-foreground/30">(optional)</span>
          </label>
          <input
            id="v-trim"
            type="text"
            value={data.trim}
            onChange={(e) => update({ trim: e.target.value })}
            placeholder="e.g. XSE"
            className={inputCls(false)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="v-mileage" className="mb-1.5 block text-sm font-medium text-foreground/80">Current Mileage</label>
        <input
          id="v-mileage"
          type="text"
          inputMode="numeric"
          value={data.mileage}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "")
            update({ mileage: formatNumber(raw) })
          }}
          placeholder="e.g. 45,000"
          className={inputCls(!!errors.mileage)}
        />
        <FieldError message={errors.mileage} />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-foreground/80">Is the vehicle drivable?</p>
        <div className="flex gap-3">
          {["Yes", "No"].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => update({ drivable: opt })}
              className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-all ${data.drivable === opt
                  ? "border-gold bg-gold/10 text-gold"
                  : errors.drivable
                    ? "border-red-400/50 text-foreground/60 hover:border-gold/30"
                    : "border-border text-foreground/60 hover:border-gold/30"
                }`}
              aria-pressed={data.drivable === opt}
            >
              {opt}
            </button>
          ))}
        </div>
        <FieldError message={errors.drivable} />
      </div>
    </div>
  )
}