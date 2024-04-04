import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import Footer from '../Components/Footer';

const HandlerCredentialsTable = () => {
  const [credentials, setCredentials] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedPassword, setEditedPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Function to add a new credential
  const addCredential = (username, password) => {
    const newId = credentials.length + 1;
    const newCredential = { id: newId, username, password };
    setCredentials([...credentials, newCredential]);
  };

  // Function to edit an existing credential
  const editCredential = (id, username, password) => {
    const updatedCredentials = credentials.map(item => {
      if (item.id === id) {
        return { ...item, username, password };
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

  const handleAddUser = () => {
    addCredential(newUsername, newPassword);
    setNewUsername('');
    setNewPassword('');
  };

  const handleDelete = (id) => {
    deleteCredential(id);
  };

  return (
    <div>
      <h3 class="text-center">Handler Credentials Table</h3><br/>
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
      <Footer/>
    </div>
  );
};

export default HandlerCredentialsTable;
