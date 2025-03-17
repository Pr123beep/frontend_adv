// src/pages/HomePage.js
import React from 'react';
import './HomePage.css'; // Page-specific CSS
import { companies } from '../data/sampleData';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-container fade-in-up">
      <h1 className="home-title">Welcome, Investor!</h1>
      <p className="home-subtitle">
        Explore companies and their founders below.
      </p>

      {companies.map((company, idx) => (
        <div key={idx} className="home-card">
          <h2 className="home-card-title">{company['company-name']}</h2>
          <p className="home-card-founders">
            Founders:{' '}
            {company['founder-names']
              ? company['founder-names'].join(', ')
              : 'No founders found'}
          </p>
          <Link
            to={`/company/${encodeURIComponent(company['company-name'])}`}
            className="home-btn"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
