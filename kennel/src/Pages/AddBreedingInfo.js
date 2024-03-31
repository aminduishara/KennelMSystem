import React, { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import Footer from '../Components/Footer';


const AddBreedingInfo = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    maleDogName: '',
    maleDogRegistrationNumber: '',
    numberOfPuppiesBorn: '',
    numberOfPuppiesLiving: '',
    description: '',
  });

  const [breedingList, setBreedingList] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedBreedingList = [...breedingList];
    updatedBreedingList[index][name] = value;
    setBreedingList(updatedBreedingList);
  };

  const handleAddBreedingInfo = () => {
    const newBreeding = { ...formData };
    setBreedingList([...breedingList, newBreeding]);
    setFormData({
      date: '',
      maleDogName: '',
      maleDogRegistrationNumber: '',
      numberOfPuppiesBorn: '',
      numberOfPuppiesLiving: '',
      description: '',
    });
    handleCloseModal();
  };

  const handleEditRow = (index) => {
    setEditableIndex(index);
  };

  const handleSaveRow = () => {
    setEditableIndex(null);
  };

  return (
    <div className="container">
      <h1 className="mb-4">Breeding Information</h1>
      <Button variant="primary" onClick={handleShowModal}>
        Add Breeding Information
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-dialog-scrollable">
        <Modal.Header closeButton>
          <Modal.Title>Add Breeding Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDate">
              <Form.Label>Date:</Form.Label>
              <Form.Control type="date" name="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formMaleDogName">
              <Form.Label>Male Dog Name:</Form.Label>
              <Form.Control type="text" name="maleDogName" value={formData.maleDogName} onChange={(e) => setFormData({ ...formData, maleDogName: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formMaleDogRegistrationNumber">
              <Form.Label>Male Dog Registration Number:</Form.Label>
              <Form.Control type="text" name="maleDogRegistrationNumber" value={formData.maleDogRegistrationNumber} onChange={(e) => setFormData({ ...formData, maleDogRegistrationNumber: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formNumberOfPuppiesBorn">
              <Form.Label>Number of Puppies Borned:</Form.Label>
              <Form.Control type="number" min="0" name="numberOfPuppiesBorn" value={formData.numberOfPuppiesBorn} onChange={(e) => setFormData({ ...formData, numberOfPuppiesBorn: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formNumberOfPuppiesLiving">
              <Form.Label>Number of Puppies Living:</Form.Label>
              <Form.Control type="number" min="0" name="numberOfPuppiesLiving" value={formData.numberOfPuppiesLiving} onChange={(e) => setFormData({ ...formData, numberOfPuppiesLiving: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddBreedingInfo}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="mt-4">
        <h2>Breeding List</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Male Dog Name</th>
              <th>Male Dog Reg.Number</th>
              <th>Number of Puppies Borned</th>
              <th>Number of Puppies Living</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {breedingList.map((breeding, index) => (
              <tr key={index}>
                <td>{editableIndex === index ? <Form.Control type="date" value={breeding.date} name="date" onChange={(e) => handleChange(e, index)} /> : breeding.date}</td>
                <td>{editableIndex === index ? <Form.Control type="text" value={breeding.maleDogName} name="maleDogName" onChange={(e) => handleChange(e, index)} /> : breeding.maleDogName}</td>
                <td>{editableIndex === index ? <Form.Control type="text" value={breeding.maleDogRegistrationNumber} name="maleDogRegistrationNumber" onChange={(e) => handleChange(e, index)} /> : breeding.maleDogRegistrationNumber}</td>
                <td>{editableIndex === index ? <Form.Control type="text" value={breeding.numberOfPuppiesBorn} name="numberOfPuppiesBorn" onChange={(e) => handleChange(e, index)} /> : breeding.numberOfPuppiesBorn}</td>
                <td>{editableIndex === index ? <Form.Control type="text" value={breeding.numberOfPuppiesLiving} name="numberOfPuppiesLiving" onChange={(e) => handleChange(e, index)} /> : breeding.numberOfPuppiesLiving}</td>
                <td>{editableIndex === index ? <Form.Control as="textarea" rows={3} value={breeding.description} name="description" onChange={(e) => handleChange(e, index)} /> : breeding.description}</td>
                <td>
                  {editableIndex === index ? (
                    <Button variant="success" onClick={handleSaveRow}>Save</Button>
                  ) : (
                    <Button variant="info" onClick={() => handleEditRow(index)}>Edit</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Footer />
    </div>
  );
};

export default AddBreedingInfo;
