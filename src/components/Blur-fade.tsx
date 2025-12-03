"use client"

import React, { useRef } from "react"
import { easeOut } from "motion"
import {
  AnimatePresence,
  motion,
  MotionProps,
  useInView,
  UseInViewOptions,
  Variants,
} from "motion/react"

type MarginType = UseInViewOptions["margin"]

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode
  className?: string
  variant?: {
    hidden: { y: number }
    visible: { y: number }
  }
  duration?: number
  delay?: number
  offset?: number
  direction?: "up" | "down" | "left" | "right"
  inView?: boolean
  inViewMargin?: MarginType
  blur?: string
  staggerChildren?: number
  delayChildren?: number
}

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  offset = 40,
  direction = "up",
  inView = false,
  inViewMargin = "-50px",
  blur = "3px",
  staggerChildren,
  delayChildren,
  ...props
}: BlurFadeProps) {
  const ref = useRef(null)
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin })
  const isInView = !inView || inViewResult

  const defaultVariants: Variants = {
    hidden: {
      [direction === "left" || direction === "right" ? "x" : "y"]:
        direction === "right" || direction === "down" ? -offset : offset,
      opacity: 0,
      filter: `blur(${blur})`,
    },
    visible: {
      [direction === "left" || direction === "right" ? "x" : "y"]: 0,
      opacity: 1,
      filter: `blur(0px)`,
    },
  }

  const combinedVariants = variant || defaultVariants
  const shouldStagger = typeof staggerChildren === "number"

  const transition = {
    delay: 0.04 + delay,
    duration,
    ease: easeOut,
    ...(shouldStagger
      ? {
          staggerChildren,
          delayChildren,
        }
      : {}),
  }

  const containerVariants: Variants = shouldStagger
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : combinedVariants

  const renderedChildren = shouldStagger
    ? React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={combinedVariants}>
          {child}
        </motion.div>
      ))
    : children

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={containerVariants}
        transition={transition}
        className={className}
        {...props}
      >
        {renderedChildren}
      </motion.div>
    </AnimatePresence>
  )
}
