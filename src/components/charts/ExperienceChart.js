// src/components/charts/ExperienceChart.js
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function ExperienceChart({ experiences }) {
  // For demonstration, let’s transform experiences into a data array with approximate total months
  const data = experiences.map((exp) => {
    const dateRange = exp.Date || '';
    let totalMonths = 0;
    if (dateRange.includes('-')) {
      const parts = dateRange.split('-');
      if (parts[1].toLowerCase().includes('present')) {
        totalMonths = 36; // Hard-coded example
      } else {
        totalMonths = 24; // Hard-coded example
      }
    }

    return {
      role: exp.Role,
      months: totalMonths,
      company: exp.Company
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="role" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="months" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ExperienceChart;
