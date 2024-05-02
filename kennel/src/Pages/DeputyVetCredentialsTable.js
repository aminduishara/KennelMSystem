import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Dropdown } from 'react-bootstrap';
import Footer from '../Components/Footer';
import axios from './../axiosConfig';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const DeputyVetCredentialsTable = () => {
  const [credentials, setCredentials] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [editableId, setEditableId] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editedUsername, setEditedUsername] = useState('');
  const [editedPassword, setEditedPassword] = useState('');
  const [editedRegistrationNumber, setEditedRegistrationNumber] = useState('');
  const [editedDeputyVetName, setEditedDeputyVetName] = useState('');
  const [editedDeputyRank, setEditedDeputyRank] = useState('');
  const [newDeputyVetName, setNewDeputyVetName] = useState('');
  const [newRegistrationNumber, setNewRegistrationNumber] = useState('');
  const [newRank, setNewRank] = useState('');

  // Permanent storage of the deputy vet credentials
  useEffect(() => {
    const storedCredentials = JSON.parse(localStorage.getItem('deputyVetCredentials')) || [];
    setCredentials(storedCredentials);
  }, []);

  // Function to add a new credential
  const addCredential = async (id, credential) => {
    const newCredential = { id: id, ...credential };
    setCredentials([...credentials, newCredential]);
  };

  // Function to edit an existing credential
  const editCredential = async (id, editedUsername, editedPassword, editedRegistrationNumber, editedDeputyVetName, editedDeputyRank) => {
    if (!id || id == '' || !editedUsername || editedUsername == '' || !editedPassword || editedPassword == '' || !editedRegistrationNumber || editedRegistrationNumber == '' || !editedDeputyVetName || editedDeputyVetName == '' || !editedDeputyRank || editedDeputyRank == '') {
      alert('Add all the information');
      return;
    }
    const formData = {
      "id": id,
      "username": editedUsername,
      "password": editedPassword,
      "deputyVetName": editedRegistrationNumber,
      "registrationNumber": editedDeputyVetName,
      "rank": editedDeputyRank,
    };
    try {
      const response = await axios.post('/updateUser', formData);

    } catch (error) {
      console.error('Error update OIC:', error);
      alert('An error occurred while update OIC. Please try again later.'); // Display user-friendly message
    }
    const updatedCredentials = credentials.map(item => {
      if (item.id === id) {
        return {
          ...item,
          registrationNumber: editedRegistrationNumber !== undefined ? editedRegistrationNumber : item.registrationNumber,
          deputyVetName: editedDeputyVetName !== undefined ? editedDeputyVetName : item.deputyVetName,
          rank: editedDeputyRank !== undefined ? editedDeputyRank : item.rank,
          username: editedUsername !== undefined ? editedUsername : item.username,
          password: editedPassword !== undefined ? editedPassword : item.password
        };
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
      console.error('Error removing Veterinary :', error);
      alert('An error occurred while removing Veterinary . Please try again later.'); // Display user-friendly message
    }
    const updatedCredentials = credentials.filter(item => item.id !== id);
    setCredentials(updatedCredentials);
  };

  const handleEdit = (credential) => {
    setEditableId(credential.id);
    setEditedUsername(credential.username);
    setEditedPassword(credential.password);
    setEditedRegistrationNumber(credential.registrationNumber);
    setEditedDeputyVetName(credential.deputyVetName);
    setEditedDeputyRank(credential.rank);
  };

  const handleSave = (id) => {
    if (editableId === id) {
      editCredential(id, editedUsername, editedPassword, editedRegistrationNumber, editedDeputyVetName, editedDeputyRank);
      setEditableId(null);
    }
  };

  const handleAddUserButton = async () => {
    const formData = {
      username: newUsername,
      password: newPassword,
      deputyVetName: newDeputyVetName,
      registrationNumber: newRegistrationNumber,
      rank: newRank,
      type: "VETERINARY",
    };
    try {
      // Make a POST request to the backend API
      const response = await axios.post('/register', formData);

      // Check if registration was successful
      if (response.status === 200 && response.data) {
        console.log('Veterinary registered successfully:', response.data);
        // Redirect to the login page upon successful registration
        addCredential(response.data.insertId, formData);
      } else {
        // Handle unsuccessful registration
        console.error('Error registering Veterinary:', response.data.message);
        alert('Failed to register veterinary . Please try again.'); // Display user-friendly message
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error registering Veterinary:', error);
      alert('An error occurred while registering Veterinary. Please try again later.'); // Display user-friendly message
    }
    setNewUsername('');
    setNewPassword('');
    setNewDeputyVetName('');
    setNewRegistrationNumber('');
    setNewRank('');
  };

  const handleDelete = (id) => {
    deleteCredential(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/getUsers?type=VETERINARY');
        setCredentials(response.data); // Assuming response.data contains the users
      } catch (error) {
        console.error('Error retrieving Users:', error);
        alert('An error occurred while retrieving Users. Please try again later.'); // Display user-friendly message
      }
    };

    fetchData(); // Invoke the async function immediately
  }, []);

  const rankOptions = ['ASP', 'SP', 'SSP']; // Add your rank options here

  return (
    <div>
      <h3 className="text-center">Deputy Veterinary Credentials Table</h3>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Registration Number</th>
            <th>Deputy Veterinary Name</th>
            <th>Rank</th>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {credentials.map((credential) => (
            <tr key={credential.id}>
              <td>
                {editableId === credential.id ? (
                  <Form.Control
                    type="text"
                    value={editedRegistrationNumber}
                    onChange={(e) => setEditedRegistrationNumber(e.target.value)}
                  />
                ) : (
                  credential.registrationNumber
                )}
              </td>
              <td>
                {editableId === credential.id ? (
                  <Form.Control
                    type="text"
                    value={editedDeputyVetName}
                    onChange={(e) => setEditedDeputyVetName(e.target.value)}
                  />
                ) : (
                  credential.deputyVetName
                )}
              </td>
              <td>
                {editableId === credential.id ? (
                  <Dropdown>
                    <Dropdown.Toggle variant="primary">
                      {editedDeputyRank || 'Select Rank'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {rankOptions.map((option2) => (
                        <Dropdown.Item key={option2} onClick={() => setEditedDeputyRank(option2)}>
                          {option2}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  // <Form.Control
                  //   type="text"
                  //   value={editedDeputyRank}
                  //   onChange={(e) => setEditedDeputyRank(e.target.value)}
                  // />
                ) : (
                  credential.rank
                )}
              </td>
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
                {/* Toggle password visibility */}
                {/* <Button
                  variant="outline-secondary"
                  className="ms-2"
                  onClick={() => setPasswordVisible((prevState) => !prevState)}
                > */}
                {
                  // passwordVisible ?
                  // <FaEyeSlash />
                  // :
                  // <FaEye />
                }
                {/* </Button> */}
              </td>
              <td>
                {editableId === credential.id ? (
                  <Button variant="success" className="me-2" onClick={() => handleSave(credential.id)}>Save</Button>
                ) : (
                  <Button variant="primary" className="me-2" onClick={() => handleEdit(credential)}>Edit</Button>
                )}
                <Button
                  variant="danger"
                  className="custom-delete-btn-handlerCredentialTable"
                  onClick={() => handleDelete(credential.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <Form.Control
                type="text"
                value={newRegistrationNumber}
                onChange={(e) => setNewRegistrationNumber(e.target.value)}
              />
            </td>
            <td>
              <Form.Control
                type="text"
                value={newDeputyVetName}
                onChange={(e) => setNewDeputyVetName(e.target.value)}
              />
            </td>
            <td>
              <Dropdown>
                <Dropdown.Toggle variant="primary">
                  {newRank || 'Select Rank'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {rankOptions.map((option) => (
                    <Dropdown.Item key={option} onClick={() => setNewRank(option)}>
                      {option}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </td>
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
              <Button variant="success" onClick={handleAddUserButton}>
                Add User
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <Footer />
    </div>
  );
};

export default DeputyVetCredentialsTable;
