"use client";

import { motion, useReducedMotion } from "framer-motion";
import FeatureSection from "@/components/FeatureSection/FeatureSection";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main>
      {/* Fixed Navigation Bar */}
      <nav className="nav-bar" aria-label="Main navigation">
        <div className="nav-logo">
          <span>⬡</span> Atomity
        </div>
        <ThemeToggle />
      </nav>

      {/* Hero spacer — scroll down to trigger the dashboard section */}
      <div className="hero-spacer">
        <motion.span
          className="hero-brand"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 0.2,
            duration: shouldReduceMotion ? 0 : 0.5,
          }}
        >
          Atomity Cloud Platform
        </motion.span>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 0.35,
            duration: shouldReduceMotion ? 0 : 0.6,
          }}
        >
          See Every Dollar, Fix Every Waste
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 0.5,
            duration: shouldReduceMotion ? 0 : 0.5,
          }}
        >
          Deep visibility into cluster resources. Track CPU, GPU, RAM, Storage
          &amp; Network costs in real-time across your entire infrastructure.
        </motion.p>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 1,
            duration: shouldReduceMotion ? 0 : 0.5,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Scroll to explore
        </motion.div>
      </div>

      {/* Cluster Efficiency Dashboard — scroll-triggered */}
      <FeatureSection />

      {/* Footer */}
      <footer
        style={{
          minHeight: "20vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-text-muted)",
          fontSize: "clamp(0.7rem, 0.6rem + 0.2vw, 0.8rem)",
        }}
      >
        Atomity Cloud — Frontend Engineering Challenge
      </footer>
    </main>
  );
}
