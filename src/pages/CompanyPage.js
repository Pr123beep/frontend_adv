// src/pages/CompanyPage.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { companies } from '../data/sampleData';
import { Typography, Button, Box } from '@mui/material';

function CompanyPage() {
  const { companyName } = useParams();
  const decodedName = decodeURIComponent(companyName);

  const company = companies.find(
    (c) => c['company-name'] === decodedName
  );

  if (!company) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Company not found!</Typography>
      </Box>
    );
  }

  const founders = company['founder-names'] || [];

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

      {/* Additional company details or charts, etc. */}
    </Box>
  );
}

export default CompanyPage;
