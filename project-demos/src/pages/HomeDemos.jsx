import { Link } from "react-router-dom";

const demos = [
  { to: "/smart-analytics-dashboard", label: "Smart Analytics Dashboard", tag: "Web App" },
  { to: "/sas-product-landing", label: "SAS Product Landing", tag: "Landing" },
  { to: "/aurora-ui", label: "Aurora UI", tag: "UI kit" },
  { to: "/cod-snippet-manager", label: "COD Snippet Manager", tag: "Tool" },
  { to: "/team-collaboration-app", label: "Team Collaboration App", tag: "Web App" },
  { to: "/startup-agency-landing", label: "Startup Agency Landing", tag: "Landing" },
  { to: "/image-compressor-tool", label: "Image Compressor Tool", tag: "Tool" },
];

export default function HomeDemos() {
  return (
    <div className="home-demos">
      <p className="home-demos-lead">
        Each project opens as its own full-page website (dashboard, landing, tool, etc.). Your main portfolio &quot;View
        project&quot; buttons jump straight here in a new tab.
      </p>
      <ul className="home-demos-grid">
        {demos.map((d) => (
          <li key={d.to}>
            <Link className="home-demos-card" to={d.to}>
              <span className="home-demos-tag">{d.tag}</span>
              <span className="home-demos-name">{d.label}</span>
              <span className="home-demos-cta">Open demo →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
