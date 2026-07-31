import React, { useEffect, useMemo, useState, useLayoutEffect  } from "react";
import { createRoot } from "react-dom/client";
import Background from "./components/Background/Background";
import "./styles.css";
import Header from "./components/Header/Header";


import Icon from './components/Icon/Icon';

const projects = [
  {
    title: "Shopify E-commerce Store",
    category: "Shopify",
    description: "Custom Shopify storefront with responsive layouts, Liquid sections, product pages and optimized shopping experiences.",
    tech: ["Shopify", "Liquid", "JavaScript", "CSS"],
    image: "commerce",
    live: "#contact",
    github: "https://github.com/"
  },
  {
    title: "Personal Portfolio",
    category: "React",
    description: "A modern portfolio showcasing projects, skills and experience with smooth animations and responsive design.",
    tech: ["React", "Vite", "JavaScript", "CSS"],
    image: "portfolio",
    live: "#contact",
    github: "https://github.com/"
  },
  {
    title: "Flight Search Interface",
    category: "React",
    description: "Responsive flight booking interface with smart filters, traveler selection, validation and intuitive user interactions.",
    tech: ["React", "JavaScript", "CSS", "API"],
    image: "travel",
    live: "#contact",
    github: "https://github.com/"
  },
  {
    title: "Creative Agency Landing Page",
    category: "Frontend",
    description: "Responsive landing page focused on typography, animations and clean component-based layouts.",
    tech: ["HTML", "CSS", "JavaScript", "Vite"],
    image: "agency",
    live: "#contact",
    github: "https://github.com/"
  },
  {
    title: "Weather App",
    category: "React",
    description: "Weather application with live API integration, dynamic backgrounds and responsive user interface.",
    tech: ["React", "API", "JavaScript", "CSS"],
    image: "weather",
    live: "#contact",
    github: "https://github.com/"
  },
  {
    title: "Shopify Theme Components",
    category: "Shopify",
    description: "Reusable Shopify sections and custom components built for flexible, responsive and scalable storefronts.",
    tech: ["Shopify", "Liquid", "JavaScript", "CSS"],
    image: "theme",
    live: "#contact",
    github: "https://github.com/"
  }
];

const skills = [
  ["HTML5", 90], ["CSS3", 85], ["JavaScript", 60], ["React.js", 70],
  ["Vite", 70], ["Shopify Liquid", 75], ["Responsive Design", 90], ["Git & GitHub", 75],["Performance Optimization", 80]
];

const aiSkills = [
  { name: "ChatGPT", icon: "✦", text: "Prompt engineering, AI-assisted coding, debugging and documentation." },
  { name: "Claude AI", icon: "◈", text: "Code analysis, refactoring, software architecture and project planning." },
  { name: "Gemini AI", icon: "✧", text: "Research, code generation, brainstorming and productivity workflows." }
];



