import React from 'react';
import './About.css';

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

function About({ data }) {
  const { number, label, title, leadText, paragraphs, signatureName, signatureTitle } = data || {};

  return (
    <section id="about" className="section narrow-section about-section-wrapper">
      <SectionHeading number={number || "01"} title={title || "A little about me"} label={label || "About me"} />
      <div className="about-layout">
        <div className="about-lead reveal">
          <p className="big-copy">{leadText || "I care about the space where design, code and technology meet."}</p>
        </div>
        <div className="about-body reveal">
          {paragraphs && paragraphs.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
          <div className="signature">
            {signatureName || "Ankit Thakur"} <span>— {signatureTitle || "Frontend Developer"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
