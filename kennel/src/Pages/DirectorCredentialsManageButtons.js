import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DirectorCredentialManagesButtons = () => {
  const navigate = useNavigate();

  const handleHandlerCredentials = () => {
    navigate('/Pages/HandlerCredentialsTable'); 
  };
  const handleDeputyVetCredentials = () => {
    navigate('/Pages/DeputyVetCredentialsTable'); // Update the path to match your routing configuration
  }
  const handleOicCredentials = () => {
    navigate('/Pages/OicCredentialsTable'); // Update the path to match your routing configuration
  }
  const handleDirectorCredentials = () => {
    navigate('/Pages/DirectorCredentialsTable'); // Update the path to match your routing configuration
  }
    

  return (
    <div>
      <h1 className='text-center'>Director Credentials Manage</h1>
      <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="text-center mb-4"></div>
        <div className="mb-3">
          <Button variant="primary" size="lg" style={{ width: '300px' }} onClick={handleHandlerCredentials}>
           Handler credentials
          </Button>
        </div>
        <div className="mb-3">
          <Button variant="primary" size="lg" style={{ width: '300px' }} onClick={handleOicCredentials} >
           OIC credentials
          </Button>
        </div>
        <div className="mb-3">
          <Button variant="primary" size="lg" style={{ width: '300px' }} onClick={handleDeputyVetCredentials} >
           Deputy veterinary credentials
          </Button>
        </div>
        <div className="mb-3">
          <Button variant="primary" size="lg" style={{ width: '300px' }} onClick={handleDirectorCredentials} >
           My credentials
          </Button>
        </div>
        
      </div>
    </div>  
  );
};

export default DirectorCredentialManagesButtons;
