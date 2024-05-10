import React, { useState } from 'react';
import { MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import axios from './../axiosConfig';
import LoginFailedModal from '../Components/LoginFailedModal';
import { useUser } from './../UserContext';

const DirectorLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { setUserId } = useUser();
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

  const handleRegisterClick = () => {
    navigate('/Pages/DirectorRegister');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/login', {
        username,
        password,
      });

      if (response.data.success) {
        console.log(response.data.data.role);
        setUserId(response.data.data.userId);
        switch (response.data.data.role) {
          case 'DIRECTOR':
            navigate('/Pages/DirectorDashboard');
            break;
          case 'HANDLER':
            navigate('/Pages/DogProfile');
            break;
          case 'OIC':
            navigate('/Pages/OicDashboard');
          case 'VETERINARY':
            navigate('/Pages/DeputyVetSearchDogs');
            break;
          default:
            break;
        }
      } else {
        console.log('Login failed');
        setShowModal(true); // Show modal on unsuccessful login
      }
    } catch (error) {
      console.error('Error logging in Director:', error);
      setShowModal(true); // Show modal on request error (e.g., 401 Unauthorized)
    }
  };

  return (
    <div className="p-3 p-md-4 p-xl-5 d-flex align-items-center" style={{ height: '100dvh' }}>
      <div className="container">
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
                      <h3>Log in</h3>
                    </div>
                  </div>
                </div>
                <form action="#!" onSubmit={handleLoginSubmit}>
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
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value={rememberMe} onChange={handleRememberMeChange} name="remember_me" id="remember_me" />
                        <label className="form-check-label text-secondary" htmlFor="remember_me">
                          Keep me logged in
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button className="btn bsb-btn-xl btn-primary" type="submit">Log in now</button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-12">
                    <hr className="mt-5 mb-4 border-secondary-subtle" />
                    <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                      <a href="#!" className="link-secondary text-decoration-none" onClick={handleRegisterClick}>Create new account</a>
                      <a href="#!" className="link-secondary text-decoration-none">Forgot password</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoginFailedModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
}

export default DirectorLogin;
