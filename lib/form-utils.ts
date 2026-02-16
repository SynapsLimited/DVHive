/** Phone mask: (555) 555-5555 */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10)
  if (digits.length === 0) return ""
  if (digits.length <= 3) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

/** Strip phone formatting to raw digits */
export function stripPhone(value: string): string {
  return value.replace(/\D/g, "")
}

/** Format number with commas: 12500 -> "12,500" */
export function formatNumber(value: string): string {
  const digits = value.replace(/\D/g, "")
  if (!digits) return ""
  return Number(digits).toLocaleString("en-US")
}

/** Strip commas from formatted number */
export function stripCommas(value: string): string {
  return value.replace(/,/g, "")
}
