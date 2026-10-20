import { useState } from 'react';

const emptyEducation = { school: '', degree: '', startDate: '', endDate: '', hidden: false };

export default function Education({ education, setEducation }) {
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
    setDraft({ ...emptyEducation });
  }

  function handleEdit(entry) {
    setEditingId(entry.id);
    setDraft({ ...entry });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const entry = {
      ...draft,
      school: draft.school.trim(),
      degree: draft.degree.trim(),
      id: editingId ?? crypto.randomUUID(),
    };
    if (!entry.school || !entry.degree || !entry.startDate) return;
    if (entry.endDate && entry.endDate < entry.startDate) return;
    setEducation((previous) => editingId === null
      ? [...previous, entry]
      : previous.map((item) => item.id === editingId ? entry : item)
    );
    closeForm();
  }

  function handleDelete(id) {
    setEducation((previous) => previous.filter((entry) => entry.id !== id));
    if (editingId === id) closeForm();
  }

  function handleToggleVisibility(id) {
    setEducation((previous) => previous.map((entry) =>
      entry.id === id ? { ...entry, hidden: !entry.hidden } : entry
    ));
  }

  return (
    <section className="education" aria-label="Education entries">
      {education.length === 0 && <p className="empty-message">No education added yet.</p>}
      <ul className="education-list entry-list">
        {education.map((entry) => (
          <li key={entry.id} className={`education-entry entry-card${entry.hidden ? ' is-hidden' : ''}`}>
            <div className="entry-details">
              <h3>{entry.school}</h3>
              <p>{entry.degree}</p>
              <p>{entry.startDate} – {entry.endDate || 'Present'}</p>
              {entry.hidden && <span className="hidden-label">Hidden from CV</span>}
            </div>
            <div className="education-actions entry-actions">
              <button type="button" onClick={() => handleEdit(entry)} disabled={draft !== null}>Edit</button>
              <button type="button" onClick={() => handleToggleVisibility(entry.id)}
                disabled={draft !== null} aria-pressed={Boolean(entry.hidden)}
                aria-label={`${entry.hidden ? 'Show' : 'Hide'} ${entry.school} in CV`}>
                {entry.hidden ? 'Show' : 'Hide'}
              </button>
              <button type="button" className="delete-button" onClick={() => handleDelete(entry.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {draft === null ? (
        <button type="button" className="primary-button" onClick={handleAdd}>+ Add Education</button>
      ) : (
        <form className="education-form entry-form" onSubmit={handleSubmit}>
          <h3>{editingId === null ? 'Add Education' : 'Edit Education'}</h3>
          <label>School or university
            <input name="school" value={draft.school} onChange={handleChange} required />
          </label>
          <label>Degree or course
            <input name="degree" value={draft.degree} onChange={handleChange} required />
          </label>
          <label>Start date
            <input type="month" name="startDate" value={draft.startDate}
              onChange={handleChange} max={draft.endDate || undefined} required />
          </label>
          <label>End date (leave blank if ongoing)
            <input type="month" name="endDate" value={draft.endDate}
              onChange={handleChange} min={draft.startDate || undefined} />
          </label>
          <div className="education-actions form-actions">
            <button type="submit" className="primary-button">
              {editingId === null ? 'Add Education' : 'Save Changes'}
            </button>
            <button type="button" onClick={closeForm}>Cancel</button>
          </div>
        </form>
      )}
    </section>
  );
}
