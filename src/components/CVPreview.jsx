function formatDate(value) {
  if (!value) return 'Present';
  const [year, month] = value.split('-');
  if (!year || !month) return value;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1));
  return new Intl.DateTimeFormat('en-GB', {
    month: 'short', year: 'numeric', timeZone: 'UTC',
  }).format(date);
}

function formatDateRange(startDate, endDate) {
  return `${formatDate(startDate)} – ${formatDate(endDate)}`;
}

export default function CVPreview({ generalInfo, education, experience, cvConfig }) {
  const sortedEducation = education
    .filter((entry) => !entry.hidden)
    .sort((a, b) => b.startDate.localeCompare(a.startDate));
  const sortedExperience = experience
    .filter((entry) => !entry.hidden)
    .sort((a, b) => b.startDate.localeCompare(a.startDate));

  return (
    <article className="cv-preview" aria-label="CV preview">
      <header className="cv-document-header"
        style={{ textAlign: cvConfig.generalInfoAlignment }}>
        <h1>{generalInfo.name || 'Your Name'}</h1>
        {(generalInfo.email || generalInfo.phone) && (
          <p className="cv-contact">
            {generalInfo.email && <span>{generalInfo.email}</span>}
            {generalInfo.email && generalInfo.phone && <span className="contact-dot"> · </span>}
            {generalInfo.phone && <span>{generalInfo.phone}</span>}
          </p>
        )}
      </header>

      {/* Education appears first by default */}
      {sortedEducation.length > 0 && (
        <section className="cv-document-section">
          <h2>Education</h2>
          {sortedEducation.map((entry) => (
            <div key={entry.id} className="cv-document-entry">
              <div className="cv-entry-header">
                <div>
                  <h3>{entry.degree}</h3>
                  <p className="cv-entry-organization">{entry.school}</p>
                </div>
                <span className="cv-entry-date">
                  {formatDateRange(entry.startDate, entry.endDate)}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {sortedExperience.length > 0 && (
        <section className="cv-document-section">
          <h2>Professional Experience</h2>
          {sortedExperience.map((entry) => (
            <div key={entry.id} className="cv-document-entry">
              <div className="cv-entry-header">
                <div>
                  <h3>{entry.position}</h3>
                  <p className="cv-entry-organization">{entry.company}</p>
                </div>
                <span className="cv-entry-date">
                  {formatDateRange(entry.startDate, entry.endDate)}
                </span>
              </div>
              {entry.description && <p className="cv-entry-description">{entry.description}</p>}
            </div>
          ))}
        </section>
      )}
    </article>
  );
}
