"use client"

import { FadeIn } from "@/components/fade-in"
import { BackgroundTexture } from "@/components/background-texture"
import { YouTubeFacade } from "@/components/youtube-facade"

export function VideoSection() {
  return (
    <section className="relative z-10 px-4 py-16 lg:py-24">
      <BackgroundTexture variant={2} />
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="text-center mb-10">
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-[48px] lg:leading-[1.15]">
              See DVHIVE in <span className="text-gold">Action</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-yellow-50/95">
             Learn how our <strong>independent certified auto appraisers</strong> help you successfully navigate <strong>diminished value claims</strong> and <strong>total loss car disputes</strong> to recover your true fair market value.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="glass-light rounded-2xl p-2 overflow-hidden">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40">
              <YouTubeFacade
                videoId="kOnvljY4iRw"
                title="DVHIVE - How Our Certified Auto Appraisers Work"
              />
              <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-foreground/5" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
