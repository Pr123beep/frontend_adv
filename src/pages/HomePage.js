import React, { useState } from 'react';
import '../HomePage.css';
import { Link } from 'react-router-dom';
import { companies } from '../data/sampleData';
import { TextField, Button, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

function transformSearchTerm(term) {
  const synonymsMap = {
    iit: 'indian institute of technology',
    iim: 'indian institute of management',
    iiit: 'indian institute of information technology',
  };
  const lower = term.trim().toLowerCase();
  return synonymsMap[lower] || term;
}

function HomePage() {
  // Input states while typing
  const [founderNameFilter, setFounderNameFilter] = useState('');
  const [instituteFilter, setInstituteFilter] = useState('');
  const [degreeFilter, setDegreeFilter] = useState('');
  // Match mode: "any" or "all"
  const [matchMode, setMatchMode] = useState('any');

  // Applied filters state updated on clicking "Search"
  const [appliedFilters, setAppliedFilters] = useState({
    founder: '',
    institute: '',
    degree: '',
    mode: 'any'
  });

  const handleSearch = () => {
    setAppliedFilters({
      founder: founderNameFilter.trim().toLowerCase(),
      institute: transformSearchTerm(instituteFilter).toLowerCase(),
      degree: degreeFilter.trim().toLowerCase(),
      mode: matchMode
    });
  };

  const handleClear = () => {
    setFounderNameFilter('');
    setInstituteFilter('');
    setDegreeFilter('');
    setMatchMode('any');
    setAppliedFilters({ founder: '', institute: '', degree: '', mode: 'any' });
  };

  // Filtering logic for each founder
  function doesFounderMatch([founderKey, founderObj]) {
    let matchName = true;
    let matchInstitute = true;
    let matchDegree = true;
    if (appliedFilters.founder) {
      matchName = founderKey.toLowerCase().includes(appliedFilters.founder);
    }
    if (appliedFilters.institute) {
      const actualInstitute =
        founderObj?.Education?.Institute?.toLowerCase() || '';
      matchInstitute = actualInstitute.includes(appliedFilters.institute);
    }
    if (appliedFilters.degree) {
      const actualDegree =
        founderObj?.Education?.Degree?.toLowerCase() || '';
      matchDegree = actualDegree.includes(appliedFilters.degree);
    }
    return matchName && matchInstitute && matchDegree;
  }

  // Filter companies based on the applied filters and match mode.
  const filteredCompanies = companies.filter((company) => {
    if (!company['linkedin-data']) return false;
    const founderDataArray = Object.entries(company['linkedin-data']);
    if (appliedFilters.mode === 'all') {
      return founderDataArray.every((entry) => doesFounderMatch(entry));
    } else {
      return founderDataArray.some((entry) => doesFounderMatch(entry));
    }
  });

  return (
    <div className="home-container fade-in-up">
      <h1 className="home-title">Welcome, Investor!</h1>
      <p className="home-subtitle">Explore companies and their founders below.</p>

      {/* === Advanced Filter Section === */}
      <Box className="advanced-filter" sx={{ mb: 2 }}>
        <Box className="filter-row">
          <TextField
            id="founderFilter"
            label="Founder Name"
            variant="outlined"
            value={founderNameFilter}
            onChange={(e) => setFounderNameFilter(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box className="filter-row">
          <TextField
            id="instituteFilter"
            label="Institute (e.g. IIT, Stanford)"
            variant="outlined"
            value={instituteFilter}
            onChange={(e) => setInstituteFilter(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box className="filter-row">
          <TextField
            id="degreeFilter"
            label="Degree (e.g. BTech, MBA)"
            variant="outlined"
            value={degreeFilter}
            onChange={(e) => setDegreeFilter(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Box>

        {/* Match Mode */}
        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel component="legend" sx={{ color: '#fff' }}>Match Mode</FormLabel>
          <RadioGroup
            row
            aria-label="matchMode"
            name="matchMode"
            value={matchMode}
            onChange={(e) => setMatchMode(e.target.value)}
          >
            <FormControlLabel
              value="any"
              control={<Radio sx={{ color: '#fff' }} />}
              label="Match any founder"
              sx={{ color: '#fff' }}
            />
            <FormControlLabel
              value="all"
              control={<Radio sx={{ color: '#fff' }} />}
              label="Match all founders"
              sx={{ color: '#fff' }}
            />
          </RadioGroup>
        </FormControl>

        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClear}>
            Clear Filters
          </Button>
        </Box>
      </Box>

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
