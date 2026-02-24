"use client"

import { useState, useRef, useEffect } from "react"
import type { FormData } from "./questionnaire-form"
import { FieldError } from "./field-error"
import { Car, FileWarning, HelpCircle, CalendarDays, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isAfter } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"

const claimTypes = [
  { value: "Diminished Value", label: "Diminished Value", icon: Car, desc: "My car was repaired but lost value" },
  { value: "Total Loss", label: "Total Loss", icon: FileWarning, desc: "My car was totaled by insurance" },
  { value: "Not Sure", label: "Not Sure", icon: HelpCircle, desc: "I need help figuring it out" },
]

const faultOptions = [
  { value: "Other Driver", label: "Other Driver at Fault" },
  { value: "Mine", label: "I Was at Fault" },
  { value: "Unsure", label: "Unsure / Disputed" },
]

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
]

interface Props {
  data: FormData
  update: (fields: Partial<FormData>) => void
  errors: Record<string, string>
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

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
    "appearance-none rounded-md border border-border bg-dvhive-bg px-2 py-1 text-xs font-semibold text-gold focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 cursor-pointer"

  return (
    <div className="rounded-xl border border-border bg-dvhive-bg/80 p-4 w-full max-w-xs">
      {/* Header with Month/Year Dropdowns + Nav Arrows */}
      <div className="flex items-center justify-between mb-3 gap-1">
        <button
          type="button"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="shrink-0 p-1 text-foreground/50 hover:text-gold transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1.5">
          <select
            value={currentMonth.getMonth()}
            onChange={(e) => handleMonthSelect(Number(e.target.value))}
            className={selectClass}
            aria-label="Select month"
          >
            {MONTH_NAMES.map((name, i) => (
              <option key={name} value={i}>{name}</option>
            ))}
          </select>

          <select
            value={currentMonth.getFullYear()}
            onChange={(e) => handleYearSelect(Number(e.target.value))}
            className={selectClass}
            aria-label="Select year"
          >
            {Array.from({ length: currentYear - minYear + 1 }, (_, i) => currentYear - i).map((yr) => (
              <option key={yr} value={yr}>{yr}</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="shrink-0 p-1 text-foreground/50 hover:text-gold transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <span key={d} className="text-[10px] font-medium text-foreground/40 pb-1">{d}</span>
        ))}
        {Array.from({ length: startPad }).map((_, i) => (
          <span key={`pad-${i}`} />
        ))}
        {days.map((day) => {
          const isSelected = selectedDate ? isSameDay(day, selectedDate) : false
          const isFuture = isAfter(day, today)
          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={isFuture}
              onClick={() => onSelect(format(day, "yyyy-MM-dd"))}
              className={`h-8 w-8 rounded-md text-xs font-medium transition-all mx-auto ${isSelected
                  ? "bg-gold text-dvhive-bg"
                  : isFuture
                    ? "text-foreground/15 cursor-not-allowed"
                    : "text-foreground/70 hover:bg-gold/10 hover:text-gold"
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

export function StepTriage({ data, update, errors }: Props) {
  const [showCal, setShowCal] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-foreground mb-1">What do you need help with?</h3>
        <p className="text-sm text-foreground/50">Select the type of claim you need assistance with.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {claimTypes.map((ct) => (
          <button
            key={ct.value}
            type="button"
            onClick={() => update({ claimType: ct.value })}
            className={`flex flex-col items-center gap-2 rounded-xl border p-5 text-center transition-all ${data.claimType === ct.value
                ? "border-gold bg-gold/10 text-gold"
                : errors.claimType
                  ? "border-red-400/50 text-foreground/60 hover:border-gold/30 hover:text-foreground"
                  : "border-border text-foreground/60 hover:border-gold/30 hover:text-foreground"
              }`}
            aria-pressed={data.claimType === ct.value}
          >
            <ct.icon className="h-6 w-6" />
            <span className="text-sm font-bold">{ct.label}</span>
            <span className="text-xs opacity-70">{ct.desc}</span>
          </button>
        ))}
      </div>
      <FieldError message={errors.claimType} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground/80">
            State <span className="text-red-500">*</span>
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
        <div>
          <label htmlFor="q-zip" className="mb-1.5 block text-sm font-medium text-foreground/80">Zip Code</label>
          <input
            id="q-zip"
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={data.zip}
            onChange={(e) => update({ zip: e.target.value.replace(/\D/g, "") })}
            placeholder="e.g. 33101"
            className={`w-full rounded-lg border bg-dvhive-bg/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 ${errors.zip ? "border-red-400/50" : "border-border"
              }`}
          />
          <FieldError message={errors.zip} />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground/80">Date of Accident</label>
        <button
          type="button"
          onClick={() => setShowCal(!showCal)}
          className={`w-full flex items-center gap-2 rounded-lg border bg-dvhive-bg/50 px-4 py-2.5 text-sm text-left transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 ${errors.accidentDate ? "border-red-400/50" : "border-border"
            }`}
        >
          <CalendarDays className="h-4 w-4 text-foreground/40 shrink-0" />
          <span className={data.accidentDate ? "text-foreground" : "text-muted-foreground"}>
            {data.accidentDate ? format(new Date(data.accidentDate + "T00:00:00"), "MMMM d, yyyy") : "Select a date"}
          </span>
        </button>
        {showCal && (
          <div className="mt-2">
            <MiniCalendar
              selected={data.accidentDate}
              onSelect={(date) => {
                update({ accidentDate: date })
                setShowCal(false)
              }}
            />
          </div>
        )}
        <FieldError message={errors.accidentDate} />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-foreground/80">Who was at fault?</p>
        <div className="flex flex-wrap gap-2">
          {faultOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => update({ fault: opt.value })}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${data.fault === opt.value
                  ? "border-gold bg-gold/10 text-gold"
                  : errors.fault
                    ? "border-red-400/50 text-foreground/60 hover:border-gold/30"
                    : "border-border text-foreground/60 hover:border-gold/30"
                }`}
              aria-pressed={data.fault === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <FieldError message={errors.fault} />
      </div>
    </div>
  )
}