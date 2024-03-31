import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Footer = ({ className }) => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleLogout = () => {
        // Add logout logic here if needed
        navigate('/'); // Navigate to the home page after logout
    };

    return (
        <Container fluid className={`footer ${className}`} style={{ overflowX: 'hidden' }}>
            <Row className="justify-content-between">
                <Col xs={6} className="d-flex align-items-center">
                    <p className="text-start mb-0">© 2024 Sri Lanka Police-Kandy Kennels</p>
                </Col>
                <Col xs={6} className="d-flex align-items-center justify-content-end">
                    <Button variant="link" onClick={handleLogout} style={{ color: 'black' }} className='logout-text'>Logout</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Footer;
