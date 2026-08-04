import React, { useState, useEffect } from 'react';
import Icon from '../../components/Icon/Icon';
import Contact from '../../components/Contact/Contact';
import './ServicesPage.css';

function ServicesPage({ data, contactData, submit, formStatus, submitting }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { label, title, items, categories: initialCategories } = data || {};

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

  // Helper to infer category for filtering logic
  const getItemCategory = (item) => {
    if (item.category) return item.category;
    const titleStr = (item.title || '').toLowerCase();
    if (titleStr.includes('shopify')) return 'Shopify';
    if (titleStr.includes('react')) return 'React';
    if (titleStr.includes('ui') || titleStr.includes('engineering')) return 'UI Engineering';
    if (titleStr.includes('performance') || titleStr.includes('speed')) return 'Performance';
    if (titleStr.includes('ai') || titleStr.includes('assisted')) return 'AI Workflow';
    return 'Frontend';
  };

  const filteredServices = servicesList.filter(item => {
    const q = searchQuery.trim().toLowerCase();
    const catFilter = activeFilter.trim().toLowerCase();

    const itemCat = getItemCategory(item).toLowerCase();

    // Loose Category Matching
    const matchesFilter = activeFilter === 'All' || itemCat.includes(catFilter) || catFilter.includes(itemCat);

    // Search Query Matching across title, description, and category
    if (!q) return matchesFilter;

    const titleStr = (item.title || '').toLowerCase();
    const descStr = (item.description || '').toLowerCase();

    const matchesSearch =
      titleStr.includes(q) ||
      descStr.includes(q) ||
      itemCat.includes(q);

    return matchesSearch;
  });

  return (
    <main className="services-page-main">
      {/* Hero Banner */}
      <section className="services-page-hero section">
        <div className="services-page-hero-content">
          <div className="section-heading">
            <span className="section-number">01</span>
            <div>
              <p className="eyebrow">{label || "SERVICES OFFERED"}</p>
              <h2>{title || "Specialized Solutions & Expertise"}</h2>
            </div>
          </div>
          <p className="services-page-lead">
            Comprehensive frontend engineering, e-commerce solutions, React application architecture, and AI-boosted developer workflows tailored for high performance.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="services-filter-container">
          <div className="services-filter-header">
            <h3>Filter Services by Category</h3>
            <div className="search-box">
              <input
                id="services-search-input"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search services"
              />
              {!searchQuery ? (
                <span className="search-icon">🔍</span>
              ) : (
                <button
                  className="clear-search"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="services-filter-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${activeFilter === cat && !searchQuery ? 'active' : ''}`}
                onClick={() => {
                  setActiveFilter(cat);
                  setSearchQuery('');
                }}
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
            <p style={{ fontSize: '1.1rem', marginBottom: '12px' }}>
              No services found matching <strong>"{searchQuery || activeFilter}"</strong>.
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setActiveFilter('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="services-page-grid">
            {filteredServices.map((item, index) => {
              const num = (index + 1) < 10 ? `0${index + 1}` : `${index + 1}`;
              return (
                <article className="service-card services-page-card" key={item.id || index}>
                  <div className="card-top-row">
                    <span className="service-num">{num}</span>
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

      {/* Contact Section */}
      <Contact
        data={{ ...contactData, number: "02" }}
        submit={submit}
        formStatus={formStatus}
        submitting={submitting}
      />
    </main>
  );
}

export default ServicesPage;
