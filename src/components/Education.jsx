import { useState } from 'react';

const emptyEducation = { school: '', degree: '', startDate: '', endDate: '' };

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

  function handleSubmit(event) {
    event.preventDefault();
    const entry = {
      ...draft,
      school: draft.school.trim(),
      degree: draft.degree.trim(),
      id: editingId ?? crypto.randomUUID(),
    };
    if (!entry.school || !entry.degree) return;
    setEducation((previous) => editingId === null
      ? [...previous, entry]
      : previous.map((item) => item.id === editingId ? entry : item));
    closeForm();
  }

  function handleEdit(entry) {
    setEditingId(entry.id);
    setDraft({ ...entry });
  }

  function handleDelete(id) {
    setEducation((previous) => previous.filter((entry) => entry.id !== id));
    if (editingId === id) closeForm();
  }

  return (
    <section className="education" aria-labelledby="education-heading">
      <h2 id="education-heading">Education</h2>
      {education.length === 0 && <p>No education added yet.</p>}
      <ul className="education-list">
        {education.map((entry) => (
          <li key={entry.id} className="education-entry">
            <div>
              <h3>{entry.school}</h3>
              <p>{entry.degree}</p>
              <p>{entry.startDate} – {entry.endDate || 'Present'}</p>
            </div>
            <div className="education-actions">
              <button type="button" onClick={() => handleEdit(entry)} disabled={draft !== null}
                aria-label={`Edit ${entry.school}`}>Edit</button>
              <button type="button" onClick={() => handleDelete(entry.id)}
                aria-label={`Delete ${entry.school}`}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {draft === null ? (
        <button type="button" onClick={() => setDraft({ ...emptyEducation })}>Add education</button>
      ) : (
        <form className="education-form" onSubmit={handleSubmit}>
          <h3>{editingId === null ? 'Add education' : 'Edit education'}</h3>
          <label htmlFor="education-school">School or university</label>
          <input id="education-school" name="school" value={draft.school}
            onChange={handleChange} required pattern={'.*\\S.*'} autoFocus />
          <label htmlFor="education-degree">Degree or course</label>
          <input id="education-degree" name="degree" value={draft.degree}
            onChange={handleChange} required pattern={'.*\\S.*'} />
          <label htmlFor="education-start">Start date</label>
          <input id="education-start" name="startDate" type="month" value={draft.startDate}
            onChange={handleChange} max={draft.endDate || undefined} required />
          <label htmlFor="education-end">End date (leave blank if ongoing)</label>
          <input id="education-end" name="endDate" type="month" value={draft.endDate}
            onChange={handleChange} min={draft.startDate || undefined} />
          <div className="education-actions">
            <button type="submit">Save education</button>
            <button type="button" onClick={closeForm}>Cancel</button>
          </div>
        </form>
      )}
    </section>
  );
}
