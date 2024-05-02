import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Footer from '../Components/Footer';
import '../App.css';
import axios from './../axiosConfig';


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

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Frontend form validation
        if (password !== repeatPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Prepare form data
        const formData = {
            username,
            password,
            email,
            type: "DIRECTOR", // Assuming 'type' is always "handler"
        };

        try {
            // Make a POST request to the backend API
            const response = await axios.post('/register', formData);
            console.log(response.status);

            // Check if registration was successful
            if (response.status === 200 && response.data) {
                console.log('Director registered successfully:', response.data);
                // Redirect to the login page upon successful registration
                navigate('/Pages/DirectorLogin');
            } else {
                // Handle unsuccessful registration
                console.error('Error registering Director:', response.data.message);
                alert('Failed to register director. Please try again.'); // Display user-friendly message
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error registering Director:', error);
            alert('An error occurred while registering director. Please try again later.'); // Display user-friendly message
        }
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
