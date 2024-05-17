import React, { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import Footer from '../Components/Footer';
import axios from './../axiosConfig';
import { useLocation } from 'react-router-dom';

const AddDeathInfo = () => {
  const location = useLocation();
  const regNo = location.state.regNo;
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    ageYears: '',
    ageMonths: '',
    generalReason: '',
    notes: '',
  });
  const [deathList, setDeathList] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);
  const [disableAddButton, setDisableAddButton] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDeathList = [...deathList];
    updatedDeathList[index][name] = value;
    setDeathList(updatedDeathList);
  };

  const handleAddDeathInfo = async () => {
    if (!formData || !formData.date || !formData.ageYears || !formData.ageMonths || !formData.generalReason || !formData.notes) {
      alert('Please fill all the data');
      return;
    }
    const newGeneral = { ...formData, regNo };
    try {
      const response = await axios.post('/addGeneral', newGeneral);

      if (response.status === 200 && response.data) {

        setDeathList([...deathList, newGeneral]);
        setFormData({
          date: '',
          ageYears: '',
          ageMonths: '',
          generalReason: '',
          notes: '',
        });
        setDisableAddButton(true);
        handleCloseModal();
      } else {
        console.error('Error adding breeding:', response.data.message);
        alert('Failed to adding breeding. Please try again.'); // Display user-friendly message
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error adding breeding:', error);
      alert('An error occurred while adding breeding. Please try again later.'); // Display user-friendly message
    }
  };

  const handleEditRow = (index) => {
    setEditableIndex(index);
  };

  const handleSaveRow = () => {
    setEditableIndex(null);
  };

  useState(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/getGeneral?reg=' + regNo);
        if (response.data) {
          const modifiedData = response.data.map(item => ({
            ...item,
            date: formatDate(item.date),
            ageYears: item.age_years,
            ageMonths: item.age_months,
            generalReason: item.reason,
            notes: item.notes
          }));
          setDeathList(modifiedData);
        }
      } catch (error) {
        console.error('Error retrieving Users:', error);
        alert('An error occurred while retrieving Users. Please try again later.'); // Display user-friendly message
      }
    };

    fetchData();
  }, []);

  // Format date to 'Y-m-d' (Year-Month-Day) format
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    let month = (1 + formattedDate.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month; // Add leading zero if month is single digit
    let day = formattedDate.getDate().toString();
    day = day.length > 1 ? day : '0' + day; // Add leading zero if day is single digit
    return year + '-' + month + '-' + day;
  };

  return (
    <div className="container">
      <h1 className="mb-4">General Death Information</h1>
      {deathList.length <= 0 &&
        <Button variant="primary" onClick={handleShowModal} disabled={disableAddButton}>
          Add Death Information
        </Button>
      }

      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-dialog-scrollable">
        <Modal.Header closeButton>
          <Modal.Title>Add Death Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDate">
              <Form.Label>Date:</Form.Label>
              <Form.Control type="date" name="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formAgeYears">
              <Form.Label>Age (Years):</Form.Label>
              <Form.Control type="number" name="ageYears" value={formData.ageYears} onChange={(e) => setFormData({ ...formData, ageYears: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formAgeMonths">
              <Form.Label>Age (Months):</Form.Label>
              <Form.Control type="number" name="ageMonths" value={formData.ageMonths} onChange={(e) => setFormData({ ...formData, ageMonths: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formGeneralReason">
              <Form.Label>General Reason:</Form.Label>
              <Form.Control type="text" name="generalReason" value={formData.generalReason} onChange={(e) => setFormData({ ...formData, generalReason: e.target.value })} />
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
          <Button variant="primary" onClick={handleAddDeathInfo}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="mt-4">

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Age</th>
              <th>General Reason</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deathList.map((death, index) => (
              <tr key={index}>
                <td>{editableIndex === index ? <Form.Control type="date" value={death.date} name="date" onChange={(e) => handleChange(e, index)} /> : death.date}</td>
                <td>
                  {editableIndex === index ? (
                    <div>
                      <Form.Control type="number" className="mr-2" value={death.ageYears} name="ageYears" onChange={(e) => handleChange(e, index)} />
                      <Form.Control type="number" value={death.ageMonths} name="ageMonths" onChange={(e) => handleChange(e, index)} />
                    </div>
                  ) : (
                    `${death.ageYears} years ${death.ageMonths} months`
                  )}
                </td>
                <td>{editableIndex === index ? <Form.Control type="text" value={death.generalReason} name="generalReason" onChange={(e) => handleChange(e, index)} /> : death.generalReason}</td>
                <td>{editableIndex === index ? <Form.Control as="textarea" rows={3} value={death.notes} name="notes" onChange={(e) => handleChange(e, index)} /> : death.notes}</td>
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

export default AddDeathInfo;
