"use client"

import { useRouter } from "next/navigation"
import USAMap from "react-usa-map"
import { useEffect, useRef, useState, useCallback } from "react"
import { stateSlugs, stateNames, stateCustomization } from "@/lib/map-config"

interface TooltipState {
  visible: boolean
  name: string
  x: number
  y: number
}

export function InteractiveUSAMap() {
  const router = useRouter()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, name: "", x: 0, y: 0 })

  function handleClick(event: { target: { dataset: { name: string } } }) {
    const abbr = event.target.dataset.name
    if (abbr && stateSlugs[abbr]) {
      router.push(`/state/${stateSlugs[abbr]}`)
    }
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const target = e.target as SVGPathElement
    const abbr = target?.getAttribute?.("data-name") || target?.closest?.("[data-name]")?.getAttribute("data-name")
    if (abbr && stateNames[abbr] && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect()
      setTooltip({
        visible: true,
        name: stateNames[abbr],
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 12,
      })
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTooltip((prev) => ({ ...prev, visible: false }))
  }, [])

  // Attach event listeners and strip native <title> elements so browser tooltip doesn't show
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    // Remove native SVG <title> to prevent browser tooltip
    const paths = el.querySelectorAll("path[data-name]")
    paths.forEach((path) => {
      const existing = path.querySelector("title")
      if (existing) existing.remove()
      path.setAttribute("role", "link")
      path.setAttribute("tabindex", "0")
      const abbr = path.getAttribute("data-name")
      if (abbr && stateNames[abbr]) {
        path.setAttribute("aria-label", `View ${stateNames[abbr]} laws`)
      }
    })

    el.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <div
      ref={wrapperRef}
      className="relative mx-auto max-w-3xl [&_svg]:w-full [&_svg]:h-auto [&_path]:cursor-pointer [&_path]:transition-all [&_path]:duration-200 [&_path]:outline-none [&_path:focus]:outline-none [&_path:hover]:brightness-[1.15] [&_path:active]:brightness-150"
    >
      <USAMap customize={stateCustomization} onClick={handleClick} />

      {/* Custom Floating Tooltip */}
      <div
        className="pointer-events-none absolute z-50 flex items-center gap-2 rounded-lg border border-gold/40 bg-dvhive-bg/95 px-3 py-2 shadow-lg shadow-dvhive-bg/50 transition-opacity duration-150"
        style={{
          left: tooltip.x,
          top: tooltip.y,
          transform: "translate(-50%, -100%)",
          opacity: tooltip.visible ? 1 : 0,
        }}
        role="tooltip"
        aria-hidden={!tooltip.visible}
      >
        <span className="text-sm font-bold text-foreground whitespace-nowrap">{tooltip.name}</span>
        <span className="text-[10px] font-semibold text-gold/80 whitespace-nowrap">View Laws</span>
      </div>
    </div>
  )
}
