import React from 'react';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import Skills from '../../components/Skills/Skills';
import AiWorkflow from '../../components/AiWorkflow/AiWorkflow';
import Projects from '../../components/Projects/Projects';
import Experience from '../../components/Experience/Experience';
import Services from '../../components/Services/Services';
import Contact from '../../components/Contact/Contact';

function DynamicCustomSection({ section }) {
  return (
    <section id={section.id} className="section custom-section-wrapper reveal">
      <div className="section-heading">
        <span className="section-number">✦</span>
        <div>
          <p className="eyebrow">{section.eyebrow || 'Custom Section'}</p>
          <h2>{section.title}</h2>
        </div>
      </div>
      {section.content && (
        <div className="custom-section-body" style={{ marginTop: '1.5rem', background: 'var(--surface)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--line)' }}>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--muted)', whiteSpace: 'pre-wrap' }}>
            {section.content}
          </p>
        </div>
      )}
    </section>
  );
}

function HomePage({
  data,
  typed,
  cursorVisible,
  scrollTo,
  filter,
  setFilter,
  submit,
  formStatus,
  submitting
}) {
  const activeSections = data?.homeSections || [
    'hero',
    'about',
    'skills',
    'ai',
    'projects',
    'experience',
    'services',
    'contact'
  ];

  const customSections = data?.customSections || [];

  const showSection = (sec) => activeSections.includes(sec);

  return (
    <main>
      {/* Hero Section */}
      {showSection('hero') && (
        <Hero
          data={data?.hero}
          typed={typed}
          cursorVisible={cursorVisible}
          scrollTo={scrollTo}
        />
      )}

      {/* About Section */}
      {showSection('about') && (
        <About
          data={data?.about}
        />
      )}

      {/* Skills & Toolkit Section */}
      {showSection('skills') && (
        <Skills
          data={data?.skills}
        />
      )}

      {/* AI Workflow Section */}
      {showSection('ai') && (
        <AiWorkflow
          data={data?.aiSkills}
        />
      )}

      {/* Projects Preview Section */}
      {showSection('projects') && (
        <Projects
          data={data?.projects}
          filter={filter}
          setFilter={setFilter}
          isHomePage={true}
        />
      )}

      {/* Experience Section */}
      {showSection('experience') && (
        <Experience
          data={data?.experience}
        />
      )}

      {/* Services Preview Section */}
      {showSection('services') && (
        <Services
          data={data?.services}
        />
      )}

      {/* Render Custom Added Sections */}
      {customSections.map(sec => {
        if (showSection(sec.id)) {
          return <DynamicCustomSection key={sec.id} section={sec} />;
        }
        return null;
      })}

      {/* Contact Section */}
      {showSection('contact') && (
        <Contact
          data={data?.contact}
          submit={submit}
          formStatus={formStatus}
          submitting={submitting}
        />
      )}
    </main>
  );
}

export default HomePage;
