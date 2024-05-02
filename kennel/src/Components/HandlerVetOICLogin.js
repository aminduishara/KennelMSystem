import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios'; // Import Axios for API calls
import '../App.css';
import LoginFailedModal from './LoginFailedModal'; // Import the LoginFailedModal component

const HandlerVetOICLogin = ({ name }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);

    // Extract role from URL query string
    const searchParams = new URLSearchParams(location.search);
    const role = searchParams.get('role');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };
    const handleCloseModal = () => {
        setShowModal(false);
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Remember Me:', rememberMe);

        try {
            let redirectPath = '/'; // Default redirect path

            switch (role) {
                case 'Handler':
                    // Example: Make an API call specific to Handler login
                    const handlerResponse = await axios.post('http://localhost:5000/kennel/handlerlogin', { username, password });
                    console.log('Handler Login Response:', handlerResponse.data);
                    redirectPath = `/Pages/DogAccountCreate/${username}`; //for the dog account create 2 feilds auto filling purpose
                    break;
                case 'DeputyVet':
                    // Example: Make an API call specific to Deputy Vet login
                    const deputyVetResponse = await axios.post('http://your-backend-api/deputyvet/login', { username, password });
                    console.log('Deputy Vet Login Response:', deputyVetResponse.data);
                    redirectPath = '/Pages/DeputyVetSearchDogs';
                    break;
                case 'OIC':
                    // Example: Make an API call specific to OIC login
                    const oicResponse = await axios.post('http://your-backend-api/oic/login', { username, password });
                    console.log('OIC Login Response:', oicResponse.data);
                    redirectPath = '/Pages/OicDashboard';
                    break;
                case 'Director':
                    // Example: Make an API call specific to Director login
                    const directorResponse = await axios.post('http://your-backend-api/director/login', { username, password });
                    console.log('Director Login Response:', directorResponse.data);
                    redirectPath = '/Pages/DirectorDashboard';
                    break;
                default:
                    // Redirect to the home page if the role is not recognized
                    break;
            }

            navigate(redirectPath);
        } catch (error) {
            console.error('Error logging in:', error);
            setShowModal(true);
            // Handle error scenario, show error message, etc.
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h2 className="text-center">{name}</h2>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="username">Username:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            value={username}
                                            onChange={handleUsernameChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>
                                    <div className="form-group form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="rememberMe"
                                            checked={rememberMe}
                                            onChange={handleRememberMeChange}
                                        />
                                        <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <LoginFailedModal show={showModal} handleClose={handleCloseModal} />
        </div>
    );
};

export default HandlerVetOICLogin;
