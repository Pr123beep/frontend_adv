// src/components/forms/ContactForm.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to your backend or an email service
    console.log('Submitted form:', formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>Request Pitch Deck</Typography>
      <TextField
        name="name"
        label="Name"
        variant="outlined"
        value={formData.name}
        onChange={handleChange}
        sx={{ mb: 2, width: '100%' }}
      />
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        value={formData.email}
        onChange={handleChange}
        sx={{ mb: 2, width: '100%' }}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
}

export default ContactForm;
