export default function CVPreview({ generalInfo, education, experience }) {
  return (
    <section className="cv-preview">
      <h2>CV Preview</h2>
      <div className="cv-section">
        <h3>General Information</h3>
        <p>Name: {generalInfo.name}</p>
        <p>Email: {generalInfo.email}</p>
        <p>Phone: {generalInfo.phone}</p>
      </div>
      <div className="cv-section">
        <h3>Education</h3>
        {education.length === 0 ? (
          <p>No education added yet.</p>
        ) : (
          <ul>
            {education.map((entry) => (
              <li key={entry.id}>
                {entry.school} - {entry.degree} ({entry.startDate} – {entry.endDate || 'Present'})
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="cv-section">
        <h3>Experience</h3>
        {experience.length === 0 ? (
          <p>No experience added yet.</p>
        ) : (
          <ul>
            {experience.map((entry) => (
              <li key={entry.id}>
                {entry.company} - {entry.position} ({entry.startDate} – {entry.endDate || 'Present'})
                <p>{entry.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}