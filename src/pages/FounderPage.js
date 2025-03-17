// src/pages/FounderPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { companies } from '../data/sampleData';
import { Typography, Box, Paper } from '@mui/material';
import ExperienceChart from '../components/charts/ExperienceChart';

function FounderPage() {
  const { founderName } = useParams();

  let founderData = null;
  let parentCompany = '';

  // Loop over each company in case you have multiple
  for (const comp of companies) {
    const data = comp['linkedin-data'][founderName];
    if (data) {
      founderData = data;
      parentCompany = comp['company-name'];
      break;
    }
  }

  if (!founderData) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Founder not found!</Typography>
      </Box>
    );
  }

  const experiences = founderData.Experience || [];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {founderName} ({parentCompany})
      </Typography>
      <Typography variant="body1" paragraph>
        {founderData.Bio}
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }} elevation={3}>
        <Typography variant="h6" gutterBottom>
          Experience Timeline:
        </Typography>
        <ExperienceChart experiences={experiences} />
      </Paper>

      {/* Additional data like Education, etc. */}
      {founderData.Education && (
        <Paper sx={{ p: 2, mb: 2 }} elevation={3}>
          <Typography variant="h6" gutterBottom>
            Education:
          </Typography>
          <Typography>
            {founderData.Education.Institute} - {founderData.Education.Degree}
          </Typography>
          <Typography>
            {founderData.Education.Date}
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

export default FounderPage;
