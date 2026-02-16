"use client"

import { useState } from "react"
import type { FormData } from "./questionnaire-form"
import { FieldError } from "./field-error"
import { Car, FileWarning, HelpCircle, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isSameMonth, isAfter } from "date-fns"

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
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
  "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
  "Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico",
  "New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania",
  "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming",
]

interface Props {
  data: FormData
  update: (fields: Partial<FormData>) => void
  errors: Record<string, string>
}

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
]

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
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
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
              className={`h-8 w-8 rounded-md text-xs font-medium transition-all mx-auto ${
                isSelected
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
            className={`flex flex-col items-center gap-2 rounded-xl border p-5 text-center transition-all ${
              data.claimType === ct.value
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
          <label htmlFor="q-state" className="mb-1.5 block text-sm font-medium text-foreground/80">State</label>
          <select
            id="q-state"
            value={data.state}
            onChange={(e) => update({ state: e.target.value })}
            className={`w-full rounded-lg border bg-dvhive-bg/50 px-4 py-2.5 text-sm text-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 ${
              errors.state ? "border-red-400/50" : "border-border"
            }`}
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
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
            className={`w-full rounded-lg border bg-dvhive-bg/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 ${
              errors.zip ? "border-red-400/50" : "border-border"
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
          className={`w-full flex items-center gap-2 rounded-lg border bg-dvhive-bg/50 px-4 py-2.5 text-sm text-left transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 ${
            errors.accidentDate ? "border-red-400/50" : "border-border"
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
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                data.fault === opt.value
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
