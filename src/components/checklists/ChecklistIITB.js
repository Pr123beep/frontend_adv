import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Box, Checkbox, FormControlLabel, Typography, Card, CardContent, Link as MuiLink } from '@mui/material';

function ChecklistIITB() {
  const [checked, setChecked] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCheckboxChange = async (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    setErrorMessage(null);

    if (isChecked) {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/copyData.xlsx`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setRowData(jsonData);
      } catch (error) {
        console.error('Error reading Excel file:', error);
        setErrorMessage(`Error reading Excel file: ${error.message}`);
      }
    } else {
      setRowData([]);
    }
  };

  return (
    <Box sx={{ my: 4, p: 2, border: '1px solid #ccc', borderRadius: '12px', backgroundColor: '#f9f9f9' }}>
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleCheckboxChange} color="primary" />}
        label="Fetch and Display IITB Data"
      />
      {errorMessage && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {errorMessage}
        </Typography>
      )}
      {checked && rowData.map((row, index) => (
        <Card key={index} sx={{ my: 2, boxShadow: 3, transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-3px)' } }}>
          <CardContent>
            <Typography variant="h6">
              {row.firstName} {row.lastName}
            </Typography>
            <Typography variant="body2">
              <strong>College:</strong> {row.college}
            </Typography>
            <Typography variant="body2">
              <strong>Company:</strong> {row.companyName} {row.companyIndustry && `(${row.companyIndustry})`}
            </Typography>
            <Typography variant="body2">
              <strong>LinkedIn Profile:</strong>{' '}
              {row.linkedinProfileUrl ? (
                <MuiLink href={row.linkedinProfileUrl} target="_blank" rel="noopener noreferrer">
                  {row.linkedinProfileUrl}
                </MuiLink>
              ) : 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>LinkedIn Company:</strong>{' '}
              {row.linkedinCompanyUrl ? (
                <MuiLink href={row.linkedinCompanyUrl} target="_blank" rel="noopener noreferrer">
                  {row.linkedinCompanyUrl}
                </MuiLink>
              ) : 'N/A'}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', mt: 1 }}>
              <strong>Description:</strong> {row.linkedinDescription || 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default ChecklistIITB;
