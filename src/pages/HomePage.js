// src/pages/HomePage.js
import React, { useState } from 'react';
import './HomePage.css'; // Page-specific CSS
import { Link } from 'react-router-dom';
import { companies } from '../data/sampleData';

function HomePage() {
  // States for multiple filters
  const [founderNameFilter, setFounderNameFilter] = useState('');
  const [instituteFilter, setInstituteFilter] = useState('');
  const [degreeFilter, setDegreeFilter] = useState('');

  // State for AND/OR logic
  const [logicMode, setLogicMode] = useState('AND'); // 'AND' or 'OR'

  // Check if a single founder matches typed filters
  // We'll interpret the typed strings in a case-insensitive way.
  function doesFounderMatch(founder) {
    let matchName = true;
    let matchInstitute = true;
    let matchDegree = true;

    // Founder name match
    if (founderNameFilter.trim()) {
      // Check if the founder's name (the key in "linkedin-data") or the 'Name' field includes the typed string
      // Some data might store the name in 'Name' or we might rely on the object key in the parent loop
      // If you rely on 'Name' field:
      const nameField = founder?.Name || ''; 
      matchName = nameField
        .toLowerCase()
        .includes(founderNameFilter.toLowerCase());
    }

    // Institute match
    if (instituteFilter.trim()) {
      const instituteField = founder?.Education?.Institute || '';
      matchInstitute = instituteField
        .toLowerCase()
        .includes(instituteFilter.toLowerCase());
    }

    // Degree match
    if (degreeFilter.trim()) {
      const degreeField = founder?.Education?.Degree || '';
      matchDegree = degreeField
        .toLowerCase()
        .includes(degreeFilter.toLowerCase());
    }

    if (logicMode === 'AND') {
      // All typed fields must match
      return matchName && matchInstitute && matchDegree;
    } else {
      // logicMode === 'OR' => At least one typed field must match
      return matchName || matchInstitute || matchDegree;
    }
  }

  // Filter the companies array
  const filteredCompanies = companies.filter((company) => {
    // If there's no "linkedin-data" or it's empty, skip
    if (!company['linkedin-data']) return false;

    // Convert the "linkedin-data" object to an array of founder objects
    const founderDataArray = Object.values(company['linkedin-data']);

    // For the company to pass, at least one founder must match
    // (in the sense of "some" founder matches doesFounderMatch)
    return founderDataArray.some((founderObj) => doesFounderMatch(founderObj));
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

        {/* AND/OR Toggle */}
        <div className="filter-row">
          <label className="filter-label">Logic Mode:</label>
          <div className="logic-toggle">
            <label>
              <input
                type="radio"
                name="logicMode"
                value="AND"
                checked={logicMode === 'AND'}
                onChange={(e) => setLogicMode(e.target.value)}
              />
              AND
            </label>
            <label>
              <input
                type="radio"
                name="logicMode"
                value="OR"
                checked={logicMode === 'OR'}
                onChange={(e) => setLogicMode(e.target.value)}
              />
              OR
            </label>
          </div>
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
