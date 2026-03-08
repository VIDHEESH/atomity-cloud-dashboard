"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./DataOrb.module.css";
import { useEffect, useState } from "react";

interface DataOrbProps {
  onReveal: () => void;
  isInView: boolean;
}

export default function DataOrb({ onReveal, isInView }: DataOrbProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Auto-reveal if the user doesn't click it after a few seconds of being in view
  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      onReveal();
    }, 4000); // Auto-reveal after 4 seconds
    return () => clearTimeout(timer);
  }, [isInView, onReveal]);

  return (
    <div className={styles.container}>
      <motion.button
        className={styles.orbWrapper}
        onClick={onReveal}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{
          type: shouldReduceMotion ? "tween" : "spring",
          stiffness: 200,
          damping: 15,
          delay: shouldReduceMotion ? 0 : 0.3,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Unlock Dashboard Data"
      >
        {/* Outer glowing rings */}
        <motion.div
          className={styles.ring1}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
        <motion.div
          className={styles.ring2}
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        />

        {/* Core sphere */}
        <div className={styles.core}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className={styles.icon}>
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Particles flying out on hover */}
        {isHovered && !shouldReduceMotion && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.particle}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1.5,
                  x: (Math.random() - 0.5) * 100,
                  y: (Math.random() - 0.5) * 100,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: Math.random() * 0.5,
                }}
              />
            ))}
          </>
        )}
      </motion.button>
      
      <motion.p
        className={styles.hint}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 1.2, duration: 0.4 }}
      >
        Click to extract cluster data
      </motion.p>
    </div>
  );
}
