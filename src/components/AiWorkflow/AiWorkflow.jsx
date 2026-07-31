import React from 'react';
import './AiWorkflow.css';

function SectionHeading({ number, title, label }) {
  return (
    <div className="section-heading reveal">
      <span className="section-number">{number}</span>
      <div>
        <p className="eyebrow">{label}</p>
        <h2>{title}</h2>
      </div>
    </div>
  );
}

function AiWorkflow({ data }) {
  const { number, label, title, introText, items } = data || {};

  return (
    <section id="ai" className="section ai-section ai-section-wrapper">
      <SectionHeading number={number || "03"} title={title || "AI × Development"} label={label || "Ai workflow"} />
      <p className="section-intro reveal">
        {introText || "I use AI tools as development assistants to explore ideas, understand new concepts, debug problems, improve implementations and create visual assets — while keeping the final decisions and code under my control."}
      </p>
      <div className="ai-grid">
        {items && items.map((skill, i) => (
          <article className="ai-card glass reveal" style={{ "--delay": `${i * 100}ms` }} key={skill.name || i}>
            <div className="ai-icon">{skill.icon}</div>
            <span className="card-index">0{i + 1}</span>
            <h3>{skill.name}</h3>
            <p>{skill.text}</p>
            <div className="card-line" />
          </article>
        ))}
      </div>
    </section>
  );
}

export default AiWorkflow;
