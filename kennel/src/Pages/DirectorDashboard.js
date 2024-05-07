import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

const DirectorDashboard = () => {
  const navigate = useNavigate();

  const handleViewDogProfiles = () => {
    navigate('/Pages/DirectorSearchingDogProfiles'); 
  };
  const handleManageCredentials = () => {
    navigate('/Pages/DirectorCredentialsManageButtons'); 
  }

  return (
    <div style={{ backgroundColor: '#ADD8E6' }}>
      <h1 className='text-center fw-bold'  >Director Dashboard</h1>
      <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="text-center mb-4"></div>
        <div className="mb-3">
          <Button variant="primary fw-bold" size="lg" style={{ width: '320px', height:'100px',marginBottom:'150px' }} onClick={handleViewDogProfiles}>
            View Dog profiles
          </Button>
        </div>
        <div className="mb-3">
          <Button variant="primary fw-bold" size="lg" style={{ width: '320px',height:'100px' }} onClick={handleManageCredentials} >
            Manage credentials
          </Button>
        </div>
      </div>
      <Footer />
    </div>  
  );
};

export default DirectorDashboard;
