import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  FileText,
  Play,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import layersArt from "./assets/hero.png";

type DemoTab = "json" | "types" | "docs";

const demoTabs: { id: DemoTab; label: string; icon: typeof Braces }[] = [
  { id: "json", label: "Response", icon: Braces },
  { id: "types", label: "TypeScript", icon: Code2 },
  { id: "docs", label: "Field docs", icon: FileText },
];

const demoContent: Record<DemoTab, string> = {
  json: `{
  "status": "success",
  "user": {
    "id": 2048,
    "name": "Ada Lovelace",
    "verified": true
  }
}`,
  types: `interface RootObject {
  status: string;
  user: User;
}

interface User {
  id: number;
  name: string;
  verified: boolean;
}`,
  docs: `status      string   Request result
user        object   Account details
user.id     number   Unique identifier
user.name   string   Display name
verified    boolean  Trust status`,
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<DemoTab>("json");

  const runDemo = () => {
    const currentIndex = demoTabs.findIndex((tab) => tab.id === activeTab);
    setActiveTab(demoTabs[(currentIndex + 1) % demoTabs.length].id);
  };

  return (
    <div className="landing-shell min-h-screen overflow-hidden text-[#142d2a]">
      <header
        id="top"
        className="landing-nav relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10"
      >
        <Link
          to="/"
          className="landing-brand flex items-center gap-2.5"
          aria-label="CleanDocs home"
        >
          <span className="landing-brand-icon">
            <TerminalSquare size={19} />
          </span>
          <span>CleanDocs</span>
        </Link>
        <nav
          className="hidden items-center gap-8 text-sm font-medium text-[#58716d] md:flex"
          aria-label="Main navigation"
        >
          <Link className="landing-nav-link" to="/pricing">
            Pricing
          </Link>
          <a className="landing-nav-link" href="#workflow">
            How it works
          </a>
          <a className="landing-nav-link" href="#preview">
            Live preview
          </a>
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/signup" className="landing-signin">
            Sign up
          </Link>
          <Link to="/workspace" className="landing-nav-cta">
            Open workspace <ArrowRight size={15} />
          </Link>
        </div>
      </header>

      <main>
        <section className="landing-hero relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-7 md:px-10 lg:min-h-[690px] lg:grid-cols-[0.88fr_1.12fr] lg:gap-10 lg:pb-20 lg:pt-2">
          <div className="hero-copy relative z-[1]">
            <div className="hero-eyebrow">
              <Sparkles size={14} /> JSON TO DOCUMENTATION, IN ONE MOVE
            </div>
            <h1>
              Your JSON.
              <br className="hidden sm:block" />
              <span> Docs, done.</span>
            </h1>
            <p className="hero-description">
              Turn any API response into clean TypeScript types and field docs.
              Paste once, explore everything.
            </p>
            <div className="hero-actions">
              <Link to="/workspace" className="hero-primary">
                Start building <ArrowRight size={17} />
              </Link>
              <a href="#preview" className="hero-secondary">
                <Play size={15} fill="currentColor" /> See the live preview
              </a>
            </div>
            <div className="hero-proof">
              <span className="proof-check">
                <Check size={13} />
              </span>
              <span>Free to use</span>
              <span className="proof-divider" />
              <span>No setup required</span>
            </div>
          </div>

          <div className="demo-stage" id="preview">
            <img
              className="hero-layers-art"
              src={layersArt}
              alt=""
              aria-hidden="true"
            />
            <div className="demo-orbit orbit-one" />
            <div className="demo-orbit orbit-two" />
            <div className="demo-window">
              <div className="demo-window-topbar">
                <div className="window-dots">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="demo-file">
                  <Braces size={14} /> api-response.json
                </div>
                <span className="demo-status">
                  <i /> READY
                </span>
              </div>
              <div
                className="demo-tabs"
                role="tablist"
                aria-label="Preview output"
              >
                {demoTabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === id}
                    onClick={() => setActiveTab(id)}
                    className={`demo-tab ${activeTab === id ? "is-active" : ""}`}
                  >
                    <Icon size={14} /> {label}
                  </button>
                ))}
              </div>
              <div className="demo-code-area" key={activeTab}>
                <div className="demo-code-meta">
                  <span>
                    {activeTab === "json" ? "INPUT" : "GENERATED OUTPUT"}
                  </span>
                  <span>
                    {activeTab === "json"
                      ? "JSON"
                      : activeTab === "types"
                        ? "TS"
                        : "DOCS"}
                  </span>
                </div>
                <pre>{demoContent[activeTab]}</pre>
                {activeTab === "docs" && (
                  <div className="demo-doc-note">
                    5 fields detected <span>·</span> 3 types
                  </div>
                )}
              </div>
              <div className="demo-window-footer">
                <div
                  className="demo-stepper"
                  aria-label={`Preview step: ${activeTab}`}
                >
                  {demoTabs.map(({ id }, index) => (
                    <button
                      key={id}
                      type="button"
                      aria-label={`Show ${demoTabs[index].label}`}
                      aria-current={activeTab === id ? "step" : undefined}
                      onClick={() => setActiveTab(id)}
                      className={`demo-step ${activeTab === id ? "is-active" : ""}`}
                    />
                  ))}
                </div>
                <button type="button" className="demo-run" onClick={runDemo}>
                  <Play size={12} fill="currentColor" /> Run next step
                </button>
              </div>
            </div>
            <div className="floating-note note-top">
              <span className="note-spark">✳</span> Types, instantly
            </div>
            <div className="floating-note note-bottom">
              <span className="note-check">
                <Check size={11} />
              </span>{" "}
              100% in your browser
            </div>
          </div>
        </section>

        <section
          className="workflow-strip"
          id="workflow"
          aria-label="CleanDocs workflow"
        >
          <div className="workflow-inner">
            <div className="workflow-heading">
              <span>FROM RESPONSE TO REFERENCE</span>
              <span className="workflow-rule" />
            </div>
            <div className="workflow-steps">
              <div className="workflow-step">
                <span className="workflow-number">01</span>
                <div>
                  <strong>Paste a response</strong>
                  <small>Bring any JSON payload</small>
                </div>
              </div>
              <ArrowRight className="workflow-arrow" size={17} />
              <div className="workflow-step">
                <span className="workflow-number">02</span>
                <div>
                  <strong>Generate typed docs</strong>
                  <small>See every field at a glance</small>
                </div>
              </div>
              <ArrowRight className="workflow-arrow" size={17} />
              <div className="workflow-step">
                <span className="workflow-number">03</span>
                <div>
                  <strong>Copy and ship</strong>
                  <small>Take clean output anywhere</small>
                </div>
              </div>
              <Link className="workflow-link" to="/workspace">
                Try the workspace <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div
          className="footer-marquee"
          aria-label="JSON in, types out, docs ready"
        >
          <div className="footer-marquee-track" aria-hidden="true">
            {Array.from({ length: 2 }, (_, index) => (
              <span className="footer-marquee-group" key={index}>
                <span>JSON IN</span>
                <i />
                <span>TYPES OUT</span>
                <i />
                <span>DOCS READY</span>
                <i />
                <span>SHIP WITH CLARITY</span>
                <i />
              </span>
            ))}
          </div>
        </div>

        <div className="footer-inner">
          <div className="footer-cta-block">
            <div className="footer-cta-copy">
              <span className="footer-eyebrow">
                <Sparkles size={14} /> YOUR NEXT RESPONSE, MADE READABLE
              </span>
              <h2>
                Good docs make
                <br />
                <span>better APIs.</span>
              </h2>
              <p>
                Bring the payload. Leave with something your whole team can use.
              </p>
              <Link to="/workspace" className="footer-primary">
                Open CleanDocs <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="footer-mark" aria-hidden="true">
              <div className="footer-mark-ring ring-a" />
              <div className="footer-mark-ring ring-b" />
              <div className="footer-mark-core">
                <Braces size={39} strokeWidth={1.5} />
              </div>
              <span className="footer-mark-label">
                JSON <i /> DOCS
              </span>
            </div>
          </div>

          <div className="footer-bottom">
            <Link to="/" className="footer-brand" aria-label="CleanDocs home">
              <span className="footer-brand-icon">
                <TerminalSquare size={17} />
              </span>
              <span>CleanDocs</span>
            </Link>
            <p className="footer-note">A clearer view of every response.</p>
            <nav className="footer-links" aria-label="Footer navigation">
              <Link to="/workspace">Workspace</Link>
              <Link to="/pricing">Pricing</Link>
              <a href="#workflow">How it works</a>
              <a href="#preview">Preview</a>
              <a href="#top" className="footer-top-link">
                Back to top <ArrowUpRight size={13} />
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
