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
  return (
    <main>
      <Hero
        data={data?.hero}
        typed={typed}
        cursorVisible={cursorVisible}
        scrollTo={scrollTo}
      />

      <About
        data={data?.about}
      />

      <Skills
        data={data?.skills}
      />

      <AiWorkflow
        data={data?.aiSkills}
      />

      <Projects
        data={data?.projects}
        filter={filter}
        setFilter={setFilter}
      />

      <Experience
        data={data?.experience}
      />

      <Services
        data={data?.services}
        isHomePage={true}
      />

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
