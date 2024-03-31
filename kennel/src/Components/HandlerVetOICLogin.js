import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from './Footer';
import '../App.css';

const HandlerVetOICLogin = ({ name }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Remember Me:', rememberMe);

        switch (role) {
            case 'Handler':
               
                navigate('/Pages/DogAccountCreate');
                break;
            case 'DeputyVet':
               
                navigate('/Pages/DeputyVetSearchDogs');
                break;
            case 'OIC':
               
                navigate('/Pages/OicDashboard');
                break;
            case 'Director':
              
                navigate('/Pages/DirectorDashboard');
                break;
            default:
               
                navigate('/'); // Redirect to the home page if the role is not recognized
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
        <Footer/>
        </div>
    );
};

export default HandlerVetOICLogin;
