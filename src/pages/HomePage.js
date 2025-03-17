// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { companies } from '../data/sampleData';

function HomePage() {
  return (
    <div className="page-container fade-in-up">
      <h1 className="page-title">Welcome !!</h1>
      <p className="page-subtitle">
        Explore companies and their founders below.
      </p>

      {companies.map((company, idx) => (
        <div key={idx} className="card-3d">
          <h2 style={{ marginBottom: '0.5rem' }}>
            {company['company-name']}
          </h2>
          <p style={{ marginBottom: '1rem', color: '#555' }}>
            Founders:{' '}
            {company['founder-names']
              ? company['founder-names'].join(', ')
              : 'No founders found'}
          </p>
          <Link
            to={`/company/${encodeURIComponent(company['company-name'])}`}
            className="btn-primary"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
