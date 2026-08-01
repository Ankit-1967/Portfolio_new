import React, { useState, useEffect } from 'react';
import './AdminPage.css';

function AdminPage({ data, onSave, onReset, onBackToPortfolio }) {
  const [formData, setFormData] = useState(data);
  const [selectedPage, setSelectedPage] = useState('all'); // 'all', 'home', 'projects', 'services', 'pages'
  const [activeTab, setActiveTab] = useState('hero');
  const [statusMsg, setStatusMsg] = useState('');
  const [sheetsUrl, setSheetsUrl] = useState(() => localStorage.getItem("portfolio_sheets_url") || import.meta.env.VITE_GOOGLE_SHEETS_API_URL || "");

  // State for registered site pages & custom page section items
  const [pagesList, setPagesList] = useState(() => data?.pages || [
    { id: 'home', name: 'Home Page (4 Main Sections)', path: '/', status: 'Active', type: 'Main Landing' },
    { id: 'projects', name: 'Projects Page', path: '/projects', status: 'Active', type: 'Filtered Projects' },
    { id: 'services', name: 'Services Page', path: '/services', status: 'Active', type: 'Filtered Services' },
    { id: 'admin', name: 'Admin Control Center', path: '/admin', status: 'Active', type: 'Management' }
  ]);

  const [selectedEditPageId, setSelectedEditPageId] = useState('services');
  const [newPage, setNewPage] = useState({ name: '', path: '', type: 'Custom Page', status: 'Active' });

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleSave = async () => {
    setStatusMsg('⏳ Saving all changes...');
    if (sheetsUrl) {
      localStorage.setItem("portfolio_sheets_url", sheetsUrl.trim());
    } else {
      localStorage.removeItem("portfolio_sheets_url");
    }
    const updatedDataWithPages = { ...formData, pages: pagesList };
    const res = await onSave(updatedDataWithPages);
    if (sheetsUrl && sheetsUrl.trim()) {
      setStatusMsg('✓ Portfolio data successfully updated live in Google Sheets!');
    } else {
      setStatusMsg('✓ Portfolio data saved locally!');
    }
    setTimeout(() => setStatusMsg(''), 5000);
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
      type: newPage.type || 'Custom Page'
    };
    setPagesList(prev => [...prev, pageObj]);
    setNewPage({ name: '', path: '', type: 'Custom Page', status: 'Active' });
  };

  const handleDeletePage = (id) => {
    setPagesList(prev => prev.filter(p => p.id !== id));
  };

  const allNavTabs = [
    { id: 'hero', label: 'Hero & Headline', icon: '🚀', page: 'home' },
    { id: 'about', label: 'About Me', icon: '👤', page: 'home' },
    { id: 'skills', label: 'Skills & AI Toolkit', icon: '⚡', page: 'home' },
    { id: 'projects', label: 'Projects Page & Filters', icon: '💼', page: 'projects' },
    { id: 'services', label: 'Services Page & Filters', icon: '🛠', page: 'services' },
    { id: 'pages', label: 'Add / Edit Pages & Sections', icon: '📄', page: 'pages' },
    { id: 'contact', label: 'Contact & Socials', icon: '✉', page: 'home' },
    { id: 'inbox', label: 'Inbox Messages', icon: '📬', page: 'all' },
    { id: 'backend', label: 'Google Sheets Backend', icon: '📊', page: 'all' }
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

      {/* PAGE SELECTOR & ADD/EDIT PAGE BAR */}
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
            🏠 Home Page (4 Sections)
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
            ➕ Add / Edit Pages & Custom Sections
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
                <h2>Hero Section Settings (Home Page Tab 1)</h2>
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
                <h2>About Me Section (Home Page Tab 2)</h2>
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
                <h2>Skills & AI Toolkit (Home Page Tab 3)</h2>
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

          {/* PAGE MANAGEMENT / ADD EDIT PAGE OPTION */}
          {activeTab === 'pages' && (
            <section>
              <div className="admin-section-header">
                <h2>Page Management & Add / Edit Page Options</h2>
                <p>Configure pages, routes, and custom section content in your portfolio system.</p>
              </div>

              {/* Add New Page Form */}
              <div className="admin-card">
                <h3 className="admin-card-title">➕ Add New Page Option</h3>
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
                  <div className="admin-grid-2">
                    <div className="admin-field">
                      <label>Page Type</label>
                      <select
                        value={newPage.type}
                        onChange={(e) => setNewPage({ ...newPage, type: e.target.value })}
                      >
                        <option value="Filtered Services">Filtered Services</option>
                        <option value="Filtered Projects">Filtered Projects</option>
                        <option value="Main Landing">Main Landing</option>
                        <option value="Custom Page">Custom Page</option>
                      </select>
                    </div>
                    <div className="admin-field">
                      <label>Status</label>
                      <select
                        value={newPage.status}
                        onChange={(e) => setNewPage({ ...newPage, status: e.target.value })}
                      >
                        <option value="Active">Active</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="admin-btn-primary" style={{ marginTop: '10px' }}>
                    Create Page Option
                  </button>
                </form>
              </div>

              {/* Registered Pages List */}
              <div className="admin-card">
                <h3 className="admin-card-title">Registered Site Pages ({pagesList.length})</h3>
                <div className="pages-list-table">
                  {pagesList.map((p, idx) => (
                    <div key={p.id || idx} className="page-list-row">
                      <div className="page-info">
                        <strong>{p.name}</strong>
                        <span className="page-path">{p.path}</span>
                      </div>
                      <div className="page-meta">
                        <span className="page-badge">{p.type}</span>
                        <span className={`status-badge ${p.status?.toLowerCase()}`}>{p.status}</span>
                        {p.id === 'services' && (
                          <button
                            className="admin-btn-secondary"
                            onClick={() => { setSelectedPage('services'); setActiveTab('services'); }}
                          >
                            Edit Page Data →
                          </button>
                        )}
                        {p.id === 'projects' && (
                          <button
                            className="admin-btn-secondary"
                            onClick={() => { setSelectedPage('projects'); setActiveTab('projects'); }}
                          >
                            Edit Page Data →
                          </button>
                        )}
                        {p.id !== 'home' && p.id !== 'projects' && p.id !== 'services' && p.id !== 'admin' && (
                          <button className="admin-btn-danger" onClick={() => handleDeletePage(p.id)}>
                            Delete Page
                          </button>
                        )}
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
                <h2>Contact Section & Socials (Home Page Tab 4)</h2>
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
              <h2>📬 Inbox Messages ({ (formData.inbox || []).length })</h2>
              <p className="admin-tab-subtitle">Messages submitted by visitors through your live portfolio contact form.</p>
              {(!formData.inbox || formData.inbox.length === 0) ? (
                <div className="admin-card" style={{ textAlign: 'center', padding: '40px' }}>
                  <p style={{ color: 'var(--muted)' }}>No messages received yet.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {formData.inbox.map((msg, index) => (
                    <div key={msg.id || index} className="admin-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong>{msg.name}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{msg.date}</span>
                      </div>
                      <p>{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* GOOGLE SHEETS TAB */}
          {activeTab === 'backend' && (
            <section className="admin-tab-content">
              <h2>📊 Google Sheets Backend Integration</h2>
              <p className="admin-tab-subtitle">Connect your Google Sheet Web App URL so all changes update live worldwide for all visitors.</p>
              <div className="admin-card">
                <div className="admin-field">
                  <label>Web App Deployment URL</label>
                  <input
                    type="url"
                    placeholder="https://script.google.com/macros/s/.../exec"
                    value={sheetsUrl}
                    onChange={(e) => setSheetsUrl(e.target.value)}
                  />
                  <small style={{ color: 'var(--muted)', marginTop: '8px', display: 'block', lineHeight: '1.4' }}>
                    Note: If your Google Script is already connected, it is active automatically! You only need to update this field if you change your Web App deployment URL.
                  </small>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
