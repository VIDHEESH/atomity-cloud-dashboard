"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./CostHeatmap.module.css";
import type { ClusterResource, NamespaceResource } from "@/types";
import AnimatedNumber from "@/components/AnimatedNumber/AnimatedNumber";

interface CostHeatmapProps {
  data: (ClusterResource | NamespaceResource)[];
  isInView: boolean;
  onNodeClick?: (item: ClusterResource | NamespaceResource) => void;
  activeId?: string | null;
}

export default function CostHeatmap({
  data,
  isInView,
  onNodeClick,
  activeId,
}: CostHeatmapProps) {
  const shouldReduceMotion = useReducedMotion();
  const maxTotal = Math.max(...data.map((d) => d.total), 1);
  const sumTotal = data.reduce((sum, d) => sum + d.total, 0);

  return (
    <div
      className={styles.heatmapContainer}
      role="region"
      aria-label="Cost distribution heatmap"
    >
      <div className={styles.grid}>
        {data.map((item, index) => {
          const isActive = activeId === item.id;
          const costPercentage = ((item.total / sumTotal) * 100).toFixed(1);

          // Calculate efficiency color base
          const isOptimal = item.efficiency >= 70;
          const isWarning = item.efficiency >= 40 && item.efficiency < 70;
          
          let statusClass = styles.statusOk;
          if (isWarning) statusClass = styles.statusWarning;
          if (!isOptimal && !isWarning) statusClass = styles.statusCritical;

          return (
            <motion.button
              key={item.id}
              className={`${styles.heatmapNode} ${
                isActive ? styles.active : ""
              } ${statusClass}`}
              style={
                {
                  "--flex-grow-value": item.total / maxTotal,
                } as React.CSSProperties
              }
              initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, scale: 0.9, filter: "blur(4px)" }
              }
              transition={{
                delay: shouldReduceMotion ? 0 : index * 0.08,
                duration: shouldReduceMotion ? 0 : 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => onNodeClick?.(item)}
              aria-label={`${item.name}, total cost $${item.total}, efficiency ${item.efficiency}%`}
              whileHover={{ scale: 1.02, zIndex: 10 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background fill representing cost portion */}
              <motion.div
                className={styles.nodeFill}
                initial={{ height: "0%" }}
                animate={isInView ? { height: "100%" } : { height: "0%" }}
                transition={{
                  delay: shouldReduceMotion ? 0 : 0.4 + index * 0.1,
                  duration: shouldReduceMotion ? 0 : 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />

              <div className={styles.nodeContent}>
                <div className={styles.nodeHeader}>
                  <span className={styles.nodeName}>{item.name}</span>
                  <span className={styles.nodePercentage}>{costPercentage}%</span>
                </div>

                <div className={styles.nodeMetrics}>
                  <div className={styles.totalCost}>
                    <AnimatedNumber
                      value={item.total}
                      prefix="$"
                      isInView={isInView}
                      delay={0.5 + index * 0.1}
                    />
                  </div>

                  {/* Circular efficiency gauge */}
                  <div className={styles.gaugeContainer} title={`Efficiency: ${item.efficiency}%`}>
                    <svg className={styles.gauge} viewBox="0 0 36 36">
                      <path
                        className={styles.gaugeBg}
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <motion.path
                        className={styles.gaugeFill}
                        strokeDasharray="100, 100"
                        initial={{ strokeDashoffset: 100 }}
                        animate={
                          isInView
                            ? { strokeDashoffset: 100 - item.efficiency }
                            : { strokeDashoffset: 100 }
                        }
                        transition={{
                          delay: shouldReduceMotion ? 0 : 0.8 + index * 0.1,
                          duration: shouldReduceMotion ? 0 : 1,
                          ease: "easeOut",
                        }}
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className={styles.gaugeValue}>
                      <AnimatedNumber
                        value={item.efficiency}
                        prefix=""
                        suffix="%"
                        isInView={isInView}
                        delay={0.8 + index * 0.1}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
