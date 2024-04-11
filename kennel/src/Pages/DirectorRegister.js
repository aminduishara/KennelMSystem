import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Footer from '../Components/Footer';
import '../App.css';

const DirectorRegister = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleClearForm = () => {
        setUsername('');
        setPassword('');
        setRepeatPassword('');
        setEmail('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Check if passwords match before submitting the form
        if (password !== repeatPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Add registration logic here if needed

        console.log('Registering Director...');
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Email:', email);

        // Simulating a successful registration and navigating to DirectorDashboard
        console.log('Director registered successfully!');
        navigate('/Pages/DirectorLogin');
        
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Director Registration</h2>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={handleUsernameChange}
                                required
                                className="mb-3"
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                className="mb-3"
                            />
                        </Form.Group>

                        <Form.Group controlId="formRepeatPassword">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Repeat password"
                                value={repeatPassword}
                                onChange={handleRepeatPasswordChange}
                                required
                                className="mb-3"
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                                className="mb-4"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mr-2" >
                            Register
                        </Button>
                        <Button variant="secondary" onClick={handleClearForm} className='custom-clear-btn-directorRegister'>
                            Clear
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Footer />
        </Container>
    );
};

export default DirectorRegister;
