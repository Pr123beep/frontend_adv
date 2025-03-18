// src/pages/HomePage.js
import React, { useState } from 'react';
import './HomePage.css'; // Page-specific CSS
import { Link } from 'react-router-dom';
import { companies } from '../data/sampleData';

/**
 * If the user typed "IIT", we transform it to "indian institute of technology".
 * Add more synonyms if needed.
 */
function transformSearchTerm(term) {
  const synonymsMap = {
    iit: 'indian institute of technology',
    // Add more synonyms if you wish:
    // 'iim': 'indian institute of management',
    // 'mmu': 'madan mohan malaviya university',
  };

  const lower = term.trim().toLowerCase();
  return synonymsMap[lower] || term;
}

function HomePage() {
  // States for multiple filters
  const [founderNameFilter, setFounderNameFilter] = useState('');
  const [instituteFilter, setInstituteFilter] = useState('');
  const [degreeFilter, setDegreeFilter] = useState('');

  /**
   * Single founder check:
   * "entry" is [founderKey, founderObj] from Object.entries(...).
   * founderKey = "Kshitij Gupta"
   * founderObj = { "LinkedIn URL": "...", "Bio": "...", "Education": {...}, ... }
   */
  function doesFounderMatch([founderKey, founderObj]) {
    let matchName = true;
    let matchInstitute = true;
    let matchDegree = true;

    // Name filter: Check the founderKey (e.g. "Kshitij Gupta")
    if (founderNameFilter.trim()) {
      const typedName = founderNameFilter.trim().toLowerCase();
      const actualName = founderKey.toLowerCase(); // e.g. "kshitij gupta"
      matchName = actualName.includes(typedName);
    }

    // Institute filter: with synonyms
    if (instituteFilter.trim()) {
      const typedInstitute = transformSearchTerm(instituteFilter).toLowerCase();
      const actualInstitute =
        founderObj?.Education?.Institute?.toLowerCase() || '';
      matchInstitute = actualInstitute.includes(typedInstitute);
    }

    // Degree filter
    if (degreeFilter.trim()) {
      const typedDegree = degreeFilter.trim().toLowerCase();
      const actualDegree =
        founderObj?.Education?.Degree?.toLowerCase() || '';
      matchDegree = actualDegree.includes(typedDegree);
    }

    // All typed fields must match
    return matchName && matchInstitute && matchDegree;
  }

  // Filter the companies
  const filteredCompanies = companies.filter((company) => {
    // If no "linkedin-data", skip
    if (!company['linkedin-data']) return false;

    // Convert "linkedin-data" to array of [key, value] pairs
    const founderDataArray = Object.entries(company['linkedin-data']);

    // If at least one founder passes "doesFounderMatch", keep the company
    return founderDataArray.some((entry) => doesFounderMatch(entry));
  });

  return (
    <div className="home-container fade-in-up">
      <h1 className="home-title">Welcome, Investor!</h1>
      <p className="home-subtitle">Explore companies and their founders below.</p>

      {/* === Filter UI Section === */}
      <div className="advanced-filter">
        <div className="filter-row">
          <label className="filter-label" htmlFor="founderFilter">
            Founder Name:
          </label>
          <input
            id="founderFilter"
            type="text"
            className="filter-input"
            placeholder="e.g. Kshitij"
            value={founderNameFilter}
            onChange={(e) => setFounderNameFilter(e.target.value)}
          />
        </div>

        <div className="filter-row">
          <label className="filter-label" htmlFor="instituteFilter">
            Institute:
          </label>
          <input
            id="instituteFilter"
            type="text"
            className="filter-input"
            placeholder="e.g. IIT, Stanford"
            value={instituteFilter}
            onChange={(e) => setInstituteFilter(e.target.value)}
          />
        </div>

        <div className="filter-row">
          <label className="filter-label" htmlFor="degreeFilter">
            Degree:
          </label>
          <input
            id="degreeFilter"
            type="text"
            className="filter-input"
            placeholder="e.g. BTech, MBA"
            value={degreeFilter}
            onChange={(e) => setDegreeFilter(e.target.value)}
          />
        </div>
      </div>

      {/* === Filtered Results === */}
      {filteredCompanies.map((company, idx) => (
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
