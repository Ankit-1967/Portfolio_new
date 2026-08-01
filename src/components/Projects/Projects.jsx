import React from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';
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

function ProjectCard({ project, index }) {
  return (
    <article className="project-card reveal" style={{ "--delay": `${index * 70}ms` }}>
      <div className={`project-image ${project.image || 'commerce'}`}>
        <div className="mock-window">
          <span /><span /><span />
          <div className="mock-content">
            <b>{project.title}</b>
            <i /><i /><i />
          </div>
        </div>
        <div className="image-number">0{index + 1}</div>
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
  );
}

function Projects({ data, filter, setFilter, isHomePage = false }) {
  const { number, label, title, introText, categories, items } = data || {};
  const availableCategories = categories || ["All", "React", "Shopify", "Web"];
  const rawProjectList = items || [];
  
  // Filter for home page preview if isHomePage is true
  const projectList = isHomePage
    ? rawProjectList.filter(p => p.showOnHome !== false)
    : rawProjectList;

  const filteredProjects = filter === "All" ? projectList : projectList.filter(p => p.category === filter);

  return (
    <section id="projects" className="section projects-section-wrapper">
      <SectionHeading number={number || "04"} title={title || "Selected work"} label={label || "Recent projects"} />
      
      <div className="project-toolbar reveal">
        <p>{introText || "A selection of interfaces and web experiences I've built while working with modern front-end technologies."}</p>
        
        {isHomePage ? (
          <div className="filters">
            <Link to="/projects" className="services-explore-btn">
              View All Projects <Icon name="arrow" />
            </Link>
          </div>
        ) : (
          <div className="filters">
            {availableCategories.map(f => (
              <button
                key={f}
                className={filter === f ? "selected" : ""}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project, i) => (
          <ProjectCard project={project} index={i} key={project.id || project.title || i} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
