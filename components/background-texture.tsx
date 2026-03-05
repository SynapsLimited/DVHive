import Image from "next/image"

const textures = [
  "/images/bg-car-art-1.png",
  "/images/bg-car-art-2.png",
  "/images/bg-car-art-3.png",
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
        loading="lazy" // Defers loading until the user scrolls near it
        quality={30} // Crushes the file size. Unnoticeable at 5% opacity!
        className="object-cover"
      />
    </div>
  )
}