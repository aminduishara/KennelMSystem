import React, { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import Footer from '../Components/Footer';

const AddTrainingInfo = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    trainingName: '',
    subject: '',
    environment: '',
    recommendedDuration: '',
    startDate: '',
    endDate: '',
    weaknesses: '',
    description: '',
  });
  const [trainingList, setTrainingList] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);

  // Handle form popups
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTrainingList = [...trainingList];
    updatedTrainingList[index][name] = value;
    setTrainingList(updatedTrainingList);
  };

  const handleTrainingInfo = () => {
    const newTraining = { ...formData };
    setTrainingList([...trainingList, newTraining]);
    setFormData({
      date: '',
      trainingName: '',
      subject: '',
      environment: '',
      recommendedDuration: '',
      startDate: '',
      endDate: '',
      weaknesses: '',
      description: '',
    });
    handleCloseModal(); // Close modal after adding training info
  };

  const handleEditRow = (index) => {
    setEditableIndex(index);
  };

  const handleSaveRow = () => {
    setEditableIndex(null);
  };

  return (
    <div className="container">
      <h1 className="mb-4">Training Information</h1>
      <Button variant="primary" onClick={handleShowModal}>
        Add Training Information
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-dialog-scrollable">
        <Modal.Header closeButton>
          <Modal.Title>Add Training Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          <Form>
            <Form.Group controlId="formDate">
              <Form.Label>Date:</Form.Label>
              <Form.Control type="date" name="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="trainingName">
              <Form.Label>Training Name:</Form.Label>
              <Form.Control type="text" name="TrainingName" value={formData.trainingName} onChange={(e) => setFormData({ ...formData, trainingName: e.target.value })} />
            </Form.Group>

            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control as="select" name="subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}>
                <option value="success">Narcotic</option>
                <option value="unsuccessful">Explosive</option>
                <option value="in progress">Criminal</option>
              </Form.Control>
            </Form.Group>


            <Form.Group controlId="environment">
              <Form.Label>Environment:</Form.Label>
              <Form.Control type="text" name="environment" value={formData.environment} onChange={(e) => setFormData({ ...formData, environment: e.target.value })} />
            </Form.Group>

            <Form.Group controlId="recommendedDuration">
              <Form.Label>Recommeneded Duration:</Form.Label>
              <Form.Control type="text" name="recommendedDuration" value={formData.recommendedDuration} onChange={(e) => setFormData({ ...formData, recommendedDuration: e.target.value })} />
            </Form.Group>

            <Form.Group controlId="startDate">
              <Form.Label>Start Date:</Form.Label>
              <Form.Control type="date" name="startDate" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
            </Form.Group>

            <Form.Group controlId="endDate">
              <Form.Label>End Date:</Form.Label>
              <Form.Control type="date" name="endDate" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
            </Form.Group>

            <Form.Group controlId="weaknesses">
              <Form.Label>Weaknesses:</Form.Label>
              <Form.Control type="text" name="weaknesses" value={formData.weaknesses} onChange={(e) => setFormData({ ...formData, weaknesses: e.target.value })} />
            </Form.Group>


            
            <Form.Group controlId="trainingDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control as="textarea" rows={5} name="trainingDescription" value={formData.trainingDescription} onChange={(e) => setFormData({ ...formData, trainingDescription: e.target.value })} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleTrainingInfo}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="mt-4">
        <h2>Training List</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Training Name</th>
              <th>Subject</th>
              <th>Environment</th>
              <th>Recommeneded Duration</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Weaknesses</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainingList.map((training, index) => (
              <tr key={index}>
                
                
                
                
                <td>{editableIndex === index ? <Form.Control type="date" value={training.date} name="date" onChange={(e) => handleChange(e, index)} /> : training.date}</td>
                <td>{editableIndex === index ? <Form.Control type="text" value={training.trainingName} name="trainingName" onChange={(e) => handleChange(e, index)} /> : training.trainingName}</td>
                <td>{editableIndex === index ? <Form.Control as="select" value={training.subject} name="subject" onChange={(e) => handleChange(e, index)}><option value="success">Narcotic</option><option value="unsuccessful">Explosive</option><option value="in progress">Criminal</option></Form.Control> : training.subject}</td>
                <td>{editableIndex === index ? <Form.Control type="text" value={training.environment} name="environment" onChange={(e) => handleChange(e, index)} /> : training.environment}</td>
                <td>{editableIndex === index ? <Form.Control type="text" value={training.recommendedDuration} name="recommendedDuration" onChange={(e) => handleChange(e, index)} /> : training.recommendedDuration}</td>
                <td>{editableIndex === index ? <Form.Control type="date" value={training.startDate} name="startDate" onChange={(e) => handleChange(e, index)} /> : training.startDate}</td>
                <td>{editableIndex === index ? <Form.Control type="date" value={training.endDate} name="endDate" onChange={(e) => handleChange(e, index)} /> : training.endDate}</td>
                <td>{editableIndex === index ? <Form.Control type="text" value={training.weaknesses} name="weaknesses" onChange={(e) => handleChange(e, index)} /> : training.weaknesses}</td>
                <td>{editableIndex === index ? <Form.Control as="textarea" rows={5} value={training.trainingDescription} name="trainingDescription" onChange={(e) => handleChange(e, index)} /> : training.trainingDescription}</td>
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

export default AddTrainingInfo;
