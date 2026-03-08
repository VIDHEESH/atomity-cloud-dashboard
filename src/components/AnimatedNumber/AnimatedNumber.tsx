"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  isInView: boolean;
  delay?: number;
  duration?: number;
}

export default function AnimatedNumber({
  value,
  prefix = "$",
  suffix = "",
  isInView,
  delay = 0,
  duration = 1.2,
}: AnimatedNumberProps) {
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const startAnimation = useCallback(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    const startTime = performance.now();
    const startVal = 0;
    const endVal = value;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);
      const current = Math.round(startVal + (endVal - startVal) * easedProgress);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [value, duration, shouldReduceMotion]);

  useEffect(() => {
    if (!isInView || hasStarted) return;

    const timeout = setTimeout(() => {
      setHasStarted(true);
      startAnimation();
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, hasStarted, delay, startAnimation]);

  // Reset when value changes (e.g., switching views)
  useEffect(() => {
    setDisplayValue(0);
    setHasStarted(false);
  }, [value]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        delay: shouldReduceMotion ? 0 : delay,
        duration: shouldReduceMotion ? 0 : 0.3,
      }}
    >
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </motion.span>
  );
}
