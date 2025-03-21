import React, { useState } from 'react';
import '../HomePage.css';
import { Link } from 'react-router-dom';
import { companies } from '../data/sampleData';
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  TextField
} from '@mui/material';

/**
 * Transform synonyms for institutes (e.g. "IIT" to "indian institute of technology")
 */
function transformSearchTerm(term) {
  const synonymsMap = {
    iit: 'indian institute of technology',
    iim: 'indian institute of management',
    iiit: 'indian institute of information technology',
  };
  const lower = term.trim().toLowerCase();
  return synonymsMap[lower] || term;
}

// Options for the dropdown lists; update as needed
const instituteOptions = [
  "Indian Institute of Technology",
  "Stanford University",
  "Harvard University",
  "Indian Institute of Management",
  "MIT",
  "University of Cambridge",
  "University of Oxford"
];

const degreeOptions = [
  "BTech",
  "MBA",
  "BSc",
  "MTech",
  "PhD",
  "MSc"
];

function HomePage() {
  // For dropdown selections, store the string value (or null)
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [selectedDegree, setSelectedDegree] = useState(null);
  // Match mode: "any" or "all"
  const [matchMode, setMatchMode] = useState('any');

  // Applied filters state updated on clicking "Search"
  const [appliedFilters, setAppliedFilters] = useState({
    institute: '',
    degree: '',
    mode: 'any'
  });

  const handleSearch = () => {
    setAppliedFilters({
      institute: selectedInstitute ? transformSearchTerm(selectedInstitute).toLowerCase() : '',
      degree: selectedDegree ? selectedDegree.trim().toLowerCase() : '',
      mode: matchMode
    });
  };

  const handleClear = () => {
    setSelectedInstitute(null);
    setSelectedDegree(null);
    setMatchMode('any');
    setAppliedFilters({ institute: '', degree: '', mode: 'any' });
  };

  // Filtering logic for each founder (using only institute and degree)
  function doesFounderMatch([, founderObj]) {
    let matchInstitute = true;
    let matchDegree = true;
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
    return matchInstitute && matchDegree;
  }

  // Filter companies based on applied institute and degree filters.
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

      {/* Advanced Filter Section */}
      <Box className="advanced-filter" sx={{ mb: 2 }}>
        <Box className="filter-row">
          <Autocomplete
            value={selectedInstitute}
            onChange={(event, newValue) => setSelectedInstitute(newValue)}
            options={instituteOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Institute (e.g. IIT, Stanford)"
                variant="outlined"
                placeholder="Select Institute"
              />
            )}
            fullWidth
          />
        </Box>
        <Box className="filter-row">
          <Autocomplete
            value={selectedDegree}
            onChange={(event, newValue) => setSelectedDegree(newValue)}
            options={degreeOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Degree (e.g. BTech, MBA)"
                variant="outlined"
                placeholder="Select Degree"
              />
            )}
            fullWidth
          />
        </Box>

        {/* Match Mode */}
        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel component="legend" sx={{ color: '#333' }}>
            Match Mode
          </FormLabel>
          <RadioGroup
            row
            aria-label="matchMode"
            name="matchMode"
            value={matchMode}
            onChange={(e) => setMatchMode(e.target.value)}
          >
            <FormControlLabel
              value="any"
              control={<Radio />}
              label="Match any founder"
            />
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="Match all founders"
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

      {/* Filtered Results */}
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
