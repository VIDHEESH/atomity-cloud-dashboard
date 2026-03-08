"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./OrbitMap.module.css";
import type { ClusterResource, NamespaceResource } from "@/types";
import AnimatedNumber from "@/components/AnimatedNumber/AnimatedNumber";

interface OrbitMapProps {
  data: (ClusterResource | NamespaceResource)[];
  isInView: boolean;
  onNodeClick?: (item: ClusterResource | NamespaceResource) => void;
  activeId?: string | null;
  viewMode: "cluster" | "namespace";
  parentName?: string;
}

export default function OrbitMap({
  data,
  isInView,
  onNodeClick,
  activeId,
  viewMode,
  parentName,
}: OrbitMapProps) {
  const shouldReduceMotion = useReducedMotion();

  const totalSystemCost = data.reduce((sum, d) => sum + d.total, 0);
  const avgEfficiency =
    data.reduce((sum, d) => sum + d.efficiency, 0) / (data.length || 1);

  // Layout math
  const maxTotal = Math.max(...data.map((d) => d.total), 1);
  const angleStep = (Math.PI * 2) / data.length;

  return (
    <div className={styles.container} role="region" aria-label="Orbital Infrastructure Map">
      {/* Central Core: Represents the entire system or selected cluster */}
      <motion.div
        className={styles.centerCore}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={styles.coreGlow} />
        <div className={styles.coreContent}>
          <span className={styles.coreLabel}>
            {viewMode === "cluster" ? "Total Network" : parentName}
          </span>
          <span className={styles.coreTotal}>
            <AnimatedNumber value={totalSystemCost} prefix="$" isInView={isInView} duration={2} />
          </span>
          <span className={styles.coreAvg}>
            Avg Eff: {avgEfficiency.toFixed(0)}%
          </span>
        </div>
      </motion.div>

      {/* Orbiting Nodes */}
      {data.map((item, index) => {
        // Calculate orbit position using trigonometry
        const angle = index * angleStep - Math.PI / 2; // Start at 12 o'clock
        const orbitRadius = 42; // Percentage of container
        const xPos = `calc(50% + ${Math.cos(angle) * orbitRadius}%)`;
        const yPos = `calc(50% + ${Math.sin(angle) * orbitRadius}%)`;

        // Node size based on relative cost (between 0.6 and 1.2)
        const sizeMultiplier = 0.6 + (item.total / maxTotal) * 0.6;
        const nodeSize = `${110 * sizeMultiplier}px`;

        // Color coding for efficiency
        const isOptimal = item.efficiency >= 70;
        const isWarning = item.efficiency >= 40 && item.efficiency < 70;
        
        let statusClass = styles.statusOptimal;
        if (isWarning) statusClass = styles.statusWarning;
        if (!isOptimal && !isWarning) statusClass = styles.statusCritical;

        return (
          <motion.button
            key={item.id}
            className={`${styles.node} ${statusClass} ${activeId === item.id ? styles.active : ""}`}
            style={{ 
              width: nodeSize, 
              height: nodeSize,
              left: "50%",
              top: "50%",
              marginLeft: `calc(-${nodeSize} / 2)`,
              marginTop: `calc(-${nodeSize} / 2)`,
            }}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
            animate={
              isInView
                ? { opacity: 1, x: `calc(${Math.cos(angle) * orbitRadius}cqmin)`, y: `calc(${Math.sin(angle) * orbitRadius}cqmin)`, scale: 1 }
                : { opacity: 0, x: 0, y: 0, scale: 0 }
            }
            transition={{
              type: shouldReduceMotion ? "tween" : "spring",
              stiffness: 80,
              damping: 12,
              delay: shouldReduceMotion ? 0 : 0.3 + index * 0.1,
            }}
            onClick={() => onNodeClick?.(item)}
            whileHover={{ scale: 1.1, zIndex: 50 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Pulsing ring for critical nodes */}
            {!isOptimal && !isWarning && (
              <div className={styles.warningPulse} />
            )}
            
            <div className={styles.nodeInner}>
              <span className={styles.nodeName}>{item.name.replace("Cluster ", "").replace("Namespace ", "")}</span>
              <span className={styles.nodeCost}>
                <AnimatedNumber value={item.total} prefix="$" isInView={isInView} delay={0.5 + index * 0.1} />
              </span>
              <div className={styles.efficiencyBar}>
                <motion.div 
                  className={styles.efficiencyFill} 
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${item.efficiency}%` } : { width: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 1 }}
                />
              </div>
            </div>
            
            {/* Connecting laser line SVG (animated via CSS) */}
            <svg className={styles.laserLine} viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="50" y1="50" x2="50" y2="150" className={styles.laserBeam} />
            </svg>
          </motion.button>
        );
      })}
      
      {/* Decorative orbit rings */}
      <div className={styles.orbitRingBg} />
      <div className={styles.orbitRingBg2} />
    </div>
  );
}
