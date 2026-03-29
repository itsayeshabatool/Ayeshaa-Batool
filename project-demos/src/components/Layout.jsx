import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const routeTitles = {
  "/": "Project demos",
  "/smart-analytics-dashboard": "Smart Analytics Dashboard",
  "/sas-product-landing": "SAS Product Landing",
  "/aurora-ui": "Aurora UI",
  "/cod-snippet-manager": "COD Snippet Manager",
  "/team-collaboration-app": "Team Collaboration App",
  "/startup-agency-landing": "Startup Agency Landing",
  "/image-compressor-tool": "Image Compressor Tool",
};

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const projectTitle = routeTitles[pathname] || "Demo";

  useEffect(() => {
    if (isHome) {
      document.title = "Open a project — Portfolio demos";
    } else {
      document.title = `${projectTitle} — Full demo`;
    }
  }, [isHome, projectTitle]);

  return (
    <div className={`demo-app ${isHome ? "demo-app--hub" : "demo-app--project"}`}>
      {isHome ? (
        <header className="demo-header">
          <a className="demo-back" href="../../index.html">
            ← Back to portfolio
          </a>
          <div className="demo-header-text">
            <h1 className="demo-title">Project demos</h1>
            <p className="demo-stack">Each link opens a full mini-site (HTML, CSS, JavaScript, React)</p>
          </div>
        </header>
      ) : (
        <a
          className="demo-back-float"
          href="../../index.html"
          title="Return to main portfolio"
        >
          ← Portfolio
        </a>
      )}
      <main className={isHome ? "demo-main demo-main--home" : "demo-main demo-main--fullsite"}>
        <Outlet />
      </main>
    </div>
  );
}
