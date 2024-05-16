import React, { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import Footer from '../Components/Footer';

const AddHealthInfo = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    longtermSicknesses: '',
    currentSickness: '',
    medicineRecommendations: [],
    nextClinicDate: '',
    notes: '',
    medicineGiven: '',
  });
  const [healthList, setHealthList] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const updatedHealthList = [...healthList];
    if (type === 'checkbox') {
      if (checked) {
        updatedHealthList[index].medicineRecommendations.push(value);
      } else {
        updatedHealthList[index].medicineRecommendations = updatedHealthList[index].medicineRecommendations.filter(
          (item) => item !== value
        );
      }
    } else {
      updatedHealthList[index][name] = value;
    }
    setHealthList(updatedHealthList);
  };

  const handleAddHealthInfo = () => {
    const newHealth = { ...formData };
    setHealthList([...healthList, newHealth]);
    setFormData({
      date: '',
      longtermSicknesses: '',
      currentSickness: '',
      medicineRecommendations: [],
      nextClinicDate: '',
      notes: '',
      medicineGiven: '',
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
      <h1 className="mb-4 text-center fw-bold">Health Information</h1>
      <Button variant="primary fw-bold" onClick={handleShowModal}>
        Add Health Information
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-dialog-scrollable">
        <Modal.Header closeButton>
          <Modal.Title>Add Health Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDate">
              <Form.Label>Date:</Form.Label>
              <Form.Control type="date" name="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formLongtermSicknesses">
              <Form.Label>Longterm Sicknesses:</Form.Label>
              <Form.Control type="text" name="longtermSicknesses" value={formData.longtermSicknesses} onChange={(e) => setFormData({ ...formData, longtermSicknesses: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formCurrentSickness">
              <Form.Label>Current Sickness:</Form.Label>
              <Form.Control type="text" name="currentSickness" value={formData.currentSickness} onChange={(e) => setFormData({ ...formData, currentSickness: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formMedicineGiven">
              <Form.Label>Medicine Given:</Form.Label>
              <Form.Control type="text" name="medicineGiven" value={formData.medicineGiven} onChange={(e) => setFormData({ ...formData, medicineGiven: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formMedicineRecommendations">
              <Form.Label>Medicine Recommendations:</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  label="Tablets"
                  value="Tablets"
                  checked={formData.medicineRecommendations.includes('Tablets')}
                  onChange={(e) => setFormData({ ...formData, medicineRecommendations: e.target.checked ?
                  [...formData.medicineRecommendations, 'Tablets'] : formData.medicineRecommendations.filter((item) => item !== 'Tablets') })}
                />
                <Form.Check
                  type="checkbox"
                  label="Vaccine"
                  value="Vaccine"
                  checked={formData.medicineRecommendations.includes('Vaccine')}
                  onChange={(e) => setFormData({ ...formData, medicineRecommendations: e.target.checked ? 
                 [...formData.medicineRecommendations, 'Vaccine'] : formData.medicineRecommendations.filter((item) => item !== 'Vaccine') })}
                />
                <Form.Check
                  type="checkbox"
                  label="Liquid"
                  value="Liquid"
                  checked={formData.medicineRecommendations.includes('Liquid')}
                  onChange={(e) => setFormData({ ...formData, medicineRecommendations: e.target.checked ? 
                  [...formData.medicineRecommendations, 'Liquid'] : formData.medicineRecommendations.filter((item) => item !== 'Liquid') })}
                />
              </div>
            </Form.Group>
            <Form.Group controlId="formNextClinicDate">
              <Form.Label>Next Clinic Date:</Form.Label>
              <Form.Control type="date" name="nextClinicDate" value={formData.nextClinicDate} onChange={(e) => setFormData({ ...formData, nextClinicDate: e.target.value })} />
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
          <Button variant="primary" onClick={handleAddHealthInfo}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="mt-4">
        <h2>Health List</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Longterm Sicknesses</th>
              <th>Current Sickness</th>
              <th>Medicine Given</th>
              <th>Medicine Recommendations</th>
              <th>Next Clinic Date</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {healthList.map((health, index) => (
              <tr key={index}>
                <td>{editableIndex === index ? <Form.Control type="date" value={health.date} name="date" 
                 onChange={(e) => handleChange(e, index)} /> : health.date}</td>
                <td>{editableIndex === index ? <Form.Control type="text" value={health.longtermSicknesses} name="longtermSicknesses"
                 onChange={(e) => handleChange(e, index)} /> : health.longtermSicknesses}</td>
                <td>{editableIndex === index ? <Form.Control type="text" value={health.currentSickness} name="currentSickness" 
                onChange={(e) => handleChange(e, index)} /> : health.currentSickness}</td>
                <td>{editableIndex === index ? <Form.Control type="text" value={health.medicineGiven} name="medicineGiven" 
                onChange={(e) => handleChange(e, index)} /> : health.medicineGiven}</td>
                <td>
                  {editableIndex === index ? (
                    <div>
                      <Form.Check
                        type="checkbox"
                        label="Tablets"
                        value="Tablets"
                        checked={
                            health.medicineRecommendations.includes('Tablets')}
                            onChange={(e) => handleChange(e, index)}
                          />
                          <Form.Check
                            type="checkbox"
                            label="Vaccine"
                            value="Vaccine"
                            checked={health.medicineRecommendations.includes('Vaccine')}
                            onChange={(e) => handleChange(e, index)}
                          />
                          <Form.Check
                            type="checkbox"
                            label="Liquid"
                            value="Liquid"
                            checked={health.medicineRecommendations.includes('Liquid')}
                            onChange={(e) => handleChange(e, index)}
                          />
                        </div>
                      ) : (
                        health.medicineRecommendations.join(', ')
                      )}
                    </td>
                    <td>{editableIndex === index ? <Form.Control type="date" value={health.nextClinicDate} name="nextClinicDate" 
                    onChange={(e) => handleChange(e, index)} /> : health.nextClinicDate}</td>
                    <td>{editableIndex === index ? <Form.Control as="textarea" rows={3} value={health.notes} name="notes"
                     onChange={(e) => handleChange(e, index)} /> : health.notes}</td>
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
    
    export default AddHealthInfo;
