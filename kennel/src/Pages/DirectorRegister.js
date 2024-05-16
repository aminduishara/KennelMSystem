import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

    const handleLogin = () => {
        navigate('/Pages/DirectorLogin');
    }

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
        <div className="p-3 p-md-4 p-xl-5 d-flex align-items-center" style={{ height: '80dvh' ,backgroundColor:'silver'}}>
            <div className="container" style={{ marginTop: '120px' }}>
                <div className="card border-light-subtle shadow-sm">
                    <div className="row g-0">
                        <div className="col-12 col-md-6 text-bg-primary">
                            <div className="d-flex align-items-center justify-content-center h-100">
                                <div className="col-10 col-xl-8 py-3">
                                    <h2 className="h1 mb-4">Kennel Management System</h2>
                                    <p className="lead m-0">Ensuring the safety and welfare of our canine companions is paramount.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="card-body p-3 p-md-4 p-xl-5">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-5">
                                            <h3 className="fw-bold fs-2">Director Register</h3>
                                        </div>
                                    </div>
                                </div>
                                <form action="#!" onSubmit={handleSubmit}>
                                    <div className="row gy-3 gy-md-4 overflow-hidden">
                                        <div className="col-12">
                                            <label htmlFor="username" className="form-label">Username <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" name="username" id="username" placeholder="Username" value={username} onChange={handleUsernameChange} required />
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
                                            <input type="password" className="form-control" name="password" id="password" placeholder='Password' value={password} onChange={handlePasswordChange} required />
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="confirmPassword" className="form-label">Confirm Password <span className="text-danger">*</span></label>
                                            <input type="password" className="form-control" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' value={repeatPassword} onChange={handleRepeatPasswordChange} required />
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="Email" className="form-label">Email <span className="text-danger">*</span></label>
                                            <input type="email" className="form-control" name="email" id="email" placeholder="Email" value={email} onChange={handleEmailChange} required />
                                        </div>
                                        <div className="col-12">
                                            <div className="d-grid">
                                                <button className="btn bsb-btn-xl btn-primary" type="submit">Register now</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="row">
                                    <div className="col-12">
                                        <hr className="mt-5 mb-4 border-secondary-subtle" />
                                        <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-start">
                                            <a href="#!" className="link-primary fw-bold text-decoration-none" onClick={handleLogin}>Log in now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DirectorRegister;
