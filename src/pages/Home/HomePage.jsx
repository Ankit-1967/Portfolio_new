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
        <span className="section-number">{section.number || "01"}</span>
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

  // Dynamically calculate 1-based sequential section number based on rendered section order
  const getSectionNum = (secId) => {
    const nonHeroActive = activeSections.filter(s => s !== 'hero');
    const idx = nonHeroActive.indexOf(secId);
    if (idx === -1) return "01";
    const numVal = idx + 1;
    return numVal < 10 ? `0${numVal}` : `${numVal}`;
  };

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
          data={{ ...data?.about, number: getSectionNum('about') }}
        />
      )}

      {/* Skills & Toolkit Section */}
      {showSection('skills') && (
        <Skills
          data={{ ...data?.skills, number: getSectionNum('skills') }}
        />
      )}

      {/* AI Workflow Section */}
      {showSection('ai') && (
        <AiWorkflow
          data={{ ...data?.ai, number: getSectionNum('ai') }}
        />
      )}

      {/* Projects Preview Section */}
      {showSection('projects') && (
        <Projects
          data={{ ...data?.projects, number: getSectionNum('projects') }}
          filter={filter}
          setFilter={setFilter}
          isHomePage={true}
        />
      )}

      {/* Experience Section */}
      {showSection('experience') && (
        <Experience
          data={{ ...data?.experience, number: getSectionNum('experience') }}
        />
      )}

      {/* Services Preview Section */}
      {showSection('services') && (
        <Services
          data={{ ...data?.services, number: getSectionNum('services') }}
        />
      )}

      {/* Render Custom Added Sections */}
      {customSections.map(sec => {
        if (showSection(sec.id)) {
          return (
            <DynamicCustomSection
              key={sec.id}
              section={{ ...sec, number: getSectionNum(sec.id) }}
            />
          );
        }
        return null;
      })}

      {/* Contact Section */}
      {showSection('contact') && (
        <Contact
          data={{ ...data?.contact, number: getSectionNum('contact') }}
          submit={submit}
          formStatus={formStatus}
          submitting={submitting}
        />
      )}
    </main>
  );
}

export default HomePage;
