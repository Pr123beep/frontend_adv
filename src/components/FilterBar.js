// src/components/FilterBar.js
import React, { useState } from 'react';
import { Box, Chip, Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { OpenInFullTwoTone } from '@mui/icons-material';

const categories = [
  { label: 'Posts', key: 'posts' },
  { label: 'Jobs', key: 'jobs' },
  { label: 'Courses', key: 'courses' },
  { label: 'People', key: 'people' },
  { label: 'Groups', key: 'groups' },
  { label: 'Companies', key: 'companies' },
  { label: 'Events', key: 'events' },
  { label: 'Products', key: 'products' },
  { label: 'Services', key: 'services' },
  { label: 'Schools', key: 'schools' },
];

function FilterBar({ onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleChipClick = (categoryKey) => {
    if (selectedCategory === categoryKey) {
      setSelectedCategory(null);
      onFilterChange(null);
    } else {
      setSelectedCategory(categoryKey);
      onFilterChange(categoryKey);
    }
  };

  const handleAllFiltersClick = () => {
    console.log('All filters clicked!');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        overflowX: 'auto',
        gap: 1,
        py: 1,
        px: 2,
        backgroundColor: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        borderRadius: 2,
        
      }}
    >
      {categories.map((cat) => {
        const isSelected = cat.key === selectedCategory;
        return (
          <Chip
            key={cat.key}
            label={cat.label}
            variant={isSelected ? 'filled' : 'outlined'}
            color={isSelected ? 'primary' : 'default'}
            onClick={() => handleChipClick(cat.key)}
            sx={{
              cursor: 'pointer',
              fontWeight: isSelected ? 'bold' : 'normal',
              borderRadius: '9999px',
            }}
          />
        );
      })}
      <Button
        onClick={handleAllFiltersClick}
        variant="outlined"
        endIcon={<ArrowDropDownIcon />}
        sx={{
          textTransform: 'none',
          borderRadius: '9999px',
          
        }}
      >
        All filters
      </Button>
    </Box>
  );
}

export default FilterBar;
