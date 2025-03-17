// src/pages/CompanyPage.js
import React from 'react';
import './CompanyPage.css';
import { useParams, Link } from 'react-router-dom';
import { companies } from '../data/sampleData';

function CompanyPage() {
  const { companyName } = useParams();
  const decodedName = decodeURIComponent(companyName);

  // Find the relevant company data
  const company = companies.find(
    (c) => c['company-name'] === decodedName
  );

  if (!company) {
    return (
      <div className="company-container fade-in">
        <h1 className="company-title">Company not found!</h1>
        <Link to="/" className="company-btn">Go Back</Link>
      </div>
    );
  }

  const founders = company['founder-names'] || [];

  return (
    <div className="company-container fade-in">
      <h1 className="company-title">{company['company-name']}</h1>
      <p className="company-subtitle">Founders:</p>
      <div className="company-founders-list">
        {founders.length > 0 ? (
          founders.map((founder) => (
            <Link
              key={founder}
              to={`/founder/${encodeURIComponent(founder)}`}
              className="company-founder-link"
            >
              {founder}
            </Link>
          ))
        ) : (
          <p>No founders listed.</p>
        )}
      </div>
    </div>
  );
}

export default CompanyPage;
