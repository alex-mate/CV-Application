import { useState } from "react";

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

  function handleSubmit(event) {
    event.preventDefault();
    const entry = {
      ...draft,
      company: draft.company.trim(),
      position: draft.position.trim(),
      description: draft.description.trim(),
      id: editingId ?? crypto.randomUUID(),
    };
    if (!entry.company || !entry.position) return;
    setExperience((previous) => editingId === null
      ? [...previous, entry]
      : previous.map((item) => item.id === editingId ? entry : item));
    closeForm();
  }

    function handleEdit(entry) {
      setDraft(entry);
      setEditingId(entry.id);
    }   

    function handleDelete(id) {
      setExperience((previous) => previous.filter((entry) => entry.id !== id));
      if (editingId === id) closeForm();
    }

  return (
    <section className="experience" aria-labelledby="experience-heading">
      <h2 id="experience-heading">Experience</h2>
      {experience.length === 0 && <p>No experience added yet.</p>}
      <ul className="experience-list">
        {experience.map((entry) => (
          <li key={entry.id} className="experience-entry">
            <div>
              <h3>{entry.company}</h3>
              <p>{entry.position}</p>
              <p>{entry.startDate} – {entry.endDate || 'Present'}</p>
              <p>{entry.description}</p>
            </div>
            <div className="experience-actions">
              <button type="button" onClick={() => handleEdit(entry)} disabled={draft !== null}
                aria-label={`Edit ${entry.company}`}>Edit</button>
              <button type="button" onClick={() => handleDelete(entry.id)}
                aria-label={`Delete ${entry.company}`}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {draft !== null && (
        <form className="experience-form" onSubmit={handleSubmit}>
          <h3>{editingId === null ? 'Add Experience' : 'Edit Experience'}</h3>
          <label>
            Company:
            <input type="text" name="company" value={draft.company} onChange={handleChange} required />
          </label>
          <label>
            Position:
            <input type="text" name="position" value={draft.position} onChange={handleChange} required />
          </label>
          <label>
            Start Date:
            <input type="month" name="startDate" value={draft.startDate} onChange={handleChange} required />
          </label>
          <label>
            End Date:
            <input type="month" name="endDate" value={draft.endDate} onChange={handleChange} />
          </label>
          <label>
            Description:
            <textarea name="description" value={draft.description} onChange={handleChange}></textarea>
          </label>
          <button type="submit">{editingId === null ? 'Add' : 'Save'}</button>
          <button type="button" onClick={closeForm}>Cancel</button>
        </form>
      )}
      {draft === null && (
        <button type="button" onClick={() => setDraft({ company: '', position: '', startDate: '', endDate: '', description: '' })}>
          Add Experience
        </button>
      )}
    </section>
  );
}
