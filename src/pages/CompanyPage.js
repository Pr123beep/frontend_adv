// src/pages/CompanyPage.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { companies } from '../data/sampleData';
import { Typography, Button, Box } from '@mui/material';

function CompanyPage() {
  const { companyName } = useParams();

  // Find the relevant company data
  const company = companies.find(
    (c) => c['company-name'] === decodeURIComponent(companyName)
  );

  if (!company) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Company not found!</Typography>
      </Box>
    );
  }

  // Array of founder names
  const founders = company['founder-names'];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {company['company-name']}
      </Typography>
      <Typography variant="body1" paragraph>
        Founders:
      </Typography>

      {founders.map((founder) => (
        <Button
          key={founder}
          variant="outlined"
          sx={{ marginRight: 1, marginBottom: 1 }}
          component={Link}
          to={`/founder/${encodeURIComponent(founder)}`}
        >
          {founder}
        </Button>
      ))}

      {/* Insert advanced charts or stats about the company here */}
    </Box>
  );
}

export default CompanyPage;
