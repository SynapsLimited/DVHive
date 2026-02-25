"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

interface YouTubeFacadeProps {
  videoId: string
  title: string
}

export function YouTubeFacade({ videoId, title }: YouTubeFacadeProps) {
  const [loaded, setLoaded] = useState(false)

  const handleLoad = useCallback(() => {
    setLoaded(true)
  }, [])

  if (loaded) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    )
  }

  return (
    <button
      onClick={handleLoad}
      className="group absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 transition-colors hover:bg-black/30"
      aria-label={`Play video: ${title}`}
    >
      {/* Local custom thumbnail */}
      <Image
        src="/images/dvhive-thumbnail-youtube.png"
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 800px"
      />
      {/* Play button overlay */}
      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gold/90 shadow-lg transition-all group-hover:scale-110 group-hover:bg-gold">
        <Play className="h-7 w-7 text-dvhive-bg" fill="currentColor" />
      </div>
    </button>
  )
}