// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { companies } from '../data/sampleData';

function HomePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Welcome, Investor!
      </Typography>
      <Typography variant="body1" paragraph>
        Explore companies and their founders below.
      </Typography>

      {companies.map((company, index) => (
        <Card key={index} sx={{ marginBottom: '1rem' }}>
          <CardContent>
            <Typography variant="h5">
              {company['company-name']}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Founders: {company['founder-names'].join(', ')}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              component={Link}
              to={`/company/${encodeURIComponent(company['company-name'])}`}
            >
              View Details
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default HomePage;
