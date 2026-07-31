import React from 'react';
import './Experience.css';

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

function TimelineItem({ year, title, company, text }) {
  return (
    <article className="timeline-item reveal">
      <div className="timeline-dot" />
      <div className="timeline-year">{year}</div>
      <div>
        <h3>{title}</h3>
        <strong>{company}</strong>
        <p>{text}</p>
      </div>
    </article>
  );
}

function Experience({ data }) {
  const { number, label, title, items } = data || {};

  return (
    <section id="experience" className="section experience-section-wrapper">
      <SectionHeading number={number || "05"} title={title || "Experience & education"} label={label || "Journey"} />
      <div className="timeline">
        {items && items.map((item, i) => (
          <TimelineItem
            key={item.id || i}
            year={item.year}
            title={item.title}
            company={item.company}
            text={item.text}
          />
        ))}
      </div>
    </section>
  );
}

export default Experience;
