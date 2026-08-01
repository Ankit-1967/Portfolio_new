import React from 'react';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import Skills from '../../components/Skills/Skills';
import AiWorkflow from '../../components/AiWorkflow/AiWorkflow';
import Projects from '../../components/Projects/Projects';
import Experience from '../../components/Experience/Experience';
import Services from '../../components/Services/Services';
import Contact from '../../components/Contact/Contact';

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
