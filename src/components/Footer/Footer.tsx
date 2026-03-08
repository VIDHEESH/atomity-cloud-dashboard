"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <p className={styles.text}>
        <span className={styles.brand}>Atomity</span> — Cloud Optimization Platform
      </p>
      <p className={styles.subtext}>Frontend Engineering Challenge</p>
    </footer>
  );
}
