import Image from "next/image"

const textures = [
  "/images/bg-car-art-1.webp",
  "/images/bg-car-art-2.webp",
  "/images/bg-car-art-3.webp",
]

export function BackgroundTexture({ variant = 0 }: { variant?: 0 | 1 | 2 }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
      aria-hidden="true"
    >
      <Image
        src={textures[variant]}
        alt=""
        fill
        sizes="100vw"
        quality={75} // Crushes the file size. Unnoticeable at 5% opacity!
        priority={variant === 0} // If it's the first texture (variant 0, likely in the Hero), load it right away.
        loading={variant === 0 ? "eager" : "lazy"} // Lazy load the ones further down the page.
        className="object-cover"
      />
    </div>
  )
}