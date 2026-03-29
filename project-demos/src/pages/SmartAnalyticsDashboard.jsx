import { useMemo, useState } from "react";

const rows = [
  { name: "North America", rev: "$42.1k", conv: "3.2%", trend: "+12%" },
  { name: "Europe", rev: "$31.8k", conv: "2.8%", trend: "+8%" },
  { name: "Asia Pacific", rev: "$28.4k", conv: "4.1%", trend: "+18%" },
  { name: "LATAM", rev: "$9.2k", conv: "2.1%", trend: "+5%" },
];

const bars = [
  { label: "Mon", v: 45 },
  { label: "Tue", v: 72 },
  { label: "Wed", v: 58 },
  { label: "Thu", v: 90 },
  { label: "Fri", v: 68 },
  { label: "Sat", v: 38 },
  { label: "Sun", v: 52 },
];

export default function SmartAnalyticsDashboard() {
  const [range, setRange] = useState("7d");

  const kpi = useMemo(
    () => ({
      revenue: range === "7d" ? "$112.4k" : "$482.1k",
      sessions: range === "7d" ? "24.8k" : "102k",
      bounce: range === "7d" ? "38.2%" : "41.0%",
    }),
    [range]
  );

  return (
    <div className="page-dashboard site-full">
      <aside className="dash-sidebar">
        <div className="dash-logo">Pulse Analytics</div>
        <nav className="dash-nav">
          <button type="button" className="active">
            Overview
          </button>
          <button type="button">Reports</button>
          <button type="button">Audiences</button>
          <button type="button">Settings</button>
        </nav>
      </aside>
      <div className="dash-body">
        <header className="dash-app-header">
          <div className="dash-app-title">
            <span className="dash-live">Live</span>
            <h1 className="dash-page-h1">Overview</h1>
            <span className="dash-date">Updated · just now</span>
          </div>
          <div className="dash-app-actions">
            <button type="button" className="dash-btn-ghost">
              Export
            </button>
            <button type="button" className="dash-btn-primary">
              Share report
            </button>
            <span className="dash-avatar" aria-hidden="true">
              AR
            </span>
          </div>
        </header>
        <div className="dash-top">
          <h2 className="dash-section-heading">Performance</h2>
          <div className="dash-range">
            <button type="button" className={range === "7d" ? "on" : ""} onClick={() => setRange("7d")}>
              7 days
            </button>
            <button type="button" className={range === "30d" ? "on" : ""} onClick={() => setRange("30d")}>
              30 days
            </button>
          </div>
        </div>
        <div className="dash-kpis">
          <div className="dash-kpi">
            <span className="dash-kpi-label">Revenue</span>
            <strong>{kpi.revenue}</strong>
            <span className="dash-kpi-delta up">↑ vs prior period</span>
          </div>
          <div className="dash-kpi">
            <span className="dash-kpi-label">Sessions</span>
            <strong>{kpi.sessions}</strong>
            <span className="dash-kpi-delta up">↑ 6.4%</span>
          </div>
          <div className="dash-kpi">
            <span className="dash-kpi-label">Bounce rate</span>
            <strong>{kpi.bounce}</strong>
            <span className="dash-kpi-delta down">↓ Good</span>
          </div>
        </div>
        <div className="dash-chart-card">
          <h3>Traffic</h3>
          <div className="dash-bars" role="img" aria-label="Weekly traffic bars">
            {bars.map((b) => (
              <div key={b.label} className="dash-bar-wrap">
                <div className="dash-bar" style={{ height: `${b.v}%` }} />
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="dash-table-card">
          <h3>Regions</h3>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Region</th>
                <th>Revenue</th>
                <th>Conv.</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name}>
                  <td>{r.name}</td>
                  <td>{r.rev}</td>
                  <td>{r.conv}</td>
                  <td className="dash-trend">{r.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
