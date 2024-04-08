import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const WelcomePage = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleRoleSelection = (role) => {
        if (role === 'Director') {
            // navigate(`/Pages/DirectorLogin?role=${role}`);
            navigate('/Pages/DirectorRegister');
        } else {
            navigate(`/Pages/${role}Login?role=${role}`);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Container className="mt-5 flex-grow-1">
                <h1 className="text-center">Welcome to Kandy Kennels</h1>
                <p className="text-center">Select your role:</p>
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
            </Container>
            <Footer />
        </div>
    );
};

export default WelcomePage;
