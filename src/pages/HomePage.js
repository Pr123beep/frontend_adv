import React, { useState } from 'react';
import '../HomePage.css';
import { Link } from 'react-router-dom';
import { companies } from '../data/sampleData';
import {
  Button,
  Box,
  Autocomplete,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Pagination
} from '@mui/material';
import ChecklistIITB from '../components/checklists/ChecklistIITB';

function transformSearchTerm(term) {
  const synonymsMap = {
    iit: 'indian institute of technology',
    iim: 'indian institute of management',
    iiit: 'indian institute of information technology'
  };
  const lower = term.trim().toLowerCase();
  return synonymsMap[lower] || term;
}

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
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [selectedDegree, setSelectedDegree] = useState(null);
  const [matchMode, setMatchMode] = useState('any');
  const [appliedFilters, setAppliedFilters] = useState({
    institute: '',
    degree: '',
    mode: 'any'
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearch = () => {
    setAppliedFilters({
      institute: selectedInstitute ? transformSearchTerm(selectedInstitute).toLowerCase() : '',
      degree: selectedDegree ? selectedDegree.trim().toLowerCase() : '',
      mode: matchMode
    });
    setPage(1);
  };

  const handleClear = () => {
    setSelectedInstitute(null);
    setSelectedDegree(null);
    setMatchMode('any');
    setAppliedFilters({ institute: '', degree: '', mode: 'any' });
    setPage(1);
  };

  function doesFounderMatch([, founderObj]) {
    let matchInstitute = true;
    let matchDegree = true;
    if (appliedFilters.institute) {
      const actualInstitute = founderObj?.Education?.Institute?.toLowerCase() || '';
      matchInstitute = actualInstitute.includes(appliedFilters.institute);
    }
    if (appliedFilters.degree) {
      const actualDegree = founderObj?.Education?.Degree?.toLowerCase() || '';
      matchDegree = actualDegree.includes(appliedFilters.degree);
    }
    return matchInstitute && matchDegree;
  }

  const filteredCompanies = companies.filter((company) => {
    if (!company['linkedin-data']) return false;
    const founderDataArray = Object.entries(company['linkedin-data']);
    if (appliedFilters.mode === 'all') {
      return founderDataArray.every((entry) => doesFounderMatch(entry));
    } else {
      return founderDataArray.some((entry) => doesFounderMatch(entry));
    }
  });

  const pageCount = Math.ceil(filteredCompanies.length / itemsPerPage);
  const paginatedCompanies = filteredCompanies.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-container fade-in-up">
      <Typography variant="h3" className="home-title" align="center">
        Welcome, Investor!
      </Typography>
      <Typography variant="h6" className="home-subtitle" align="center">
        Explore companies and their founders below.
      </Typography>

      {/* Advanced Filter Section */}
      <Box className="advanced-filter" sx={{ mb: 2, p: 2, borderRadius: '12px', boxShadow: 1 }}>
        <Box className="filter-row" sx={{ mb: 2 }}>
          <Autocomplete
            value={selectedInstitute}
            onChange={(event, newValue) => setSelectedInstitute(newValue)}
            options={instituteOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Institute (e.g. IIT, Stanford)"
                variant="outlined"
                placeholder="Select Institute (IIT = Indian Institute of Technology)"
              />
            )}
            fullWidth
          />
        </Box>
        <Box className="filter-row" sx={{ mb: 2 }}>
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
            <FormControlLabel value="any" control={<Radio />} label="Match any founder" />
            <FormControlLabel value="all" control={<Radio />} label="Match all founders" />
          </RadioGroup>
        </FormControl>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClear}>
            Clear Filters
          </Button>
        </Box>
      </Box>

      {/* Display filtered companies */}
      {paginatedCompanies.map((company, idx) => (
        <div key={idx} className="home-card">
          <Typography variant="h4" className="home-card-title">
            {company['company-name']}
          </Typography>
          <Typography variant="body1" className="home-card-founders">
            Founders:{' '}
            {company['founder-names']
              ? company['founder-names'].join(', ')
              : 'No founders found'}
          </Typography>
          <Link to={`/company/${encodeURIComponent(company['company-name'])}`} className="home-btn">
            View Details
          </Link>
        </div>
      ))}

      {pageCount > 1 && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" />
        </Box>
      )}

      {/* Display the IITB Checklist with improved UI */}
      <ChecklistIITB />
    </div>
  );
}

export default HomePage;
