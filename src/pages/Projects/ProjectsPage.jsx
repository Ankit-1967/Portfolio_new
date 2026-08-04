import React, { useState, useEffect } from 'react';
import Icon from '../../components/Icon/Icon';
import Contact from '../../components/Contact/Contact';
import './ProjectsPage.css';

function SectionHeading({ number, title, label }) {
  return (
    <div className="section-heading reveal is-visible">
      <span className="section-number">{number}</span>
      <div>
        <p className="eyebrow">{label}</p>
        <h2>{title}</h2>
      </div>
    </div>
  );
}

function ProjectsPage({ data, contactData, submit, formStatus, submitting }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top when Projects page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { label, title, introText, categories: initialCategories, items } = data || {};

  const projectList = items || [];
  const categories = initialCategories || ["All", "React", "Shopify", "Web"];

  const filteredProjects = projectList.filter(project => {
    const q = searchQuery.trim().toLowerCase();
    const cat = activeFilter.trim().toLowerCase();

    // 1. Category Matching
    const projCat = (project.category || '').toLowerCase();
    const matchesCategory = activeFilter === 'All' || projCat.includes(cat) || cat.includes(projCat);

    // 2. Search Query Matching (title, category, description, tech stack)
    if (!q) return matchesCategory;

    const titleStr = (project.title || '').toLowerCase();
    const descStr = (project.description || '').toLowerCase();
    const techList = (project.tech || []).map(t => String(t).toLowerCase());

    const matchesSearch =
      titleStr.includes(q) ||
      descStr.includes(q) ||
      projCat.includes(q) ||
      techList.some(t => t.includes(q));

    return matchesSearch;
  });

  return (
    <main className="projects-page-main">
      <section className="section projects-section-wrapper">
        {/* Header Heading */}
        <SectionHeading
          number="01"
          title={title || "Selected work"}
          label={label || "RECENT PROJECTS"}
        />

        {/* Toolbar with Search Box & Category Filter Pills */}
        <div className="project-toolbar reveal is-visible">
          <p>{introText || "A selection of interfaces and web experiences I've built while working with modern front-end technologies."}</p>
          
          <div className="filters-and-search">
            <div className="search-box">
              <input
                id="projects-search-input"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search projects"
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

            <div className="filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={activeFilter === cat && !searchQuery ? "selected" : ""}
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
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="no-projects-found" style={{ marginTop: '2rem' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '12px' }}>
              No projects found matching <strong>"{searchQuery || activeFilter}"</strong>.
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setActiveFilter('All');
                setSearchQuery('');
              }}
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="projects-grid" style={{ marginTop: '2rem' }}>
            {filteredProjects.map((project, i) => (
              <article
                className="project-card reveal is-visible"
                style={{ "--delay": `${i * 60}ms` }}
                key={project.id || i}
              >
                <div className={`project-image ${project.image || 'commerce'}`}>
                  <div className="mock-window">
                    <span /><span /><span />
                    <div className="mock-content">
                      <b>{project.title}</b>
                      <i /><i /><i />
                    </div>
                  </div>
                  <div className="image-number">0{i + 1}</div>
                </div>
                <div className="project-info">
                  <div>
                    <span className="project-category">{project.category}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <p>{project.description}</p>
                  <div className="techs">
                    {project.tech && project.tech.map((t, idx) => (
                      <span key={idx}>{t}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.live || '#contact'}>Live Demo <Icon name="external" /></a>
                    <a href={project.github || 'https://github.com/'} target="_blank" rel="noreferrer">GitHub <Icon name="github" /></a>
                  </div>
                </div>
              </article>
            ))}
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

export default ProjectsPage;
