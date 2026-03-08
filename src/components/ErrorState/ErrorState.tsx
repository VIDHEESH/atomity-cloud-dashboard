"use client";

import { motion } from "framer-motion";
import styles from "./ErrorState.module.css";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = "Something went wrong while fetching data.",
  onRetry,
}: ErrorStateProps) {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      role="alert"
    >
      <div className={styles.iconWrapper}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="12" x2="20" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="20" cy="27" r="1.5" fill="currentColor" />
        </svg>
      </div>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retryButton} onClick={onRetry} aria-label="Retry fetching data">
          Try Again
        </button>
      )}
    </motion.div>
  );
}
