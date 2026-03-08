"use client";

import { useClusterData, useNamespaceData } from "@/hooks/useApiData";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ClusterResource, NamespaceResource, ViewMode } from "@/types";
import styles from "./AnalystDashboard.module.css";
import DataTable from "@/components/DataTable/DataTable";
import SavingsInsight from "@/components/SavingsInsight/SavingsInsight";
import Badge from "@/components/Badge/Badge";
import LoadingSkeleton from "@/components/LoadingSkeleton/LoadingSkeleton";
import ErrorState from "@/components/ErrorState/ErrorState";
import AnimatedNumber from "@/components/AnimatedNumber/AnimatedNumber";

export default function AnalystDashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>("cluster");
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>(null);
  const [selectedClusterName, setSelectedClusterName] = useState<string>("");

  const { data: clusterData, isLoading: clusterLoading, isError: clusterError, refetch: refetchClusters } = useClusterData();
  const { data: namespaceData, isLoading: namespaceLoading, isError: namespaceError, refetch: refetchNamespaces } = useNamespaceData(selectedClusterId);

  const currentData = viewMode === "cluster" ? clusterData : namespaceData;
  const isLoading = viewMode === "cluster" ? clusterLoading : namespaceLoading;
  const isError = viewMode === "cluster" ? clusterError : namespaceError;

  const handleRowClick = useCallback((item: ClusterResource | NamespaceResource) => {
    if (viewMode === "cluster") {
      setSelectedClusterId(item.id);
      setSelectedClusterName(item.name);
      setViewMode("namespace");
    }
  }, [viewMode]);

  const handleBack = useCallback(() => {
    setViewMode("cluster");
    setSelectedClusterId(null);
    setSelectedClusterName("");
  }, []);

  // Compute KPIs
  const totalCost = currentData?.reduce((sum, d) => sum + d.total, 0) || 0;
  const avgEfficiency = currentData ? currentData.reduce((sum, d) => sum + d.efficiency, 0) / currentData.length : 0;
  const highestWasteNode = currentData?.reduce((prev, current) => {
    const prevWaste = prev.total * (1 - prev.efficiency / 100);
    const currWaste = current.total * (1 - current.efficiency / 100);
    return prevWaste > currWaste ? prev : current;
  }, currentData[0]);

  if (isError) {
    return (
      <ErrorState 
        message="Failed to load dashboard data." 
        onRetry={() => viewMode === "cluster" ? refetchClusters() : refetchNamespaces()} 
      />
    );
  }

  if (isLoading || !currentData) {
    return (
      <div className={styles.loadingGrid}>
        <LoadingSkeleton variant="chart" />
        <LoadingSkeleton variant="table" />
      </div>
    );
  }

  return (
    <motion.div 
      className={styles.dashboard}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Breadcrumb / Navigation */}
      <motion.div 
        className={styles.toolbar}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <div className="breadcrumb">
          <Badge variant={viewMode === "cluster" ? "active" : "default"}>Network Scope</Badge>
          {viewMode === "namespace" && (
            <>
              <span className={styles.separator}>/</span>
              <Badge variant="active">{selectedClusterName}</Badge>
            </>
          )}
        </div>
        
        {viewMode === "namespace" && (
          <button className={styles.backButton} onClick={handleBack}>
            ← Return to Network Scope
          </button>
        )}
      </motion.div>

      {/* KPI Ribbon */}
      <div className={styles.kpiRibbon}>
        <motion.div 
          className={styles.kpiCard}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        >
          <span className={styles.kpiLabel}>Total Scope Spend</span>
          <span className={styles.kpiValue}>
            <AnimatedNumber value={totalCost} prefix="$" isInView={true} duration={1.5} />
          </span>
        </motion.div>
        
        <motion.div 
          className={styles.kpiCard}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        >
          <span className={styles.kpiLabel}>Average Efficiency</span>
          <span className={styles.kpiValue}>
            <AnimatedNumber value={avgEfficiency} prefix="" suffix="%" isInView={true} duration={1.5} />
          </span>
          <div className={styles.kpiBar}>
            <motion.div 
              className={styles.kpiFill} 
              initial={{ width: 0 }}
              animate={{ width: `${avgEfficiency}%` }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              style={{ backgroundColor: avgEfficiency > 70 ? 'var(--color-accent-success)' : 'var(--color-accent-warning)' }} 
            />
          </div>
        </motion.div>

        <motion.div 
          className={styles.kpiCard}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        >
          <span className={styles.kpiLabel}>Critical Waste Node</span>
          <span className={styles.kpiValueAlert}>
            {highestWasteNode?.name.replace("Cluster ", "").replace("Namespace ", "") || "N/A"}
          </span>
          <span className={styles.kpiSub}>
            Efficiency: {highestWasteNode?.efficiency}%
          </span>
        </motion.div>
      </div>

      {/* Main Grid area */}
      <div className={styles.grid}>
        {/* Left Column: Data Table */}
        <motion.div 
          className={styles.panel}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Resource Breakdown ({viewMode})</h3>
          </div>
          <div className={styles.panelContent}>
            <DataTable
              data={currentData}
              isInView={true}
              onRowClick={viewMode === "cluster" ? handleRowClick : undefined}
              viewMode={viewMode}
            />
          </div>
        </motion.div>

        {/* Right Column: Visualization & Insights */}
        <div className={styles.sidebar}>
          <motion.div 
            className={styles.panel}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>Cost Distribution</h3>
            </div>
            <div className={styles.distributionChart}>
              <AnimatePresence mode="popLayout">
                {currentData.map((d, i) => (
                  <motion.div 
                    key={d.id} 
                    className={styles.distRow}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: 0.7 + i * 0.05 }}
                  >
                    <div className={styles.distLabel}>{d.name.replace("Cluster ", "").replace("Namespace ", "")}</div>
                    <div className={styles.distTrack}>
                      <motion.div 
                        className={styles.distFill} 
                        initial={{ width: 0 }}
                        animate={{ width: `${(d.total / Math.max(...currentData.map(node => node.total))) * 100}%` }}
                        transition={{ delay: 0.9 + i * 0.08, duration: 0.8, type: "spring", bounce: 0.2 }}
                        style={{ 
                          backgroundColor: d.efficiency < 40 ? 'var(--color-accent-error)' : d.efficiency < 70 ? 'var(--color-accent-warning)' : 'var(--color-accent-primary)'
                        }} 
                      />
                    </div>
                    <div className={styles.distValue}>
                      <AnimatedNumber value={d.total} prefix="$" isInView={true} delay={0.7 + i * 0.05} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <SavingsInsight data={currentData} isInView={true} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
