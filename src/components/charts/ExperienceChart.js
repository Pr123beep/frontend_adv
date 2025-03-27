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

const calculateMonths = (dateRange) => {
  const [startDate, endDate] = dateRange.split('-').map(date => date.trim());
  
  const start = new Date(startDate);
  let end = endDate.toLowerCase().includes('present') ? new Date() : new Date(endDate);

  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  return months > 0 ? months : 0; 
  return months > 0 ? months : 0;
};

function ExperienceChart({ experiences }) {
  const data = experiences.map((exp) => {
    const dateRange = exp.Date || '';
    const totalMonths = dateRange.includes('-') ? calculateMonths(dateRange) : 0;

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
