"use client";

import { motion } from "framer-motion";
import styles from "./Badge.module.css";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "active" | "success" | "warning" | "error";
  size?: "sm" | "md";
  onClick?: () => void;
  ariaLabel?: string;
}

export default function Badge({
  children,
  variant = "default",
  size = "md",
  onClick,
  ariaLabel,
}: BadgeProps) {
  const isInteractive = !!onClick;

  return (
    <motion.span
      className={`${styles.badge} ${styles[variant]} ${styles[size]}`}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={(e) => {
        if (isInteractive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
        }
      }}
      whileHover={isInteractive ? { scale: 1.05 } : undefined}
      whileTap={isInteractive ? { scale: 0.97 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.span>
  );
}
