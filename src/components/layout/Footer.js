// src/components/layout/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ p: 2, textAlign: 'center', backgroundColor: '#f0f0f0', mt: 4 }}>
      <Typography variant="body2">
        © 2025 My Startup Investor Dashboard
      </Typography>
    </Box>
  );
}

export default Footer;
