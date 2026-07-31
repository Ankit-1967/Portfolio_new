export const initialPortfolioData = {
  hero: {
    eyebrow: "Available for frontend projects",
    headingLine1: "I build digital",
    headingLine2: "experiences",
    headingLine3: "that matter.",
    roles: [
      "Frontend Developer",
      "Shopify Developer",
      "React Developer",
      "AI-Assisted Development"
    ],
    description: "I turn ambitious ideas into fast, accessible and beautifully engineered products — blending frontend craft with practical AI workflows.",
    primaryCtaText: "View my work",
    primaryCtaLink: "projects",
    secondaryCtaText: "More about me",
    secondaryCtaLink: "/resume.pdf",
    metaStats: [
      { label: "years building", value: "5+" },
      { label: "projects shipped", value: "30+" },
      { label: "curiosity", value: "100%" }
    ],
    developerCard: {
      name: "Ankit Thakur",
      focus: "Frontend + AI",
      stack: ["React", "Vite"],
      mindset: "Build. Learn. Repeat."
    }
  },
  about: {
    number: "01",
    label: "About me",
    title: "A little about me",
    leadText: "I care about the space where design, code and technology meet.",
    paragraphs: [
      "I'm a frontend developer focused on building thoughtful web experiences that feel as good as they perform. My toolkit spans modern React development, Shopify themes, responsive UI engineering and AI-assisted workflows.",
      "I enjoy taking messy problems, finding the simple underlying system and turning it into maintainable code that teams can confidently build on."
    ],
    signatureName: "Ankit Thakur",
    signatureTitle: "Frontend Developer"
  },
  skills: {
    number: "02",
    label: "Technologies",
    title: "My toolkit",
    hugeNumber: "08",
    introText: "The technologies and skills I use to turn ideas and designs into functional digital experiences.",
    items: [
      { name: "HTML5", percentage: 90 },
      { name: "CSS3", percentage: 85 },
      { name: "JavaScript", percentage: 60 },
      { name: "React.js", percentage: 70 },
      { name: "Vite", percentage: 70 },
      { name: "Shopify Liquid", percentage: 75 },
      { name: "Responsive Design", percentage: 90 },
      { name: "Git & GitHub", percentage: 75 },
      { name: "Performance Optimization", percentage: 80 }
    ]
  },
  aiSkills: {
    number: "03",
    label: "Ai workflow",
    title: "AI × Development",
    introText: "I use AI tools as development assistants to explore ideas, understand new concepts, debug problems, improve implementations and create visual assets — while keeping the final decisions and code under my control.",
    items: [
      { name: "ChatGPT", icon: "✦", text: "Prompt engineering, AI-assisted coding, debugging and documentation." },
      { name: "Claude AI", icon: "◈", text: "Code analysis, refactoring, software architecture and project planning." },
      { name: "Gemini AI", icon: "✧", text: "Research, code generation, brainstorming and productivity workflows." }
    ]
  },
  projects: {
    number: "04",
    label: "Recent projects",
    title: "Selected work",
    introText: "A selection of interfaces and web experiences I've built while working with modern front-end technologies.",
    categories: ["All", "React", "Shopify", "Web"],
    items: [
      {
        id: "p1",
        title: "Shopify E-commerce Store",
        category: "Shopify",
        description: "Custom Shopify storefront with responsive layouts, Liquid sections, product pages and optimized shopping experiences.",
        tech: ["Shopify", "Liquid", "JavaScript", "CSS"],
        image: "commerce",
        live: "#contact",
        github: "https://github.com/"
      },
      {
        id: "p2",
        title: "Personal Portfolio",
        category: "React",
        description: "A modern portfolio showcasing projects, skills and experience with smooth animations and responsive design.",
        tech: ["React", "Vite", "JavaScript", "CSS"],
        image: "portfolio",
        live: "#contact",
        github: "https://github.com/"
      },
      {
        id: "p3",
        title: "Flight Search Interface",
        category: "React",
        description: "Responsive flight booking interface with smart filters, traveler selection, validation and intuitive user interactions.",
        tech: ["React", "JavaScript", "CSS", "API"],
        image: "travel",
        live: "#contact",
        github: "https://github.com/"
      },
      {
        id: "p4",
        title: "Creative Agency Landing Page",
        category: "Frontend",
        description: "Responsive landing page focused on typography, animations and clean component-based layouts.",
        tech: ["HTML", "CSS", "JavaScript", "Vite"],
        image: "agency",
        live: "#contact",
        github: "https://github.com/"
      },
      {
        id: "p5",
        title: "Weather App",
        category: "React",
        description: "Weather application with live API integration, dynamic backgrounds and responsive user interface.",
        tech: ["React", "API", "JavaScript", "CSS"],
        image: "weather",
        live: "#contact",
        github: "https://github.com/"
      },
      {
        id: "p6",
        title: "Shopify Theme Components",
        category: "Shopify",
        description: "Reusable Shopify sections and custom components built for flexible, responsive and scalable storefronts.",
        tech: ["Shopify", "Liquid", "JavaScript", "CSS"],
        image: "theme",
        live: "#contact",
        github: "https://github.com/"
      }
    ]
  },
  experience: {
    number: "05",
    label: "Journey",
    title: "Experience & education",
    items: [
      { id: "e1", year: "2024 — Present", title: "Frontend Developer", company: "Codesdesk Pvt. Ltd", text: "Building high-quality React and Shopify experiences, improving performance and creating reusable UI systems." },
      { id: "e2", year: "2021 — 2024", title: "Team Leader[Production line]", company: "Luminous Power Technologies", text: "Lead and coordinated production teams while maintaining quality, safety and efficient production processes." },
      { id: "e3", year: "August — 2018", title: "Trainee", company: "Luminous Power Technologies", text: "Completed one month of industrial training at Luminous Power Technologies, Gagret, Himachal Pradesh." },
      { id: "e4", year: "2017 — 2020", title: "Diploma in E.C.E.", company: "HP Tech Board", text: "Passed. 2020" },
      { id: "e5", year: "2016", title: "Matriculation", company: "HP Board of School EDU.", text: "Passed. 2016" }
    ]
  },
  services: {
    number: "06",
    label: "Services",
    title: "How I can help",
    items: [
      { id: "s1", number: "01", title: "Frontend Development", description: "Creating responsive websites using HTML, CSS and JavaScript with clean, scalable and user-friendly interfaces." },
      { id: "s2", number: "02", title: "Shopify Development", description: "Custom Shopify themes, Liquid sections, storefront customization and optimized e-commerce experiences." },
      { id: "s3", number: "03", title: "React Development", description: "Building fast, responsive and maintainable React applications with reusable components and modern development practices." },
      { id: "s4", number: "04", title: "UI Engineering", description: "Transforming Figma designs into pixel-perfect, responsive and accessible web interfaces." },
      { id: "s5", number: "05", title: "Performance Optimization", description: "Improving website speed, responsiveness, code quality and overall user experience." },
      { id: "s6", number: "06", title: "AI-assisted Development", description: "Using AI tools for learning, debugging, code reviews, documentation and improving development workflows." }
    ]
  },
  contact: {
    eyebrow: "HAVE A PROJECT IN MIND?",
    headingLine1: "Let's build something",
    headingLine2: "remarkable.",
    description: "Have an idea, design or project you'd like to bring to life? Let's talk about it and see how we can turn it into a responsive, engaging web experience.",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    email: "hello@example.com"
  }
};
