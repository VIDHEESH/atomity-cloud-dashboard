"use client";

import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import AnalystDashboard from "@/components/AnalystDashboard/AnalystDashboard";

export default function Home() {
  return (
    <main className="dashboard-layout">
      {/* Sleek App Toolbar instead of a Marketing Header */}
      <header className="app-header">
        <div className="header-left">
          <div className="app-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.8" />
              <path d="M2 17L12 22L22 17" fill="currentColor" opacity="0.4" />
              <path d="M2 12L12 17L22 12" fill="currentColor" />
            </svg>
            <span className="brand-name">Atomity</span>
            <span className="app-name">/ Resource Intelligence</span>
          </div>
        </div>
        
        <div className="header-right">
          <div className="time-picker">
            <span className="time-label">Date Range:</span>
            <select className="time-select" defaultValue="30d">
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last Quarter</option>
            </select>
          </div>
          <button className="export-btn" aria-label="Export Data">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Export Report
          </button>
          <div className="divider" />
          <ThemeToggle />
        </div>
      </header>

      {/* The actual data analysis workspace */}
      <div className="workspace">
        <div className="workspace-header">
          <h1 className="report-title">Infrastructure Cost & Efficiency Report</h1>
          <p className="report-meta">Generated: {new Date().toLocaleDateString()} • Granularity: Cluster/Namespace</p>
        </div>
        
        <AnalystDashboard />
      </div>
    </main>
  );
}
