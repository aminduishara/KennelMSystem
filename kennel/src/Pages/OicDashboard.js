import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

const OicDashboard = () => {
  const navigate = useNavigate();

  const handleGenerateDailyReport = () => {
    navigate('/Pages/OicGenerateDailyReport');
  };

  const handleSummary = () => {
    const dashboardId = 'ac7f9422-2d8c-4b74-999e-3cfe63cef6ff';
    const dashboardUrl = `https://app.powerbi.com/groups/me/reports/${dashboardId}`;

    // Open Power BI dashboard in a new tab
    window.open(dashboardUrl, '_blank');
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
          <Button variant="primary fw-bold" size="lg" style={{ width: "320px", height: "100px" }} onClick={handleSummary}>
          Summary Dashboard
          </Button>
        </div>
      </div>
      <Footer />
    </div>  
  );
};

export default OicDashboard;
