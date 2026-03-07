"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./ResourceIcons.module.css";
import type { ResourceCategory } from "@/types";

interface ResourceIconsProps {
  isInView: boolean;
}

interface ResourceItem {
  category: ResourceCategory;
  label: string;
}

const resources: ResourceItem[] = [
  { category: "cpu", label: "CPU" },
  { category: "gpu", label: "GPU" },
  { category: "ram", label: "RAM" },
  { category: "storage", label: "Storage" },
  { category: "network", label: "Network" },
];

function ResourceSVG({ category }: { category: ResourceCategory }) {
  switch (category) {
    case "cpu":
      return (
        <svg viewBox="0 0 48 48" fill="none" className={styles.icon} aria-hidden="true">
          <rect x="12" y="12" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="2" />
          <rect x="17" y="17" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <line x1="18" y1="8" x2="18" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="8" x2="24" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="8" x2="30" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="36" x2="18" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="36" x2="24" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="36" x2="30" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="18" x2="12" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="24" x2="12" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="30" x2="12" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="36" y1="18" x2="40" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="36" y1="24" x2="40" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="36" y1="30" x2="40" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "gpu":
      return (
        <svg viewBox="0 0 48 48" fill="none" className={styles.icon} aria-hidden="true">
          <rect x="6" y="14" width="36" height="20" rx="4" stroke="currentColor" strokeWidth="2" />
          <circle cx="16" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="32" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" />
          <line x1="12" y1="38" x2="12" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="38" x2="24" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="36" y1="38" x2="36" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "ram":
      return (
        <svg viewBox="0 0 48 48" fill="none" className={styles.icon} aria-hidden="true">
          <rect x="6" y="14" width="36" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
          <rect x="11" y="19" width="5" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="19" y="19" width="5" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="27" y="19" width="5" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="35" y="19" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <line x1="10" y1="34" x2="10" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="34" x2="18" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="26" y1="34" x2="26" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="34" y1="34" x2="34" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "storage":
      return (
        <svg viewBox="0 0 48 48" fill="none" className={styles.icon} aria-hidden="true">
          <rect x="10" y="8" width="28" height="10" rx="3" stroke="currentColor" strokeWidth="2" />
          <rect x="10" y="20" width="28" height="10" rx="3" stroke="currentColor" strokeWidth="2" />
          <rect x="10" y="32" width="28" height="10" rx="3" stroke="currentColor" strokeWidth="2" />
          <circle cx="32" cy="13" r="2" fill="currentColor" />
          <circle cx="32" cy="25" r="2" fill="currentColor" />
          <circle cx="32" cy="37" r="2" fill="currentColor" />
          <line x1="15" y1="13" x2="25" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="15" y1="25" x2="25" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="15" y1="37" x2="25" y2="37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "network":
      return (
        <svg viewBox="0 0 48 48" fill="none" className={styles.icon} aria-hidden="true">
          <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="2" />
          <circle cx="10" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="38" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="36" r="3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="38" cy="36" r="3" stroke="currentColor" strokeWidth="1.5" />
          <line x1="21" y1="21" x2="13" y2="14" stroke="currentColor" strokeWidth="1.5" />
          <line x1="27" y1="21" x2="35" y2="14" stroke="currentColor" strokeWidth="1.5" />
          <line x1="21" y1="27" x2="13" y2="34" stroke="currentColor" strokeWidth="1.5" />
          <line x1="27" y1="27" x2="35" y2="34" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ResourceIcons({ isInView }: ResourceIconsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={styles.container} role="list" aria-label="Resource categories">
      {resources.map((resource, index) => (
        <motion.div
          key={resource.category}
          className={styles.card}
          role="listitem"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.8, y: 20 }
          }
          transition={{
            delay: shouldReduceMotion ? 0 : 0.6 + index * 0.1,
            duration: shouldReduceMotion ? 0 : 0.5,
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          whileHover={{
            scale: 1.08,
            y: -4,
            transition: { type: "spring", stiffness: 400, damping: 15 },
          }}
        >
          <ResourceSVG category={resource.category} />
          <span className={styles.label}>{resource.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
