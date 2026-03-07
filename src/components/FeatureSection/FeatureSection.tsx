"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useClusterData, useNamespaceData } from "@/hooks/useApiData";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import OrbitMap from "@/components/OrbitMap/OrbitMap";
import ResourceIcons from "@/components/ResourceIcons/ResourceIcons";
import SavingsInsight from "@/components/SavingsInsight/SavingsInsight";
import DataOrb from "@/components/DataOrb/DataOrb";
import Badge from "@/components/Badge/Badge";
import LoadingSkeleton from "@/components/LoadingSkeleton/LoadingSkeleton";
import ErrorState from "@/components/ErrorState/ErrorState";
import type { ClusterResource, NamespaceResource, ViewMode } from "@/types";
import styles from "./FeatureSection.module.css";

export default function FeatureSection() {
  const [viewMode, setViewMode] = useState<ViewMode>("cluster");
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>(null);
  const [selectedClusterName, setSelectedClusterName] = useState<string>("");
  const [isRevealed, setIsRevealed] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  const { ref: sectionRef, isInView } = useScrollTrigger({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: iconsRef, isInView: iconsInView } = useScrollTrigger({
    threshold: 0.2,
    triggerOnce: true,
  });

  const {
    data: clusterData,
    isLoading: clusterLoading,
    isError: clusterError,
    refetch: refetchClusters,
  } = useClusterData();

  const {
    data: namespaceData,
    isLoading: namespaceLoading,
    isError: namespaceError,
    refetch: refetchNamespaces,
  } = useNamespaceData(selectedClusterId);

  const handleClusterClick = useCallback(
    (item: ClusterResource | NamespaceResource) => {
      if (viewMode === "cluster") {
        setSelectedClusterId(item.id);
        setSelectedClusterName(item.name);
        setViewMode("namespace");
      }
    },
    [viewMode]
  );

  const handleBackToCluster = useCallback(() => {
    setViewMode("cluster");
    setSelectedClusterId(null);
    setSelectedClusterName("");
  }, []);

  const currentData =
    viewMode === "cluster" ? clusterData : namespaceData;
  const isLoading =
    viewMode === "cluster" ? clusterLoading : namespaceLoading;
  const isError =
    viewMode === "cluster" ? clusterError : namespaceError;

  const getHeaderLabel = () => {
    if (viewMode === "namespace" && selectedClusterName) {
      return `${selectedClusterName} — Namespace`;
    }
    return "Cluster";
  };

  return (
    <section
      className={styles.section}
      ref={sectionRef as React.RefObject<HTMLElement>}
      aria-labelledby="cluster-efficiency-heading"
      id="cluster-efficiency"
    >
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <div className={styles.headerTop}>
            <motion.h2
              id="cluster-efficiency-heading"
              className={styles.heading}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.1,
                duration: shouldReduceMotion ? 0 : 0.5,
              }}
            >
              Cluster Efficiency
            </motion.h2>
            <motion.p
              className={styles.subheading}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.2,
                duration: shouldReduceMotion ? 0 : 0.5,
              }}
            >
              Real-time resource utilization & cost tracking across your infrastructure
            </motion.p>
          </div>
        </motion.div>

        {/* Dashboard Card */}
        <motion.div
          className={styles.dashboardCard}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 0.15,
            duration: shouldReduceMotion ? 0 : 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* Controls Bar */}
          <div className={styles.controls}>
            <div className={styles.controlsLeft}>
              <Badge variant="default">Last 30 Days</Badge>
              <AnimatePresence mode="wait">
                <motion.div
                  key={viewMode + selectedClusterName}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                >
                  <Badge variant="active">{getHeaderLabel()}</Badge>
                </motion.div>
              </AnimatePresence>
            </div>

            {viewMode === "namespace" && (
              <motion.button
                className={styles.backButton}
                onClick={handleBackToCluster}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Go back to cluster view"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Clusters
              </motion.button>
            )}
          </div>

          {/* Aggregated By tooltip for namespace view */}
          <AnimatePresence>
            {viewMode === "namespace" && (
              <motion.div
                className={styles.aggregatedBy}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
              >
                <span className={styles.aggregatedLabel}>Aggregated by:</span>
                <span className={styles.aggregatedValue}>Namespace</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chart & Table Content */}
          {isError ? (
            <ErrorState
              message="Failed to load efficiency data. Please try again."
              onRetry={() =>
                viewMode === "cluster"
                  ? refetchClusters()
                  : refetchNamespaces()
              }
            />
          ) : !isRevealed ? (
            <AnimatePresence mode="wait">
              <motion.div
                key="orb"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ paddingBlock: "var(--space-2xl)" }}
              >
                <DataOrb onReveal={() => setIsRevealed(true)} isInView={isInView} />
              </motion.div>
            </AnimatePresence>
          ) : isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingSkeleton variant="chart" />
              <LoadingSkeleton variant="table" />
            </motion.div>
          ) : currentData ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode + selectedClusterId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
              >
                <OrbitMap
                  data={currentData}
                  isInView={isInView}
                  onNodeClick={
                    viewMode === "cluster" ? handleClusterClick : undefined
                  }
                  activeId={selectedClusterId}
                  viewMode={viewMode}
                  parentName={selectedClusterName}
                />
              </motion.div>
            </AnimatePresence>
          ) : null}

          {/* Savings Insight Card — product thinking element */}
          {currentData && !isLoading && !isError && isRevealed && (
            <SavingsInsight data={currentData} isInView={isInView} />
          )}
        </motion.div>

        {/* Resource Icons */}
        <div ref={iconsRef as React.RefObject<HTMLDivElement>}>
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <ResourceIcons isInView={iconsInView} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
