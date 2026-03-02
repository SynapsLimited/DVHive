"use client"

import type { FormData } from "./questionnaire-form"
import { FieldError } from "./field-error"
import { formatNumber } from "@/lib/form-utils"

interface Props {
  data: FormData
  update: (fields: Partial<FormData>) => void
  errors: Record<string, string>
}

function ToggleGroup({
  options,
  value,
  onChange,
  error,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  return (
    <>
      <div className="flex gap-3">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${value === opt
              ? "border-gold bg-gold/10 text-gold"
              : error
                ? "border-red-400/50 text-foreground/60 hover:border-gold/30"
                : "border-border text-foreground/60 hover:border-gold/30"
              }`}
            aria-pressed={value === opt}
          >
            {opt}
          </button>
        ))}
      </div>
      <FieldError message={error} />
    </>
  )
}

function CurrencyInput({
  id,
  value,
  onChange,
  placeholder,
  error,
}: {
  id: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  error?: string
}) {
  return (
    <>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-foreground/80">$</span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "")
            onChange(formatNumber(raw))
          }}
          placeholder={placeholder}
          className={`w-full rounded-lg border bg-dvhive-bg/50 py-2.5 pl-7 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 ${error ? "border-red-400/50" : "border-border"
            }`}
        />
      </div>
      <FieldError message={error} />
    </>
  )
}

export function StepDetails({ data, update, errors }: Props) {
  const isDV = data.claimType === "Diminished Value"
  const isTL = data.claimType === "Total Loss"

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-1 text-lg font-bold text-foreground">
          {isDV ? "Diminished Value Details" : isTL ? "Total Loss Details" : "Claim Details"}
        </h3>
        <p className="text-sm text-foreground/80">
          {isDV
            ? "Tell us about the repairs and damage to your vehicle."
            : isTL
              ? "Tell us about the insurance offer you received."
              : "Please provide details about your situation."}
        </p>
      </div>

      {(isDV || (!isDV && !isTL)) && (
        <>
          <div>
            <p className="mb-2 text-sm font-medium text-foreground/80">Have repairs been completed?</p>
            <ToggleGroup
              options={["Yes", "No", "Partial"]}
              value={data.repairsDone}
              onChange={(v) => update({ repairsDone: v })}
              error={errors.repairsDone}
            />
          </div>

          <div>
            <label htmlFor="d-cost" className="mb-1.5 block text-sm font-medium text-foreground/80">
              Repair Cost <span className="text-foreground/30">(if known)</span>
            </label>
            <CurrencyInput
              id="d-cost"
              value={data.repairCost}
              onChange={(v) => update({ repairCost: v })}
              placeholder="e.g. 8,500"
              error={errors.repairCost}
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-foreground/80">Was there frame/structural damage?</p>
            <ToggleGroup
              options={["Yes", "No", "Unknown"]}
              value={data.frameDamage}
              onChange={(v) => update({ frameDamage: v })}
              error={errors.frameDamage}
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-foreground/80">Any prior accidents on record?</p>
            <ToggleGroup
              options={["Yes", "No", "Unknown"]}
              value={data.priorAccidents}
              onChange={(v) => update({ priorAccidents: v })}
              error={errors.priorAccidents}
            />
          </div>
        </>
      )}

      {isTL && (
        <>
          <div>
            <p className="mb-2 text-sm font-medium text-foreground/80">Have you received an offer from your insurer?</p>
            <ToggleGroup
              options={["Yes", "No"]}
              value={data.offerReceived}
              onChange={(v) => update({ offerReceived: v })}
              error={errors.offerReceived}
            />
          </div>

          {data.offerReceived === "Yes" && (
            <div>
              <label htmlFor="tl-offer" className="mb-1.5 block text-sm font-medium text-foreground/80">Offer Amount</label>
              <CurrencyInput
                id="tl-offer"
                value={data.offerAmount}
                onChange={(v) => update({ offerAmount: v })}
                placeholder="e.g. 14,000"
                error={errors.offerAmount}
              />
            </div>
          )}

          <div>
            <p className="mb-2 text-sm font-medium text-foreground/80">Are you keeping the salvage?</p>
            <ToggleGroup
              options={["Yes", "No", "Undecided"]}
              value={data.keepingSalvage}
              onChange={(v) => update({ keepingSalvage: v })}
              error={errors.keepingSalvage}
            />
          </div>

          <div>
            <label htmlFor="tl-fair" className="mb-1.5 block text-sm font-medium text-foreground/80">
              What do you believe the fair value is?
            </label>
            <CurrencyInput
              id="tl-fair"
              value={data.fairValue}
              onChange={(v) => update({ fairValue: v })}
              placeholder="e.g. 22,000"
              error={errors.fairValue}
            />
          </div>
        </>
      )}
    </div>
  )
}