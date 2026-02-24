"use client"

import { useState, useEffect, useMemo } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps"
import { geoBounds, geoCentroid } from "d3-geo"
import type { FeatureCollection, Feature, Geometry } from "geojson"
import * as topojson from "topojson-client"

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

// Map from state slug to the FIPS name used in the TopoJSON file.
const SLUG_TO_NAME: Record<string, string> = {
  alabama: "Alabama", alaska: "Alaska", arizona: "Arizona", arkansas: "Arkansas",
  california: "California", colorado: "Colorado", connecticut: "Connecticut",
  delaware: "Delaware", "district-of-columbia": "District of Columbia",
  florida: "Florida", georgia: "Georgia", hawaii: "Hawaii", idaho: "Idaho",
  illinois: "Illinois", indiana: "Indiana", iowa: "Iowa", kansas: "Kansas",
  kentucky: "Kentucky", louisiana: "Louisiana", maine: "Maine", maryland: "Maryland",
  massachusetts: "Massachusetts", michigan: "Michigan", minnesota: "Minnesota",
  mississippi: "Mississippi", missouri: "Missouri", montana: "Montana",
  nebraska: "Nebraska", nevada: "Nevada", "new-hampshire": "New Hampshire",
  "new-jersey": "New Jersey", "new-mexico": "New Mexico", "new-york": "New York",
  "north-carolina": "North Carolina", "north-dakota": "North Dakota", ohio: "Ohio",
  oklahoma: "Oklahoma", oregon: "Oregon", pennsylvania: "Pennsylvania",
  "rhode-island": "Rhode Island", "south-carolina": "South Carolina",
  "south-dakota": "South Dakota", tennessee: "Tennessee", texas: "Texas",
  utah: "Utah", vermont: "Vermont", virginia: "Virginia", washington: "Washington",
  "west-virginia": "West Virginia", wisconsin: "Wisconsin", wyoming: "Wyoming",
}

interface StateIsoMapProps {
  stateSlug: string
  className?: string
}

interface TopoData {
  type: string
  objects: Record<string, any>
  arcs: number[][][]
}

export function StateIsoMap({ stateSlug, className = "" }: StateIsoMapProps) {
  const [topoData, setTopoData] = useState<TopoData | null>(null)
  const stateName = SLUG_TO_NAME[stateSlug]

  useEffect(() => {
    fetch(GEO_URL)
      .then((res) => res.json())
      .then((data) => setTopoData(data))
      .catch((err) => console.error("Failed to load map data", err))
  }, [])

  // Compute the projection center and scale dynamically based on the state's bounds
  const projectionConfig = useMemo(() => {
    if (!topoData || !stateName) return null

    try {
      const objectKey = Object.keys(topoData.objects)[0]
      // Cast to any to avoid strict topojson type conflicts
      const topology = topoData as any
      const featureCollection = topojson.feature(
        topology,
        topology.objects[objectKey]
      ) as unknown as FeatureCollection

      const stateFeature = featureCollection.features.find(
        (f: Feature) => f.properties?.name === stateName
      )

      if (!stateFeature) return null

      // 1. Calculate Bounds [[x0, y0], [x1, y1]]
      const bounds = geoBounds(stateFeature as Feature<Geometry>)
      const center = geoCentroid(stateFeature as Feature<Geometry>)

      // 2. Calculate dimensions (in degrees)
      const dx = bounds[1][0] - bounds[0][0]
      const dy = bounds[1][1] - bounds[0][1]
      const maxDim = Math.max(dx, dy)

      // 3. Determine Scale
      // Adjusted to 120 (smaller than 150) so it fits comfortably without feeling too aggressive.
      const fitScale = (180 / maxDim) * 90

      return {
        center: [center[0], center[1]] as [number, number],
        scale: fitScale,
      }
    } catch (e) {
      console.error("Error calculating map projection:", e)
      return null
    }
  }, [topoData, stateName])

  if (!topoData || !projectionConfig || !stateName) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center ${className}`}
        aria-label="Loading state map"
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold/20 border-t-gold" />
      </div>
    )
  }

  return (
    <div className={`relative flex items-center justify-center overflow-visible ${className}`}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: projectionConfig.center,
          scale: projectionConfig.scale,
        }}
        width={200}
        height={200}
        // overflow-visible is crucial to prevent clipping
        className="h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id={`iso-grad-${stateSlug}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(245,207,96,0.18)" />
            <stop offset="100%" stopColor="rgba(245,207,96,0.04)" />
          </linearGradient>
        </defs>
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies
              .filter((geo: any) => geo.properties.name === stateName)
              .map((geo: any) => (
                <Geography
                  key={geo.rpiAtlasId || geo.properties.name}
                  geography={geo}
                  fill={`url(#iso-grad-${stateSlug})`}
                  stroke="#F5CF60"
                  strokeWidth={1.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "rgba(245,207,96,0.22)" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}
