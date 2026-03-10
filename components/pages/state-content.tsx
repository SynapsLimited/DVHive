"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { FadeIn } from "@/components/fade-in"
import { StateIsoMap } from "@/components/state-iso-map"
import { BackgroundTexture } from "@/components/background-texture"
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  XCircle,
  DollarSign,
  Scale,
  Phone,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { StateData } from "@/lib/state-data"

interface StateContentProps {
  state: StateData
}

export function StateContent({ state }: StateContentProps) {
  const [activeTab, setActiveTab] = useState<"diminished-value" | "total-loss">("diminished-value")

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative z-10 px-4 pt-20 pb-16 lg:pt-28 lg:pb-20">
        <BackgroundTexture variant={0} />
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left: Copy */}
            <FadeIn>
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-xs font-semibold text-gold">
                  <Clock className="h-3.5 w-3.5" />
                  Statute of Limitations: {state.statuteOfLimitations} Year{state.statuteOfLimitations !== 1 ? "s" : ""}
                </div>
                <h1 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-4xl lg:text-[44px]">
                  Diminished Value & Total Loss Claims in{" "}
                  <span className="text-gold">{state.name}</span>
                </h1>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-yellow-50/95">
                  Our certified auto appraisers specialize in <strong>diminished value in {state.name}</strong> and <strong>total loss in {state.name}</strong> claims. We help you recover the hidden value of your vehicle with appraisals compliant with {state.name} insurance laws.
                </p>
                <div className="mt-8">
                  <Link
                    href="/questionnaire"
                    className="group inline-flex items-center gap-2 rounded-lg bg-gold px-7 py-3.5 text-sm font-bold text-dvhive-bg shadow-lg shadow-gold/20 transition-all hover:scale-[1.03] hover:shadow-gold/30"
                  >
                    Get Free {state.name} Estimate
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </FadeIn>

            {/* Right: State map (real geographic shape) */}
            <FadeIn delay={0.15} direction="right">
              <div className="my-6 flex w-full items-center justify-center lg:my-0 lg:mt-0">
                <div className="relative flex h-32 w-32 items-center justify-center overflow-visible lg:h-32 lg:w-32">
                  <StateIsoMap stateSlug={state.slug} />
                  <div className="absolute -bottom-4 right-0 whitespace-nowrap rounded-lg border border-gold/20 bg-dvhive-bg px-3 py-1.5 text-xs font-semibold text-gold shadow-lg">
                    {state.name}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── Legal Information Section ─── */}
      <section className="relative z-10 px-4 py-16 lg:py-24">
        <BackgroundTexture variant={1} />
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h2 className="mb-10 text-center text-2xl font-bold text-foreground md:text-3xl">
              {state.name} <span className="text-gold">Claims Law</span>
            </h2>
          </FadeIn>

          <div className="grid items-start gap-8 lg:grid-cols-3">
            {/* Left: Animated Tabs content (2 cols wide) */}
            <FadeIn delay={0.05} className="lg:col-span-2">
              <div className="w-full">

                {/* Custom Bouncy Tab List */}
                <div className="relative mb-6 flex w-full rounded-full border border-border bg-gold/10 p-1.5 backdrop-blur-sm">
                  <button
                    onClick={() => setActiveTab("diminished-value")}
                    className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-colors duration-300 ${activeTab === "diminished-value" ? "text-background" : "text-foreground/80 hover:text-foreground"
                      }`}
                  >
                    {activeTab === "diminished-value" && (
                      <motion.div
                        layoutId="active-tab-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-gold shadow-md"
                        transition={{ type: "spring", stiffness: 400, damping: 25, bounce: 0.3 }}
                      />
                    )}
                    <Scale className="h-4 w-4" />
                    Diminished Value
                  </button>

                  <button
                    onClick={() => setActiveTab("total-loss")}
                    className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-colors duration-300 ${activeTab === "total-loss" ? "text-background" : "text-foreground/80 hover:text-foreground"
                      }`}
                  >
                    {activeTab === "total-loss" && (
                      <motion.div
                        layoutId="active-tab-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-gold shadow-md"
                        transition={{ type: "spring", stiffness: 400, damping: 25, bounce: 0.3 }}
                      />
                    )}
                    <DollarSign className="h-4 w-4" />
                    Total Loss
                  </button>
                </div>

                {/* Animated Tab Content */}
                <div className="glass-light relative overflow-hidden rounded-xl">
                  <AnimatePresence mode="wait">
                    {activeTab === "diminished-value" && (
                      <motion.div
                        key="diminished-value"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="p-6 lg:p-8"
                      >
                        <h3 className="mb-1 text-lg font-bold text-foreground">
                          Diminished Value in {state.name}
                        </h3>
                        <div className="mb-4 flex flex-wrap gap-3">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                            {state.dvThirdParty ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <XCircle className="h-3 w-3" />
                            )}
                            3rd Party: {state.dvThirdParty ? "Allowed" : "Not Allowed"}
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                            {state.dvFirstParty ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <XCircle className="h-3 w-3" />
                            )}
                            1st Party: {state.dvFirstParty ? "Allowed" : "Limited"}
                          </span>
                        </div>
                        <div className="text-sm leading-relaxed text-foreground/70">
                          {state.dvDescription}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "total-loss" && (
                      <motion.div
                        key="total-loss"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="p-6 lg:p-8"
                      >
                        <h3 className="mb-1 text-lg font-bold text-foreground">
                          Total Loss Claims in {state.name}
                        </h3>
                        <div className="mb-4">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                            <ShieldCheck className="h-3 w-3" />
                            Threshold: {state.totalLossThreshold}
                          </span>
                        </div>
                        <div className="text-sm leading-relaxed text-foreground/70">
                          {state.tlDescription}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </FadeIn>

            {/* Right: Key Facts sticky card */}
            <FadeIn delay={0.15}>
              <div className="top-28 rounded-xl border border-gold/20 bg-gold/5 p-6 lg:sticky">
                <h3 className="mb-5 text-base font-bold text-foreground">
                  Key Facts: {state.name}
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/10">
                      {state.atFaultAllowed ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-gold" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 text-foreground/40" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">At-Fault Claims</p>
                      <p className="text-xs text-foreground/50">
                        {state.atFaultAllowed ? "Allowed" : "Not Allowed"}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/10">
                      {state.uninsuredMotorist ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-gold" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 text-foreground/40" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Uninsured Motorist</p>
                      <p className="text-xs text-foreground/70">
                        {state.uninsuredMotorist ? "Coverage Available" : "Not Available"}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/10">
                      <DollarSign className="h-3.5 w-3.5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Avg. Payout</p>
                      <p className="text-xs text-foreground/70">
                        ${state.averagePayout.toLocaleString()}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/10">
                      <Clock className="h-3.5 w-3.5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Statute of Limitations</p>
                      <p className="text-xs text-foreground/70">
                        {state.statuteOfLimitations} Year{state.statuteOfLimitations !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="mt-6 flex flex-col gap-4">
                  <Link
                    href="/questionnaire"
                    className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-bold text-dvhive-bg transition-all hover:bg-gold/90"
                  >
                    Start Your Claim
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {/* "OR" Divider */}
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-border"></div>
                    <span className="text-xs font-medium uppercase tracking-wider text-foreground/40">
                      or
                    </span>
                    <div className="h-px flex-1 bg-border"></div>
                  </div>

                  <a
                    href="tel:888-597-3282"
                    className="group flex w-full items-center justify-center gap-2 rounded-lg border border-gold/30 bg-gold/5 px-4 py-2.5 text-sm font-bold text-gold transition-all hover:bg-gold/10"
                  >
                    <Phone className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
                    Call Now
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── State FAQ Section ─── */}
      <section className="relative z-10 px-4 py-16 lg:py-24">
        <BackgroundTexture variant={2} />
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
              {state.name} <span className="text-gold">FAQ</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {state.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                  <AccordionTrigger className="py-5 text-left text-base font-semibold text-foreground hover:text-gold hover:no-underline [&[data-state=open]]:text-gold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-[#F2F2F2]/70">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* ─── Global CTA Section ─── */}
      <section className="relative z-10 px-4 py-16 lg:py-24">
        <BackgroundTexture variant={0} />
        <FadeIn>
          <div className="mx-auto max-w-4xl rounded-2xl border border-gold/20 bg-gold/5 p-8 text-center lg:p-12">
            <h2 className="text-balance text-2xl font-extrabold text-foreground md:text-3xl lg:text-4xl">
              Get Paid or Don&apos;t Pay.
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-foreground/80">
              Our Claim-Ready Appraisal System is designed to maximize your{" "}
              {state.name} claim. Start your free estimate today.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/questionnaire"
                className="group inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3.5 text-base font-bold text-dvhive-bg shadow-lg shadow-gold/20 transition-all hover:scale-[1.03] hover:shadow-gold/30"
              >
                Get Free {state.name} Estimate
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3.5 text-sm font-semibold text-foreground/80 transition-colors hover:border-gold/30 hover:text-gold"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  )
}