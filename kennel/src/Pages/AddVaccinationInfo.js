import React, { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import Footer from '../Components/Footer';

const AddVaccinationInfo = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    vaccinationName: '',
    nextVaccinationDate: '',
    notes: '',
  });
  const [vaccinationList, setVaccinationList] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedVaccinationList = [...vaccinationList];
    updatedVaccinationList[index][name] = value;
    setVaccinationList(updatedVaccinationList);
  };

  const handleAddVaccinationInfo = () => {
    const newVaccination = { ...formData };
    setVaccinationList([...vaccinationList, newVaccination]);
    setFormData({
      date: '',
      vaccinationName: '',
      nextVaccinationDate: '',
      notes: '',
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
      <h1 className="mb-4">Vaccination Information</h1>
      <Button variant="primary" onClick={handleShowModal}>
        Add Vaccination Information
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-dialog-scrollable">
        <Modal.Header closeButton>
          <Modal.Title>Add Vaccination Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDate">
              <Form.Label>Date:</Form.Label>
              <Form.Control type="date" name="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formVaccinationName">
              <Form.Label>Vaccination Name:</Form.Label>
              <Form.Control as="select" name="vaccinationName" value={formData.vaccinationName} onChange={(e) => setFormData({ ...formData, vaccinationName: e.target.value })}>
                <option value="parvo">Parvo</option>
                <option value="dap">DAP</option>
                <option value="rabies">Rabies</option>
                <option value="dhpp">DHPP</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formNextVaccinationDate">
              <Form.Label>Next Vaccination Date:</Form.Label>
              <Form.Control type="date" name="nextVaccinationDate" value={formData.nextVaccinationDate} onChange={(e) => setFormData({ ...formData, nextVaccinationDate: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formNotes">
              <Form.Label>Notes:</Form.Label>
              <Form.Control as="textarea" rows={3} name="notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddVaccinationInfo}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="mt-4">
        <h2>Vaccination List</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Vaccination Name</th>
              <th>Next Vaccination Date</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vaccinationList.map((vaccination, index) => (
              <tr key={index}>
                <td>{editableIndex === index ? <Form.Control type="date" value={vaccination.date} name="date" onChange={(e) => handleChange(e, index)} /> : vaccination.date}</td>
                <td>{editableIndex === index ? <Form.Control as="select" value={vaccination.vaccinationName} name="vaccinationName" onChange={(e) => handleChange(e, index)}><option value="Vaccine A">Vaccine A</option><option value="Vaccine B">Vaccine B</option><option value="Vaccine C">Vaccine C</option></Form.Control> : vaccination.vaccinationName}</td>
                <td>{editableIndex === index ? <Form.Control type="date" value={vaccination.nextVaccinationDate} name="nextVaccinationDate" onChange={(e) => handleChange(e, index)} /> : vaccination.nextVaccinationDate}</td>
                <td>{editableIndex === index ? <Form.Control as="textarea" rows={3} value={vaccination.notes} name="notes" onChange={(e) => handleChange(e, index)} /> : vaccination.notes}</td>
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
      <Footer/>
    </div>
  );
};

export default AddVaccinationInfo;