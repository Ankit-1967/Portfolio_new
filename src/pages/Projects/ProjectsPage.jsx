import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon/Icon';
import Contact from '../../components/Contact/Contact';
import './ProjectsPage.css';

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
      <section className="section projects-section-wrapper">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>

        {/* Header Heading */}
        <SectionHeading
          number={number || "04"}
          title={title || "Selected work"}
          label={label || "RECENT PROJECTS"}
        />

        {/* Toolbar with Paragraph & Category Filter Pills matching Screenshot 1 */}
        <div className="project-toolbar reveal">
          <p>{introText || "A selection of interfaces and web experiences I've built while working with modern front-end technologies."}</p>
          
          <div className="filters-and-search">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search projects"
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
              )}
            </div>

            <div className="filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={activeFilter === cat ? "selected" : ""}
                  onClick={() => setActiveFilter(cat)}
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
            <p>No projects found matching <strong>"{activeFilter}"</strong> {searchQuery && `or "${searchQuery}"`}.</p>
            <button className="btn btn-secondary" onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}>Reset Filters</button>
          </div>
        ) : (
          <div className="projects-grid" style={{ marginTop: '2rem' }}>
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