function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [typed, setTyped] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [formStatus, setFormStatus] = useState("");

  const roles = useMemo(() => ["Frontend Developer", "Shopify Developer", "React Developer", "AI-Assisted Development"], []);
  const filteredProjects = filter === "All" ? projects : projects.filter(p => p.category === filter);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    let role = 0, index = 0, deleting = false, timer;
    const tick = () => {
      const word = roles[role];
      if (!deleting) {
        index++;
        setTyped(word.slice(0, index));
        if (index === word.length) {
          deleting = true;
          timer = setTimeout(tick, 1300);
          return;
        }
      } else {
        index--;
        setTyped(word.slice(0, index));
        if (index === 0) {
          deleting = false;
          role = (role + 1) % roles.length;
        }
      }
      timer = setTimeout(tick, deleting ? 45 : 85);
    };
    timer = setTimeout(tick, 350);
    return () => clearTimeout(timer);
  }, [roles]);

  useEffect(() => {
    const sections = [...document.querySelectorAll("main section[id]")];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] });
    sections.forEach(s => observer.observe(s));    
    return () => observer.disconnect();
  }, [loading, active]);

  useEffect(() => {
  if (loading) return;

  const timer = setTimeout(() => {
    const sections = document.querySelectorAll("section[id]");
    console.log(sections);
  }, 0);

  return () => clearTimeout(timer);
}, [loading]);

  useEffect(() => {
  if (loading) return;
  const revealElements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.15,
    }
  );
  revealElements.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}, [loading, filter]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--scroll", `${max ? (window.scrollY / max) * 100 : 0}%`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = ["home", "about", "skills", "projects", "experience", "services", "contact"];
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const submit = (e) => {
    e.preventDefault();
    setFormStatus("Thanks — your message is ready to be connected to your preferred email service.");
    e.currentTarget.reset();
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="scroll-progress"/>
      <Background theme={theme} />
      <Header menuOpen={menuOpen}  setMenuOpen={setMenuOpen} active={active} scrollTo={scrollTo} nav={nav} theme={theme} setTheme={setTheme}/>
      <main>
        <section id="home" className="hero section">
          <div className="hero-grid" />
          <div className="hero-copy reveal is-visible">
            <p className="eyebrow"><span className="status-dot" /> Available for frontend projects</p>
            <h1>I build digital<br /><span className="gradient-text">experiences</span> that matter.</h1>
            <p className="hero-role">I'm a <strong>{typed}<span className="caret">{cursorVisible ? "|" : ""}</span></strong></p>
            <p className="hero-description">I turn ambitious ideas into fast, accessible and beautifully engineered products — blending frontend craft with practical AI workflows.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#projects" onClick={(e) => { e.preventDefault(); scrollTo("projects"); }}>View my work <Icon name="arrow" /></a>
              <a className="btn btn-ghost" href="/resume.pdf" download>More about me <span>↓</span></a>
            </div>
            <div className="hero-meta">
              <span><b>5+</b> years building</span><i /> <span><b>30+</b> projects shipped</span><i /> <span><b>100%</b> curiosity</span>
            </div>
          </div>

          <div className="hero-visual reveal is-visible">
            <div className="orbit orbit-one"><span /></div>
            <div className="orbit orbit-two"><span /></div>
            <div className="code-card glass">
              <div className="window-bar"><span /><span /><span /><b>portfolio.jsx</b></div>
              <pre><code><span className="code-purple">const</span> developer = {"{"}
{"\n"}  name: <span className="code-green">"Ankit Thakur"</span>,
{"\n"}  focus: <span className="code-green">"Frontend + AI"</span>,
{"\n"}  stack: [<span className="code-green">"React"</span>, <span className="code-green">"Vite"</span>],
{"\n"}  mindset: <span className="code-green">"Build. Learn. Repeat."</span>
{"\n"}{"}"}</code></pre>
              <div className="code-glow" />
            </div>
            <div className="floating-badge badge-react"><span>⚛</span> React</div>
            <div className="floating-badge badge-ai"><span>✦</span> AI × Code</div>
            <div className="floating-badge badge-shopify"><span>◇</span> Shopify</div>
          </div>

          <button className="scroll-hint" onClick={() => scrollTo("about")} aria-label="Scroll to about">Scroll to explore <Icon name="down" /></button>
        </section>

        <section id="about" className="section narrow-section">
          <SectionHeading number="01" title="A little about me" label="About me" />
          <div className="about-layout">
            <div className="about-lead reveal">
              <p className="big-copy">I care about the space where <span className="accent">design, code and technology</span> meet.</p>
            </div>
            <div className="about-body reveal">
              <p>I'm a frontend developer focused on building thoughtful web experiences that feel as good as they perform. My toolkit spans modern React development, Shopify themes, responsive UI engineering and AI-assisted workflows.</p>
              <p>I enjoy taking messy problems, finding the simple underlying system and turning it into maintainable code that teams can confidently build on.</p>
              <div className="signature">Ankit Thakur <span>— Frontend Developer</span></div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <SectionHeading number="02" title="My toolkit" label="Technologies" />
          <div className="skills-layout">
            <div className="skills-intro reveal"><span className="huge-number">08</span><p>The technologies and skills I use to turn ideas and designs into functional digital experiences.</p></div>
            <div className="skill-list reveal">
              {skills.map(([name, value], i) => <div className="skill-row reveal" style={{"--delay": `${i * 55}ms`}} key={name}><div className="skill-label"><span>{name}</span><b>{value}%</b></div><div className="progress"><span style={{width: `${value}%`}} /></div></div>)}
            </div>
          </div>
        </section>

        <section id="ai" className="section ai-section">
          <SectionHeading number="03" title="AI × Development" label="Ai workflow" />
          <p className="section-intro reveal">I use AI tools as development assistants to explore ideas, understand new concepts, debug problems, improve implementations and create visual assets — while keeping the final decisions and code under my control.</p>
          <div className="ai-grid">
            {aiSkills.map((skill, i) => <article className="ai-card glass reveal" style={{"--delay": `${i*100}ms`}} key={skill.name}><div className="ai-icon">{skill.icon}</div><span className="card-index">0{i+1}</span><h3>{skill.name}</h3><p>{skill.text}</p><div className="card-line" /></article>)}
          </div>
        </section>

        <section id="projects" className="section">
          <SectionHeading number="04" title="Selected work" label="Recent projects" />
          <div className="project-toolbar reveal">
            <p>A selection of interfaces and web experiences I've built while working with modern front-end technologies.</p>
            <div className="filters">{["All","React","Shopify","Web"].map(f => <button key={f} className={filter === f ? "selected" : ""} onClick={() => setFilter(f)}>{f}</button>)}</div>
          </div>
          <div className="projects-grid">
            {filteredProjects.map((project, i) => <ProjectCard project={project} index={i} key={project.title} />)}
          </div>
        </section>

        <section id="experience" className="section">
          <SectionHeading number="05" title="Experience & education" label="Journey" />
          <div className="timeline">
            <TimelineItem year="2024 — Present" title="Frontend Developer" company="Codesdesk Pvt. Ltd" text="Building high-quality React and Shopify experiences, improving performance and creating reusable UI systems." />
            <TimelineItem year="2021 — 2024" title="Team Leader[Production line]" company="Luminous Power Technologies" text="Lead and coordinated production teams while maintaining quality, safety and efficient production processes." />
            <TimelineItem year="August — 2018" title="Trainee" company="Luminous Power Technologies" text="Completed one month of industrial training at Luminous Power Technologies, Gagret, Himachal Pradesh." />
            <TimelineItem year="2017 — 2020" title="Diploma in E.C.E." company="HP Tech Board" text="Passed. 2020" />
            <TimelineItem year="2016" title="Matriculation" company="HP Board of School EDU." text="Passed. 2016" />
          </div>
        </section>

        <section id="services" className="section">
          <SectionHeading number="06" title="How I can help" label="Services" />
          <div className="services-grid">
            {[
              ["01","Frontend Development","Creating responsive websites using HTML, CSS and JavaScript with clean, scalable and user-friendly interfaces."],
              ["02","Shopify Development","Custom Shopify themes, Liquid sections, storefront customization and optimized e-commerce experiences."],
              ["03","React Development", "Building fast, responsive and maintainable React applications with reusable components and modern development practices."],
              ["04","UI Engineering","Transforming Figma designs into pixel-perfect, responsive and accessible web interfaces."],
              ["05","Performance Optimization","Improving website speed, responsiveness, code quality and overall user experience."],
              ["06","AI-assisted Development","Using AI tools for learning, debugging, code reviews, documentation and improving development workflows."],
              // ["01","Frontend Development","Modern React applications, component systems, responsive layouts and production-ready UI."],
              // ["02","Shopify Development","Custom Liquid sections, theme customization, product experiences and conversion-focused storefronts."],
              // ["03","UI Engineering","Turning Figma/design concepts into pixel-conscious, accessible and performant interfaces."],
              // ["04","AI-assisted Development","Practical AI workflows for research, debugging, refactoring, documentation and faster delivery."]
            ].map(([n,t,d]) => <article className="service-card reveal" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><Icon name="arrow" /></article>)}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="contact-card">
            <div className="contact-copy reveal"><p className="eyebrow">HAVE A PROJECT IN MIND?</p><h2>Let's build something <span className="gradient-text">remarkable.</span></h2><p>Have an idea, design or project you'd like to bring to life? Let's talk about it and see how we can turn it into a responsive, engaging web experience.</p><div className="socials"><a href="https://github.com/" target="_blank" rel="noreferrer"><Icon name="github" /></a><a href="https://linkedin.com/" target="_blank" rel="noreferrer"><Icon name="linkedin" /></a><a href="mailto:hello@example.com"><Icon name="mail" /></a></div></div>
            <form className="contact-form reveal" onSubmit={submit}>
              <label>Name<input name="name" required placeholder="Your name" /></label>
              <label>Email<input type="email" name="email" required placeholder="you@example.com" /></label>
              <label>Message<textarea name="message" required minLength="10" placeholder="Tell me about your project..." /></label>
              <button className="btn btn-primary" type="submit">Let's work together <Icon name="arrow" /></button>
              {formStatus && <p className="form-status" role="status">{formStatus}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer><div className="footer-top"><a className="logo" href="#home"><span className="logo-mark">A</span><span>Ankit<span className="accent">.</span></span></a><p>Designed & built with React, CSS and curiosity.</p><a href="#home">Back to top ↑</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Ankit Thakur</span><span>Frontend Developer · React & Shopify</span></div></footer>
      <button className="top-button" onClick={() => scrollTo("home")} aria-label="Back to top">↑</button>
    </>
  );
}

