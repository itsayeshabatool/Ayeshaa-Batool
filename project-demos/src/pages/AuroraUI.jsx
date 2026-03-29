import { useState } from "react";

export default function AuroraUI() {
  const [theme, setTheme] = useState("aurora");

  return (
    <div className={`page-aurora site-full theme-${theme}`}>
      <nav className="aurora-site-nav">
        <span className="aurora-site-brand">Aurora UI</span>
        <div className="aurora-site-links">
          <span>Components</span>
          <span>Tokens</span>
          <span>Docs</span>
        </div>
      </nav>
      <div className="aurora-inner">
        <p className="aurora-intro">
          A compact design-system showcase — buttons, forms, cards, and palette tokens. Switch theme for light/dark
          surfaces.
        </p>
        <div className="aurora-toolbar">
          <span className="aurora-label">Preview theme</span>
          <div className="aurora-seg">
            <button type="button" className={theme === "aurora" ? "on" : ""} onClick={() => setTheme("aurora")}>
              Aurora
            </button>
            <button type="button" className={theme === "dusk" ? "on" : ""} onClick={() => setTheme("dusk")}>
              Dusk
            </button>
          </div>
        </div>
        <section className="aurora-section">
          <h3>Buttons</h3>
          <div className="aurora-row">
            <button type="button" className="au-btn primary">
              Primary
            </button>
            <button type="button" className="au-btn secondary">
              Secondary
            </button>
            <button type="button" className="au-btn ghost">
              Ghost
            </button>
          </div>
        </section>
        <section className="aurora-section">
          <h3>Inputs</h3>
          <div className="aurora-form">
            <label>
              Email
              <input type="email" placeholder="you@company.com" />
            </label>
            <label>
              Message
              <textarea rows={3} placeholder="Brief description" />
            </label>
          </div>
        </section>
        <section className="aurora-section">
          <h3>Cards</h3>
          <div className="aurora-cards">
            <div className="au-card">
              <h4>Metric</h4>
              <p className="au-stat">98.2%</p>
              <p className="au-caption">Uptime last 30 days</p>
            </div>
            <div className="au-card elevated">
              <h4>Alert</h4>
              <p>Deployment finished successfully.</p>
            </div>
          </div>
        </section>
        <section className="aurora-section">
          <h3>Tokens</h3>
          <div className="aurora-swatches">
            {["#6366f1", "#8b5cf6", "#ec4899", "#0ea5e9"].map((c) => (
              <div key={c} className="aurora-swatch" style={{ "--sw": c }}>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
