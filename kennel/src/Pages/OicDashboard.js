import React from 'react';
import { Button } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Footer from '../Components/Footer';

const OicDashboard = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleGenerateDailyReport = () => {
    navigate('/Pages/OicGenerateDailyReport');
  };

  const handleGenerateSummary = () => {
    navigate('/Pages/OicGenerateSummary');
  };

  return (
    <div>
      <h1 className='text-center fw-bold'>Oic Dashboard</h1>
      <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
        
        <div className="mb-5">
          <Button variant="primary fw-bold" size="lg" style={{ width: "320px", height: "100px" }} onClick={handleGenerateDailyReport}>
            Generate Daily Report
          </Button>
        </div>
        <div className="mb-3">
          <Button variant="primary fw-bold" size="lg" style={{ width: "320px", height: "100px" }} onClick={handleGenerateSummary}>
            Generate Summary
          </Button>
        </div>
      </div>
      <Footer />
    </div>  
  );
};

export default OicDashboard;

{/* <div className="mb-5">
            <Button
              variant="primary fw-bold"
              size="lg"
              style={{ width: "320px", height: "100px" }}
              onClick={handleManageCredentials}
            >
              Manage credentials
            </Button>
</div> */}