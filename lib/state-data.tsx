import React from "react"

export interface StateData {
  slug: string
  name: string
  abbreviation: string
  statuteOfLimitations: number
  totalLossThreshold: string
  atFaultAllowed: boolean
  uninsuredMotorist: boolean
  averagePayout: number
  dvFirstParty: boolean
  dvThirdParty: boolean
  dvDescription: string | React.ReactNode
  tlDescription: string | React.ReactNode
  faqs: { question: string; answer: string }[]
}

/* ── Helper: generate a consistent state entry ── */

function makeState(
  slug: string,
  name: string,
  abbreviation: string,
  overrides?: Partial<StateData>
): StateData {
  const sol = overrides?.statuteOfLimitations ?? 3
  const threshold = overrides?.totalLossThreshold ?? "If repair costs exceed 75% of the vehicle's actual cash value"
  const avgPayout = overrides?.averagePayout ?? 5500
  const dvFirst = overrides?.dvFirstParty ?? false
  const dvThird = overrides?.dvThirdParty ?? true
  const atFault = overrides?.atFaultAllowed ?? true
  const um = overrides?.uninsuredMotorist ?? true

  return {
    slug,
    name,
    abbreviation,
    statuteOfLimitations: sol,
    totalLossThreshold: overrides?.totalLossThreshold ?? threshold,
    atFaultAllowed: atFault,
    uninsuredMotorist: um,
    averagePayout: avgPayout,
    dvFirstParty: dvFirst,
    dvThirdParty: dvThird,
    dvDescription:
      overrides?.dvDescription ??
      `${name} allows third-party diminished value claims against the at-fault driver's insurance company. Under ${name} tort law, if another driver caused the accident, you have the right to recover the difference between your vehicle's pre-accident and post-repair market value. While first-party diminished value claims (against your own insurer) are ${dvFirst ? "recognized" : "generally not recognized"} in ${name}, third-party claims have strong legal precedent. A certified, data-driven appraisal is essential for maximizing your recovery. The statute of limitations for property damage in ${name} is ${sol} year${sol !== 1 ? "s" : ""}, so timely action is critical.`,
    tlDescription:
      overrides?.tlDescription ??
      `${name} uses a total loss threshold where your vehicle is declared a total loss ${threshold.toLowerCase()}. When this happens, the insurer must pay the actual cash value (ACV) of your vehicle minus your deductible. ${name} law requires insurers to use fair market comparisons from your local area when calculating ACV. If you believe the insurer's offer is below your vehicle's true value, you have the right to dispute the valuation with your own evidence, including a certified appraisal. Applicable taxes, title fees, and registration costs should be included in the settlement.`,
    faqs: overrides?.faqs ?? [
      {
        question: `Is Diminished Value legal in ${name}?`,
        answer: `Yes. ${name} recognizes third-party diminished value claims under tort law. You can file a claim against the at-fault driver's insurance company to recover the loss in market value your vehicle suffered due to the accident.${dvFirst ? ` ${name} also recognizes limited first-party claims under certain policy conditions.` : ` First-party claims against your own insurer are generally not permitted in ${name}.`}`,
      },
      {
        question: `What is the statute of limitations in ${name}?`,
        answer: `In ${name}, the statute of limitations for property damage claims is ${sol} year${sol !== 1 ? "s" : ""} from the date of the accident. After this period, you lose the legal right to file a claim. We strongly recommend starting the appraisal process as soon as possible to preserve your rights.`,
      },
      {
        question: `How much is my ${name} claim worth?`,
        answer: `The average diminished value payout we've recovered for ${name} clients is approximately $${avgPayout.toLocaleString()}, though individual cases vary significantly based on vehicle year, make, model, mileage, and extent of damage. Luxury and late-model vehicles typically see higher diminished value losses. Our free assessment can give you a personalized estimate.`,
      },
      {
        question: `Does ${name} require a certified appraisal?`,
        answer: `While ${name} law does not mandate a specific type of appraisal, insurance companies are far more likely to take your claim seriously when backed by a certified, professional appraisal with comparable market data. Our Claim-Ready Appraisal System is designed specifically for ${name} insurance standards and has a proven track record of success.`,
      },
    ],
  }
}

/* ── All 50 States + DC ── */

