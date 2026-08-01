import React, { useEffect, useMemo, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import "./styles.css";

// Shared & Background Components
import Background from "./components/Background/Background";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Pages from src/pages/
import HomePage from "./pages/Home/HomePage";
import ProjectsPage from "./pages/Projects/ProjectsPage";
import ServicesPage from "./pages/Services/ServicesPage";
import AdminPage from "./pages/Admin/AdminPage";
import AdminLogin from "./pages/Admin/AdminLogin";

// Data Source & Remote Backend Service
import { initialPortfolioData } from "./data/portfolioData";
import { fetchPortfolioFromSheets, savePortfolioToSheets } from "./services/googleSheets";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const [portfolioData, setPortfolioData] = useState(() => {
    const saved = localStorage.getItem("portfolio-data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.hero && parsed.contact) {
          return { ...initialPortfolioData, ...parsed };
        }
      } catch (e) {
        console.error("Failed to parse portfolio data from localStorage", e);
      }
    }
    return initialPortfolioData;
  });

  // Sync with Google Sheets backend on load
  useEffect(() => {
    async function syncRemoteData() {
      const remoteData = await fetchPortfolioFromSheets();
      if (remoteData && remoteData.hero && remoteData.contact) {
        const merged = { ...initialPortfolioData, ...remoteData };
        setPortfolioData(merged);
        localStorage.setItem("portfolio-data", JSON.stringify(merged));
      }
    }
    syncRemoteData();
  }, []);

  // Handle direct hash navigation fallback (e.g. /#admin or /#projects)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#admin" || hash === "#/admin") {
      navigate("/admin", { replace: true });
    } else if (hash === "#projects" && location.pathname !== "/projects") {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.pathname, navigate]);

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("admin-auth") === "true";
  });

  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [typed, setTyped] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [formStatus, setFormStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isClickingRef = useRef(false);
  const clickTimerRef = useRef(null);

  const roles = useMemo(() => portfolioData.hero?.roles || ["Frontend Developer", "Shopify Developer", "React Developer", "AI-Assisted Development"], [portfolioData.hero?.roles]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  // Typing effect for Hero
  useEffect(() => {
    if (location.pathname !== "/") return;
    let role = 0, index = 0, deleting = false, timer;
    const tick = () => {
      const word = roles[role] || "Developer";
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
  }, [roles, location.pathname]);

  const sectionToNavMap = useMemo(() => ({
    home: "home",
    about: "about",
    skills: "skills",
    ai: "skills",
    projects: "projects",
    experience: "experience",
    services: "services",
    contact: "contact"
  }), []);

  // Scroll spy for Portfolio view
  useEffect(() => {
    if (loading || location.pathname !== "/") return;

    const handleScrollSpy = () => {
      if (isClickingRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollY < 100) {
        setActive("home");
        return;
      }

      if (scrollY + windowHeight >= fullHeight - 50) {
        setActive("contact");
        return;
      }

      const sections = document.querySelectorAll("main section[id]");
      let currentSectionId = "home";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.4 && rect.bottom >= windowHeight * 0.15) {
          currentSectionId = section.id;
        }
      });

      const targetNavId = sectionToNavMap[currentSectionId] || currentSectionId;
      setActive(targetNavId);
    };

    handleScrollSpy();

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [loading, location.pathname, sectionToNavMap]);

  // Reveal elements on scroll
  useEffect(() => {
    if (loading || location.pathname === "/admin") return;
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading, filter, portfolioData, location.pathname]);

  // Scroll progress bar
  useEffect(() => {
    if (location.pathname === "/admin") return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--scroll", `${max ? (window.scrollY / max) * 100 : 0}%`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  }, []);

  const nav = ["home", "about", "skills", "projects", "experience", "services", "contact"];

  const scrollTo = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        if (id === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return;
    }

    setActive(id);
    isClickingRef.current = true;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }

    clickTimerRef.current = setTimeout(() => {
      isClickingRef.current = false;
    }, 850);

    setMenuOpen(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formDataObj = new FormData(form);
    const visitorName = formDataObj.get("name");
    const visitorEmail = formDataObj.get("email");
    const visitorMessage = formDataObj.get("message");
    const adminEmail = portfolioData.contact?.email || "at667448@gmail.com";

    setSubmitting(true);
    setFormStatus("Sending your message...");

    try {
      const newMessage = {
        id: `msg_${Date.now()}`,
        name: visitorName,
        email: visitorEmail,
        message: visitorMessage,
        date: new Date().toLocaleString()
      };

      const updatedInbox = [newMessage, ...(portfolioData.inbox || [])];
      const updatedData = { ...portfolioData, inbox: updatedInbox };
      setPortfolioData(updatedData);
      localStorage.setItem("portfolio-data", JSON.stringify(updatedData));

      fetch(`https://formsubmit.co/ajax/${adminEmail}`, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: visitorName,
          Email: visitorEmail,
          _replyto: visitorEmail,
          Message: visitorMessage,
          _subject: `📩 Portfolio Inquiry from ${visitorName}`,
          _template: "table"
        })
      }).catch(e => console.log("FormSubmit background dispatch:", e));

      savePortfolioToSheets({
        action: "save_message",
        name: visitorName,
        email: visitorEmail,
        message: visitorMessage,
        date: newMessage.date
      }).catch(e => console.log("Google Sheets message save:", e));

      setFormStatus("✓ Thank you for reaching out! Your message has been sent to Ankit. He will contact you shortly.");
      form.reset();
    } catch (err) {
      console.error("Form submit error:", err);
      setFormStatus("✓ Thank you for reaching out! Your message has been sent to Ankit. He will contact you shortly.");
      form.reset();
    } finally {
      setSubmitting(false);
    }
  };

  const handleSavePortfolioData = async (newData) => {
    setPortfolioData(newData);
    localStorage.setItem("portfolio-data", JSON.stringify(newData));
    await savePortfolioToSheets(newData);
  };

  const handleResetPortfolioData = async () => {
    setPortfolioData(initialPortfolioData);
    localStorage.removeItem("portfolio-data");
    await savePortfolioToSheets(initialPortfolioData);
  };

  const handleExitAdmin = () => {
    navigate("/");
  };

  if (loading) return <Loader />;

  const isAdminRoute = location.pathname === "/admin";

  return (
    <>
      {!isAdminRoute && <div className="scroll-progress" />}
      {!isAdminRoute && <Background theme={theme} />}
      {!isAdminRoute && (
        <Header
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          active={active}
          scrollTo={scrollTo}
          nav={nav}
          theme={theme}
          setTheme={setTheme}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              data={portfolioData}
              typed={typed}
              cursorVisible={cursorVisible}
              scrollTo={scrollTo}
              filter={filter}
              setFilter={setFilter}
              submit={submit}
              formStatus={formStatus}
              submitting={submitting}
            />
          }
        />

        <Route
          path="/projects"
          element={
            <ProjectsPage
              data={portfolioData.projects}
              contactData={portfolioData.contact}
              submit={submit}
              formStatus={formStatus}
              submitting={submitting}
            />
          }
        />

        <Route
          path="/services"
          element={
            <ServicesPage
              data={portfolioData.services}
              contactData={portfolioData.contact}
              submit={submit}
              formStatus={formStatus}
              submitting={submitting}
            />
          }
        />

        <Route
          path="/admin"
          element={
            !isAuthenticated ? (
              <AdminLogin
                targetEmail={portfolioData.contact?.email || "at667448@gmail.com"}
                onAuthenticated={() => setIsAuthenticated(true)}
                onBackToPortfolio={handleExitAdmin}
              />
            ) : (
              <AdminPage
                data={portfolioData}
                onSave={handleSavePortfolioData}
                onReset={handleResetPortfolioData}
                onBackToPortfolio={handleExitAdmin}
              />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!isAdminRoute && <Footer scrollTo={scrollTo} />}

      {!isAdminRoute && (
        <button
          className="top-button"
          onClick={() => scrollTo("home")}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </>
  );
}

function Loader() {
  return (
    <div className="loader">
      <div className="loader-mark">A<span>.</span></div>
      <div className="loader-line"><i /></div>
      <p>Crafting digital experiences</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);
