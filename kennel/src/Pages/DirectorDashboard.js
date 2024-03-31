import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DirectorDashboard = () => {
  const navigate = useNavigate();

  const handleViewDogProfiles = () => {
    navigate('/Pages/DirectorSearchingDogProfiles'); 
  };
  const handleManageCredentials = () => {
    navigate('/Pages/DirectorCredentialsManageButtons'); 
  }

  return (
    <div>
      <h1 className='text-center'>Director Dashboard</h1>
      <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="text-center mb-4"></div>
        <div className="mb-3">
          <Button variant="primary" size="lg" style={{ width: '300px' }} onClick={handleViewDogProfiles}>
            View Dog profiles
          </Button>
        </div>
        <div className="mb-3">
          <Button variant="primary" size="lg" style={{ width: '300px' }} onClick={handleManageCredentials} >
            Manage credentials
          </Button>
        </div>
      </div>
    </div>  
  );
};

export default DirectorDashboard;
