"use client"

import React, { HTMLAttributes, useCallback, useMemo, useState, useEffect } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils/index"

interface WarpBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  perspective?: number
  beamsPerSide?: number
  beamSize?: number
  beamDelayMax?: number
  beamDelayMin?: number
  beamDuration?: number
  gridColor?: string
}

interface BeamData {
  hue: number
  ar: number
}

const Beam = ({
  width,
  x,
  delay,
  duration,
  hue,
  ar,
}: {
  width: string | number
  x: string | number
  delay: number
  duration: number
  hue: number
  ar: number
}) => {
  return (
    <motion.div
      style={
        {
          "--x": `${x}`,
          "--width": `${width}`,
          "--aspect-ratio": `${ar}`,
          "--background": `linear-gradient(hsl(${hue} 80% 60%), transparent)`,
        } as React.CSSProperties
      }
      className={`absolute top-0 left-[var(--x)] [aspect-ratio:1/var(--aspect-ratio)] [width:var(--width)] [background:var(--background)]`}
      initial={{ y: "100cqmax", x: "-50%" }}
      animate={{ y: "-100%", x: "-50%" }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}

export const WarpBackground: React.FC<WarpBackgroundProps> = ({
  children,
  perspective = 100,
  className,
  beamsPerSide = 3,
  beamSize = 5,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3,
  gridColor = "var(--border)",
  ...props
}) => {
  const [beamDataMap, setBeamDataMap] = useState<Map<string, BeamData[]>>(new Map())
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const newBeamDataMap = new Map<string, BeamData[]>()
    
    const generateBeamData = () => {
      const beams: BeamData[] = []
      const cellsPerSide = Math.floor(100 / beamSize)
      const step = cellsPerSide / beamsPerSide

      for (let i = 0; i < beamsPerSide; i++) {
        beams.push({
          hue: Math.floor(Math.random() * 360),
          ar: Math.floor(Math.random() * 10) + 1,
        })
      }
      return beams
    }

    newBeamDataMap.set('top', generateBeamData())
    newBeamDataMap.set('right', generateBeamData())
    newBeamDataMap.set('bottom', generateBeamData())
    newBeamDataMap.set('left', generateBeamData())

    setBeamDataMap(newBeamDataMap)
    setIsHydrated(true)
  }, [beamSize])

  const generateBeams = useCallback(() => {
    const beams = []
    const cellsPerSide = Math.floor(100 / beamSize)
    const step = cellsPerSide / beamsPerSide

    for (let i = 0; i < beamsPerSide; i++) {
      const x = Math.floor(i * step)
      const delay = Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin
      beams.push({ x, delay })
    }
    return beams
  }, [beamsPerSide, beamSize, beamDelayMax, beamDelayMin])

  const topBeams = useMemo(() => generateBeams(), [generateBeams])
  const rightBeams = useMemo(() => generateBeams(), [generateBeams])
  const bottomBeams = useMemo(() => generateBeams(), [generateBeams])
  const leftBeams = useMemo(() => generateBeams(), [generateBeams])

  if (!isHydrated) {
    return (
      <div className={cn("relative rounded border p-20", className)} {...props}>
        <div className="relative">{children}</div>
      </div>
    )
  }

  return (
    <div className={cn("relative rounded border p-20", className)} {...props}>
      <div
        style={
          {
            "--perspective": `${perspective}px`,
            "--grid-color": gridColor,
            "--beam-size": `${beamSize}%`,
          } as React.CSSProperties
        }
        className={
          "[container-type:size] pointer-events-none absolute top-0 left-0 size-full overflow-hidden [clipPath:inset(0)] [perspective:var(--perspective)] [transform-style:preserve-3d]"
        }
      >
        {/* top side */}
        <div className="[container-type:inline-size] absolute z-20 [height:100cqmax] [width:100cqi] [transform-origin:50%_0%] [transform:rotateX(-90deg)] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [transform-style:preserve-3d]">
          {topBeams.map((beam, index) => {
            const beamData = beamDataMap.get('top')?.[index]
            return (
              <Beam
                key={`top-${index}`}
                width={`${beamSize}%`}
                x={`${beam.x * beamSize}%`}
                delay={beam.delay}
                duration={beamDuration}
                hue={beamData?.hue || 0}
                ar={beamData?.ar || 1}
              />
            )
          })}
        </div>
        {/* bottom side */}
        <div className="[container-type:inline-size] absolute top-full [height:100cqmax] [width:100cqi] [transform-origin:50%_0%] [transform:rotateX(-90deg)] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [transform-style:preserve-3d]">
          {bottomBeams.map((beam, index) => {
            const beamData = beamDataMap.get('bottom')?.[index]
            return (
              <Beam
                key={`bottom-${index}`}
                width={`${beamSize}%`}
                x={`${beam.x * beamSize}%`}
                delay={beam.delay}
                duration={beamDuration}
                hue={beamData?.hue || 0}
                ar={beamData?.ar || 1}
              />
            )
          })}
        </div>
        {/* left side */}
        <div className="[container-type:inline-size] absolute top-0 left-0 [height:100cqmax] [width:100cqh] [transform-origin:0%_0%] [transform:rotate(90deg)_rotateX(-90deg)] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [transform-style:preserve-3d]">
          {leftBeams.map((beam, index) => {
            const beamData = beamDataMap.get('left')?.[index]
            return (
              <Beam
                key={`left-${index}`}
                width={`${beamSize}%`}
                x={`${beam.x * beamSize}%`}
                delay={beam.delay}
                duration={beamDuration}
                hue={beamData?.hue || 0}
                ar={beamData?.ar || 1}
              />
            )
          })}
        </div>
        {/* right side */}
        <div className="[container-type:inline-size] absolute top-0 right-0 [height:100cqmax] [width:100cqh] [transform-origin:100%_0%] [transform:rotate(-90deg)_rotateX(-90deg)] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [transform-style:preserve-3d]">
          {rightBeams.map((beam, index) => {
            const beamData = beamDataMap.get('right')?.[index]
            return (
              <Beam
                key={`right-${index}`}
                width={`${beamSize}%`}
                x={`${beam.x * beamSize}%`}
                delay={beam.delay}
                duration={beamDuration}
                hue={beamData?.hue || 0}
                ar={beamData?.ar || 1}
              />
            )
          })}
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
