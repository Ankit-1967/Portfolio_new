import React from 'react';
import './Hero.css';
import Icon from '../Icon/Icon';

function Hero({ data, typed, cursorVisible, scrollTo }) {
  const {
    eyebrow,
    headingLine1,
    headingLine2,
    headingLine3,
    description,
    primaryCtaText,
    secondaryCtaText,
    secondaryCtaLink,
    metaStats,
    developerCard
  } = data || {};

  return (
    <section id="home" className="hero section hero-section-wrapper">
      <div className="hero-grid" />
      <div className="hero-copy reveal is-visible">
        <p className="eyebrow"><span className="status-dot" /> {eyebrow || "Available for frontend projects"}</p>
        <h1>{headingLine1 || "I build digital"}<br /><span className="gradient-text">{headingLine2 || "experiences"}</span> {headingLine3 || "that matter."}</h1>
        <p className="hero-role">I'm a <strong>{typed}<span className="caret">{cursorVisible ? "|" : ""}</span></strong></p>
        <p className="hero-description">{description}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#projects" onClick={(e) => { e.preventDefault(); scrollTo("projects"); }}>
            {primaryCtaText || "View my work"} <Icon name="arrow" />
          </a>
          <a className="btn btn-ghost" href={secondaryCtaLink || "/resume.pdf"} download>
            {secondaryCtaText || "More about me"} <span>↓</span>
          </a>
        </div>
        <div className="hero-meta">
          {metaStats && metaStats.map((stat, i) => (
            <React.Fragment key={stat.label || i}>
              <span><b>{stat.value}</b> {stat.label}</span>
              {i < metaStats.length - 1 && <i />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="hero-visual reveal is-visible">
        <div className="orbit orbit-one"><span /></div>
        <div className="orbit orbit-two"><span /></div>
        <div className="code-card glass">
          <div className="window-bar"><span /><span /><span /><b>portfolio.jsx</b></div>
          <pre><code><span className="code-purple">const</span> developer = {"{"}
{"\n"}  name: <span className="code-green">"{developerCard?.name || 'Ankit Thakur'}"</span>,
{"\n"}  focus: <span className="code-green">"{developerCard?.focus || 'Frontend + AI'}"</span>,
{"\n"}  stack: [{(developerCard?.stack || ["React", "Vite"]).map(s => `"${s}"`).join(", ")}],
{"\n"}  mindset: <span className="code-green">"{developerCard?.mindset || 'Build. Learn. Repeat.'}"</span>
{"\n"}{"}"}</code></pre>
          <div className="code-glow" />
        </div>
        <div className="floating-badge badge-react"><span>⚛</span> React</div>
        <div className="floating-badge badge-ai"><span>✦</span> AI × Code</div>
        <div className="floating-badge badge-shopify"><span>◇</span> Shopify</div>
      </div>

      <button className="scroll-hint" onClick={() => scrollTo("about")} aria-label="Scroll to about">Scroll to explore <Icon name="down" /></button>
    </section>
  );
}

export default Hero;
