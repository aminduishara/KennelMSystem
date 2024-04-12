import React, { useState } from 'react';
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <form onSubmit={handleSubmit}>
        <MDBInput
          wrapperClass='mb-4'
          label='Email address'
          id='form1'
          type='email'
          value={email}
          onChange={handleEmailChange}
          required
        />
        <MDBInput
          wrapperClass='mb-4'
          label='Password'
          id='form2'
          type='password'
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <div className="d-flex justify-content-between mx-3 mb-4">
          <MDBCheckbox
            name='flexCheck'
            value={rememberMe}
            id='flexCheckDefault'
            label='Remember me'
            onChange={handleRememberMeChange}
          />
          <a href="!#" className="text-decoration-none">Forgot password?</a>
        </div>

        <MDBBtn className="mb-4" type="submit">Sign in</MDBBtn>
      </form>

      <div className="text-center">
        <p>Not a member? <a href="#!" className="text-decoration-none">Register</a></p>
        

         
      </div>
    </MDBContainer>
  );
}

export default Login;
