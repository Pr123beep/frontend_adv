import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const HomePage = lazy(() => import('./pages/HomePage'));
const CompanyPage = lazy(() => import('./pages/CompanyPage'));
const FounderPage = lazy(() => import('./pages/FounderPage'));
const NoLinkedInPage = lazy(() => import('./pages/NoLinkedInPage'));

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div style={{textAlign:"center", marginTop:"2rem"}}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/company/:companyName" element={<CompanyPage />} />
          <Route path="/founder/:founderName" element={<FounderPage />} />
          <Route path="/no-linkedin/:founderName" element={<NoLinkedInPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
