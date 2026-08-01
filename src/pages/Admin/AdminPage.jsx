import React, { useState, useEffect } from 'react';
import './AdminPage.css';

function AdminPage({ data, onSave, onReset, onBackToPortfolio }) {
  const [formData, setFormData] = useState(data);
  const [selectedPage, setSelectedPage] = useState('all'); // 'all', 'home', 'projects', 'services', 'pages'
  const [activeTab, setActiveTab] = useState('hero');
  const [statusMsg, setStatusMsg] = useState('');

  // Available portfolio sections list
  const availableSectionsList = [
    { id: 'hero', name: 'Hero & Headline', icon: '🚀' },
    { id: 'about', name: 'About Me', icon: '👤' },
    { id: 'skills', name: 'Skills & Toolkit', icon: '⚡' },
    { id: 'ai', name: 'AI Workflows', icon: '🤖' },
    { id: 'projects', name: 'Selected Projects', icon: '💼' },
    { id: 'experience', name: 'Experience Timeline', icon: '📜' },
    { id: 'services', name: 'Services Offered', icon: '🛠' },
    { id: 'contact', name: 'Contact & Socials', icon: '✉' }
  ];

  // Active home page sections
  const [homeSections, setHomeSections] = useState(() => data?.homeSections || [
    'hero',
    'about',
    'skills',
    'ai',
    'projects',
    'experience',
    'services',
    'contact'
  ]);

  // State for registered site pages
  const [pagesList, setPagesList] = useState(() => data?.pages || [
    { id: 'home', name: 'Home Page', path: '/', status: 'Active', type: 'Main Landing', sections: ['hero', 'about', 'skills', 'ai', 'projects', 'experience', 'services', 'contact'] },
    { id: 'projects', name: 'Projects Page', path: '/projects', status: 'Active', type: 'Filtered Projects', sections: ['projects', 'contact'] },
    { id: 'services', name: 'Services Page', path: '/services', status: 'Active', type: 'Filtered Services', sections: ['services', 'contact'] },
    { id: 'admin', name: 'Admin Control Center', path: '/admin', status: 'Active', type: 'Management', sections: [] }
  ]);

  const [newPage, setNewPage] = useState({ name: '', path: '', type: 'Custom Page', status: 'Active', sections: ['hero', 'about', 'contact'] });

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleSave = async () => {
    setStatusMsg('⏳ Saving all changes...');
    const updatedDataWithPages = { ...formData, pages: pagesList, homeSections };
    const res = await onSave(updatedDataWithPages);
    setStatusMsg('✓ Portfolio data saved successfully!');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleClearAllInbox = () => {
    if (window.confirm("Are you sure you want to clear all inbox messages?")) {
      setFormData(prev => ({ ...prev, inbox: [] }));
      setStatusMsg('🗑 All inbox messages cleared!');
      setTimeout(() => setStatusMsg(''), 4000);
    }
  };

  const toggleHomeSection = (secId) => {
    if (homeSections.includes(secId)) {
      setHomeSections(homeSections.filter(id => id !== secId));
    } else {
      setHomeSections([...homeSections, secId]);
    }
  };

  const togglePageSection = (pageId, secId) => {
    setPagesList(pagesList.map(p => {
      if (p.id === pageId) {
        const secs = p.sections || [];
        const updatedSecs = secs.includes(secId) ? secs.filter(s => s !== secId) : [...secs, secId];
        return { ...p, sections: updatedSecs };
      }
      return p;
    }));
  };

  // Updaters
  const updateHeroField = (field, val) => {
    setFormData(prev => ({ ...prev, hero: { ...prev.hero, [field]: val } }));
  };

  const updateAboutField = (field, val) => {
    setFormData(prev => ({ ...prev, about: { ...prev.about, [field]: val } }));
  };

  const updateContactField = (field, val) => {
    setFormData(prev => ({ ...prev, contact: { ...prev.contact, [field]: val } }));
  };

  // Skills
  const updateSkill = (index, field, val) => {
    const updated = [...(formData.skills?.items || [])];
    updated[index] = { ...updated[index], [field]: field === 'percentage' ? Number(val) : val };
    setFormData(prev => ({ ...prev, skills: { ...prev.skills, items: updated } }));
  };

  const addSkill = () => {
    const updated = [...(formData.skills?.items || []), { name: 'New Skill', percentage: 80 }];
    setFormData(prev => ({ ...prev, skills: { ...prev.skills, items: updated } }));
  };

  const deleteSkill = (index) => {
    const updated = formData.skills.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, skills: { ...prev.skills, items: updated } }));
  };

  // AI Skills
  const updateAiSkill = (index, field, val) => {
    const updated = [...(formData.aiSkills?.items || [])];
    updated[index] = { ...updated[index], [field]: val };
    setFormData(prev => ({ ...prev, aiSkills: { ...prev.aiSkills, items: updated } }));
  };

  const addAiSkill = () => {
    const updated = [...(formData.aiSkills?.items || []), { name: 'New AI Assistant', icon: '✦', text: 'AI feature text.' }];
    setFormData(prev => ({ ...prev, aiSkills: { ...prev.aiSkills, items: updated } }));
  };

  const deleteAiSkill = (index) => {
    const updated = formData.aiSkills.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, aiSkills: { ...prev.aiSkills, items: updated } }));
  };

  // Projects
  const updateProject = (index, field, val) => {
    const updated = [...(formData.projects?.items || [])];
    if (field === 'tech') {
      val = typeof val === 'string' ? val.split(',').map(s => s.trim()).filter(Boolean) : val;
    }
    updated[index] = { ...updated[index], [field]: val };
    setFormData(prev => ({ ...prev, projects: { ...prev.projects, items: updated } }));
  };

  const addProject = () => {
    const newProj = {
      id: `p_${Date.now()}`,
      title: 'New Portfolio Project',
      category: 'React',
      description: 'Detailed description of the new project.',
      tech: ['React', 'JavaScript', 'CSS'],
      image: 'commerce',
      live: '#contact',
      github: 'https://github.com/'
    };
    setFormData(prev => ({
      ...prev,
      projects: { ...prev.projects, items: [...(prev.projects?.items || []), newProj] }
    }));
  };

  const deleteProject = (index) => {
    const updated = formData.projects.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, projects: { ...prev.projects, items: updated } }));
  };

  // Experience
  const updateExperience = (index, field, val) => {
    const updated = [...(formData.experience?.items || [])];
    updated[index] = { ...updated[index], [field]: val };
    setFormData(prev => ({ ...prev, experience: { ...prev.experience, items: updated } }));
  };

  const addExperience = () => {
    const newExp = {
      id: `e_${Date.now()}`,
      year: '2025 — Present',
      title: 'Frontend Developer',
      company: 'Company Name',
      text: 'Description of achievements and responsibilities.'
    };
    setFormData(prev => ({
      ...prev,
      experience: { ...prev.experience, items: [...(prev.experience?.items || []), newExp] }
    }));
  };

  const deleteExperience = (index) => {
    const updated = formData.experience.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, experience: { ...prev.experience, items: updated } }));
  };

  // Services
  const updateService = (index, field, val) => {
    const updated = [...(formData.services?.items || [])];
    updated[index] = { ...updated[index], [field]: val };
    setFormData(prev => ({ ...prev, services: { ...prev.services, items: updated } }));
  };

  const addService = () => {
    const count = (formData.services?.items || []).length + 1;
    const newServ = {
      id: `s_${Date.now()}`,
      number: `0${count}`,
      category: 'Frontend',
      title: 'New Service Offering',
      description: 'Detailed service description...'
    };
    setFormData(prev => ({
      ...prev,
      services: { ...prev.services, items: [...(prev.services?.items || []), newServ] }
    }));
  };

  const deleteService = (index) => {
    const updated = formData.services.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, services: { ...prev.services, items: updated } }));
  };

  // Pages Management
  const handleAddPage = (e) => {
    e.preventDefault();
    if (!newPage.name || !newPage.path) return;
    const pageObj = {
      id: `page_${Date.now()}`,
      name: newPage.name,
      path: newPage.path.startsWith('/') ? newPage.path : `/${newPage.path}`,
      status: 'Active',
      type: newPage.type || 'Custom Page',
      sections: newPage.sections || ['hero', 'about', 'contact']
    };
    setPagesList(prev => [...prev, pageObj]);
    setNewPage({ name: '', path: '', type: 'Custom Page', status: 'Active', sections: ['hero', 'about', 'contact'] });
  };

  const handleDeletePage = (id) => {
    setPagesList(prev => prev.filter(p => p.id !== id));
  };

  const allNavTabs = [
    { id: 'hero', label: 'Hero & Headline', icon: '🚀', page: 'home' },
    { id: 'about', label: 'About Me', icon: '👤', page: 'home' },
    { id: 'skills', label: 'Skills & AI Toolkit', icon: '⚡', page: 'home' },
    { id: 'experience', label: 'Experience Timeline', icon: '📜', page: 'home' },
    { id: 'projects', label: 'Projects Page & Filters', icon: '💼', page: 'projects' },
    { id: 'services', label: 'Services Page & Filters', icon: '🛠', page: 'services' },
    { id: 'pages', label: 'Add / Edit Pages & Section List', icon: '📄', page: 'pages' },
    { id: 'contact', label: 'Contact & Socials', icon: '✉', page: 'home' },
    { id: 'inbox', label: 'Inbox Messages', icon: '📬', page: 'all' }
  ];

  const visibleNavTabs = allNavTabs.filter(tab => {
    if (selectedPage === 'all') return true;
    if (selectedPage === 'home') return tab.page === 'home' || tab.page === 'all';
    if (selectedPage === 'projects') return tab.page === 'projects' || tab.page === 'all';
    if (selectedPage === 'services') return tab.page === 'services' || tab.page === 'all';
    if (selectedPage === 'pages') return tab.page === 'pages' || tab.page === 'all';
    return true;
  });

  return (
    <div className="admin-page">
      {/* Top Navbar */}
      <header className="admin-topbar">
        <div className="admin-topbar-brand">
          <button className="admin-btn-secondary" onClick={onBackToPortfolio}>
            ← View Live Portfolio
          </button>
          <h1>⚙ Admin Control Center</h1>
        </div>

        <div className="admin-topbar-actions">
          {statusMsg && <div className="admin-status-bar">{statusMsg}</div>}
          <button className="admin-btn-primary" onClick={handleSave}>Save All Changes</button>
        </div>
      </header>

      {/* PAGE SELECTOR BAR */}
      <div className="admin-page-selector-bar">
        <span className="page-selector-label">📍 Select Page to Edit:</span>
        <div className="page-selector-buttons">
          <button
            className={`page-select-btn ${selectedPage === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedPage('all')}
          >
            🌐 All Content
          </button>
          <button
            className={`page-select-btn ${selectedPage === 'home' ? 'active' : ''}`}
            onClick={() => { setSelectedPage('home'); setActiveTab('hero'); }}
          >
            🏠 Home Page Sections
          </button>
          <button
            className={`page-select-btn ${selectedPage === 'projects' ? 'active' : ''}`}
            onClick={() => { setSelectedPage('projects'); setActiveTab('projects'); }}
          >
            💼 Projects Page
          </button>
          <button
            className={`page-select-btn ${selectedPage === 'services' ? 'active' : ''}`}
            onClick={() => { setSelectedPage('services'); setActiveTab('services'); }}
          >
            🛠 Services Page
          </button>
          <button
            className={`page-select-btn ${selectedPage === 'pages' ? 'active' : ''}`}
            onClick={() => { setSelectedPage('pages'); setActiveTab('pages'); }}
          >
            ➕ Add / Edit Pages & Section List
          </button>
        </div>
      </div>

      {/* Main Admin Layout */}
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          {visibleNavTabs.map(tab => (
            <button
              key={tab.id}
              className={`admin-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="admin-nav-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <main className="admin-main-content">
          {/* HERO TAB */}
          {activeTab === 'hero' && (
            <section>
              <div className="admin-section-header">
                <h2>Hero Section Settings (Home Page)</h2>
                <p>Manage your main introduction, eyebrow status, headline words, and animated roles.</p>
              </div>

              <div className="admin-card">
                <h3 className="admin-card-title">Main Headlines</h3>
                <div className="admin-field">
                  <label>Status / Availability Eyebrow</label>
                  <input value={formData.hero?.eyebrow || ''} onChange={(e) => updateHeroField('eyebrow', e.target.value)} />
                </div>
                <div className="admin-grid-2">
                  <div className="admin-field">
                    <label>Headline Start (Line 1)</label>
                    <input value={formData.hero?.headingLine1 || ''} onChange={(e) => updateHeroField('headingLine1', e.target.value)} />
                  </div>
                  <div className="admin-field">
                    <label>Gradient Highlight Word (Line 2)</label>
                    <input value={formData.hero?.headingLine2 || ''} onChange={(e) => updateHeroField('headingLine2', e.target.value)} />
                  </div>
                </div>
                <div className="admin-field">
                  <label>Headline End (Line 3)</label>
                  <input value={formData.hero?.headingLine3 || ''} onChange={(e) => updateHeroField('headingLine3', e.target.value)} />
                </div>
              </div>

              <div className="admin-card">
                <h3 className="admin-card-title">Roles & Intro Text</h3>
                <div className="admin-field">
                  <label>Typed Animated Roles (Comma separated)</label>
                  <input
                    value={(formData.hero?.roles || []).join(', ')}
                    onChange={(e) => updateHeroField('roles', e.target.value.split(',').map(s => s.trim()))}
                  />
                </div>
                <div className="admin-field">
                  <label>Hero Description Paragraph</label>
                  <textarea rows={3} value={formData.hero?.description || ''} onChange={(e) => updateHeroField('description', e.target.value)} />
                </div>
              </div>
            </section>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <section>
              <div className="admin-section-header">
                <h2>About Me Section (Home Page)</h2>
                <p>Edit your bio overview, key message, and signature details.</p>
              </div>
              <div className="admin-card">
                <div className="admin-field">
                  <label>Section Eyebrow</label>
                  <input value={formData.about?.label || ''} onChange={(e) => updateAboutField('label', e.target.value)} />
                </div>
                <div className="admin-field">
                  <label>Title</label>
                  <input value={formData.about?.title || ''} onChange={(e) => updateAboutField('title', e.target.value)} />
                </div>
                <div className="admin-field">
                  <label>Lead Statement</label>
                  <input value={formData.about?.leadText || ''} onChange={(e) => updateAboutField('leadText', e.target.value)} />
                </div>
              </div>
            </section>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <section>
              <div className="admin-section-header">
                <h2>Skills & AI Toolkit (Home Page)</h2>
                <p>Manage your technical skills and proficiency percentages.</p>
              </div>
              {(formData.skills?.items || []).map((skill, index) => (
                <div key={index} className="admin-card">
                  <div className="admin-card-title">
                    <span>Skill #{index + 1}: {skill.name}</span>
                    <button className="admin-btn-danger" onClick={() => deleteSkill(index)}>Delete</button>
                  </div>
                  <div className="admin-grid-2">
                    <div className="admin-field">
                      <label>Skill Name</label>
                      <input value={skill.name} onChange={(e) => updateSkill(index, 'name', e.target.value)} />
                    </div>
                    <div className="admin-field">
                      <label>Proficiency Percentage (%)</label>
                      <input type="number" min="1" max="100" value={skill.percentage} onChange={(e) => updateSkill(index, 'percentage', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              <button className="admin-btn-secondary" style={{ width: '100%' }} onClick={addSkill}>+ Add New Skill</button>
            </section>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === 'experience' && (
            <section>
              <div className="admin-section-header">
                <h2>Experience & Career Timeline (Home Page)</h2>
                <p>Update work experience, education, and company history.</p>
              </div>
              {(formData.experience?.items || []).map((exp, index) => (
                <div key={exp.id || index} className="admin-card">
                  <div className="admin-card-title">
                    <span>Role #{index + 1}: {exp.title} at {exp.company}</span>
                    <button className="admin-btn-danger" onClick={() => deleteExperience(index)}>Delete Entry</button>
                  </div>
                  <div className="admin-grid-2">
                    <div className="admin-field">
                      <label>Year / Duration</label>
                      <input value={exp.year} onChange={(e) => updateExperience(index, 'year', e.target.value)} />
                    </div>
                    <div className="admin-field">
                      <label>Company / Organization</label>
                      <input value={exp.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} />
                    </div>
                  </div>
                  <div className="admin-field">
                    <label>Role Title</label>
                    <input value={exp.title} onChange={(e) => updateExperience(index, 'title', e.target.value)} />
                  </div>
                  <div className="admin-field">
                    <label>Description</label>
                    <textarea rows={2} value={exp.text} onChange={(e) => updateExperience(index, 'text', e.target.value)} />
                  </div>
                </div>
              ))}
              <button className="admin-btn-secondary" style={{ width: '100%' }} onClick={addExperience}>+ Add Timeline Entry</button>
            </section>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <section>
              <div className="admin-section-header">
                <h2>Projects Page & Category Filters (/projects)</h2>
                <p>Manage showcased projects, category filter tags, and live demo links.</p>
              </div>

              <div className="admin-card">
                <h3 className="admin-card-title">Projects Page Header & Filter Categories</h3>
                <div className="admin-grid-2">
                  <div className="admin-field">
                    <label>Section Eyebrow</label>
                    <input
                      value={formData.projects?.label || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, projects: { ...prev.projects, label: e.target.value } }))}
                    />
                  </div>
                  <div className="admin-field">
                    <label>Page Title</label>
                    <input
                      value={formData.projects?.title || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, projects: { ...prev.projects, title: e.target.value } }))}
                    />
                  </div>
                </div>
                <div className="admin-field">
                  <label>Filter Categories (Comma Separated)</label>
                  <input
                    value={(formData.projects?.categories || ['All', 'React', 'Shopify', 'Web']).join(', ')}
                    onChange={(e) => {
                      const cats = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                      setFormData(prev => ({ ...prev, projects: { ...prev.projects, categories: cats } }));
                    }}
                  />
                </div>
              </div>

              <h3>Portfolio Projects List</h3>
              {(formData.projects?.items || []).map((proj, index) => (
                <div key={proj.id || index} className="admin-card">
                  <div className="admin-card-title">
                    <span>Project #{index + 1}: {proj.title}</span>
                    <button className="admin-btn-danger" onClick={() => deleteProject(index)}>Delete Project</button>
                  </div>
                  <div className="admin-grid-2">
                    <div className="admin-field">
                      <label>Project Title</label>
                      <input value={proj.title} onChange={(e) => updateProject(index, 'title', e.target.value)} />
                    </div>
                    <div className="admin-field">
                      <label>Category (e.g. React, Shopify, Web)</label>
                      <input value={proj.category} onChange={(e) => updateProject(index, 'category', e.target.value)} />
                    </div>
                  </div>
                  <div className="admin-field">
                    <label>Description</label>
                    <textarea rows={2} value={proj.description} onChange={(e) => updateProject(index, 'description', e.target.value)} />
                  </div>
                </div>
              ))}
              <button className="admin-btn-secondary" style={{ width: '100%' }} onClick={addProject}>+ Add Portfolio Project</button>
            </section>
          )}

          {/* SERVICES TAB */}
          {activeTab === 'services' && (
            <section>
              <div className="admin-section-header">
                <h2>Services Page & Category Filters (/services)</h2>
                <p>Manage service offerings, categories, and service breakdown for the Services Page.</p>
              </div>

              <div className="admin-card">
                <h3 className="admin-card-title">Services Page Header Settings</h3>
                <div className="admin-grid-2">
                  <div className="admin-field">
                    <label>Section Eyebrow</label>
                    <input
                      value={formData.services?.label || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, services: { ...prev.services, label: e.target.value } }))}
                    />
                  </div>
                  <div className="admin-field">
                    <label>Page Heading Title</label>
                    <input
                      value={formData.services?.title || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, services: { ...prev.services, title: e.target.value } }))}
                    />
                  </div>
                </div>
                <div className="admin-field">
                  <label>Filter Categories (Comma Separated for Services Page Filter Pills)</label>
                  <input
                    value={(formData.services?.categories || ['All', 'Frontend', 'Shopify', 'React', 'UI Engineering', 'Performance', 'AI Workflow']).join(', ')}
                    onChange={(e) => {
                      const cats = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                      setFormData(prev => ({ ...prev, services: { ...prev.services, categories: cats } }));
                    }}
                  />
                </div>
              </div>

              <h3>Service Offerings List</h3>
              {(formData.services?.items || []).map((serv, index) => (
                <div key={serv.id || index} className="admin-card">
                  <div className="admin-card-title">
                    <span>Service #{serv.number || index + 1}: {serv.title}</span>
                    <button className="admin-btn-danger" onClick={() => deleteService(index)}>Delete Service</button>
                  </div>
                  <div className="admin-grid-2">
                    <div className="admin-field">
                      <label>Service Title</label>
                      <input value={serv.title} onChange={(e) => updateService(index, 'title', e.target.value)} />
                    </div>
                    <div className="admin-field">
                      <label>Category Tag (for Filter)</label>
                      <input value={serv.category || 'Frontend'} onChange={(e) => updateService(index, 'category', e.target.value)} />
                    </div>
                  </div>
                  <div className="admin-field">
                    <label>Service Description</label>
                    <textarea rows={2} value={serv.description} onChange={(e) => updateService(index, 'description', e.target.value)} />
                  </div>
                </div>
              ))}
              <button className="admin-btn-secondary" style={{ width: '100%' }} onClick={addService}>+ Add New Service</button>
            </section>
          )}

          {/* PAGE MANAGEMENT & SECTION SELECTOR LIST */}
          {activeTab === 'pages' && (
            <section>
              <div className="admin-section-header">
                <h2>Page Management & Section List Selector</h2>
                <p>Configure page routes and select which sections display on each page.</p>
              </div>

              {/* Home Page Sections Checklist Manager */}
              <div className="admin-card">
                <h3 className="admin-card-title">🏠 Home Page Active Sections Selector</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
                  Check or uncheck sections to show or hide them on the main Home landing page:
                </p>
                <div className="section-checklist-grid">
                  {availableSectionsList.map(sec => {
                    const isChecked = homeSections.includes(sec.id);
                    return (
                      <label key={sec.id} className={`section-checkbox-card ${isChecked ? 'selected' : ''}`}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleHomeSection(sec.id)}
                        />
                        <span className="sec-icon">{sec.icon}</span>
                        <span className="sec-name">{sec.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Add New Page Form with Section Selection */}
              <div className="admin-card">
                <h3 className="admin-card-title">➕ Add New Page & Select Sections</h3>
                <form onSubmit={handleAddPage}>
                  <div className="admin-grid-2">
                    <div className="admin-field">
                      <label>Page Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Services Page, Projects Showcase"
                        value={newPage.name}
                        onChange={(e) => setNewPage({ ...newPage, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="admin-field">
                      <label>Route Path</label>
                      <input
                        type="text"
                        placeholder="e.g. /services, /projects"
                        value={newPage.path}
                        onChange={(e) => setNewPage({ ...newPage, path: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="admin-field">
                    <label>Select Included Sections for New Page</label>
                    <div className="section-checklist-grid">
                      {availableSectionsList.map(sec => {
                        const isChecked = (newPage.sections || []).includes(sec.id);
                        return (
                          <label key={sec.id} className={`section-checkbox-card ${isChecked ? 'selected' : ''}`}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                const cur = newPage.sections || [];
                                const updated = cur.includes(sec.id) ? cur.filter(s => s !== sec.id) : [...cur, sec.id];
                                setNewPage({ ...newPage, sections: updated });
                              }}
                            />
                            <span className="sec-icon">{sec.icon}</span>
                            <span className="sec-name">{sec.name}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <button type="submit" className="admin-btn-primary" style={{ marginTop: '10px' }}>
                    Create Page with Selected Sections
                  </button>
                </form>
              </div>

              {/* Registered Pages List with Manage Sections */}
              <div className="admin-card">
                <h3 className="admin-card-title">Registered Site Pages ({pagesList.length})</h3>
                <div className="pages-list-table">
                  {pagesList.map((p, idx) => (
                    <div key={p.id || idx} className="page-list-row-card">
                      <div className="page-list-row">
                        <div className="page-info">
                          <strong>{p.name}</strong>
                          <span className="page-path">{p.path}</span>
                        </div>
                        <div className="page-meta">
                          <span className="page-badge">{p.type}</span>
                          <span className={`status-badge ${p.status?.toLowerCase()}`}>{p.status}</span>
                          {p.id !== 'home' && p.id !== 'projects' && p.id !== 'services' && p.id !== 'admin' && (
                            <button className="admin-btn-danger" onClick={() => handleDeletePage(p.id)}>
                              Delete Page
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Display Section List Toggles per page */}
                      <div className="page-sections-toggle-area">
                        <span className="toggle-area-label">Included Sections:</span>
                        <div className="section-checklist-grid mini">
                          {availableSectionsList.map(sec => {
                            const isChecked = (p.sections || []).includes(sec.id);
                            return (
                              <label key={sec.id} className={`section-checkbox-card mini ${isChecked ? 'selected' : ''}`}>
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => togglePageSection(p.id, sec.id)}
                                />
                                <span className="sec-icon">{sec.icon}</span>
                                <span className="sec-name">{sec.name}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CONTACT TAB */}
          {activeTab === 'contact' && (
            <section>
              <div className="admin-section-header">
                <h2>Contact Section & Socials (Home Page)</h2>
                <p>Update contact section headlines, description, email address, and social links.</p>
              </div>
              <div className="admin-card">
                <div className="admin-field">
                  <label>Eyebrow Tagline</label>
                  <input value={formData.contact?.eyebrow || ''} onChange={(e) => updateContactField('eyebrow', e.target.value)} />
                </div>
                <div className="admin-grid-2">
                  <div className="admin-field">
                    <label>Heading Line 1</label>
                    <input value={formData.contact?.headingLine1 || ''} onChange={(e) => updateContactField('headingLine1', e.target.value)} />
                  </div>
                  <div className="admin-field">
                    <label>Gradient Highlight Word</label>
                    <input value={formData.contact?.headingLine2 || ''} onChange={(e) => updateContactField('headingLine2', e.target.value)} />
                  </div>
                </div>
                <div className="admin-field">
                  <label>Contact Email Address</label>
                  <input value={formData.contact?.email || ''} onChange={(e) => updateContactField('email', e.target.value)} />
                </div>
              </div>
            </section>
          )}

          {/* INBOX TAB */}
          {activeTab === 'inbox' && (
            <section className="admin-tab-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2>📬 Inbox Messages ({ (formData.inbox || []).length })</h2>
                  <p className="admin-tab-subtitle">Messages submitted by visitors through your live portfolio contact form.</p>
                </div>
                {(formData.inbox || []).length > 0 && (
                  <button className="admin-btn-danger" onClick={handleClearAllInbox}>
                    🗑 Clear All Messages
                  </button>
                )}
              </div>

              {(!formData.inbox || formData.inbox.length === 0) ? (
                <div className="admin-card" style={{ textAlign: 'center', padding: '40px' }}>
                  <p style={{ color: 'var(--muted)' }}>No messages received yet.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {formData.inbox.map((msg, index) => (
                    <div key={msg.id || index} className="admin-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <strong>{msg.name}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{msg.date}</span>
                      </div>
                      <p>{msg.message}</p>
                      <button
                        className="admin-btn-danger"
                        style={{ marginTop: '10px' }}
                        onClick={() => {
                          const updated = formData.inbox.filter((_, i) => i !== index);
                          setFormData(prev => ({ ...prev, inbox: updated }));
                        }}
                      >
                        Delete Message
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
