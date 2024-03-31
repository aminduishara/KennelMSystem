import React, {useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import Footer from '../Components/Footer';

const AddDutyInfo = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    dutyPlace: '',
    result: 'success',
    description: '',
  });
  
  const [dutyList, setDutyList] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDutyList = [...dutyList];
    updatedDutyList[index][name] = value;
    setDutyList(updatedDutyList);
  };

  const handleAddDutyInfo = () => {
    const newDuty = { ...formData };
    setDutyList([...dutyList, newDuty]);
    setFormData({
      date: '',
      time: '',
      dutyPlace: '',
      result: 'success',
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
      <h1 className="mb-4">Duty Information</h1>
      <Button variant="primary" onClick={handleShowModal}>
        Add Duty Information
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-dialog-scrollable">
        <Modal.Header closeButton>
          <Modal.Title>Add Duty Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDate">
              <Form.Label>Date:</Form.Label>
              <Form.Control type="date" name="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formDutyPlace">
              <Form.Label>Duty Place:</Form.Label>
              <Form.Control type="text" name="dutyPlace" value={formData.dutyPlace} onChange={(e) => setFormData({ ...formData, dutyPlace: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formTime"> {/* Manually enter time */}
              <Form.Label>Time:</Form.Label>
              <Form.Control type="time" name="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formResult">
              <Form.Label>Result:</Form.Label>
              <Form.Control as="select" name="result" value={formData.result} onChange={(e) => setFormData({ ...formData, result: e.target.value })}>
                <option value="success">Success</option>
                <option value="unsuccessful">Unsuccessful</option>
                <option value="in progress">In Progress</option>
              </Form.Control>
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
          <Button variant="primary" onClick={handleAddDutyInfo}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="mt-4">
        <h2>Duty List</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Duty Place</th>
              <th>Result</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dutyList.map((duty, index) => (
              <tr key={index}>
                <td>{editableIndex === index ? <Form.Control type="date" value={duty.date} name="date" onChange={(e) => handleChange(e, index)} /> : duty.date}</td>
                <td>{editableIndex === index ? <Form.Control type="time" value={duty.time} name="time" onChange={(e) => handleChange(e, index)} /> : duty.time}</td>
                
                <td>{editableIndex === index ? <Form.Control type="text" value={duty.dutyPlace} name="dutyPlace" onChange={(e) => handleChange(e, index)} /> : duty.dutyPlace}</td>
                <td>{editableIndex === index ? <Form.Control as="select" value={duty.result} name="result" onChange={(e) => handleChange(e, index)}><option value="success">Success</option><option value="unsuccessful">Unsuccessful</option><option value="in progress">In Progress</option></Form.Control> : duty.result}</td>
                <td>{editableIndex === index ? <Form.Control as="textarea" rows={3} value={duty.description} name="description" onChange={(e) => handleChange(e, index)} /> : duty.description}</td>
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

export default AddDutyInfo;
