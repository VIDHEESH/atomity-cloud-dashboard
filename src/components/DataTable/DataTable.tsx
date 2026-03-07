"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./DataTable.module.css";
import type { ClusterResource, NamespaceResource } from "@/types";

interface DataTableProps {
  data: (ClusterResource | NamespaceResource)[];
  isInView: boolean;
  onRowClick?: (item: ClusterResource | NamespaceResource) => void;
  activeId?: string | null;
  viewMode: "cluster" | "namespace";
}

const columns = [
  { key: "cpu", label: "CPU" },
  { key: "ram", label: "RAM" },
  { key: "storage", label: "Storage" },
  { key: "network", label: "Network" },
  { key: "gpu", label: "GPU" },
  { key: "efficiency", label: "Efficiency" },
] as const;

export default function DataTable({
  data,
  isInView,
  onRowClick,
  activeId,
  viewMode,
}: DataTableProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table} role="table" aria-label={`${viewMode} efficiency data`}>
        <thead>
          <motion.tr
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.3,
              duration: shouldReduceMotion ? 0 : 0.4,
            }}
          >
            <th className={styles.nameCol}>
              {viewMode === "cluster" ? "Cluster" : "Namespace"}
            </th>
            {columns.map((col) => (
              <th key={col.key} className={styles[col.key]}>
                {col.label}
              </th>
            ))}
          </motion.tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => {
            const isActive = activeId === item.id;

            return (
              <motion.tr
                key={item.id}
                className={`${styles.dataRow} ${isActive ? styles.activeRow : ""}`}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : 0.4 + rowIndex * 0.08,
                  duration: shouldReduceMotion ? 0 : 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                onClick={() => onRowClick?.(item)}
                role={onRowClick ? "button" : undefined}
                tabIndex={onRowClick ? 0 : undefined}
                onKeyDown={(e) => {
                  if (onRowClick && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onRowClick(item);
                  }
                }}
              >
                <td className={styles.nameCell}>
                  <span className={styles.nameText}>{item.name}</span>
                  {viewMode === "cluster" && (
                    <span className={styles.drillHint}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </td>
                {columns.map((col, colIndex) => {
                  const value = item[col.key as keyof typeof item] as number;
                  const isEfficiency = col.key === "efficiency";

                  // Dynamic efficiency color class
                  let effClass = "";
                  if (isEfficiency) {
                    if (value < 35) effClass = styles.effCritical;
                    else if (value < 65) effClass = styles.effWarning;
                    else effClass = styles.effGood;
                  }

                  return (
                    <td
                      key={col.key}
                      className={`${styles.valueCell} ${isEfficiency ? `${styles.efficiencyCell} ${effClass}` : ""}`}
                    >
                      <span>
                        {isEfficiency ? "" : "$"}
                        {value.toLocaleString()}
                        {isEfficiency ? "%" : ""}
                      </span>
                    </td>
                  );
                })}
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
