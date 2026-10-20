import { useState } from 'react';

export default function GeneralInfo({ generalInfo, handleChange }) {
  const [isEditing, setIsEditing] = useState(true);

  function handleSubmit(event) {
    event.preventDefault();
    setIsEditing(false);
  }

  return (
    <section className="general-info" aria-labelledby="general-info-heading">
      <h2 id="general-info-heading">General Information</h2>
      {isEditing ? (
        <form className="general-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="general-name">Name</label>
            <input id="general-name" type="text" name="name"
              value={generalInfo.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="general-email">Email</label>
            <input id="general-email" type="email" name="email"
              value={generalInfo.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="general-phone">Phone</label>
            <input id="general-phone" type="tel" name="phone"
              value={generalInfo.phone} onChange={handleChange} />
          </div>
          <button type="submit" className="primary-button">Submit</button>
        </form>
      ) : (
        <div className="general-details">
          <p><strong>Name:</strong> {generalInfo.name || '—'}</p>
          <p><strong>Email:</strong> {generalInfo.email || '—'}</p>
          <p><strong>Phone:</strong> {generalInfo.phone || '—'}</p>
          <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </section>
  );
}
