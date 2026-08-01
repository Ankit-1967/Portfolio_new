import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon/Icon';
import Contact from '../../components/Contact/Contact';
import './ServicesPage.css';

function ServicesPage({ data, contactData, submit, formStatus, submitting }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top when Services page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { number, label, title, items, categories: initialCategories } = data || {};

  const servicesList = items || [
    { id: "s1", number: "01", category: "Frontend", title: "Frontend Development", description: "Creating responsive websites using HTML, CSS and JavaScript with clean, scalable and user-friendly interfaces." },
    { id: "s2", number: "02", category: "Shopify", title: "Shopify Development", description: "Custom Shopify themes, Liquid sections, storefront customization and optimized e-commerce experiences." },
    { id: "s3", number: "03", category: "React", title: "React Development", description: "Building fast, responsive and maintainable React applications with reusable components and modern development practices." },
    { id: "s4", number: "04", category: "UI Engineering", title: "UI Engineering", description: "Transforming Figma designs into pixel-perfect, responsive and accessible web interfaces." },
    { id: "s5", number: "05", category: "Performance", title: "Performance Optimization", description: "Improving website speed, responsiveness, code quality and overall user experience." },
    { id: "s6", number: "06", category: "AI Workflow", title: "AI-assisted Development", description: "Using AI tools for learning, debugging, code reviews, documentation and improving development workflows." }
  ];

  const categories = initialCategories || [
    'All',
    'Frontend',
    'Shopify',
    'React',
    'UI Engineering',
    'Performance',
    'AI Workflow'
  ];

  const filteredServices = servicesList.filter(item => {
    const itemCat = item.category || 'Development';
    const matchesFilter = activeFilter === 'All' || itemCat.toLowerCase() === activeFilter.toLowerCase() || item.title.toLowerCase().includes(activeFilter.toLowerCase());
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="services-page-main">
      {/* Services Page Header Banner */}
      <section className="services-page-hero section">
        <div className="services-page-hero-content">
          <Link to="/" className="back-link">
            ← Back to Home Page (/#)
          </Link>
          <div className="section-heading">
            <span className="section-number">{number || "06"}</span>
            <div>
              <p className="eyebrow">{label || "Services Offered"}</p>
              <h2>{title || "Specialized Solutions & Expertise"}</h2>
            </div>
          </div>
          <p className="services-page-lead">
            Comprehensive frontend engineering, e-commerce solutions, React application architecture, and AI-boosted developer workflows tailored for high performance.
          </p>
        </div>

        {/* Filter Controls Bar on Services Page */}
        <div className="services-filter-container">
          <div className="services-filter-header">
            <h3>Filter Services by Category</h3>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search services"
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
              )}
            </div>
          </div>

          <div className="services-filter-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section services-grid-section">
        {filteredServices.length === 0 ? (
          <div className="no-services-found">
            <p>No services found matching <strong>"{activeFilter}"</strong> {searchQuery && `or "${searchQuery}"`}.</p>
            <button className="btn btn-secondary" onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}>Reset Filters</button>
          </div>
        ) : (
          <div className="services-page-grid">
            {filteredServices.map((item, index) => {
              const num = item.number || `0${index + 1}`;
              const categoryTag = item.category || 'Engineering';
              return (
                <article className="service-card services-page-card" key={item.id || index}>
                  <div className="card-top-row">
                    <span className="service-num">{num}</span>
                    <span className="category-badge">{categoryTag}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="service-card-footer">
                    <a href="#contact" className="service-cta">
                      Request Service <Icon name="arrow" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Contact Section on Services Page */}
      <Contact
        data={contactData}
        submit={submit}
        formStatus={formStatus}
        submitting={submitting}
      />
    </main>
  );
}

export default ServicesPage;
