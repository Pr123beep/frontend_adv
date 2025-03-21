// src/pages/CompanyPage.js
import React from 'react';
import '../CompanyPage.css';
import { useParams, Link } from 'react-router-dom';
import { companies } from '../data/sampleData';

function CompanyPage() {
  const { companyName } = useParams();
  const decodedName = decodeURIComponent(companyName);

  // Find the company by name.
  const company = companies.find(
    (c) => c['company-name'] === decodedName
  );

  if (!company) {
    return (
      <div className="company-container">
        <h1 className="company-title">Company not found!</h1>
        <Link to="/" className="company-btn">Go Back</Link>
      </div>
    );
  }

  // Prepare founder details.
  const foundersData = company['linkedin-data']
    ? Object.entries(company['linkedin-data']).map(([founderName, data]) => ({
        name: founderName,
        linkedIn: data['LinkedIn URL'] || '#',
        wellfound: data['Wellfound URL'] || `https://wellfound.com/search?q=${encodeURIComponent(founderName)}`,
      }))
    : [];

  return (
    <div className="company-container">
      <h1 className="company-title">{company['company-name']}</h1>
      <p className="company-subtitle">Founders:</p>
      <div className="company-founders-list">
        {foundersData.length > 0 ? (
          foundersData.map((founder, idx) => (
            <div key={idx} className="founder-card">
              <h3 className="founder-card-name">{founder.name}</h3>
              <div className="founder-links">
                {founder.linkedIn === '#' ? (
                  <Link
                    to={`/no-linkedin/${encodeURIComponent(founder.name)}`}
                    className="founder-link-btn"
                  >
                    LinkedIn
                  </Link>
                ) : (
                  <a
                    href={founder.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="founder-link-btn"
                  >
                    LinkedIn
                  </a>
                )}
                <a
                  href={founder.wellfound}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="founder-link-btn"
                >
                  Wellfound
                </a>
              </div>
              <Link
                to={`/founder/${encodeURIComponent(founder.name)}`}
                className="founder-view-btn"
              >
                View Experience
              </Link>
            </div>
          ))
        ) : (
          <p>No founders listed.</p>
        )}
      </div>
      <Link to="/" className="company-btn">
        Go Back
      </Link>
    </div>
  );
}

export default CompanyPage;
