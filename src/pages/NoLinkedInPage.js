// src/pages/NoLinkedInPage.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../NoLinkedInPage.css';

function NoLinkedInPage() {
  const { founderName } = useParams();
  
  return (
    <div className="no-linkedin-container">
      <div className="animation-wrapper">
        <h1 className="creative-title">LinkedIn Profile Not Available</h1>
        <p className="creative-subtitle">
          Unfortunately, we couldn't find a LinkedIn profile for <strong>{founderName}</strong>.
        </p>
        <p className="creative-text">
          Check back later or contact support for more details.
        </p>
      </div>
      <Link to="/" className="back-home-btn">Back to Home</Link>
    </div>
  );
}

export default NoLinkedInPage;
