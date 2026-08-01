export const initialPortfolioData = {
  navLinks: [
    { id: 'home', label: 'Home', target: '/', visible: true },
    { id: 'about', label: 'About', target: '#about', visible: true },
    { id: 'skills', label: 'Skills', target: '#skills', visible: true },
    { id: 'projects', label: 'Projects', target: '/projects', visible: true },
    { id: 'experience', label: 'Experience', target: '#experience', visible: true },
    { id: 'services', label: 'Services', target: '/services', visible: true },
    { id: 'contact', label: 'Contact', target: '#contact', visible: true }
  ],
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
    label: "Toolkit",
    title: "Skills & technologies",
    items: [
      { name: "HTML5", percentage: 90 },
      { name: "CSS3", percentage: 85 },
      { name: "JavaScript", percentage: 80 },
      { name: "React", percentage: 78 },
      { name: "Liquid (Shopify)", percentage: 85 },
      { name: "Git", percentage: 80 }
    ]
  },
  aiSkills: {
    number: "03",
    label: "AI Engineering",
    title: "AI-Assisted Development",
    introText: "Using AI to write code faster, catch edge cases early and iterate with confidence.",
    items: [
      { name: "Copilot & Gemini", icon: "✦", text: "Daily driver for code completion, refactoring and boilerplate generation." },
      { name: "Prompt Engineering", icon: "✦", text: "Structuring clear context and constraints to get precise code output." },
      { name: "AI Code Reviews", icon: "✦", text: "Using LLMs as an extra pair of eyes for security, edge cases and performance." },
      { name: "Documentation", icon: "✦", text: "Accelerating documentation, API specs and inline comments with AI assistance." }
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
        description: "Custom liquid sections, optimized mobile layout and cart interactions.",
        tech: ["Shopify", "Liquid", "JavaScript", "CSS"],
        image: "commerce",
        live: "#contact",
        github: "https://github.com/"
      },
      {
        id: "p2",
        title: "Personal Portfolio",
        category: "React",
        description: "Modern, responsive portfolio with dark/light themes and clean component structure.",
        tech: ["React", "Vite", "CSS"],
        image: "portfolio",
        live: "#home",
        github: "https://github.com/"
      },
      {
        id: "p3",
        title: "AI Code Assistant Dashboard",
        category: "React",
        description: "Interactive dashboard layout exploring AI-assisted developer workflows and prompt engineering.",
        tech: ["React", "JavaScript", "CSS"],
        image: "ai",
        live: "#contact",
        github: "https://github.com/"
      },
      {
        id: "p4",
        title: "Responsive Web Landing Page",
        category: "Web",
        description: "Pixel-perfect landing page with fluid typography, modern layout techniques and micro-interactions.",
        tech: ["HTML5", "CSS3", "JavaScript"],
        image: "landing",
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
    linkedin: "https://www.linkedin.com/in/ankit-thakur-4b5451277/",
    email: "at667448@gmail.com",
    autoReplyMessage: "Thank you for reaching out! I have received your message and will review it shortly. I appreciate your interest and will get back to you as soon as possible.\n\nBest regards,\nAnkit Thakur\nFrontend Developer",
    emailJs: {
      serviceId: "",
      templateId: "",
      publicKey: ""
    }
  }
};
