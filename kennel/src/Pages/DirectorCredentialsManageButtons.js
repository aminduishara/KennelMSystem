import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

const DirectorCredentialManagesButtons = () => {
  const navigate = useNavigate();

  const handleHandlerCredentials = () => {
    navigate('/Pages/HandlerCredentialsTable'); 
  };
  const handleDeputyVetCredentials = () => {
    navigate('/Pages/DeputyVetCredentialsTable');   
  }
  const handleOicCredentials = () => {
    navigate('/Pages/OicCredentialsTable'); 
  }
  const handleDirectorCredentials = () => {
    navigate('/Pages/DirectorCredentialsTable'); 
  }
    

  return (
    <div style={{ backgroundColor: '#ADD8E6'}}>
      <h1 className='text-center'>Director Credentials Manage</h1>
      <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
        <div className="text-center mb-4"></div>
        <div className="mb-3">
          <Button variant="primary fw-bold" size="lg" style={{ width: '370px' ,height:'100px'}} onClick={handleHandlerCredentials}>
           Handler credentials
          </Button>
        </div>
        <div className="mb-3">
          <Button variant="primary fw-bold" size="lg" style={{ width: '370px',height:'100px' }} onClick={handleOicCredentials} >
           OIC credentials
          </Button>
        </div>
        <div className="mb-3">
          <Button variant="primary fw-bold" size="lg" style={{ width: '370px',height:'100px' }} onClick={handleDeputyVetCredentials} >
           Deputy veterinary credentials
          </Button>
        </div>
        <div className="mb-3">
          <Button variant="primary fw-bold" size="lg" style={{ width: '370px',height:'100px' }} onClick={handleDirectorCredentials} >
           My credentials
          </Button>
        </div>
        
      </div>
      <Footer/>
    </div>  
  );
};

export default DirectorCredentialManagesButtons;
