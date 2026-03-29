import { useState } from "react";

export default function SasProductLanding() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="page-saas site-full">
      <nav className="saas-nav">
        <span className="saas-brand">Nimbus</span>
        <div className="saas-nav-links">
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Features
          </a>
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Pricing
          </a>
          <button type="button" className="saas-btn-outline">
            Sign in
          </button>
          <button type="button" className="saas-btn-primary">
            Start free
          </button>
        </div>
      </nav>
      <header className="saas-hero">
        <div className="saas-hero-gradient" aria-hidden />
        <p className="saas-eyebrow">SAS product experience · demo</p>
        <h1 className="saas-hero-title">Ship insights your team actually uses.</h1>
        <p className="saas-sub">
          Dashboards, alerts, and workflows in one place. No code demo — interactive React layout for your portfolio.
        </p>
        <div className="saas-hero-cta">
          <button type="button" className="saas-btn-primary">
            Get started
          </button>
          <button type="button" className="saas-btn-ghost">
            Watch overview
          </button>
        </div>
      </header>
      <section className="saas-features" id="features">
        <h3>Everything in sync</h3>
        <div className="saas-grid">
          <article>
            <div className="saas-icon">⚡</div>
            <h4>Real-time</h4>
            <p>Stream metrics with live connections — pattern shown here for layout only.</p>
          </article>
          <article>
            <div className="saas-icon">🔒</div>
            <h4>Permissions</h4>
            <p>Role-based access that scales from prototype to production.</p>
          </article>
          <article>
            <div className="saas-icon">📊</div>
            <h4>Reports</h4>
            <p>Export and schedule reports your stakeholders will read.</p>
          </article>
        </div>
      </section>
      <section className="saas-pricing" id="pricing">
        <h3>Simple pricing</h3>
        <div className="saas-toggle">
          <span className={!annual ? "active" : ""}>Monthly</span>
          <button
            type="button"
            className={`saas-switch ${annual ? "annual" : ""}`}
            onClick={() => setAnnual(!annual)}
            aria-pressed={annual}
            aria-label="Toggle annual billing"
          >
            <span className="saas-knob" />
          </button>
          <span className={annual ? "active" : ""}>
            Annual <em>Save 20%</em>
          </span>
        </div>
        <div className="saas-plans">
          <div className="saas-plan">
            <h4>Starter</h4>
            <p className="saas-price">{annual ? "$19" : "$24"} / mo</p>
            <ul>
              <li>5 seats</li>
              <li>Core dashboards</li>
            </ul>
            <button type="button" className="saas-btn-outline full">
              Choose
            </button>
          </div>
          <div className="saas-plan featured">
            <span className="saas-badge">Popular</span>
            <h4>Pro</h4>
            <p className="saas-price">{annual ? "$49" : "$62"} / mo</p>
            <ul>
              <li>Unlimited seats</li>
              <li>SSO &amp; API</li>
            </ul>
            <button type="button" className="saas-btn-primary full">
              Choose
            </button>
          </div>
        </div>
      </section>
      <section className="saas-logos" aria-label="Trusted by">
        <p>Trusted by teams at</p>
        <div className="saas-logo-row">
          {["Acme", "Northwind", "Globex", "Umbrella", "Stark"].map((name) => (
            <span key={name} className="saas-logo-pill">
              {name}
            </span>
          ))}
        </div>
      </section>
      <section className="saas-quote">
        <blockquote>
          <p>
            &ldquo;We replaced three tools with Nimbus. Onboarding took a day.&rdquo;
          </p>
          <footer>— Jamie Chen, VP Ops · demo quote</footer>
        </blockquote>
      </section>
      <section className="saas-final-cta">
        <h2>Ready to ship smarter?</h2>
        <p>Start free — full SaaS marketing layout built with React for your portfolio.</p>
        <button type="button" className="saas-btn-primary saas-btn-lg">
          Create workspace
        </button>
      </section>
      <footer className="saas-footer">
        <div className="saas-footer-grid">
          <span className="saas-brand">Nimbus</span>
          <div className="saas-footer-links">
            <button type="button" className="saas-footer-link-btn">
              Docs
            </button>
            <button type="button" className="saas-footer-link-btn">
              Security
            </button>
            <button type="button" className="saas-footer-link-btn">
              Contact
            </button>
          </div>
        </div>
        <p className="saas-footer-copy">© {new Date().getFullYear()} Nimbus · portfolio demo site</p>
      </footer>
    </div>
  );
}
