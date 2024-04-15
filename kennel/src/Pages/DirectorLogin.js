import React, { useState } from 'react';
import {  MDBInput, MDBCheckbox} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import axios from 'axios';
const DirectorLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleRegisterClick = (event) => {
    navigate('/Pages/DirectorRegister');
  };

  //handle login fuction
  const handleLoginSubmit = async(event) => {
    event.preventDefault();
   
    try {
      const response = await axios.post('http://localhost:5000/directorregister', {
        username,
        password,
      });

      // Check if the login was successful based on the response from the server
      if (response.data.success) {
        console.log('Login successful');
        // Navigate to DirectorDashboard upon successful login
        navigate('/Pages/DirectorDashboard');
      } else {
        console.log('Login failed');
        alert('Login failed. Please check your username and password.');
        // Handle unsuccessful login, such as displaying an error message to the user
      }
    } catch (error) {
      console.error('Error logging in Director:', error);
      // Handle error cases, such as displaying an error message to the user
    }
  };

  return (
    <div className='login-cont'>
      <h2 className='text-center'>Director Login</h2>
      <div className="login-box container border rounded p-4">
        <form onSubmit={handleLoginSubmit}>
          <MDBInput
            wrapperClass='mb-4 col-6' // adjust the width of the input field here
            label='Username'
            placeholder='Enter your username'
            id='username'
            type='text'
            value={username}
            onChange={handleUsernameChange}
            required
            className="form-control"
          />
          <MDBInput
            wrapperClass='mb-4 col-6' // adjust the width of the input field here
            label='Password'
            placeholder='Enter your password'
            id='password'
            type='password'
            value={password}
            onChange={handlePasswordChange}
            required
            className="form-control"
          />

          <div className="d-flex justify-content-between align-items-center mb-4">
            <MDBCheckbox
              name='rememberMe'
              value={rememberMe}
              id='rememberMe'
              label='Remember me'
              onChange={handleRememberMeChange}
              className="form-check-input"
            />
            <a href="!#" className="text-decoration-none text-start">Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-primary fw-bold">Login</button>
        </form>

        <div className="text-center">
          <p>First time Login? <span onClick={handleRegisterClick} style={{ fontWeight: 'bold',color: 'blue',cursor: 'pointer',}}>Register here</span></p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DirectorLogin;