// src/pages/FounderPage.js
import React from 'react';
import '../FounderPage.css';
import { useParams, Link } from 'react-router-dom';
import { companies } from '../data/sampleData';

function FounderPage() {
  const { founderName } = useParams();
  const decodedName = decodeURIComponent(founderName);

  let founderData = null;
  let parentCompany = '';

  for (const company of companies) {
    const data = company['linkedin-data']?.[decodedName];
    if (data) {
      founderData = data;
      parentCompany = company['company-name'];
      break;
    }
  }

  if (!founderData) {
    return (
      <div className="founder-container fade-slide">
        <h1 className="founder-title">Founder not found!</h1>
        <Link to="/" className="founder-btn">Go Back</Link>
      </div>
    );
  }

  const experiences = founderData.Experience || [];

  return (
    <div className="founder-container fade-slide">
      <h1 className="founder-title">{decodedName} ({parentCompany})</h1>
      <p className="founder-bio">{founderData.Bio}</p>

      <h2 className="founder-section-title">Experience</h2>
      <div className="founder-experience-list">
        {experiences.map((exp, idx) => (
          <div key={idx} className="founder-experience-card">
            <h3 className="founder-experience-role">
              {exp.Role || 'Role Not Found'}
            </h3>
            <p className="founder-experience-company">
              {exp.Company || 'Company Not Found'}
            </p>
            <p className="founder-experience-date">
              {exp.Date || 'Date Not Found'}
            </p>
            {exp.Description && (
              <p className="founder-experience-desc">{exp.Description}</p>
            )}
          </div>
        ))}
      </div>

      {founderData.Education && (
        <>
          <h2 className="founder-section-title">Education</h2>
          <p className="founder-education">
            {founderData.Education.Institute} -{' '}
            {founderData.Education.Degree} ({founderData.Education.Date})
          </p>
        </>
      )}

      <Link to="/" className="founder-btn">
        Back to Home
      </Link>
    </div>
  );
}

export default FounderPage;