function SectionHeading({number, title, label}) {
  return <div className="section-heading reveal"><span className="section-number">{number}</span><div><p className="eyebrow">{label}</p><h2>{title}</h2></div></div>;
}

function TimelineItem({year,title,company,text}) {
  return <article className="timeline-item reveal"><div className="timeline-dot" /><div className="timeline-year">{year}</div><div><h3>{title}</h3><strong>{company}</strong><p>{text}</p></div></article>;
}

function ProjectCard({project,index}) {
  return <article className="project-card reveal" style={{"--delay": `${index*70}ms`}}>
    <div className={`project-image ${project.image}`}><div className="mock-window"><span /><span /><span /><div className="mock-content"><b>{project.title}</b><i /><i /><i /></div></div><div className="image-number">0{index+1}</div></div>
    <div className="project-info"><div><span className="project-category">{project.category}</span><h3>{project.title}</h3></div><p>{project.description}</p><div className="techs">{project.tech.map(t => <span key={t}>{t}</span>)}</div><div className="project-links"><a href={project.live}>Live Demo <Icon name="external" /></a><a href={project.github} target="_blank" rel="noreferrer">GitHub <Icon name="github" /></a></div></div>
  </article>;
}



function Loader() {
  return <div className="loader"><div className="loader-mark">A<span>.</span></div><div className="loader-line"><i /></div><p>Crafting digital experiences</p></div>;
}

createRoot(document.getElementById("root")).render(<App />);
