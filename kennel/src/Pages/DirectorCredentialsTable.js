import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import { useUser } from './../UserContext';
import axios from './../axiosConfig';

const DirectorCredentialsTable = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { userId } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password == '' || confirmPassword == '' || password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const formData = {
      "id": userId,
      "username": username,
      "password": confirmPassword,
      "email": email,
    };
    try {
      const response = await axios.post('/updateUser', formData);
      navigate('/Pages/DirectorCredentialsManageButtons');
    } catch (error) {
      console.error('Error update OIC:', error);
      alert('An error occurred while update OIC. Please try again later.'); // Display user-friendly message
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/getUser?userId=' + userId);
        console.log(response.data[0]);
        setUsername(response.data[0].username);
        setEmail(response.data[0].email);
      } catch (error) {
        console.error('Error retrieving Users:', error);
        alert('An error occurred while retrieving Users. Please try again later.'); // Display user-friendly message
      }
    };

    fetchData(); // Invoke the async function immediately
  }, []);

  return (
    <div className="container">
      <h3 className="text-center">My Credentials Table</h3><br />
      <form onSubmit={handleSubmit}>
        <div className="col-12">
          <div className="row g-3 align-items-center justify-content-center">
            <div className="col-1">
              <label htmlFor="txtUsername">Username</label>
            </div>
            <div className="col-5">
              <Form.Control
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="row g-3 align-items-center justify-content-center mt-3">
            <div className="col-1">
              <label htmlFor="txtUsername">Email</label>
            </div>
            <div className="col-5">
              <Form.Control
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="row g-3 align-items-center justify-content-center mt-3">
            <div className="col-1">
              <label htmlFor="txtUsername">Password</label>
            </div>
            <div className="col-5">
              <Form.Control
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="row g-3 align-items-center justify-content-center mt-3">
            <div className="col-1">
              <label htmlFor="txtUsername">Confirm Password</label>
            </div>
            <div className="col-5">
              <Form.Control
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="offset-7 col-2 d-flex justify-content-end mt-3">
            <button className='btn btn-primary'>Update</button>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default DirectorCredentialsTable;
