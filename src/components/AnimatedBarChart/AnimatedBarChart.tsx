"use client";

import { motion, useReducedMotion } from "framer-motion";
import AnimatedNumber from "@/components/AnimatedNumber/AnimatedNumber";
import styles from "./AnimatedBarChart.module.css";
import type { ClusterResource, NamespaceResource } from "@/types";

interface AnimatedBarChartProps {
  data: (ClusterResource | NamespaceResource)[];
  isInView: boolean;
  onBarClick?: (item: ClusterResource | NamespaceResource) => void;
  activeId?: string | null;
}

export default function AnimatedBarChart({
  data,
  isInView,
  onBarClick,
  activeId,
}: AnimatedBarChartProps) {
  const shouldReduceMotion = useReducedMotion();
  const maxTotal = Math.max(...data.map((d) => d.total), 1);

  return (
    <div className={styles.chartContainer} role="img" aria-label="Cost distribution bar chart">
      <div className={styles.bars}>
        {data.map((item, index) => {
          const heightPercent = (item.total / maxTotal) * 100;
          const isActive = activeId === item.id;

          return (
            <motion.div
              key={item.id}
              className={`${styles.barGroup} ${isActive ? styles.active : ""}`}
              initial={{ opacity: 0, y: 30 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              transition={{
                delay: shouldReduceMotion ? 0 : index * 0.1,
                duration: shouldReduceMotion ? 0 : 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              onClick={() => onBarClick?.(item)}
              role="button"
              tabIndex={0}
              aria-label={`${item.name}: $${item.total.toLocaleString()}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onBarClick?.(item);
                }
              }}
            >
              <div className={styles.barWrapper}>
                <motion.div
                  className={styles.barValue}
                  initial={{ opacity: 0, y: -8 }}
                  animate={
                    isInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: -8 }
                  }
                  transition={{
                    delay: shouldReduceMotion ? 0 : index * 0.1 + 0.4,
                    duration: shouldReduceMotion ? 0 : 0.3,
                  }}
                >
                  <AnimatedNumber
                    value={item.total}
                    prefix="$"
                    isInView={isInView}
                    delay={index * 0.1 + 0.5}
                    duration={1.4}
                  />
                </motion.div>
                <motion.div
                  className={styles.bar}
                  initial={{ height: 0 }}
                  animate={
                    isInView
                      ? { height: `${heightPercent}%` }
                      : { height: 0 }
                  }
                  transition={{
                    delay: shouldReduceMotion ? 0 : index * 0.1 + 0.15,
                    duration: shouldReduceMotion ? 0 : 0.7,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  <div className={styles.barGlow} />
                </motion.div>
              </div>
              <span className={styles.barLabel}>{item.name}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Dashed ceiling line */}
      <motion.div
        className={styles.ceilingLine}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.2,
          duration: shouldReduceMotion ? 0 : 0.8,
          ease: "easeOut",
        }}
      />
    </div>
  );
}
