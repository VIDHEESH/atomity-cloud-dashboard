"use client";

import { motion, useReducedMotion } from "framer-motion";
import AnimatedNumber from "@/components/AnimatedNumber/AnimatedNumber";
import styles from "./SavingsInsight.module.css";
import type { ClusterResource, NamespaceResource } from "@/types";

interface SavingsInsightProps {
  data: (ClusterResource | NamespaceResource)[];
  isInView: boolean;
}

export default function SavingsInsight({ data, isInView }: SavingsInsightProps) {
  const shouldReduceMotion = useReducedMotion();

  // Calculate insights from the data
  const inefficientClusters = data.filter((d) => d.efficiency < 35);
  const totalWaste = inefficientClusters.reduce((sum, d) => {
    // Estimated savings = total * (1 - efficiency/100) * 0.6 (conservative)
    return sum + Math.round(d.total * (1 - d.efficiency / 100) * 0.6);
  }, 0);
  const avgEfficiency = Math.round(
    data.reduce((sum, d) => sum + d.efficiency, 0) / data.length
  );

  if (inefficientClusters.length === 0 || totalWaste < 50) return null;

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 20, scale: 0.97 }
      }
      transition={{
        delay: shouldReduceMotion ? 0 : 1.2,
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Pulsing indicator dot */}
      <div className={styles.indicator}>
        <span className={styles.dot} />
        <span className={styles.dotPulse} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
            className={styles.icon}
          >
            <path
              d="M9 1.5L11.3 6.2L16.5 6.9L12.75 10.5L13.6 15.7L9 13.3L4.4 15.7L5.25 10.5L1.5 6.9L6.7 6.2L9 1.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.label}>Optimization Opportunity</span>
        </div>

        <p className={styles.savings}>
          Potential monthly savings:{" "}
          <strong className={styles.amount}>
            <AnimatedNumber
              value={totalWaste}
              prefix="$"
              isInView={isInView}
              delay={1.5}
              duration={1.8}
            />
          </strong>
        </p>

        <p className={styles.detail}>
          {inefficientClusters.length} cluster{inefficientClusters.length > 1 ? "s" : ""} running
          below {avgEfficiency}% efficiency.{" "}
          <span className={styles.action}>Right-sizing could reduce compute waste significantly.</span>
        </p>
      </div>

      {/* Mini efficiency bars */}
      <div className={styles.miniBars}>
        {data.map((item, i) => (
          <motion.div
            key={item.id}
            className={styles.miniBarGroup}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 1.6 + i * 0.1,
              duration: shouldReduceMotion ? 0 : 0.3,
            }}
          >
            <div className={styles.miniBarTrack}>
              <motion.div
                className={`${styles.miniBarFill} ${
                  item.efficiency < 35 ? styles.low : styles.ok
                }`}
                initial={{ width: 0 }}
                animate={
                  isInView
                    ? { width: `${item.efficiency}%` }
                    : { width: 0 }
                }
                transition={{
                  delay: shouldReduceMotion ? 0 : 1.8 + i * 0.12,
                  duration: shouldReduceMotion ? 0 : 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />
            </div>
            <span className={styles.miniBarLabel}>{item.name.replace("Cluster ", "").replace("Namespace ", "")}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
