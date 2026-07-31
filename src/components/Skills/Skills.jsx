import React from 'react';
import './Skills.css';

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

function Skills({ data }) {
  const { number, label, title, hugeNumber, introText, items } = data || {};

  return (
    <section id="skills" className="section skills-section-wrapper">
      <SectionHeading number={number || "02"} title={title || "My toolkit"} label={label || "Technologies"} />
      <div className="skills-layout">
        <div className="skills-intro reveal">
          <span className="huge-number">{hugeNumber || (items ? String(items.length).padStart(2, '0') : "08")}</span>
          <p>{introText || "The technologies and skills I use to turn ideas and designs into functional digital experiences."}</p>
        </div>
        <div className="skill-list reveal">
          {items && items.map((skill, i) => {
            const name = typeof skill === 'object' ? skill.name : skill[0];
            const value = typeof skill === 'object' ? skill.percentage : skill[1];
            return (
              <div className="skill-row reveal" style={{ "--delay": `${i * 55}ms` }} key={name || i}>
                <div className="skill-label">
                  <span>{name}</span>
                  <b>{value}%</b>
                </div>
                <div className="progress">
                  <span style={{ width: `${value}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;
