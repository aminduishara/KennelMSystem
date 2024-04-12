import React, { useState } from 'react';
import {  MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);
  };

  return (
    <div className='login-cont'>
      <h2 className='text-center'>Director Login</h2>
      <div className="login-box container border rounded p-4">
        <form onSubmit={handleSubmit}>
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
          <p>First time Login? <span onClick={handleRegisterClick} style={{ fontWeight: 'bold',
      color: 'blue',
      cursor: 'pointer',}}>Register here</span></p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DirectorLogin;