import React from 'react';
import {  Row, Col, Button } from 'react-bootstrap';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';
import '../App.css';


const WelcomePage = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleRoleSelection = (role) => {
        if (role === 'Director') {
            // navigate(`/Pages/DirectorLogin?role=${role}`);
            navigate('/Pages/DirectorLogin');
        } else {
            navigate(`/Pages/${role}Login?role=${role}`);
        }
    };

    return (
        <div className='cstm'>
      
            <div className="container" >
                <h1 className="text-center font-weight-bold">Welcome to Kandy Kennels</h1><br/>
                
                <Row className="justify-content-center">
                    <Col xs={6} md={3} className="mb-4">
                        <Button variant="primary" size="lg" block className="square-button" onClick={() => handleRoleSelection('Handler')}>Handler</Button>
                    </Col>
                    <Col xs={6} md={3} className="mb-4">
                        <Button variant="primary" size="lg" block className="square-button" onClick={() => handleRoleSelection('DeputyVet')}>Deputy Veterinary</Button>
                    </Col>
                    <Col xs={6} md={3} className="mb-4">
                        <Button variant="primary" size="lg" block className="square-button" onClick={() => handleRoleSelection('OIC')}>OIC</Button>
                    </Col>
                    <Col xs={6} md={3} className="mb-4">
                        <Button variant="primary" size="lg" block className="square-button" onClick={() => handleRoleSelection('Director')}>Director</Button>
                    </Col>
                </Row>
            </div>
            <Footer />
        </div>
        
    );
};

export default WelcomePage;
