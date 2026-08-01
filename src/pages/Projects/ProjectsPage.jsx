import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon/Icon';
import Contact from '../../components/Contact/Contact';
import './ProjectsPage.css';

function ProjectsPage({ data, contactData, submit, formStatus, submitting }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top when Projects page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { number, label, title, introText, categories: initialCategories, items } = data || {};

  const projectList = items || [];
  const categories = initialCategories || ["All", "React", "Shopify", "Web"];

  const filteredProjects = projectList.filter(project => {
    const projCat = project.category || 'Web';
    const matchesFilter = activeFilter === 'All' || projCat.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.tech && project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="projects-page-main">
      {/* Projects Page Hero Banner */}
      <section className="projects-page-hero section">
        <div className="projects-page-hero-content">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
          <div className="section-heading">
            <span className="section-number">{number || "04"}</span>
            <div>
              <p className="eyebrow">{label || "Selected Work"}</p>
              <h2>{title || "Projects & Case Studies"}</h2>
            </div>
          </div>
          <p className="projects-page-lead">
            {introText || "Explore my portfolio of web applications, Shopify stores, interactive React components, and AI development projects."}
          </p>
        </div>

        {/* Filter & Search Bar on Projects Page */}
        <div className="projects-filter-container">
          <div className="projects-filter-header">
            <h3>Filter Projects by Category</h3>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search projects by name or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search projects"
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
              )}
            </div>
          </div>

          <div className="projects-filter-pills">
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

      {/* Projects Grid Section */}
      <section className="section projects-grid-section">
        {filteredProjects.length === 0 ? (
          <div className="no-projects-found">
            <p>No projects found matching <strong>"{activeFilter}"</strong> {searchQuery && `or "${searchQuery}"`}.</p>
            <button className="btn btn-secondary" onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}>Reset Filters</button>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project, i) => (
              <article className="project-card reveal" style={{ "--delay": `${i * 70}ms` }} key={project.id || i}>
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
        data={contactData}
        submit={submit}
        formStatus={formStatus}
        submitting={submitting}
      />
    </main>
  );
}

export default ProjectsPage;
