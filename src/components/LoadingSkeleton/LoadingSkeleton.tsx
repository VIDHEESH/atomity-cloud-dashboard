"use client";

import styles from "./LoadingSkeleton.module.css";

interface LoadingSkeletonProps {
  variant?: "chart" | "table" | "card";
}

export default function LoadingSkeleton({ variant = "chart" }: LoadingSkeletonProps) {
  if (variant === "chart") {
    return (
      <div className={styles.chartSkeleton} role="status" aria-label="Loading chart data">
        <div className={styles.barsSkeleton}>
          {[0.9, 0.65, 0.35, 0.5].map((h, i) => (
            <div key={i} className={styles.barSkeleton} style={{ height: `${h * 100}%` }}>
              <div className={styles.shimmer} />
            </div>
          ))}
        </div>
        <span className={styles.srOnly}>Loading...</span>
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className={styles.tableSkeleton} role="status" aria-label="Loading table data">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.rowSkeleton}>
            {Array.from({ length: 7 }).map((_, j) => (
              <div key={j} className={styles.cellSkeleton}>
                <div className={styles.shimmer} />
              </div>
            ))}
          </div>
        ))}
        <span className={styles.srOnly}>Loading...</span>
      </div>
    );
  }

  return null;
}
