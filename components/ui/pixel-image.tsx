"use client"

import { useEffect, useMemo, useState, useRef } from "react"
import { cn } from "@/lib/utils"

type Grid = {
  rows: number
  cols: number
}

const DEFAULT_GRIDS: Record<string, Grid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
}

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS

interface PixelImageProps {
  src: string
  grid?: PredefinedGridKey
  customGrid?: Grid
  grayscaleAnimation?: boolean
  pixelFadeInDuration?: number // in ms
  maxAnimationDelay?: number // in ms
  colorRevealDelay?: number // in ms
  className?: string
  imageClassName?: string
}

export const PixelImage = ({
  src,
  grid = "6x4",
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1300,
  customGrid,
  className,
  imageClassName,
}: PixelImageProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showColor, setShowColor] = useState(false)
  const [showFullImage, setShowFullImage] = useState(false)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const MIN_GRID = 1
  const MAX_GRID = 16

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (grid?: Grid) => {
      if (!grid) return false
      const { rows, cols } = grid
      return (
        Number.isInteger(rows) &&
        Number.isInteger(cols) &&
        rows >= MIN_GRID &&
        cols >= MIN_GRID &&
        rows <= MAX_GRID &&
        cols <= MAX_GRID
      )
    }

    return isValidGrid(customGrid) ? customGrid! : DEFAULT_GRIDS[grid]
  }, [customGrid, grid])

  useEffect(() => {
    if (!mounted) return
    const el = containerRef.current
    if (!el) return

    let colorTimeout: NodeJS.Timeout
    let fullImageTimeout: NodeJS.Timeout

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          colorTimeout = setTimeout(() => {
            setShowColor(true)
          }, colorRevealDelay)

          const totalDuration = Math.max(
            maxAnimationDelay + pixelFadeInDuration,
            colorRevealDelay + pixelFadeInDuration
          )
          fullImageTimeout = setTimeout(() => {
            setShowFullImage(true)
          }, totalDuration)

          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (colorTimeout) clearTimeout(colorTimeout)
      if (fullImageTimeout) clearTimeout(fullImageTimeout)
    }
  }, [colorRevealDelay, maxAnimationDelay, pixelFadeInDuration, mounted])

  const pieces = useMemo(() => {
    const total = rows * cols
    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols)
      const col = index % cols

      const clipPath = `polygon(
        ${col * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${(row + 1) * (100 / rows)}%,
        ${col * (100 / cols)}% ${(row + 1) * (100 / rows)}%
      )`

      const delay = Math.random() * maxAnimationDelay
      return {
        clipPath,
        delay,
      }
    })
  }, [rows, cols, maxAnimationDelay])

  if (!mounted) {
    return (
      <div className={cn("relative select-none", className)}>
        <img
          src={src}
          alt="Pixel image placeholder"
          className={cn(
            "w-full h-full object-cover opacity-0",
            imageClassName
          )}
          draggable={false}
        />
      </div>
    )
  }

  return (
    <div ref={containerRef} className={cn("relative select-none", className)}>
      {pieces.map((piece, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all ease-out",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: `${piece.delay}ms`,
            transitionDuration: `${pixelFadeInDuration}ms`,
          }}
        >
          <img
            src={src}
            alt={`Pixel image piece ${index + 1}`}
            className={cn(
              "absolute inset-0 w-full h-full object-cover",
              grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale"),
              imageClassName
            )}
            style={{
              transition: grayscaleAnimation
                ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
            draggable={false}
          />
        </div>
      ))}
      <img
        src={src}
        alt="Full resolved seamless image"
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
          showFullImage ? "opacity-100 z-20" : "opacity-0 pointer-events-none -z-10",
          imageClassName
        )}
        draggable={false}
      />
    </div>
  )
}
