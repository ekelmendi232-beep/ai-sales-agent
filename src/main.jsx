import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { createProspect, profiles } from "./prospect.js";
import "./styles.css";

function App() {
  const [name, setName] = useState("Acme Studio");
  const [website, setWebsite] = useState("");
  const [focus, setFocus] = useState("productivity");
  const [result, setResult] = useState(() =>
    createProspect({ name: "Acme Studio" }),
  );
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const [draft, setDraft] = useState(result.email);
  function generate(event) {
    event.preventDefault();
    try {
      const next = createProspect({ name, website, focus });
      setResult(next);
      setDraft(next.email);
      setError("");
      setCopied("");
    } catch (err) {
      setError(err.message);
    }
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied("Copied to clipboard.");
    } catch {
      setCopied(
        "Copy is unavailable here. Select the draft text and copy it manually.",
      );
    }
  }
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#">
          <span className="brand-mark">s</span> signal
          <span className="brand-dot">.</span>
        </a>
        <div className="workspace-label">YOUR WORKSPACE</div>
        <a className="nav-item" href="#prospect">
          <span aria-hidden="true">▦</span> Prospecting{" "}
          <span className="nav-count">01</span>
        </a>
        <div className="sidebar-bottom">
          <span className="avatar">YOU</span>
          <div>
            Your workspace<small>Starter edition · v1</small>
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <span>
            Workspace <span className="crumb">/</span>{" "}
            <strong>AI prospecting</strong>
          </span>
          <span className="demo-pill">
            <span /> Demo mode
          </span>
        </header>
        <main id="prospect">
          <div className="heading">
            <div>
              <div className="eyebrow">
                LESS RESEARCH FRICTION. MORE POSSIBILITY.
              </div>
              <h1>Find your next AI opportunity.</h1>
              <p>
                Turn a company name into a thoughtful starting point for
                outreach.
              </p>
            </div>
            <span className="edition">✦ AI prospecting</span>
          </div>
          <div className="notice">
            <span className="notice-icon" aria-hidden="true">
              i
            </span>
            <div>
              <strong>Mock data, real possibilities.</strong> This demo uses
              local templates, not AI or verified research. Websites are not
              visited. Validate every assumption before outreach.
            </div>
          </div>
          <section className="card input-card" aria-labelledby="input-title">
            <div className="section-title">
              <span className="step">01</span>
              <div>
                <h2 id="input-title">Start with a company</h2>
                <p>
                  A name is all you need. Add a focus to shape your results.
                </p>
              </div>
            </div>
            <form onSubmit={generate}>
              <div className="form-grid">
                <label>
                  Company name <span className="required">*</span>
                  <input
                    required
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Acme Studio"
                  />
                </label>
                <label>
                  Company website <span className="optional">Optional</span>
                  <input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="e.g. acme.com"
                    aria-describedby="website-hint"
                  />
                  <span id="website-hint" className="field-hint">
                    Saved with your result; never fetched.
                  </span>
                </label>
                <label>
                  Opportunity focus
                  <select
                    value={focus}
                    onChange={(e) => setFocus(e.target.value)}
                  >
                    {Object.entries(profiles).map(([key, item]) => (
                      <option key={key} value={key}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="form-footer">
                <span>No API key needed. No email is sent.</span>
                <button type="submit">
                  Generate mock brief <span aria-hidden="true">↗</span>
                </button>
              </div>
              {error && (
                <p className="error" role="alert">
                  {error}
                </p>
              )}
            </form>
          </section>
          <div className="result-heading">
            <div>
              <span className="eyebrow">YOUR ACCOUNT BRIEF</span>
              <h2>{result.company}</h2>
            </div>
            <span className="mock-tag">MOCK RESULTS</span>
          </div>
          <div className="results-grid">
            <section className="card overview">
              <div className="card-label">
                <span aria-hidden="true">▤</span> Company overview
              </div>
              <h3>A starting point, ready to explore.</h3>
              <p>
                <strong>{result.company}</strong> is the account you selected.
                This illustrative brief explores{" "}
                {result.profile.label.toLowerCase()} opportunities. Its
                industry, size, products, and business needs are unknown.
              </p>
              <div className="website-row">
                <span aria-hidden="true">◎</span>{" "}
                {result.website || "No website supplied"}
              </div>
              <div className="assumption">
                Discovery prompt{" "}
                <span>
                  Which repetitive tasks take up the most time for your team?
                </span>
              </div>
            </section>
            <section className="card score-card">
              <div className="card-label">
                Account priority <span className="small-tag">Illustrative</span>
              </div>
              <div className="score-line">
                <strong>
                  {result.score}
                  <span>/100</span>
                </strong>
                <span className="priority">Explore further</span>
              </div>
              <p className="score-description">
                A demo score, not a prediction of buying intent.
              </p>
              <details>
                <summary>How this score is calculated</summary>
                <div className="criteria">
                  {result.criteria.map((item) => (
                    <div className="criterion" key={item.label}>
                      <div>
                        <strong>{item.label}</strong>
                        <b>
                          {item.points}/{item.max}
                        </b>
                      </div>
                      <progress value={item.points} max={item.max} />
                      <p>{item.detail}</p>
                    </div>
                  ))}
                  <p>No points are based on verified company research.</p>
                </div>
              </details>
            </section>
            <section className="card use-cases">
              <div className="card-label">
                <span aria-hidden="true">✧</span> Three ways AI could help
              </div>
              <p className="subtext">
                Hypotheses to discuss, not confirmed company needs.
              </p>
              <div className="case-grid">
                {result.profile.cases.map(([title, description], i) => (
                  <article className="case" key={title}>
                    <span className="case-number">0{i + 1}</span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className="card solution">
              <div className="card-label">Recommended solution</div>
              <div className="solution-logo" aria-hidden="true">
                ✳
              </div>
              <h3>{result.profile.solution}</h3>
              <p>{result.profile.reason}</p>
              <div className="solution-note">
                Matched to your selected focus, not researched account
                requirements. Confirm security, data, and workflow needs in
                discovery.
              </div>
            </section>
            <section className="card email-card">
              <div className="email-header">
                <div>
                  <div className="card-label">
                    <span aria-hidden="true">↗</span> Your conversation starter
                  </div>
                  <h3>A personal first touch.</h3>
                </div>
                <button className="secondary" onClick={copyEmail}>
                  Copy email
                </button>
              </div>
              <p className="subtext">
                Template draft · Edit the message and add your name before using
                it.
              </p>
              <label className="sr-only" htmlFor="email">
                Editable outbound email draft
              </label>
              <textarea
                id="email"
                value={draft}
                onChange={(e) => {
                  setDraft(e.target.value);
                  setCopied("");
                }}
                spellCheck="true"
              />
              <div className="email-footer">
                <span>✎ You’re in control. Nothing is sent automatically.</span>
                <span role="status">{copied}</span>
              </div>
            </section>
          </div>
          <footer>
            Built for better conversations.<span>Signal · Mock-data demo</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
