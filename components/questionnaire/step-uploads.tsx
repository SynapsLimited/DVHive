"use client"

import { useCallback } from "react"
import type { FormData } from "./questionnaire-form"
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react"

interface Props {
  data: FormData
  update: (fields: Partial<FormData>) => void
}

export function StepUploads({ data, update }: Props) {
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const dropped = Array.from(e.dataTransfer.files)
      update({ files: [...data.files, ...dropped] })
    },
    [data.files, update]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selected = Array.from(e.target.files)
        update({ files: [...data.files, ...selected] })
      }
    },
    [data.files, update]
  )

  function removeFile(index: number) {
    update({ files: data.files.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-foreground mb-1">Upload Documents</h3>
        <p className="text-sm text-foreground/50">
          Optionally upload repair estimates, photos of damage, or a police report.
        </p>
      </div>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border p-10 text-center transition-colors hover:border-gold/30"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
          <Upload className="h-5 w-5 text-gold" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground/80">
            Drag & drop files here
          </p>
          <p className="text-xs text-foreground/40 mt-1">or click to browse</p>
        </div>
        <label className="cursor-pointer rounded-lg border border-border px-4 py-2 text-xs font-medium text-foreground/60 hover:border-gold/30 hover:text-gold transition-colors">
          Browse Files
          <input
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileInput}
            className="sr-only"
          />
        </label>
      </div>

      {/* File list */}
      {data.files.length > 0 && (
        <ul className="space-y-2">
          {data.files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-muted/20 px-4 py-2.5"
            >
              {file.type.startsWith("image/") ? (
                <ImageIcon className="h-4 w-4 text-gold/60 shrink-0" />
              ) : (
                <FileText className="h-4 w-4 text-gold/60 shrink-0" />
              )}
              <span className="flex-1 truncate text-sm text-foreground/80">{file.name}</span>
              <span className="text-xs text-foreground/40">
                {(file.size / 1024).toFixed(0)} KB
              </span>
              <button
                onClick={() => removeFile(i)}
                className="text-foreground/30 hover:text-destructive transition-colors"
                aria-label={`Remove ${file.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-foreground/30 text-center">
        This step is optional. You can skip to the next step.
      </p>
    </div>
  )
}
