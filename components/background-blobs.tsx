export function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <div className="animate-blob absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/[0.04] blur-3xl" />
      <div className="animate-blob-delay absolute top-3/4 right-1/4 w-80 h-80 rounded-full bg-gold/[0.03] blur-3xl" />
      <div className="animate-blob-delay-2 absolute top-1/2 left-1/2 w-72 h-72 rounded-full bg-gold/[0.02] blur-3xl" />
    </div>
  )
}
