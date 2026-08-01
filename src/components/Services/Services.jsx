import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
import Icon from '../Icon/Icon';

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

function Services({ data, isHomePage = true }) {
  const { number, label, title, items } = data || {};
  const rawServices = items || [];
  const displayServices = isHomePage
    ? rawServices.filter(s => s.showOnHome !== false)
    : rawServices;

  return (
    <section id="services" className="section services-section-wrapper">
      <SectionHeading number={number || "06"} title={title || "How I can help"} label={label || "Services"} />
      
      {isHomePage && (
        <div className="services-toolbar reveal" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
          <Link to="/services" className="services-explore-btn">
            View All Services <Icon name="arrow" />
          </Link>
        </div>
      )}

      <div className="services-grid">
        {displayServices.map((item, index) => {
          const num = item.number || `0${index + 1}`;
          const t = item.title;
          const d = item.description;
          return (
            <article className="service-card reveal" key={item.id || index}>
              <span>{num}</span>
              <h3>{t}</h3>
              <p>{d}</p>
              <Icon name="arrow" />
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Services;
