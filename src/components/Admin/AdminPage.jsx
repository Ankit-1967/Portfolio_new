import React, { useState, useEffect } from 'react';
import './AdminPage.css';

function AdminPage({ data, onSave, onReset, onBackToPortfolio }) {
  const [formData, setFormData] = useState(data);
  const [activeTab, setActiveTab] = useState('hero');
  const [statusMsg, setStatusMsg] = useState('');
  const [sheetsUrl, setSheetsUrl] = useState(() => localStorage.getItem("portfolio_sheets_url") || "");

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
    const res = await onSave(formData);
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

  const navTabs = [
    { id: 'hero', label: 'Hero & Headline', icon: '🚀' },
    { id: 'about', label: 'About Me', icon: '👤' },
    { id: 'skills', label: 'Skills & Toolkit', icon: '⚡' },
    { id: 'ai', label: 'AI Workflow', icon: '🤖' },
    { id: 'projects', label: 'Selected Projects', icon: '💼' },
    { id: 'experience', label: 'Experience Timeline', icon: '📜' },
    { id: 'services', label: 'Services Offered', icon: '🛠' },
    { id: 'contact', label: 'Contact & Socials', icon: '✉' },
    { id: 'inbox', label: 'Inbox Messages', icon: '📬' },
    { id: 'backend', label: 'Google Sheets Backend', icon: '📊' }
  ];

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

      {/* Main Admin Layout */}
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          {navTabs.map(tab => (
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
                <h2>Hero Section Settings</h2>
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
                <h2>About Me Section</h2>
                <p>Edit your personal lead statement, background paragraphs, and signature.</p>
              </div>

              <div className="admin-card">
                <div className="admin-field">
                  <label>Big Lead Statement</label>
                  <textarea rows={2} value={formData.about?.leadText || ''} onChange={(e) => updateAboutField('leadText', e.target.value)} />
                </div>
                <div className="admin-field">
                  <label>Paragraph 1</label>
                  <textarea
                    rows={3}
                    value={formData.about?.paragraphs?.[0] || ''}
                    onChange={(e) => {
                      const updated = [...(formData.about?.paragraphs || [])];
                      updated[0] = e.target.value;
                      updateAboutField('paragraphs', updated);
                    }}
                  />
                </div>
                <div className="admin-field">
                  <label>Paragraph 2</label>
                  <textarea
                    rows={3}
                    value={formData.about?.paragraphs?.[1] || ''}
                    onChange={(e) => {
                      const updated = [...(formData.about?.paragraphs || [])];
                      updated[1] = e.target.value;
                      updateAboutField('paragraphs', updated);
                    }}
                  />
                </div>
                <div className="admin-grid-2">
                  <div className="admin-field">
                    <label>Signature Name</label>
                    <input value={formData.about?.signatureName || ''} onChange={(e) => updateAboutField('signatureName', e.target.value)} />
                  </div>
                  <div className="admin-field">
                    <label>Signature Title</label>
                    <input value={formData.about?.signatureTitle || ''} onChange={(e) => updateAboutField('signatureTitle', e.target.value)} />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <section>
              <div className="admin-section-header">
                <h2>Skills & Progress Bars</h2>
                <p>Add, edit, or remove technical skills and proficiency percentages.</p>
              </div>

              {(formData.skills?.items || []).map((skill, index) => (
                <div key={index} className="admin-card">
                  <div className="admin-card-title">
                    <span>Skill #{index + 1}</span>
                    <button className="admin-btn-danger" onClick={() => deleteSkill(index)}>Delete Skill</button>
                  </div>
                  <div className="admin-grid-2">
                    <div className="admin-field">
                      <label>Skill Name</label>
                      <input value={skill.name} onChange={(e) => updateSkill(index, 'name', e.target.value)} />
                    </div>
                    <div className="admin-field">
                      <label>Proficiency (%)</label>
                      <input type="number" min="0" max="100" value={skill.percentage} onChange={(e) => updateSkill(index, 'percentage', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              <button className="admin-btn-secondary" style={{ width: '100%' }} onClick={addSkill}>+ Add New Skill</button>
            </section>
          )}

          {/* AI WORKFLOW TAB */}
          {activeTab === 'ai' && (
            <section>
              <div className="admin-section-header">
                <h2>AI Workflow Tools</h2>
                <p>Manage your AI tools, prompt engineering, and productivity workflows.</p>
              </div>

              {(formData.aiSkills?.items || []).map((tool, index) => (
                <div key={index} className="admin-card">
                  <div className="admin-card-title">
                    <span>Tool #{index + 1}: {tool.name}</span>
                    <button className="admin-btn-danger" onClick={() => deleteAiSkill(index)}>Delete Tool</button>
                  </div>
                  <div className="admin-grid-2">
                    <div className="admin-field">
                      <label>Tool Name</label>
                      <input value={tool.name} onChange={(e) => updateAiSkill(index, 'name', e.target.value)} />
                    </div>
                    <div className="admin-field">
                      <label>Icon Symbol</label>
                      <input value={tool.icon} onChange={(e) => updateAiSkill(index, 'icon', e.target.value)} />
                    </div>
                  </div>
                  <div className="admin-field">
                    <label>Description & Workflow Use Case</label>
                    <textarea rows={2} value={tool.text} onChange={(e) => updateAiSkill(index, 'text', e.target.value)} />
                  </div>
                </div>
              ))}
              <button className="admin-btn-secondary" style={{ width: '100%' }} onClick={addAiSkill}>+ Add AI Tool</button>
            </section>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <section>
              <div className="admin-section-header">
                <h2>Selected Work Projects</h2>
                <p>Add, edit, or remove featured projects from your portfolio showcase.</p>
              </div>

              {(formData.projects?.items || []).map((proj, index) => (
                <div key={proj.id || index} className="admin-card">
                  <div className="admin-card-title">
                    <span>Project #{index + 1}: {proj.title}</span>
                    <button className="admin-btn-danger" onClick={() => deleteProject(index)}>Delete Project</button>
                  </div>
                  <div className="admin-field">
                    <label>Project Title</label>
                    <input value={proj.title} onChange={(e) => updateProject(index, 'title', e.target.value)} />
                  </div>
                  <div className="admin-grid-2">
                    <div className="admin-field">
                      <label>Category Filter</label>
                      <select value={proj.category} onChange={(e) => updateProject(index, 'category', e.target.value)}>
                        <option value="React">React</option>
                        <option value="Shopify">Shopify</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Web">Web</option>
                      </select>
                    </div>
                    <div className="admin-field">
                      <label>Mockup Visual Theme</label>
                      <select value={proj.image} onChange={(e) => updateProject(index, 'image', e.target.value)}>
                        <option value="commerce">Commerce</option>
                        <option value="portfolio">Portfolio</option>
                        <option value="travel">Travel</option>
                        <option value="agency">Agency</option>
                        <option value="weather">Weather</option>
                        <option value="theme">Theme</option>
                      </select>
                    </div>
                  </div>
                  <div className="admin-field">
                    <label>Tech Stack Tags (Comma separated)</label>
                    <input value={(proj.tech || []).join(', ')} onChange={(e) => updateProject(index, 'tech', e.target.value)} />
                  </div>
                  <div className="admin-field">
                    <label>Description</label>
                    <textarea rows={2} value={proj.description} onChange={(e) => updateProject(index, 'description', e.target.value)} />
                  </div>
                  <div className="admin-grid-2">
                    <div className="admin-field">
                      <label>Live Demo URL</label>
                      <input value={proj.live} onChange={(e) => updateProject(index, 'live', e.target.value)} />
                    </div>
                    <div className="admin-field">
                      <label>GitHub Repository URL</label>
                      <input value={proj.github} onChange={(e) => updateProject(index, 'github', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              <button className="admin-btn-secondary" style={{ width: '100%' }} onClick={addProject}>+ Add New Project</button>
            </section>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === 'experience' && (
            <section>
              <div className="admin-section-header">
                <h2>Journey & Timeline</h2>
                <p>Manage work experience, leadership roles, and educational qualifications.</p>
              </div>

              {(formData.experience?.items || []).map((exp, index) => (
                <div key={exp.id || index} className="admin-card">
                  <div className="admin-card-title">
                    <span>Item #{index + 1}: {exp.title}</span>
                    <button className="admin-btn-danger" onClick={() => deleteExperience(index)}>Delete Item</button>
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
                    <label>Description & Key Achievements</label>
                    <textarea rows={2} value={exp.text} onChange={(e) => updateExperience(index, 'text', e.target.value)} />
                  </div>
                </div>
              ))}
              <button className="admin-btn-secondary" style={{ width: '100%' }} onClick={addExperience}>+ Add Timeline Entry</button>
            </section>
          )}

          {/* SERVICES TAB */}
          {activeTab === 'services' && (
            <section>
              <div className="admin-section-header">
                <h2>Services Offered</h2>
                <p>Update service offerings and development solutions.</p>
              </div>

              {(formData.services?.items || []).map((serv, index) => (
                <div key={serv.id || index} className="admin-card">
                  <div className="admin-card-title">
                    <span>Service #{serv.number || index + 1}: {serv.title}</span>
                    <button className="admin-btn-danger" onClick={() => deleteService(index)}>Delete Service</button>
                  </div>
                  <div className="admin-field">
                    <label>Service Title</label>
                    <input value={serv.title} onChange={(e) => updateService(index, 'title', e.target.value)} />
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

          {/* CONTACT TAB */}
          {activeTab === 'contact' && (
            <section>
              <div className="admin-section-header">
                <h2>Contact Section & Socials</h2>
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
                  <label>Contact Copy Description</label>
                  <textarea rows={3} value={formData.contact?.description || ''} onChange={(e) => updateContactField('description', e.target.value)} />
                </div>
                <div className="admin-field">
                  <label>Contact Email Address</label>
                  <input value={formData.contact?.email || ''} onChange={(e) => updateContactField('email', e.target.value)} />
                </div>
                <div className="admin-field">
                  <label>Automated Thank You Letter Message (Sent to Visitor on Form Submit)</label>
                  <textarea rows={4} value={formData.contact?.autoReplyMessage || ''} onChange={(e) => updateContactField('autoReplyMessage', e.target.value)} />
                </div>
                <div className="admin-grid-2">
                  <div className="admin-field">
                    <label>GitHub URL</label>
                    <input value={formData.contact?.github || ''} onChange={(e) => updateContactField('github', e.target.value)} />
                  </div>
                  <div className="admin-field">
                    <label>LinkedIn URL</label>
                    <input value={formData.contact?.linkedin || ''} onChange={(e) => updateContactField('linkedin', e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="admin-card" style={{ marginTop: '20px' }}>
                <h3 className="admin-card-title">Direct Gmail Sender Setup (EmailJS)</h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                  Connect your EmailJS Gmail account to send Thank You letters directly from <b>at667448@gmail.com</b>.
                </p>
                <div className="admin-grid-2">
                  <div className="admin-field">
                    <label>EmailJS Service ID</label>
                    <input
                      placeholder="e.g. service_xxxx"
                      value={formData.contact?.emailJs?.serviceId || ''}
                      onChange={(e) => {
                        const emailJs = { ...(formData.contact?.emailJs || {}), serviceId: e.target.value };
                        updateContactField('emailJs', emailJs);
                      }}
                    />
                  </div>
                  <div className="admin-field">
                    <label>EmailJS Public Key</label>
                    <input
                      placeholder="e.g. user_xxxx"
                      value={formData.contact?.emailJs?.publicKey || ''}
                      onChange={(e) => {
                        const emailJs = { ...(formData.contact?.emailJs || {}), publicKey: e.target.value };
                        updateContactField('emailJs', emailJs);
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'inbox' && (
            <section className="admin-tab-content">
              <h2>📬 Inbox Messages ({ (formData.inbox || []).length })</h2>
              <p className="admin-tab-subtitle">Messages submitted by visitors through your live portfolio contact form.</p>

              {(!formData.inbox || formData.inbox.length === 0) ? (
                <div className="admin-card" style={{ textAlign: 'center', padding: '40px' }}>
                  <p style={{ color: 'var(--muted)' }}>No messages received yet. When visitors fill out your contact form, their inquiries will appear here!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {formData.inbox.map((msg, index) => (
                    <div key={msg.id || index} className="admin-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div>
                          <strong style={{ fontSize: '1.05rem' }}>{msg.name}</strong>
                          <span style={{ color: 'var(--accent)', marginLeft: '12px', fontSize: '0.85rem' }}>&lt;{msg.email}&gt;</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{msg.date}</span>
                      </div>
                      <p style={{ whiteSpace: 'pre-wrap', background: 'rgba(127,127,180,0.06)', padding: '14px', borderRadius: '10px', fontSize: '0.9rem' }}>
                        {msg.message}
                      </p>
                      <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <a href={`mailto:${msg.email}`} className="admin-btn-secondary" style={{ textDecoration: 'none', fontSize: '0.8rem' }}>
                          ✉ Reply to {msg.name}
                        </a>
                        <button
                          className="admin-btn-danger"
                          style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                          onClick={() => {
                            const updated = formData.inbox.filter((_, i) => i !== index);
                            setFormData(prev => ({ ...prev, inbox: updated }));
                          }}
                        >
                          Delete Message
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {activeTab === 'backend' && (
            <section className="admin-tab-content">
              <h2>📊 Google Sheets Backend Integration</h2>
              <p className="admin-tab-subtitle">Connect your Google Sheet Web App URL so all changes update live worldwide for all visitors.</p>

              <div className="admin-card">
                <h3>Google Apps Script Web App URL</h3>
                <div className="admin-field">
                  <label>Web App Deployment URL</label>
                  <input
                    type="url"
                    placeholder="https://script.google.com/macros/s/.../exec"
                    value={sheetsUrl}
                    onChange={(e) => setSheetsUrl(e.target.value)}
                  />
                  <small style={{ color: 'var(--muted)', marginTop: '8px', display: 'block', lineHeight: '1.4' }}>
                    Paste your deployed Google Apps Script Web App URL here and click <b>Save All Changes</b>. Once saved, any edits you make in this Admin Panel will write directly to your Google Sheet and update your live portfolio worldwide!
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
