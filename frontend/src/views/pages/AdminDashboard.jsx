// frontend/src/views/pages/AdminDashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth }                                  from '../../controllers/useAuth';
import { useOngoingProjects, useCompletedProjects } from '../../controllers/useProjects';
import { useProperties }                            from '../../controllers/useProperties';
import { useClients }                               from '../../controllers/useClients';
import { useGallery }                               from '../../controllers/useGallery';
import '../../styles/AdminDashboard.css';

// ── Icons ─────────────────────────────────────────────────────────────────────
const Icon = ({ name }) => {
  const icons = {
    ongoing:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    completed:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    properties: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    clients:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    gallery:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
    logout:     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    site:       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    plus:       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    edit:       <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    trash:      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
    undo:       <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>,
    map:        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    building:   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    close:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    warn:       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    star:       <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 10.26 24 10.27 17.18 16.7 20.31 24.96 12 18.54 3.69 24.96 6.82 16.7 0 10.27 8.91 10.26 12 2"/></svg>,
  };
  return icons[name] || null;
};

// ── Toast ─────────────────────────────────────────────────────────────────────
const Toast = ({ toast }) => {
  if (!toast) return null;
  return (
    <div className={`toast toast-${toast.type}`}>
      <span className="toast-icon">{toast.type === 'success' ? '✓' : '✕'}</span>
      <span>{toast.msg}</span>
    </div>
  );
};

// ── Confirm Modal ─────────────────────────────────────────────────────────────
const ConfirmModal = ({ message, onConfirm, onCancel }) => (
  <div className="modal-overlay" onClick={onCancel}>
    <div className="modal-content confirm-modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <div className="modal-header-icon warn-icon"><Icon name="warn" /></div>
        <h2>Confirm Delete</h2>
        <button className="close-btn" onClick={onCancel}><Icon name="close" /></button>
      </div>
      <div className="modal-form">
        <p className="confirm-msg">{message}</p>
      </div>
      <div className="modal-actions">
        <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        <button className="delete-btn" onClick={onConfirm}>Yes, Delete</button>
      </div>
    </div>
  </div>
);

// ── Form Modal ────────────────────────────────────────────────────────────────
const Modal = ({ title, onClose, onSave, saving, children }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h2>{title}</h2>
        <button className="close-btn" onClick={onClose}><Icon name="close" /></button>
      </div>
      <div className="modal-form">{children}</div>
      <div className="modal-actions">
        <button className="cancel-btn" onClick={onClose} disabled={saving}>Cancel</button>
        <button className="save-btn"   onClick={onSave}  disabled={saving}>
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  </div>
);

// ── Shared hook for toast + confirm ──────────────────────────────────────────
function useToastConfirm() {
  const [toast,   setToast]   = useState(null);
  const [confirm, setConfirm] = useState(null);

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const askConfirm = useCallback((message) =>
    new Promise((resolve) => {
      setConfirm({
        message,
        onConfirm: () => { setConfirm(null); resolve(true);  },
        onCancel:  () => { setConfirm(null); resolve(false); },
      });
    }), []);

  return { toast, confirm, showToast, askConfirm };
}

// ── Reusable field renderer ───────────────────────────────────────────────────
const FormField = ({ field, value, onChange }) => {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Create a unique filename
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `images/${fileName}`);
      
      // Upload the file
      await uploadBytes(storageRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      
      // Set the URL as the value
      onChange(downloadURL);
    } catch (error) {
      console.error('File upload failed:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  return (
    <div className="form-group">
      <label>
        {field.label}
        {field.required && <span className="required-star">*</span>}
      </label>

      {field.type === 'select' ? (
        <select value={value || ''} onChange={(e) => onChange(e.target.value)}>
          {field.options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          placeholder={field.placeholder || ''}
        />
      ) : field.type === 'file' ? (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          placeholder={field.placeholder || ''}
        />
      ) : (
        <input
          type={field.type || 'text'}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder || ''}
        />
      )}

      {field.preview && value && (
        <div className="image-preview">
          <img src={value} alt="preview" onError={(e) => { e.target.style.display = 'none'; }} />
        </div>
      )}
    </div>
  );
};

// ── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, accent }) => (
  <div className="stat-card" style={{ '--accent': accent }}>
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);

// ── Ongoing Projects Tab ──────────────────────────────────────────────────────
const OngoingTab = () => {
  const { projects, loading, error, createProject, updateProject, deleteProject } = useOngoingProjects();
  const { toast, confirm, showToast, askConfirm } = useToastConfirm();
  const [modal,    setModal]    = useState(null);
  const [selected, setSelected] = useState(null);
  const [saving,   setSaving]   = useState(false);
  const [form, setForm] = useState({
    title: '', location: '', possession: '', rera: '',
    status: 'Under Construction', image: '', map_url: '',
  });

  const EMPTY = { title: '', location: '', possession: '', rera: '', status: 'Under Construction', image: '', map_url: '' };

  const openAdd  = () => { setForm(EMPTY); setModal('add'); };
  const openEdit = (p) => { setSelected(p); setForm({ ...p }); setModal('edit'); };
  const closeModal = () => { if (!saving) { setModal(null); setSelected(null); } };
  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = async () => {
    if (!form.title.trim()) { showToast('Title is required.', 'error'); return; }
    setSaving(true);
    try {
      if (modal === 'add')  await createProject(form);
      if (modal === 'edit') await updateProject(selected.id, form);
      closeModal();
      showToast(modal === 'add' ? 'Project added!' : 'Project updated!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    const ok = await askConfirm(`Delete "${title}"? This cannot be undone.`);
    if (!ok) return;
    try {
      await deleteProject(id);
      showToast('Project deleted.');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const fields = [
    { key: 'title',      label: 'Project Title',   required: true },
    { key: 'location',   label: 'Location' },
    { key: 'possession', label: 'Possession Date',  placeholder: 'e.g. Dec 2025' },
    { key: 'rera',       label: 'RERA Number' },
    { key: 'status',     label: 'Status', type: 'select', options: [
        { value: 'Under Construction', label: 'Under Construction' },
        { value: 'Ready to Move',      label: 'Ready to Move'      },
        { value: 'Launching Soon',     label: 'Launching Soon'     },
      ]},
    { key: 'image',   label: 'Choose Image',   type: 'file', preview: true },
    { key: 'map_url', label: 'Google Map URL' },
  ];

  const underConst = projects.filter(p => p.status === 'Under Construction').length;
  const readyMove  = projects.filter(p => p.status === 'Ready to Move').length;
  const launching  = projects.filter(p => p.status === 'Launching Soon').length;

  return (
    <div className="tab-inner">
      <Toast toast={toast} />
      {confirm && <ConfirmModal {...confirm} />}

      <div className="tab-top-bar">
        <div className="stats-row">
          <StatCard label="Total"              value={projects.length} accent="#4f46e5" />
          <StatCard label="Under Construction" value={underConst}      accent="#f59e0b" />
          <StatCard label="Ready to Move"      value={readyMove}       accent="#10b981" />
          <StatCard label="Launching Soon"     value={launching}       accent="#6366f1" />
        </div>
        <button className="add-btn" onClick={openAdd}>
          <Icon name="plus" /> Add Project
        </button>
      </div>

      {error && <div className="error-banner">⚠ {error}</div>}
      {loading ? (
        <div className="loading-state">Loading projects…</div>
      ) : projects.length === 0 ? (
        <div className="empty-state">No ongoing projects yet. Click "Add Project" to create one.</div>
      ) : (
        <div className="cards-grid">
          {projects.map((p) => (
            <div className="project-card" key={p.id}>
              <div className="card-image-wrap">
                {p.image
                  ? <img src={p.image} alt={p.title} onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'; }} />
                  : <div className="card-img-placeholder"><Icon name="building" /></div>
                }
                {p.status && <span className={`status-badge status-${p.status.toLowerCase().replace(/\s+/g, '-')}`}>{p.status}</span>}
              </div>
              <div className="card-body">
                <h3 className="card-title">{p.title}</h3>
                <div className="card-meta">
                  {p.location   && <span className="meta-item"><strong>Location</strong>{p.location}</span>}
                  {p.possession && <span className="meta-item"><strong>Possession</strong>{p.possession}</span>}
                  {p.rera       && <span className="meta-item"><strong>RERA</strong>{p.rera}</span>}
                  {p.map_url    && <span className="map-chip"><Icon name="map" /> Map</span>}
                </div>
              </div>
              <div className="card-footer">
                <button className="btn-edit"   onClick={() => openEdit(p)}><Icon name="edit" /> Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(p.id, p.title)}><Icon name="trash" /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal
          title={modal === 'add' ? 'Add Ongoing Project' : 'Edit Ongoing Project'}
          onClose={closeModal} onSave={handleSave} saving={saving}
        >
          {fields.map((f) => <FormField key={f.key} field={f} value={form[f.key]} onChange={set(f.key)} />)}
        </Modal>
      )}
    </div>
  );
};

// ── Completed Projects Tab ────────────────────────────────────────────────────
const CompletedTab = () => {
  const { projects, loading, error, createProject, updateProject, deleteProject } = useCompletedProjects();
  const { toast, confirm, showToast, askConfirm } = useToastConfirm();
  const [modal,    setModal]    = useState(null);
  const [selected, setSelected] = useState(null);
  const [saving,   setSaving]   = useState(false);
  const [form, setForm] = useState({ title: '', location: '', year: '', description: '', image: '', map_url: '' });

  const EMPTY = { title: '', location: '', year: '', description: '', image: '', map_url: '' };

  const openAdd  = () => { setForm(EMPTY); setModal('add'); };
  const openEdit = (p) => { setSelected(p); setForm({ ...p }); setModal('edit'); };
  const closeModal = () => { if (!saving) { setModal(null); setSelected(null); } };
  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = async () => {
    if (!form.title.trim()) { showToast('Title is required.', 'error'); return; }
    setSaving(true);
    try {
      if (modal === 'add')  await createProject(form);
      if (modal === 'edit') await updateProject(selected.id, form);
      closeModal();
      showToast(modal === 'add' ? 'Project added!' : 'Project updated!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    const ok = await askConfirm(`Delete "${title}"? This cannot be undone.`);
    if (!ok) return;
    try {
      await deleteProject(id);
      showToast('Project deleted.');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const fields = [
    { key: 'title',       label: 'Project Title', required: true },
    { key: 'location',    label: 'Location' },
    { key: 'year',        label: 'Year Completed', placeholder: 'e.g. 2022' },
    { key: 'image',       label: 'Choose Image',      type: 'file', preview: true },
    { key: 'map_url',     label: 'Google Map URL' },
    { key: 'description', label: 'Description',   type: 'textarea' },
  ];

  return (
    <div className="tab-inner">
      <Toast toast={toast} />
      {confirm && <ConfirmModal {...confirm} />}

      <div className="tab-top-bar">
        <div className="stats-row">
          <StatCard label="Total Completed" value={projects.length} accent="#10b981" />
        </div>
        <button className="add-btn" onClick={openAdd}><Icon name="plus" /> Add Project</button>
      </div>

      {error && <div className="error-banner">⚠ {error}</div>}
      {loading ? (
        <div className="loading-state">Loading projects…</div>
      ) : projects.length === 0 ? (
        <div className="empty-state">No completed projects yet. Click "Add Project" to create one.</div>
      ) : (
        <div className="cards-grid">
          {projects.map((p) => (
            <div className="project-card" key={p.id}>
              <div className="card-image-wrap">
                {p.image
                  ? <img src={p.image} alt={p.title} onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'; }} />
                  : <div className="card-img-placeholder"><Icon name="building" /></div>
                }
                {p.year && <span className="status-badge status-completed">{p.year}</span>}
              </div>
              <div className="card-body">
                <h3 className="card-title">{p.title}</h3>
                <div className="card-meta">
                  {p.location    && <span className="meta-item"><strong>Location</strong>{p.location}</span>}
                  {p.description && <span className="meta-desc">{p.description}</span>}
                  {p.map_url     && <span className="map-chip"><Icon name="map" /> Map</span>}
                </div>
              </div>
              <div className="card-footer">
                <button className="btn-edit"   onClick={() => openEdit(p)}><Icon name="edit" /> Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(p.id, p.title)}><Icon name="trash" /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal
          title={modal === 'add' ? 'Add Completed Project' : 'Edit Completed Project'}
          onClose={closeModal} onSave={handleSave} saving={saving}
        >
          {fields.map((f) => <FormField key={f.key} field={f} value={form[f.key]} onChange={set(f.key)} />)}
        </Modal>
      )}
    </div>
  );
};

// ── Properties Tab ────────────────────────────────────────────────────────────
const TYPE_MAP = {
  commercial:  ['sale', 'resale'],
  residential: ['sale', 'resale'],
  plotting:    ['all'],
};
const CATEGORIES = Object.keys(TYPE_MAP);

const PropertiesTab = ({ initialCategory }) => {
  const [filterCategory, setFilterCategory] = useState(initialCategory || 'commercial');
  const [filterType,     setFilterType]     = useState(TYPE_MAP[initialCategory || 'commercial'][0]);
  const { properties, loading, error, createProperty, updateProperty, deleteProperty } =
    useProperties(filterCategory, filterType);

  useEffect(() => {
    const category = initialCategory || 'commercial';
    setFilterCategory(category);
    setFilterType(TYPE_MAP[category][0]);
  }, [initialCategory]);
  const { toast, confirm, showToast, askConfirm } = useToastConfirm();
  const [modal,    setModal]    = useState(null);
  const [selected, setSelected] = useState(null);
  const [saving,   setSaving]   = useState(false);
  const [form, setForm] = useState({
    title: '', category: 'commercial', type: 'sale',
    location: '', price: '', area: '', description: '', image: '', map_url: '',
  });

  const EMPTY = { title: '', category: filterCategory, type: filterType, location: '', price: '', area: '', description: '', image: '', map_url: '' };

  const openAdd  = () => { setForm(EMPTY); setModal('add'); };
  const openEdit = (p) => { setSelected(p); setForm({ ...p }); setModal('edit'); };
  const closeModal = () => { if (!saving) { setModal(null); setSelected(null); } };
  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = async () => {
    if (!form.title.trim()) { showToast('Title is required.', 'error'); return; }
    if (!form.price)        { showToast('Price is required.', 'error'); return; }
    setSaving(true);
    try {
      if (modal === 'add')  await createProperty(form);
      if (modal === 'edit') await updateProperty(selected.id, form);
      closeModal();
      showToast(modal === 'add' ? 'Property added!' : 'Property updated!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    const ok = await askConfirm(`Delete "${title}"? This cannot be undone.`);
    if (!ok) return;
    try {
      await deleteProperty(id);
      showToast('Property deleted.');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const fields = [
    { key: 'title',       label: 'Title',       required: true },
    { key: 'location',    label: 'Location' },
    { key: 'price',       label: 'Price (₹)',    required: true, placeholder: 'e.g. 45,00,000' },
    { key: 'area',        label: 'Area',         placeholder: 'e.g. 1200 sq.ft' },
    { key: 'image',       label: 'Choose Image',    type: 'file', preview: true },
    { key: 'map_url',     label: 'Google Map URL' },
    { key: 'description', label: 'Description',  type: 'textarea' },
    {
      key: 'category', label: 'Category', type: 'select',
      options: CATEGORIES.map(c => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) })),
    },
    {
      key: 'type', label: 'Type', type: 'select',
      options: (TYPE_MAP[form.category] || ['all']).map(t => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) })),
    },
  ];

  return (
    <div className="tab-inner">
      <Toast toast={toast} />
      {confirm && <ConfirmModal {...confirm} />}

      <div className="tab-top-bar">
        <div className="stats-row">
          <StatCard label="Total" value={properties.length} accent="#4f46e5" />
        </div>
        {TYPE_MAP[filterCategory].length > 1 && (
          <div className="filter-chip-group">
            <span className="filter-group-label">Type</span>
            {TYPE_MAP[filterCategory].map((t) => (
              <button
                key={t}
                className={`filter-chip ${filterType === t ? 'active' : ''}`}
                onClick={() => setFilterType(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        )}
        <button className="add-btn" onClick={openAdd}><Icon name="plus" /> Add Property</button>
      </div>

      {error && <div className="error-banner">⚠ {error}</div>}
      {loading ? (
        <div className="loading-state">Loading properties…</div>
      ) : properties.length === 0 ? (
        <div className="empty-state">No {filterCategory} properties for "{filterType}". Click "Add Property" to create one.</div>
      ) : (
        <div className="cards-grid">
          {properties.map((p) => (
            <div className="project-card" key={p.id}>
              <div className="card-image-wrap">
                {p.image
                  ? <img src={p.image} alt={p.title} onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'; }} />
                  : <div className="card-img-placeholder"><Icon name="building" /></div>
                }
                <span className="status-badge status-property">{p.category} / {p.type}</span>
              </div>
              <div className="card-body">
                <h3 className="card-title">{p.title}</h3>
                <div className="card-meta">
                  {p.location && <span className="meta-item"><strong>Location</strong>{p.location}</span>}
                  {p.price    && <span className="meta-item price-tag"><strong>Price</strong>₹{p.price}</span>}
                  {p.area     && <span className="meta-item"><strong>Area</strong>{p.area}</span>}
                  {p.map_url  && <span className="map-chip"><Icon name="map" /> Map</span>}
                </div>
              </div>
              <div className="card-footer">
                <button className="btn-edit"   onClick={() => openEdit(p)}><Icon name="edit" /> Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(p.id, p.title)}><Icon name="trash" /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal
          title={modal === 'add' ? 'Add Property' : 'Edit Property'}
          onClose={closeModal} onSave={handleSave} saving={saving}
        >
          {fields.map((f) => <FormField key={f.key} field={f} value={form[f.key]} onChange={set(f.key)} />)}
        </Modal>
      )}
    </div>
  );
};

// ── Clients Tab ───────────────────────────────────────────────────────────────
const ClientsTab = () => {
  const { clients, loading, error, createClient, updateClient, deleteClient } = useClients();
  const { toast, confirm, showToast, askConfirm } = useToastConfirm();
  const [modal,    setModal]    = useState(null);
  const [selected, setSelected] = useState(null);
  const [saving,   setSaving]   = useState(false);
  const [form, setForm] = useState({ name: '', logo: '', testimonial: '', years_with_us: '', rating: 5 });

  const EMPTY = { name: '', logo: '', testimonial: '', years_with_us: '', rating: 5 };

  const openAdd  = () => { setForm(EMPTY); setModal('add'); };
  const openEdit = (c) => { setSelected(c); setForm({ ...c }); setModal('edit'); };
  const closeModal = () => { if (!saving) { setModal(null); setSelected(null); } };
  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = async () => {
    if (!form.name.trim()) { showToast('Client name is required.', 'error'); return; }
    setSaving(true);
    try {
      if (modal === 'add')  await createClient(form);
      if (modal === 'edit') await updateClient(selected.id, form);
      closeModal();
      showToast(modal === 'add' ? 'Client added!' : 'Client updated!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    const ok = await askConfirm(`Delete client "${name}"? This cannot be undone.`);
    if (!ok) return;
    try {
      await deleteClient(id);
      showToast('Client deleted.');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const fields = [
    { key: 'name',         label: 'Client Name',   required: true },
    { key: 'logo',         label: 'Choose Logo',       type: 'file', preview: true },
    { key: 'years_with_us',label: 'Years With Us',  placeholder: 'e.g. 5 years' },
    { key: 'rating',       label: 'Rating',         type: 'number', min: 1, max: 5, placeholder: '1-5 stars' },
    { key: 'testimonial',  label: 'Testimonial',    type: 'textarea' },
  ];

  return (
    <div className="tab-inner">
      <Toast toast={toast} />
      {confirm && <ConfirmModal {...confirm} />}

      <div className="tab-top-bar">
        <div className="stats-row">
          <StatCard label="Total Clients" value={clients.length} accent="#4f46e5" />
        </div>
        <button className="add-btn" onClick={openAdd}><Icon name="plus" /> Add Client</button>
      </div>

      {error && <div className="error-banner">⚠ {error}</div>}
      {loading ? (
        <div className="loading-state">Loading clients…</div>
      ) : clients.length === 0 ? (
        <div className="empty-state">No clients yet. Click "Add Client" to add one.</div>
      ) : (
        <div className="cards-grid">
          {clients.map((c) => (
            <div className="project-card client-card" key={c.id}>
              <div className="client-logo-wrap">
                {c.logo
                  ? <img src={c.logo} alt={c.name} className="client-logo" onError={(e) => { e.target.style.display = 'none'; }} />
                  : <div className="client-initials">{c.name.charAt(0).toUpperCase()}</div>
                }
              </div>
              <div className="card-body">
                <h3 className="card-title">{c.name}</h3>
                <div className="card-meta">
                  {c.years_with_us && <span className="meta-item"><strong>Since</strong>{c.years_with_us}</span>}
                  {c.rating && (
                    <span className="meta-item rating-item">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ color: i < c.rating ? '#fbbf24' : '#d1d5db', marginRight: '2px' }}>
                          ★
                        </span>
                      ))}
                      <span style={{ marginLeft: '4px', fontSize: '0.9em' }}>({c.rating}/5)</span>
                    </span>
                  )}
                  {c.testimonial   && <span className="meta-desc testimonial">"{c.testimonial}"</span>}
                </div>
              </div>
              <div className="card-footer">
                <button className="btn-edit"   onClick={() => openEdit(c)}><Icon name="edit" /> Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(c.id, c.name)}><Icon name="trash" /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal
          title={modal === 'add' ? 'Add Client' : 'Edit Client'}
          onClose={closeModal} onSave={handleSave} saving={saving}
        >
          {fields.map((f) => <FormField key={f.key} field={f} value={form[f.key]} onChange={set(f.key)} />)}
        </Modal>
      )}
    </div>
  );
};

// ── Gallery Tab ───────────────────────────────────────────────────────────────
const GalleryTab = () => {
  const { images, loading, error, createImage, updateImage, deleteImage } = useGallery();
  const { toast, confirm, showToast, askConfirm } = useToastConfirm();
  const [modal,    setModal]    = useState(null);
  const [selected, setSelected] = useState(null);
  const [saving,   setSaving]   = useState(false);
  const [form, setForm] = useState({ src: '', alt: '', title: '', description: '', category: '' });

  const EMPTY = { src: '', alt: '', title: '', description: '', category: '' };

  const openAdd  = () => { setForm(EMPTY); setModal('add'); };
  const openEdit = (img) => { setSelected(img); setForm({ ...img }); setModal('edit'); };
  const closeModal = () => { if (!saving) { setModal(null); setSelected(null); } };
  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = async () => {
    if (!form.src.trim()) { showToast('Image URL is required.', 'error'); return; }
    setSaving(true);
    try {
      if (modal === 'add')  await createImage(form);
      if (modal === 'edit') await updateImage(selected.id, form);
      closeModal();
      showToast(modal === 'add' ? 'Image added!' : 'Image updated!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    const ok = await askConfirm(`Delete "${title || 'this image'}"? This cannot be undone.`);
    if (!ok) return;
    try {
      await deleteImage(id);
      showToast('Image deleted.');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const fields = [
    { key: 'src',         label: 'Choose Image',   type: 'file', required: true, preview: true },
    { key: 'title',       label: 'Title' },
    { key: 'alt',         label: 'Alt Text',     placeholder: 'Describe the image' },
    { key: 'category',    label: 'Category',     placeholder: 'e.g. Residential, Commercial' },
    { key: 'description', label: 'Description',  type: 'textarea' },
  ];

  return (
    <div className="tab-inner">
      <Toast toast={toast} />
      {confirm && <ConfirmModal {...confirm} />}

      <div className="tab-top-bar">
        <div className="stats-row">
          <StatCard label="Total Images" value={images.length} accent="#6366f1" />
        </div>
        <button className="add-btn" onClick={openAdd}><Icon name="plus" /> Add Image</button>
      </div>

      {error && <div className="error-banner">⚠ {error}</div>}
      {loading ? (
        <div className="loading-state">Loading gallery…</div>
      ) : images.length === 0 ? (
        <div className="empty-state">No gallery images yet. Click "Add Image" to upload one.</div>
      ) : (
        <div className="gallery-grid">
          {images.map((img) => (
            <div className="gallery-card" key={img.id}>
              <img
                src={img.src || null}
                alt={img.alt}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
              />
              <div className="gallery-overlay">
                <span className="gallery-title">{img.title || img.alt || 'Untitled'}</span>
                {img.category && <span className="gallery-cat">{img.category}</span>}
                <div className="gallery-actions">
                  <button className="btn-edit"   onClick={() => openEdit(img)}><Icon name="edit" /> Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(img.id, img.title)}><Icon name="trash" /> Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal
          title={modal === 'add' ? 'Add Gallery Image' : 'Edit Gallery Image'}
          onClose={closeModal} onSave={handleSave} saving={saving}
        >
          {fields.map((f) => <FormField key={f.key} field={f} value={form[f.key]} onChange={set(f.key)} />)}
        </Modal>
      )}
    </div>
  );
};

// ── Sidebar Nav Config ────────────────────────────────────────────────────────
const NAV_GROUPS = [
  {
    label: 'Projects',
    items: [
      { key: 'ongoing',    label: 'Ongoing',    icon: 'ongoing'    },
      { key: 'completed',  label: 'Completed',  icon: 'completed'  },
    ],
  },
  {
    label: 'Listings',
    items: [
      { key: 'commercial',  label: 'Commercial',  icon: 'properties' },
      { key: 'residential', label: 'Residential', icon: 'properties' },
      { key: 'plotting',    label: 'Plotting',    icon: 'properties' },
    ],
  },
  {
    label: 'People & Media',
    items: [
      { key: 'clients',    label: 'Clients',    icon: 'clients'    },
      { key: 'gallery',    label: 'Gallery',    icon: 'gallery'    },
    ],
  },
];

const PAGE_LABELS = {
  ongoing:      'Ongoing Projects',
  completed:    'Completed Projects',
  commercial:   'Commercial Properties',
  residential:  'Residential Properties',
  plotting:     'Plotting Properties',
  clients:      'Clients',
  gallery:      'Gallery',
};

// ── Main AdminDashboard ───────────────────────────────────────────────────────
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="admin-shell">

      {/* ── Sidebar ── */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark" />
          <span className="brand-name">Admin</span>
        </div>

        <nav className="sidebar-nav">
          {NAV_GROUPS.map((group) => (
            <div className="nav-group" key={group.label}>
              <span className="nav-group-label">{group.label}</span>
              {group.items.map((item) => (
                <button
                  key={item.key}
                  className={`nav-item ${activeTab === item.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.key)}
                >
                  <span className="nav-item-icon"><Icon name={item.icon} /></span>
                  <span className="nav-item-label">{item.label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="user-avatar">{(user?.email || 'A').charAt(0).toUpperCase()}</div>
            <span className="user-email">{user?.email || 'Admin'}</span>
          </div>
        </div>
      </aside>

      {/* ── Main Area ── */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div className="topbar-left">
            <h1 className="page-title">{PAGE_LABELS[activeTab]}</h1>
          </div>
          <div className="topbar-right">
            <button className="topbar-btn" onClick={() => navigate('/')}>
              <Icon name="site" /> View Site
            </button>
            <button className="topbar-btn danger" onClick={logout}>
              <Icon name="logout" /> Logout
            </button>
          </div>
        </header>

        <div className="admin-content">
          {activeTab === 'ongoing'      && <OngoingTab />}
          {activeTab === 'completed'    && <CompletedTab />}
          {(activeTab === 'commercial' || activeTab === 'residential' || activeTab === 'plotting') && (
            <PropertiesTab initialCategory={activeTab} />
          )}
          {activeTab === 'clients'      && <ClientsTab />}
          {activeTab === 'gallery'      && <GalleryTab />}
        </div>
      </main>

    </div>
  );
};

export default AdminDashboard;