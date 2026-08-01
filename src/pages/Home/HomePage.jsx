import React from 'react';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import Skills from '../../components/Skills/Skills';
import AiWorkflow from '../../components/AiWorkflow/AiWorkflow';
import Projects from '../../components/Projects/Projects';
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
  return (
    <main>
      {/* Tab 1: Hero Intro */}
      <Hero
        data={data?.hero}
        typed={typed}
        cursorVisible={cursorVisible}
        scrollTo={scrollTo}
      />

      {/* Tab 2: About Overview */}
      <About
        data={data?.about}
      />

      {/* Tab 3: Skills & AI Workflow */}
      <Skills
        data={data?.skills}
      />

      <AiWorkflow
        data={data?.aiSkills}
      />

      {/* Featured Projects Preview with Link to /projects */}
      <Projects
        data={data?.projects}
        filter={filter}
        setFilter={setFilter}
        isHomePage={true}
      />

      {/* Featured Services Preview */}
      <Services
        data={data?.services}
      />

      {/* Tab 4: Contact & Inquiry Form */}
      <Contact
        data={data?.contact}
        submit={submit}
        formStatus={formStatus}
        submitting={submitting}
      />
    </main>
  );
}

export default HomePage;
