import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import Footer from '../Components/Footer';
import axios from './../axiosConfig';

const OicCredentialsTable = () => {
  const [credentials, setCredentials] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedPassword, setEditedPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Function to add a new credential
  const addCredential = (id, username, password) => {
    const newCredential = { id: id, username, password };
    setCredentials([...credentials, newCredential]);
  };

  // Function to edit an existing credential
  const editCredential = async (id, username, password) => {
    if (!id || id == '' || !username || username == '' || !password || password == '') {
      alert('Add all the information');
      return;
    }
    const formData = {
      "id": id,
      "username": username,
      "password": password
    };
    try {
      const response = await axios.post('/updateUser', formData);

    } catch (error) {
      console.error('Error update OIC:', error);
      alert('An error occurred while update OIC. Please try again later.'); // Display user-friendly message
    }
    const updatedCredentials = credentials.map(item => {
      if (item.id === id) {
        return { ...item, username, password };
      }
      return item;
    });
    setCredentials(updatedCredentials);
  };

  // Function to delete a credential
  const deleteCredential = async (id) => {
    if (id == '') {
      alert('Invalid user');
      return;
    }
    const formData = {
      "id": id
    };
    try {
      const response = await axios.post('/removeUser', formData);

    } catch (error) {
      console.error('Error removing OIC:', error);
      alert('An error occurred while removing OIC. Please try again later.'); // Display user-friendly message
    }
    const updatedCredentials = credentials.filter(item => item.id !== id);
    setCredentials(updatedCredentials);
  };

  const handleEdit = (id, username, password) => {
    setEditableId(id);
    setEditedUsername(username);
    setEditedPassword(password);
    setPasswordVisible(true);
  };

  const handleSave = (id) => {
    if (editableId === id) {
      editCredential(id, editedUsername, editedPassword);
      setEditableId(null);
    }
  };

  const handleAddUser = async () => {
    // Frontend form validation
    if (newUsername == '' || newPassword == '') {
      alert('Add the username and password!');
      return;
    }

    const formData = {
      "username": newUsername,
      "password": newPassword,
      "email": null,
      "type": "OIC"
    };

    try {
      // Make a POST request to the backend API
      const response = await axios.post('/register', formData);

      // Check if registration was successful
      if (response.status === 200 && response.data) {
        console.log('OIC registered successfully:', response.data);
        // Redirect to the login page upon successful registration
        addCredential(response.data.insertId, newUsername, newPassword);
      } else {
        // Handle unsuccessful registration
        console.error('Error registering OIC:', response.data.message);
        alert('Failed to register director. Please try again.'); // Display user-friendly message
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error registering OIC:', error);
      alert('An error occurred while registering OIC. Please try again later.'); // Display user-friendly message
    }
    setNewUsername('');
    setNewPassword('');
  };

  const handleDelete = (id) => {
    deleteCredential(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/getUsers?type=OIC');
        setCredentials(response.data); // Assuming response.data contains the users
      } catch (error) {
        console.error('Error retrieving Users:', error);
        alert('An error occurred while retrieving Users. Please try again later.'); // Display user-friendly message
      }
    };

    fetchData(); // Invoke the async function immediately
  }, []);


  return (
    <div>
      <h3 className="text-center">OIC Credentials Table</h3><br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {credentials.map(credential => (
            <tr key={credential.id}>
              <td>
                {editableId === credential.id ? (
                  <Form.Control
                    type="text"
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                  />
                ) : (
                  credential.username
                )}
              </td>
              <td>
                {editableId === credential.id ? (
                  <Form.Control
                    type={passwordVisible ? 'text' : 'password'}
                    value={editedPassword}
                    onChange={(e) => setEditedPassword(e.target.value)}
                  />
                ) : (
                  '********'
                )}
              </td>
              <td>
                {editableId === credential.id ? (
                  <Button variant="success" className="me-2" onClick={() => handleSave(credential.id)}>Save</Button>
                ) : (
                  <Button variant="primary" className="me-2" onClick={() => handleEdit(credential.id, credential.username, credential.password)}>Edit</Button>
                )}
                <Button variant="danger" className="custom-delete-btn-handlerCredentialTable" onClick={() => handleDelete(credential.id)}>Delete</Button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <Form.Control
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </td>
            <td>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </td>
            <td>
              <Button variant="success" onClick={handleAddUser}>Add User</Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <Footer />
    </div>
  );
};

export default OicCredentialsTable;