export const stateDataMap: Record<string, StateData> = {
  /* ───── Major States with Specific Data ───── */

  georgia: makeState("georgia", "Georgia", "GA", {
    statuteOfLimitations: 4,
    totalLossThreshold: "If repair costs exceed 75% of the vehicle's actual cash value",
    atFaultAllowed: true,
    dvFirstParty: true,
    dvThirdParty: true,
    averagePayout: 7200,
    dvDescription:
      "Georgia is the gold standard for diminished value claims. It is one of the only states that explicitly recognizes both first-party and third-party DV claims, thanks to the landmark Mabry v. State Farm ruling. This means you can file a DV claim against your OWN insurer, not just the at-fault party's carrier. Georgia courts use the '17c Formula' as a baseline, but our certified appraisals go beyond this simplified formula to capture the true market loss. Georgia's strong consumer protections and established case law make it one of the most favorable states in the nation for DV recovery.",
    tlDescription:
      "Georgia uses a 75% total loss threshold. If the estimated repair costs equal or exceed 75% of the vehicle's actual cash value, the insurer can declare it a total loss. Georgia's regulations require insurers to provide a detailed written valuation using comparable local sales. The state also requires payment of applicable taxes, tag, and title fees. Georgia's Insurance Commissioner has issued bulletins reinforcing consumer rights in total loss situations, making it a relatively strong state for disputing undervalued offers.",
    faqs: [
      {
        question: "Is Georgia a first-party DV state?",
        answer: "Yes. Georgia is one of the only states where you can file a diminished value claim against your own insurance company, thanks to the Mabry v. State Farm ruling. You can also file third-party claims against the at-fault driver's insurer.",
      },
      {
        question: "What is the 17c Formula?",
        answer: "The 17c Formula is a simplified method used by State Farm (and adopted by other insurers) to calculate diminished value. It starts with the vehicle's base value and applies damage multipliers. However, this formula significantly undervalues most claims. Our certified appraisals use real market data to produce a more accurate and higher valuation.",
      },
      {
        question: "How long do I have to file in Georgia?",
        answer: "Georgia has a 4-year statute of limitations for property damage claims. However, we strongly recommend filing as soon as possible after repairs are complete, as delay can reduce the amount you recover.",
      },
      {
        question: "What is the average DV payout in Georgia?",
        answer: "Our Georgia clients recover an average of approximately $7,200 in diminished value, though this varies widely based on the vehicle and damage severity. Luxury vehicles and late-model cars with significant structural damage often see payouts well above this average.",
      },
    ],
  }),

  texas: makeState("texas", "Texas", "TX", {
    statuteOfLimitations: 2,
    totalLossThreshold: "If repair costs exceed 100% of the vehicle's actual cash value",
    averagePayout: 6750,
    dvDescription:
      "Texas allows third-party diminished value claims filed against the at-fault driver's insurance carrier. While first-party claims are generally not recognized, Texas courts have a strong history of awarding diminished value compensation in third-party cases. Under Texas law, you have the right to recover the difference between your vehicle's pre-accident and post-repair market value. The state follows a 'fair market value' standard, meaning your claim must be supported by comparable sales data and a certified appraisal.",
    tlDescription:
      "Texas uses a 100% total loss threshold, meaning your vehicle is declared a total loss only when the cost of repair equals or exceeds its actual cash value (ACV). This is one of the most consumer-friendly thresholds in the nation. If your insurer declares your vehicle a total loss, they are required to pay the ACV minus your deductible. Texas law also requires insurers to include applicable taxes, title, and registration fees in their total loss settlement offers.",
  }),

  florida: makeState("florida", "Florida", "FL", {
    statuteOfLimitations: 4,
    totalLossThreshold: "If repair costs exceed 80% of the vehicle's actual cash value",
    averagePayout: 5980,
    dvDescription: (
      <div className="space-y-4">
        <h4 className="font-bold text-lg text-gold">Filing a Diminished Value Claim in Florida</h4>
        <p>If you’re pursuing a Florida diminished value claim, you must provide the at-fault driver’s insurance company clear evidence of how much value your vehicle lost after the accident, even after repairs. While trade-in estimates or dealership opinions may seem helpful, they typically do not carry the same weight as a certified diminished value appraisal report prepared by a licensed vehicle appraiser. A diminished value calculator in Florida can help you estimate your vehicle’s potential loss for your own knowledge before pursuing a claim.</p>
        <p>DVHIVE takes a comprehensive, market-based approach. Our appraisers evaluate your vehicle’s class, damage severity, condition, and real-world comparable sales to determine an accurate post-accident value. This detailed methodology provides stronger support during negotiations and helps ensure your diminished value claim reflects the full market loss.</p>
        <p>If the insurance company pushes back or attempts to negotiate, we continue supporting you step by step so you can move forward with confidence.</p>
        
        <h4 className="font-bold text-lg text-gold pt-2">Florida Diminished Value Law (DVHIVE Overview)</h4>
        <p>If you were involved in a car accident in Florida and were not at fault, you are eligible to pursue a diminished value claim. Under Florida law, courts have recognized that a vehicle loses market value after an accident, even when repairs are completed properly.</p>
        <p>While every claim depends on the specific facts and insurance policy involved, Florida has historically been considered a state where third-party diminished value claims may be permitted.</p>

        <h4 className="font-bold text-lg text-gold pt-2">Florida Recognizes Post-Accident Market Value Loss</h4>
        <p>Even when repairs are completed properly, accident history typically appears on reports such as Carfax or AutoCheck. Dealers and valuation tools like Kelley Blue Book and Edmunds often factor that history into pricing decisions, which can reduce resale or trade-in value. Buyers often pay less for vehicles with a recorded accident, which is commonly referred to as inherent diminished value.</p>
        <p>Florida case law, including decisions such as <em>McHale v. Farm Bureau</em> and <em>Siegle v. Progressive</em>, has acknowledged that diminished value may be considered part of property damage in certain situations.</p>

        <h4 className="font-bold text-lg text-gold pt-2">Most Claims Are Filed Against the At-Fault Driver’s Insurance</h4>
        <p>In many cases, a Florida diminished value claim is submitted to the at-fault driver’s insurance company, not your own insurer. This is known as a third-party claim.</p>
        <p>Insurance companies may require supporting documentation before evaluating or considering payment for diminished value.</p>

        <h4 className="font-bold text-lg text-gold pt-2">There Is a Time Limit to File</h4>
        <p>Florida generally provides a four-year statute of limitations for property damage claims, which may include diminished value. This time period typically begins on the date of the accident.</p>
        <p>Because deadlines and legal interpretations can change, it’s important to act promptly and verify how the statute applies to your specific situation.</p>

        <h4 className="font-bold text-lg text-gold pt-2">Documentation Is Often Required</h4>
        <p>Insurance carriers require objective evidence before considering a diminished value settlement. This may include:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>The vehicle’s pre-loss market value</li>
          <li>The post-repair market value</li>
          <li>Market comparisons showing the impact of accident history</li>
        </ul>
        <p>A certified diminished value appraisal report helps provide structured documentation to support a claim.</p>

        <h4 className="font-bold text-lg text-gold pt-2">Serving Drivers Across Florida</h4>
        <p>DVHIVE assists vehicle owners throughout Florida, including:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Miami</li>
          <li>Orlando</li>
          <li>Tampa</li>
          <li>Jacksonville</li>
          <li>Fort Lauderdale</li>
          <li>Boca Raton</li>
          <li>West Palm Beach</li>
          <li>St. Petersburg</li>
        </ul>
        <p>Whether you are filing a Florida diminished value claim, disputing a total loss settlement, or seeking clarification on insurance valuation practices, understanding your rights under Florida law is an important first step.</p>
      </div>
    ),
    tlDescription: (
      <div className="space-y-4">
        <h4 className="font-bold text-lg text-gold">Filing a Total Loss Claim in Florida</h4>
        <p>If you’re pursuing a Florida total loss claim, it’s important to carefully review how the insurance company calculated your vehicle’s actual cash value (ACV) before the accident. While online pricing tools or basic trade-in estimates may provide general guidance, they typically do not carry the same weight as a structured, independent total loss appraisal prepared by a qualified vehicle appraiser.</p>
        <p>Insurance companies rely on internal valuation systems that use comparable vehicles, mileage adjustments, and condition ratings. If those comparables do not accurately reflect your vehicle’s trim level, upgrades, or local market conditions, the settlement offer may not fully represent fair market value.</p>
        <p>DVHIVE takes a detailed, market-based approach. Our appraisers analyze comparable sales, vehicle-specific condition factors, equipment options, and regional pricing trends to determine a well-supported pre-loss market value. This comprehensive methodology provides stronger support during negotiations and helps ensure your total loss settlement reflects accurate market data.</p>
        <p>If the insurance company pushes back or proposes adjustments during negotiations, we continue supporting you through each step so you can move forward with clarity and confidence.</p>
        
        <h4 className="font-bold text-lg text-gold pt-2">Total Loss in Florida (DVHIVE Overview)</h4>
        <p>If your vehicle is heavily damaged in a crash, it may be declared a total loss in Florida. In most cases, this happens when repair costs and salvage value approach or exceed a large percentage of the vehicle’s actual cash value (ACV) before the accident.</p>
        <p>Actual cash value represents what your car was worth on the open market immediately prior to the collision, based on factors such as:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Year, make, and model</li>
          <li>Mileage</li>
          <li>Condition</li>
          <li>Prior accident history</li>
          <li>Comparable vehicles in your local market</li>
        </ul>

        <h4 className="font-bold text-lg text-gold pt-2">How Insurance Companies Calculate Total Loss Value</h4>
        <p>Insurance companies typically use internal valuation systems to determine ACV. These systems rely on comparable vehicle listings and condition adjustments. However, the selected comparables or applied adjustments may not always reflect current market demand in cities such as Miami, Orlando, Tampa, Jacksonville, or Fort Lauderdale.</p>
        <p>Before accepting a total loss settlement, it’s important to review:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>The comparable vehicles used</li>
          <li>Any mileage or condition deductions</li>
          <li>The full valuation breakdown</li>
        </ul>
        <p>Many disputes arise from differences in comparable selection or valuation adjustments. Independent documentation can help support a more accurate review.</p>

        <h4 className="font-bold text-lg text-gold pt-2">If the Settlement Offer Appears Too Low</h4>
        <p>If you believe your Florida total loss settlement does not reflect fair market value, you have the right to request clarification and also hire an independent appraiser.</p>
        <p>An independent appraisal may provide:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Market-based comparable analysis</li>
          <li>Review of vehicle-specific condition factors</li>
          <li>Structured documentation suitable for negotiation</li>
        </ul>
        <p>This level of documentation can be especially important during formal settlement disputes.</p>
        <p>In some cases, auto insurance policies include an appraisal clause. This provision allows each party to hire an independent appraiser, and if the two appraisers cannot agree, a neutral umpire may be appointed to help resolve the valuation dispute. During this process, professionally prepared appraisal reports carry significant weight.</p>
        <p>Insurance companies often rely on structured internal systems. When vehicle owners present certified, third-party appraisal documentation, the valuation discussion shifts from opinion to documented market evidence.</p>
        <p>DVHIVE’s role is to provide objective, defensible valuation analysis that strengthens your position during total loss negotiations.</p>
      </div>
    )
  }),

  california: makeState("california", "California", "CA", {
    statuteOfLimitations: 3,
    totalLossThreshold: "If repair costs exceed 100% of the vehicle's actual cash value",
    averagePayout: 8200,
    dvDescription:
      "California is one of the most favorable states for diminished value claims, thanks to strong consumer protection laws and a large automotive market. Third-party DV claims are well-established under California Civil Code. The state's high vehicle values mean diminished value losses can be substantial. California courts have recognized that even properly repaired vehicles suffer inherent diminished value simply due to their accident history appearing on vehicle history reports.",
    tlDescription:
      "California uses a 100% total loss threshold. Your vehicle is considered a total loss when repair costs meet or exceed its actual cash value. California's Insurance Code Section 2695.8 requires insurers to use fair and accurate methods when determining ACV, including comparable vehicle analysis within the local market. Insurers must also pay taxes, license, and transfer fees as part of the settlement.",
  }),

  "new-york": makeState("new-york", "New York", "NY", {
    statuteOfLimitations: 3,
    totalLossThreshold: "If repair costs exceed 75% of the vehicle's actual cash value",
    averagePayout: 7100,
    dvDescription:
      "New York recognizes third-party diminished value claims under its tort liability system. Given the state's high vehicle values, particularly in the New York City metro area, DV losses can be significant. New York follows a pure comparative negligence standard, meaning you can recover even if you were partially at fault, though your award is reduced by your percentage of fault. A well-documented appraisal is critical for success in New York's competitive insurance market.",
    tlDescription:
      "New York uses a 75% total loss threshold. The state's Insurance Department regulations require insurers to base ACV calculations on comparable vehicles within the local market. New York also requires insurers to provide a detailed written explanation of their valuation methodology, giving consumers a basis to challenge low offers.",
  }),

  /* ───── All Other States ───── */

  alabama: makeState("alabama", "Alabama", "AL", { statuteOfLimitations: 2, averagePayout: 4800, totalLossThreshold: "If repair costs exceed 75% of the vehicle's actual cash value" }),
  alaska: makeState("alaska", "Alaska", "AK", { statuteOfLimitations: 2, averagePayout: 5100 }),
  arizona: makeState("arizona", "Arizona", "AZ", { statuteOfLimitations: 2, averagePayout: 5400, totalLossThreshold: "If repair costs exceed 100% of the vehicle's actual cash value" }),
  arkansas: makeState("arkansas", "Arkansas", "AR", { statuteOfLimitations: 3, averagePayout: 4600, totalLossThreshold: "If repair costs exceed 70% of the vehicle's actual cash value" }),
  colorado: makeState("colorado", "Colorado", "CO", { statuteOfLimitations: 3, averagePayout: 5800, totalLossThreshold: "If repair costs exceed 100% of the vehicle's actual cash value" }),
  connecticut: makeState("connecticut", "Connecticut", "CT", { statuteOfLimitations: 2, averagePayout: 5900 }),
  delaware: makeState("delaware", "Delaware", "DE", { statuteOfLimitations: 2, averagePayout: 5200 }),
  "district-of-columbia": makeState("district-of-columbia", "District of Columbia", "DC", { statuteOfLimitations: 3, averagePayout: 6400 }),
  hawaii: makeState("hawaii", "Hawaii", "HI", { statuteOfLimitations: 2, averagePayout: 5600 }),
  idaho: makeState("idaho", "Idaho", "ID", { statuteOfLimitations: 3, averagePayout: 4900 }),
  illinois: makeState("illinois", "Illinois", "IL", { statuteOfLimitations: 5, averagePayout: 6100, totalLossThreshold: "If repair costs exceed 50% of the vehicle's actual cash value" }),
  indiana: makeState("indiana", "Indiana", "IN", { statuteOfLimitations: 2, averagePayout: 5000, totalLossThreshold: "If repair costs exceed 70% of the vehicle's actual cash value" }),
  iowa: makeState("iowa", "Iowa", "IA", { statuteOfLimitations: 5, averagePayout: 4700, totalLossThreshold: "If repair costs exceed 50% of the vehicle's actual cash value" }),
  kansas: makeState("kansas", "Kansas", "KS", { statuteOfLimitations: 2, averagePayout: 4800 }),
  kentucky: makeState("kentucky", "Kentucky", "KY", { statuteOfLimitations: 2, averagePayout: 4900 }),
  louisiana: makeState("louisiana", "Louisiana", "LA", { statuteOfLimitations: 1, averagePayout: 5300, totalLossThreshold: "If repair costs exceed 75% of the vehicle's actual cash value" }),
  maine: makeState("maine", "Maine", "ME", { statuteOfLimitations: 6, averagePayout: 5100 }),
  maryland: makeState("maryland", "Maryland", "MD", { statuteOfLimitations: 3, averagePayout: 5800, totalLossThreshold: "If repair costs exceed 75% of the vehicle's actual cash value" }),
  massachusetts: makeState("massachusetts", "Massachusetts", "MA", { statuteOfLimitations: 3, averagePayout: 6000 }),
  michigan: makeState("michigan", "Michigan", "MI", { statuteOfLimitations: 3, averagePayout: 4500, totalLossThreshold: "If repair costs exceed 75% of the vehicle's actual cash value" }),
  minnesota: makeState("minnesota", "Minnesota", "MN", { statuteOfLimitations: 6, averagePayout: 5200, totalLossThreshold: "If repair costs exceed 70% of the vehicle's actual cash value" }),
  mississippi: makeState("mississippi", "Mississippi", "MS", { statuteOfLimitations: 3, averagePayout: 4400 }),
  missouri: makeState("missouri", "Missouri", "MO", { statuteOfLimitations: 5, averagePayout: 5100, totalLossThreshold: "If repair costs exceed 80% of the vehicle's actual cash value" }),
  montana: makeState("montana", "Montana", "MT", { statuteOfLimitations: 2, averagePayout: 4700 }),
  nebraska: makeState("nebraska", "Nebraska", "NE", { statuteOfLimitations: 4, averagePayout: 4800 }),
  nevada: makeState("nevada", "Nevada", "NV", { statuteOfLimitations: 3, averagePayout: 5500, totalLossThreshold: "If repair costs exceed 65% of the vehicle's actual cash value" }),
  "new-hampshire": makeState("new-hampshire", "New Hampshire", "NH", { statuteOfLimitations: 3, averagePayout: 5400 }),
  "new-jersey": makeState("new-jersey", "New Jersey", "NJ", { statuteOfLimitations: 6, averagePayout: 6200, totalLossThreshold: "If repair costs exceed 100% of the vehicle's actual cash value" }),
  "new-mexico": makeState("new-mexico", "New Mexico", "NM", { statuteOfLimitations: 4, averagePayout: 4600 }),
  "north-carolina": makeState("north-carolina", "North Carolina", "NC", { statuteOfLimitations: 3, averagePayout: 5600, totalLossThreshold: "If repair costs exceed 75% of the vehicle's actual cash value" }),
  "north-dakota": makeState("north-dakota", "North Dakota", "ND", { statuteOfLimitations: 6, averagePayout: 4500 }),
  ohio: makeState("ohio", "Ohio", "OH", { statuteOfLimitations: 4, averagePayout: 5300, totalLossThreshold: "If repair costs exceed 100% of the vehicle's actual cash value" }),
  oklahoma: makeState("oklahoma", "Oklahoma", "OK", { statuteOfLimitations: 2, averagePayout: 4700, totalLossThreshold: "If repair costs exceed 60% of the vehicle's actual cash value" }),
  oregon: makeState("oregon", "Oregon", "OR", { statuteOfLimitations: 6, averagePayout: 5700, totalLossThreshold: "If repair costs exceed 80% of the vehicle's actual cash value" }),
  pennsylvania: makeState("pennsylvania", "Pennsylvania", "PA", { statuteOfLimitations: 2, averagePayout: 5800, totalLossThreshold: "If repair costs exceed 100% of the vehicle's actual cash value" }),
  "rhode-island": makeState("rhode-island", "Rhode Island", "RI", { statuteOfLimitations: 10, averagePayout: 5500 }),
  "south-carolina": makeState("south-carolina", "South Carolina", "SC", { statuteOfLimitations: 3, averagePayout: 5200, totalLossThreshold: "If repair costs exceed 75% of the vehicle's actual cash value" }),
  "south-dakota": makeState("south-dakota", "South Dakota", "SD", { statuteOfLimitations: 6, averagePayout: 4500 }),
  tennessee: makeState("tennessee", "Tennessee", "TN", { statuteOfLimitations: 3, averagePayout: 5100, totalLossThreshold: "If repair costs exceed 75% of the vehicle's actual cash value" }),
  utah: makeState("utah", "Utah", "UT", { statuteOfLimitations: 4, averagePayout: 5000, totalLossThreshold: "If repair costs exceed 100% of the vehicle's actual cash value" }),
  vermont: makeState("vermont", "Vermont", "VT", { statuteOfLimitations: 3, averagePayout: 4800 }),
  virginia: makeState("virginia", "Virginia", "VA", { statuteOfLimitations: 5, averagePayout: 5900, totalLossThreshold: "If repair costs exceed 75% of the vehicle's actual cash value" }),
  washington: makeState("washington", "Washington", "WA", { statuteOfLimitations: 3, averagePayout: 6000, totalLossThreshold: "If repair costs exceed 100% of the vehicle's actual cash value" }),
  "west-virginia": makeState("west-virginia", "West Virginia", "WV", { statuteOfLimitations: 2, averagePayout: 4600 }),
  wisconsin: makeState("wisconsin", "Wisconsin", "WI", { statuteOfLimitations: 6, averagePayout: 5000, totalLossThreshold: "If repair costs exceed 70% of the vehicle's actual cash value" }),
  wyoming: makeState("wyoming", "Wyoming", "WY", { statuteOfLimitations: 4, averagePayout: 4500 }),
}

/** All valid slugs for static params generation */
export function getAllStateSlugs(): string[] {
  return Object.keys(stateDataMap)
}

/** Look up state data by slug */
export function getStateBySlug(slug: string): StateData | undefined {
  return stateDataMap[slug]
}