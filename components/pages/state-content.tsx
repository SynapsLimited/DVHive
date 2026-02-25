"use client"

import Link from "next/link"
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
} from "lucide-react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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
              {/* Wrapper to center the map in the column */}
              {/* Reduced spacing (my-6) to fit the smaller map better */}
              <div className="flex w-full items-center justify-center my-6 lg:my-0 lg:mt-0">
                {/* Map Container: 
                  - Mobile & Desktop: h-32 w-32. Standardized size across all devices.
                  - overflow-visible: ensures shapes don't get clipped.
                */}
                <div className="relative flex h-32 w-32 items-center justify-center overflow-visible lg:h-32 lg:w-32">
                  <StateIsoMap stateSlug={state.slug} />
                  {/* Badge positioned relative to the container */}
                  <div className="absolute -bottom-4 right-0 rounded-lg border border-gold/20 bg-dvhive-bg px-3 py-1.5 text-xs font-semibold text-gold shadow-lg whitespace-nowrap">
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
            {/* Left: Tabs content (2 cols wide) */}
            <FadeIn delay={0.05} className="lg:col-span-2">
              <Tabs defaultValue="diminished-value" className="w-full">
                <TabsList className="mb-6 w-full grid grid-cols-2 bg-muted/50 border border-border">
                  <TabsTrigger
                    value="diminished-value"
                    className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold data-[state=active]:shadow-none text-foreground/80"
                  >
                    <Scale className="mr-2 h-4 w-4" />
                    Diminished Value
                  </TabsTrigger>
                  <TabsTrigger
                    value="total-loss"
                    className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold data-[state=active]:shadow-none text-foreground/80"
                  >
                    <DollarSign className="mr-2 h-4 w-4" />
                    Total Loss
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="diminished-value" className="rounded-xl glass-light p-6 lg:p-8">
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
                  <p className="text-sm leading-relaxed text-foreground/70">
                    {state.dvDescription}
                  </p>
                </TabsContent>

                <TabsContent value="total-loss" className="rounded-xl glass-light p-6 lg:p-8">
                  <h3 className="mb-1 text-lg font-bold text-foreground">
                    Total Loss Claims in {state.name}
                  </h3>
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                      <ShieldCheck className="h-3 w-3" />
                      Threshold: {state.totalLossThreshold}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/70">
                    {state.tlDescription}
                  </p>
                </TabsContent>
              </Tabs>
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
                <div className="mt-6">
                  <Link
                    href="/questionnaire"
                    className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-bold text-dvhive-bg transition-all hover:bg-gold/90"
                  >
                    Start Your Claim
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
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
                  <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-gold hover:no-underline py-5 [&[data-state=open]]:text-gold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#F2F2F2]/70 leading-relaxed text-sm pb-5">
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
            <p className="mx-auto mt-4 max-w-xl text-foreground/80 leading-relaxed">
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
                className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3.5 text-sm font-semibold text-foreground/80 transition-colors hover:text-gold hover:border-gold/30"
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
