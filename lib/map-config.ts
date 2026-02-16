/**
 * US Map Configuration
 * Contains state routing slugs, display names, and theme-adapted color customization
 * for the react-usa-map component
 */

export const stateSlugs: Record<string, string> = {
  AL: "alabama", AK: "alaska", AZ: "arizona", AR: "arkansas", CA: "california",
  CO: "colorado", CT: "connecticut", DE: "delaware", DC: "district-of-columbia",
  FL: "florida", GA: "georgia", HI: "hawaii", ID: "idaho", IL: "illinois",
  IN: "indiana", IA: "iowa", KS: "kansas", KY: "kentucky", LA: "louisiana",
  ME: "maine", MD: "maryland", MA: "massachusetts", MI: "michigan", MN: "minnesota",
  MS: "mississippi", MO: "missouri", MT: "montana", NE: "nebraska", NV: "nevada",
  NH: "new-hampshire", NJ: "new-jersey", NM: "new-mexico", NY: "new-york",
  NC: "north-carolina", ND: "north-dakota", OH: "ohio", OK: "oklahoma", OR: "oregon",
  PA: "pennsylvania", RI: "rhode-island", SC: "south-carolina", SD: "south-dakota",
  TN: "tennessee", TX: "texas", UT: "utah", VT: "vermont", VA: "virginia",
  WA: "washington", WV: "west-virginia", WI: "wisconsin", WY: "wyoming",
}

export const stateNames: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", DC: "District of Columbia",
  FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois",
  IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana",
  ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota",
  MS: "Mississippi", MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada",
  NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York",
  NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon",
  PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota",
  TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia",
  WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
}

/**
 * Theme-adapted state colors: maroon-to-gold gradient
 * Replaces the original blue gradient with DVHive brand colors
 * Range: #5c1a1a (deepest maroon) → #F5CF60 (gold)
 */
export const stateCustomization: Record<string, { fill: string }> = {
  AL: { fill: "#5c1a1a" }, AK: { fill: "#621e1e" }, AZ: { fill: "#682222" }, AR: { fill: "#6e2626" },
  CA: { fill: "#742a2a" }, CO: { fill: "#7a2e2e" }, CT: { fill: "#803232" }, DC: { fill: "#863636" },
  DE: { fill: "#8c3a3a" }, FL: { fill: "#923e3e" }, GA: { fill: "#984242" }, HI: { fill: "#9e4646" },
  ID: { fill: "#a44c4c" }, IL: { fill: "#a85252" }, IN: { fill: "#ac5858" }, IA: { fill: "#b05e5e" },
  KS: { fill: "#b46464" }, KY: { fill: "#b86a6a" }, LA: { fill: "#bb7070" }, ME: { fill: "#be7676" },
  MD: { fill: "#c07c7c" }, MA: { fill: "#c28282" }, MI: { fill: "#c58a5e" }, MN: { fill: "#c89048" },
  MS: { fill: "#ca9640" }, MO: { fill: "#cc9c3a" }, MT: { fill: "#cea236" }, NE: { fill: "#d0a832" },
  NV: { fill: "#d2ae2e" }, NH: { fill: "#d4b42a" }, NJ: { fill: "#d6b828" }, NM: { fill: "#d8bc26" },
  NY: { fill: "#dac024" }, NC: { fill: "#dcc422" }, ND: { fill: "#dec820" }, OH: { fill: "#e0cb1e" },
  OK: { fill: "#e2ce1e" }, OR: { fill: "#e4d11e" }, PA: { fill: "#e6d420" }, RI: { fill: "#e8d722" },
  SC: { fill: "#eada24" }, SD: { fill: "#ecdd28" }, TN: { fill: "#eee02c" }, TX: { fill: "#f0e330" },
  UT: { fill: "#f1e638" }, VT: { fill: "#f2e940" }, VA: { fill: "#f3ec48" }, WA: { fill: "#f4ee50" },
  WV: { fill: "#f5cf60" }, WI: { fill: "#f5cf60" }, WY: { fill: "#f5cf60" },
}
