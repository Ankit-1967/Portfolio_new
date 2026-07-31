import React, { useState, useEffect } from 'react';
import './Admin.css';

function Admin({ isOpen, onClose, data, onSave, onReset }) {
  const [formData, setFormData] = useState(data);
  const [activeTab, setActiveTab] = useState('hero');
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    setFormData(data);
  }, [data]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    setStatusMsg('✓ All portfolio data updated and saved to local storage!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all portfolio data back to default values?')) {
      onReset();
      setStatusMsg('✓ Reset to initial default portfolio data.');
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

  // Helper nested state updaters
  const updateHeroField = (field, val) => {
    setFormData(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: val }
    }));
  };

  const updateAboutField = (field, val) => {
    setFormData(prev => ({
      ...prev,
      about: { ...prev.about, [field]: val }
    }));
  };

  const updateContactField = (field, val) => {
    setFormData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: val }
    }));
  };

  // Skills handlers
  const updateSkill = (index, field, val) => {
    const updated = [...(formData.skills?.items || [])];
    updated[index] = { ...updated[index], [field]: field === 'percentage' ? Number(val) : val };
    setFormData(prev => ({
      ...prev,
      skills: { ...prev.skills, items: updated }
    }));
  };

  const addSkill = () => {
    const updated = [...(formData.skills?.items || []), { name: 'New Skill', percentage: 75 }];
    setFormData(prev => ({
      ...prev,
      skills: { ...prev.skills, items: updated }
    }));
  };

  const deleteSkill = (index) => {
    const updated = formData.skills.items.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      skills: { ...prev.skills, items: updated }
    }));
  };

  // AI skills handlers
  const updateAiSkill = (index, field, val) => {
    const updated = [...(formData.aiSkills?.items || [])];
    updated[index] = { ...updated[index], [field]: val };
    setFormData(prev => ({
      ...prev,
      aiSkills: { ...prev.aiSkills, items: updated }
    }));
  };

  const addAiSkill = () => {
    const updated = [...(formData.aiSkills?.items || []), { name: 'New AI Tool', icon: '✦', text: 'AI feature description.' }];
    setFormData(prev => ({
      ...prev,
      aiSkills: { ...prev.aiSkills, items: updated }
    }));
  };

  const deleteAiSkill = (index) => {
    const updated = formData.aiSkills.items.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      aiSkills: { ...prev.aiSkills, items: updated }
    }));
  };

  // Projects handlers
  const updateProject = (index, field, val) => {
    const updated = [...(formData.projects?.items || [])];
    if (field === 'tech') {
      val = val.split(',').map(s => s.trim()).filter(Boolean);
    }
    updated[index] = { ...updated[index], [field]: val };
    setFormData(prev => ({
      ...prev,
      projects: { ...prev.projects, items: updated }
    }));
  };

  const addProject = () => {
    const newProj = {
      id: `p_${Date.now()}`,
      title: 'New Web Project',
      category: 'React',
      description: 'Project description goes here.',
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
    setFormData(prev => ({
      ...prev,
      projects: { ...prev.projects, items: updated }
    }));
  };

  // Timeline handlers
  const updateExperience = (index, field, val) => {
    const updated = [...(formData.experience?.items || [])];
    updated[index] = { ...updated[index], [field]: val };
    setFormData(prev => ({
      ...prev,
      experience: { ...prev.experience, items: updated }
    }));
  };

  const addExperience = () => {
    const newExp = {
      id: `e_${Date.now()}`,
      year: '2025 — Present',
      title: 'Senior Developer',
      company: 'Company Name',
      text: 'Role details and accomplishments.'
    };
    setFormData(prev => ({
      ...prev,
      experience: { ...prev.experience, items: [...(prev.experience?.items || []), newExp] }
    }));
  };

  const deleteExperience = (index) => {
    const updated = formData.experience.items.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      experience: { ...prev.experience, items: updated }
    }));
  };

  // Services handlers
  const updateService = (index, field, val) => {
    const updated = [...(formData.services?.items || [])];
    updated[index] = { ...updated[index], [field]: val };
    setFormData(prev => ({
      ...prev,
      services: { ...prev.services, items: updated }
    }));
  };

  const addService = () => {
    const count = (formData.services?.items || []).length + 1;
    const newServ = {
      id: `s_${Date.now()}`,
      number: `0${count}`,
      title: 'New Service',
      description: 'Service description...'
    };
    setFormData(prev => ({
      ...prev,
      services: { ...prev.services, items: [...(prev.services?.items || []), newServ] }
    }));
  };

  const deleteService = (index) => {
    const updated = formData.services.items.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      services: { ...prev.services, items: updated }
    }));
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="admin-header">
          <h2>⚙ Portfolio Admin Dashboard</h2>
          <button className="admin-close-btn" onClick={onClose} aria-label="Close Admin">✕</button>
        </div>

        <div className="admin-tabs">
          <button className={`admin-tab-btn ${activeTab === 'hero' ? 'active' : ''}`} onClick={() => setActiveTab('hero')}>Hero</button>
          <button className={`admin-tab-btn ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>About</button>
          <button className={`admin-tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>Skills</button>
          <button className={`admin-tab-btn ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => setActiveTab('ai')}>AI Tools</button>
          <button className={`admin-tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>Projects</button>
          <button className={`admin-tab-btn ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>Experience</button>
          <button className={`admin-tab-btn ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>Services</button>
          <button className={`admin-tab-btn ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => setActiveTab('contact')}>Contact</button>
        </div>

        <div className="admin-body">
          {/* HERO TAB */}
          {activeTab === 'hero' && (
            <div>
              <div className="admin-form-group">
                <label>Status / Eyebrow Text</label>
                <input value={formData.hero?.eyebrow || ''} onChange={(e) => updateHeroField('eyebrow', e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>Heading Line 1</label>
                <input value={formData.hero?.headingLine1 || ''} onChange={(e) => updateHeroField('headingLine1', e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>Heading Gradient Word (Line 2)</label>
                <input value={formData.hero?.headingLine2 || ''} onChange={(e) => updateHeroField('headingLine2', e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>Heading Line 3</label>
                <input value={formData.hero?.headingLine3 || ''} onChange={(e) => updateHeroField('headingLine3', e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>Typed Developer Roles (Comma separated)</label>
                <input
                  value={(formData.hero?.roles || []).join(', ')}
                  onChange={(e) => updateHeroField('roles', e.target.value.split(',').map(s => s.trim()))}
                />
              </div>
              <div className="admin-form-group">
                <label>Hero Description</label>
                <textarea rows={3} value={formData.hero?.description || ''} onChange={(e) => updateHeroField('description', e.target.value)} />
              </div>
            </div>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <div>
              <div className="admin-form-group">
                <label>About Lead Heading</label>
                <input value={formData.about?.leadText || ''} onChange={(e) => updateAboutField('leadText', e.target.value)} />
              </div>
              <div className="admin-form-group">
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
              <div className="admin-form-group">
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
              <div className="admin-form-group">
                <label>Signature Name</label>
                <input value={formData.about?.signatureName || ''} onChange={(e) => updateAboutField('signatureName', e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>Signature Title</label>
                <input value={formData.about?.signatureTitle || ''} onChange={(e) => updateAboutField('signatureTitle', e.target.value)} />
              </div>
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <div>
              {(formData.skills?.items || []).map((skill, index) => (
                <div key={index} className="admin-item-card">
                  <div className="admin-item-header">
                    <span>Skill #{index + 1}</span>
                    <button className="admin-delete-btn" onClick={() => deleteSkill(index)}>Delete</button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                    <div className="admin-form-group" style={{ margin: 0 }}>
                      <label>Skill Name</label>
                      <input value={skill.name} onChange={(e) => updateSkill(index, 'name', e.target.value)} />
                    </div>
                    <div className="admin-form-group" style={{ margin: 0 }}>
                      <label>Percentage (%)</label>
                      <input type="number" min="0" max="100" value={skill.percentage} onChange={(e) => updateSkill(index, 'percentage', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              <button className="admin-add-btn" onClick={addSkill}>+ Add New Skill</button>
            </div>
          )}

          {/* AI TOOLS TAB */}
          {activeTab === 'ai' && (
            <div>
              {(formData.aiSkills?.items || []).map((tool, index) => (
                <div key={index} className="admin-item-card">
                  <div className="admin-item-header">
                    <span>AI Tool #{index + 1}</span>
                    <button className="admin-delete-btn" onClick={() => deleteAiSkill(index)}>Delete</button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '10px' }}>
                    <div className="admin-form-group" style={{ margin: 0 }}>
                      <label>Tool Name</label>
                      <input value={tool.name} onChange={(e) => updateAiSkill(index, 'name', e.target.value)} />
                    </div>
                    <div className="admin-form-group" style={{ margin: 0 }}>
                      <label>Icon Symbol</label>
                      <input value={tool.icon} onChange={(e) => updateAiSkill(index, 'icon', e.target.value)} />
                    </div>
                  </div>
                  <div className="admin-form-group" style={{ margin: 0 }}>
                    <label>Description</label>
                    <textarea rows={2} value={tool.text} onChange={(e) => updateAiSkill(index, 'text', e.target.value)} />
                  </div>
                </div>
              ))}
              <button className="admin-add-btn" onClick={addAiSkill}>+ Add AI Tool</button>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div>
              {(formData.projects?.items || []).map((proj, index) => (
                <div key={proj.id || index} className="admin-item-card">
                  <div className="admin-item-header">
                    <span>Project #{index + 1}: {proj.title}</span>
                    <button className="admin-delete-btn" onClick={() => deleteProject(index)}>Delete</button>
                  </div>
                  <div className="admin-form-group">
                    <label>Title</label>
                    <input value={proj.title} onChange={(e) => updateProject(index, 'title', e.target.value)} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="admin-form-group">
                      <label>Category</label>
                      <select value={proj.category} onChange={(e) => updateProject(index, 'category', e.target.value)}>
                        <option value="React">React</option>
                        <option value="Shopify">Shopify</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Web">Web</option>
                      </select>
                    </div>
                    <div className="admin-form-group">
                      <label>Image Theme</label>
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
                  <div className="admin-form-group">
                    <label>Tech Stack (Comma separated)</label>
                    <input value={(proj.tech || []).join(', ')} onChange={(e) => updateProject(index, 'tech', e.target.value)} />
                  </div>
                  <div className="admin-form-group">
                    <label>Description</label>
                    <textarea rows={2} value={proj.description} onChange={(e) => updateProject(index, 'description', e.target.value)} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="admin-form-group" style={{ margin: 0 }}>
                      <label>Live Link</label>
                      <input value={proj.live} onChange={(e) => updateProject(index, 'live', e.target.value)} />
                    </div>
                    <div className="admin-form-group" style={{ margin: 0 }}>
                      <label>GitHub Link</label>
                      <input value={proj.github} onChange={(e) => updateProject(index, 'github', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              <button className="admin-add-btn" onClick={addProject}>+ Add New Project</button>
            </div>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === 'experience' && (
            <div>
              {(formData.experience?.items || []).map((exp, index) => (
                <div key={exp.id || index} className="admin-item-card">
                  <div className="admin-item-header">
                    <span>Experience #{index + 1}</span>
                    <button className="admin-delete-btn" onClick={() => deleteExperience(index)}>Delete</button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="admin-form-group">
                      <label>Year / Duration</label>
                      <input value={exp.year} onChange={(e) => updateExperience(index, 'year', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                      <label>Company / Institution</label>
                      <input value={exp.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} />
                    </div>
                  </div>
                  <div className="admin-form-group">
                    <label>Role / Title</label>
                    <input value={exp.title} onChange={(e) => updateExperience(index, 'title', e.target.value)} />
                  </div>
                  <div className="admin-form-group" style={{ margin: 0 }}>
                    <label>Details</label>
                    <textarea rows={2} value={exp.text} onChange={(e) => updateExperience(index, 'text', e.target.value)} />
                  </div>
                </div>
              ))}
              <button className="admin-add-btn" onClick={addExperience}>+ Add Timeline Item</button>
            </div>
          )}

          {/* SERVICES TAB */}
          {activeTab === 'services' && (
            <div>
              {(formData.services?.items || []).map((serv, index) => (
                <div key={serv.id || index} className="admin-item-card">
                  <div className="admin-item-header">
                    <span>Service #{serv.number || index + 1}</span>
                    <button className="admin-delete-btn" onClick={() => deleteService(index)}>Delete</button>
                  </div>
                  <div className="admin-form-group">
                    <label>Title</label>
                    <input value={serv.title} onChange={(e) => updateService(index, 'title', e.target.value)} />
                  </div>
                  <div className="admin-form-group" style={{ margin: 0 }}>
                    <label>Description</label>
                    <textarea rows={2} value={serv.description} onChange={(e) => updateService(index, 'description', e.target.value)} />
                  </div>
                </div>
              ))}
              <button className="admin-add-btn" onClick={addService}>+ Add New Service</button>
            </div>
          )}

          {/* CONTACT TAB */}
          {activeTab === 'contact' && (
            <div>
              <div className="admin-form-group">
                <label>Contact Eyebrow</label>
                <input value={formData.contact?.eyebrow || ''} onChange={(e) => updateContactField('eyebrow', e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>Heading Line 1</label>
                <input value={formData.contact?.headingLine1 || ''} onChange={(e) => updateContactField('headingLine1', e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>Heading Line 2 (Gradient)</label>
                <input value={formData.contact?.headingLine2 || ''} onChange={(e) => updateContactField('headingLine2', e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>Contact Description</label>
                <textarea rows={3} value={formData.contact?.description || ''} onChange={(e) => updateContactField('description', e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>Email Address</label>
                <input value={formData.contact?.email || ''} onChange={(e) => updateContactField('email', e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>GitHub URL</label>
                <input value={formData.contact?.github || ''} onChange={(e) => updateContactField('github', e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>LinkedIn URL</label>
                <input value={formData.contact?.linkedin || ''} onChange={(e) => updateContactField('linkedin', e.target.value)} />
              </div>
            </div>
          )}
        </div>

        <div className="admin-footer">
          <div className="admin-footer-left">
            <button className="admin-reset-btn" onClick={handleReset}>Reset Defaults</button>
            {statusMsg && <span className="admin-toast">{statusMsg}</span>}
          </div>
          <button className="admin-save-btn" onClick={handleSave}>Save Portfolio Changes</button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
