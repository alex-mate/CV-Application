import { useState } from 'react';

const emptyExperience = {
  company: '', position: '', startDate: '', endDate: '', description: '', hidden: false,
};

export default function Experience({ experience, setExperience }) {
  const [draft, setDraft] = useState(null);
  const [editingId, setEditingId] = useState(null);

  function closeForm() {
    setDraft(null);
    setEditingId(null);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setDraft((previous) => ({ ...previous, [name]: value }));
  }

  function handleAdd() {
    setEditingId(null);
    setDraft({ ...emptyExperience });
  }

  function handleEdit(entry) {
    setEditingId(entry.id);
    setDraft({ ...entry });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const entry = {
      ...draft,
      company: draft.company.trim(),
      position: draft.position.trim(),
      description: draft.description.trim(),
      id: editingId ?? crypto.randomUUID(),
    };
    if (!entry.company || !entry.position || !entry.startDate) return;
    if (entry.endDate && entry.endDate < entry.startDate) return;
    setExperience((previous) => editingId === null
      ? [...previous, entry]
      : previous.map((item) => item.id === editingId ? entry : item)
    );
    closeForm();
  }

  function handleDelete(id) {
    setExperience((previous) => previous.filter((entry) => entry.id !== id));
    if (editingId === id) closeForm();
  }

  function handleToggleVisibility(id) {
    setExperience((previous) => previous.map((entry) =>
      entry.id === id ? { ...entry, hidden: !entry.hidden } : entry
    ));
  }

  return (
    <section className="experience" aria-label="Experience entries">
      {experience.length === 0 && <p className="empty-message">No experience added yet.</p>}
      <ul className="experience-list entry-list">
        {experience.map((entry) => (
          <li key={entry.id} className={`experience-entry entry-card${entry.hidden ? ' is-hidden' : ''}`}>
            <div className="entry-details">
              <h3>{entry.company}</h3>
              <p>{entry.position}</p>
              <p>{entry.startDate} – {entry.endDate || 'Present'}</p>
              {entry.description && <p className="entry-description">{entry.description}</p>}
              {entry.hidden && <span className="hidden-label">Hidden from CV</span>}
            </div>
            <div className="experience-actions entry-actions">
              <button type="button" onClick={() => handleEdit(entry)} disabled={draft !== null}>Edit</button>
              <button type="button" onClick={() => handleToggleVisibility(entry.id)}
                disabled={draft !== null} aria-pressed={Boolean(entry.hidden)}
                aria-label={`${entry.hidden ? 'Show' : 'Hide'} ${entry.company} in CV`}>
                {entry.hidden ? 'Show' : 'Hide'}
              </button>
              <button type="button" className="delete-button" onClick={() => handleDelete(entry.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {draft === null ? (
        <button type="button" className="primary-button" onClick={handleAdd}>+ Add Experience</button>
      ) : (
        <form className="experience-form entry-form" onSubmit={handleSubmit}>
          <h3>{editingId === null ? 'Add Experience' : 'Edit Experience'}</h3>
          <label>Company
            <input name="company" value={draft.company} onChange={handleChange} required />
          </label>
          <label>Position
            <input name="position" value={draft.position} onChange={handleChange} required />
          </label>
          <label>Start date
            <input type="month" name="startDate" value={draft.startDate}
              onChange={handleChange} max={draft.endDate || undefined} required />
          </label>
          <label>End date (leave blank if ongoing)
            <input type="month" name="endDate" value={draft.endDate}
              onChange={handleChange} min={draft.startDate || undefined} />
          </label>
          <label>Main responsibilities
            <textarea name="description" value={draft.description}
              onChange={handleChange} rows={5}
              placeholder="Describe responsibilities and achievements..." />
          </label>
          <div className="experience-form-actions form-actions">
            <button type="submit" className="primary-button">
              {editingId === null ? 'Add Experience' : 'Save Changes'}
            </button>
            <button type="button" onClick={closeForm}>Cancel</button>
          </div>
        </form>
      )}
    </section>
  );
}
