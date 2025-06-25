"use client";
import styles from "../Landing.module.css";
import contentStyles from "./content.module.css";
import Image from "next/image";
import { useState } from "react";

export default function ContentPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const csvHeaders = ["Column 1", "Column 2", "Column 3"];
  const csvRows = [
    ["Value A1", "Value B1", "Value C1"],
    ["Value A2", "Value B2", "Value C2"],
    ["Value A3", "Value B3", "Value C3"],
    ["Value A4", "Value B4", "Value C4"],
    ["Value A5", "Value B5", "Value C5"],
  ];

  return (
    <div className={styles.landing}>
      <header className={styles.navbar} style={{position:'relative'}}>
        <div className={styles.logoRow}>
          <img src="/logo_image.svg" alt="Logo" className={styles.logo} />
          <span className={styles.brand}>Image-Template-Filler</span>
        </div>
        <nav className={contentStyles.navLinks}>
          <a href="/" className={contentStyles.navLink}>Home</a>
          <a href="https://github.com/alvin-dennis/Image-Template-Filler" target="_blank" rel="noopener noreferrer" className={contentStyles.navLink}>Github</a>
        </nav>
        <button className={contentStyles.hamburger} aria-label="Open menu" onClick={()=>setMenuOpen(v=>!v)}>
          <span className={contentStyles.hamburgerBar}></span>
          <span className={contentStyles.hamburgerBar}></span>
          <span className={contentStyles.hamburgerBar}></span>
        </button>
        {menuOpen && <div className={contentStyles.menuOverlay + ' '+ contentStyles.show} onClick={()=>setMenuOpen(false)}></div>}
        {menuOpen && (
          <nav className={contentStyles.mobileNav + ' ' +contentStyles.show}>
            <a href="/" onClick={()=>setMenuOpen(false)}>Home</a>
            <a href="https://github.com/alvin-dennis/Image-Template-Filler" target="_blank" rel="noopener noreferrer" onClick={()=>setMenuOpen(false)}>Github</a>
          </nav>
        )}
      </header>
      <main className={contentStyles.mainContent}>
        <section className={contentStyles.csvSection}>
          <h2 className={contentStyles.sectionTitle}>Edit CSV Content</h2>
          <div className={contentStyles.tableWrapper}>
            <table className={contentStyles.csvTable}>
              <thead className={contentStyles.tableHead}>
                <tr>
                  {csvHeaders.map((header, idx) => (
                    <th key={idx} className={contentStyles.tableHeader}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvRows.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className={contentStyles.tableCell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className={contentStyles.previewSection}>
          <h2 className={contentStyles.sectionTitle}>Preview</h2>
          <div className={contentStyles.previewRow}>
            <div className={contentStyles.previewImageWrap}>
              <Image src="/content_preview.png" alt="Preview" width={369} height={242} className={contentStyles.previewImage} />
            </div>
            <div className={contentStyles.previewTextWrap}>
              <span className={contentStyles.previewLabel}>Preview</span>
              <div className={contentStyles.previewTitle}>Image Preview</div>
              <div className={contentStyles.previewDesc}>
                This is a preview of the image that will be generated based on the CSV content.
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
