import React, { useState } from 'react';
import { Table, Button, Form, Dropdown } from 'react-bootstrap';
import Footer from '../Components/Footer';
import axios from 'axios';

const HandlerCredentialsTable = () => {
  const [credentials, setCredentials] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedPassword, setEditedPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newHandlerName, setNewHandlerName] = useState('');
  const [newRegistrationNumber, setNewRegistrationNumber] = useState('');
  const [newRank, setNewRank] = useState('');

  // Function to add a new credential
  const addCredential = (username, password, handlerName, registrationNumber, rank) => {
    const newId = credentials.length + 1;
    const newCredential = { id: newId, username, password, handlerName, registrationNumber, rank };
    setCredentials([...credentials, newCredential]);
  };

  // Function to edit an existing credential
  const editCredential = (id, username, password, handlerName, registrationNumber, rank) => {
    const updatedCredentials = credentials.map(item => {
      if (item.id === id) {
        return { ...item, username, password, handlerName, registrationNumber, rank };
      }
      return item;
    });
    setCredentials(updatedCredentials);
  };

  // Function to delete a credential
  const deleteCredential = (id) => {
    const updatedCredentials = credentials.filter(item => item.id !== id);
    setCredentials(updatedCredentials);
  };

  const handleEdit = (id, username, password, handlerName, registrationNumber, rank) => {
    setEditableId(id);
    setEditedUsername(username);
    setEditedPassword(password);
    setPasswordVisible(true);
    setNewHandlerName(handlerName);
    setNewRegistrationNumber(registrationNumber);
    setNewRank(rank);
  };

  const handleSave = (id) => {
    if (editableId === id) {
      editCredential(id, editedUsername, editedPassword, newHandlerName, newRegistrationNumber, newRank);
      setEditableId(null);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/kennel/handler', {
        username: newUsername,
        password: newPassword,
        handlerName: newHandlerName,
        registrationNumber: newRegistrationNumber,
        rank: newRank,
      });
      console.log(response.data); // Log the response data if needed
      // Add any additional logic after successful API call
    } catch (error) {
      console.error('Error adding user:', error);
      // Handle error scenario, show error message, etc.
    }
  };

  // const handleAddUser = () => {
  //   addCredential(newUsername, newPassword, newHandlerName, newRegistrationNumber, newRank);
  //   setNewUsername('');
  //   setNewPassword('');
  //   setNewHandlerName('');
  //   setNewRegistrationNumber('');
  //   setNewRank('');
  // };

  const handleDelete = (id) => {
    deleteCredential(id);
  };

  const rankOptions = ['Constable', 'Sergeant', 'SI']; // Add your rank options here

  return (
    <div>
      <h3 className="text-center">Handler Credentials Table</h3><br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Registration Number</th>
            <th>Handler Name</th>
            <th>Rank</th>
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
                    value={newRegistrationNumber}
                    onChange={(e) => setNewRegistrationNumber(e.target.value)}
                  />
                ) : (
                  credential.registrationNumber
                )}
              </td>
              <td>
                {editableId === credential.id ? (
                  <Form.Control
                    type="text"
                    value={newHandlerName}
                    onChange={(e) => setNewHandlerName(e.target.value)}
                  />
                ) : (
                  credential.handlerName
                )}
              </td>
              <td>
                {editableId === credential.id ? (
                  <Dropdown>
                    <Dropdown.Toggle variant="primary">
                      {newRank || 'Select Rank'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {rankOptions.map(option => (
                        <Dropdown.Item key={option} onClick={() => setNewRank(option)}>
                          {option}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
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
              </td>
              <td>
                {editableId === credential.id ? (
                  <Button variant="success" className="me-2" onClick={() => handleSave(credential.id)}>Save</Button>
                ) : (
                  <Button variant="primary" className="me-2" onClick={() => handleEdit(credential.id, credential.username, credential.password, credential.handlerName, credential.registrationNumber, credential.rank)}>Edit</Button>
                )}
                <Button variant="danger" className="custom-delete-btn-handlerCredentialTable" onClick={() => handleDelete(credential.id)}>Delete</Button>
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
                value={newHandlerName}
                onChange={(e) => setNewHandlerName(e.target.value)}
              />
            </td>
            <td>
              <Dropdown>
                <Dropdown.Toggle variant="primary">
                  {newRank || 'Select Rank'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {rankOptions.map(option => (
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
              <Button variant="success" onClick={handleAddUser}>Add User</Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <Footer />
    </div>
  );
};

export default HandlerCredentialsTable;
