// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';
import './HomePage.css';
import './CompanyPage.css';
import './FounderPage.css';
import HomePage from './pages/HomePage';
import CompanyPage from './pages/CompanyPage';
import FounderPage from './pages/FounderPage';
import NoLinkedInPage from './pages/NoLinkedInPage';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/company/:companyName" element={<CompanyPage />} />
        <Route path="/founder/:founderName" element={<FounderPage />} />
        <Route path="/no-linkedin/:founderName" element={<NoLinkedInPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
