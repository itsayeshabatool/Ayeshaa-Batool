export default function StartupAgencyLanding() {
  return (
    <div className="page-agency site-full">
      <header className="agency-hero">
        <nav className="agency-nav">
          <span className="agency-logo">Vertex Studio</span>
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Work
          </a>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Services
          </a>
          <button type="button" className="agency-cta">
            Let&apos;s talk
          </button>
        </nav>
        <div className="agency-hero-inner">
          <h1 className="agency-hero-title">We launch brands that feel inevitable.</h1>
          <p>Strategy, design, and front-end engineering for funded startups — React demo for your portfolio.</p>
        </div>
      </header>
      <section className="agency-services" id="services">
        <h3>Services</h3>
        <div className="agency-service-grid">
          <article>
            <h4>Brand</h4>
            <p>Positioning, visual systems, and voice.</p>
          </article>
          <article>
            <h4>Product UI</h4>
            <p>From wireframes to implementation-ready React.</p>
          </article>
          <article>
            <h4>Growth pages</h4>
            <p>High-performance landing and funnel experiments.</p>
          </article>
        </div>
      </section>
      <section className="agency-work" id="work">
        <h3>Selected work</h3>
        <div className="agency-work-grid">
          {[
            { title: "Fintech rebrand", hue: "#6366f1" },
            { title: "Health onboarding", hue: "#0ea5e9" },
            { title: "B2B dashboard", hue: "#ec4899" },
          ].map((w) => (
            <div key={w.title} className="agency-tile" style={{ "--tile": w.hue }}>
              <span>{w.title}</span>
            </div>
          ))}
        </div>
      </section>
      <footer className="agency-footer">
        <p>© {new Date().getFullYear()} Vertex Studio — portfolio demo</p>
      </footer>
    </div>
  );
}
