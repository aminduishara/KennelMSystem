import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import Footer from '../Components/Footer';
import axios from './../axiosConfig';
import { useUser } from './../UserContext';
import { useLocation } from 'react-router-dom';

const AddDutyInfo = () => {
  const location = useLocation();
  const regNo = location.state.regNo;
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    dutyPlace: '',
    result: 'success',
    description: '',
  });
  const { userId } = useUser();

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

  const handleAddDutyInfo = async () => {
    if (!formData || !formData.date || !formData.time || !formData.dutyPlace || !formData.result || !formData.description) {
      alert('Please fill all the data');
      return;
    }
    const newDuty = { ...formData, regNo };
    try {
      const response = await axios.post('/addDuty', newDuty);

      if (response.status === 200 && response.data) {
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
      } else {
        console.error('Error adding duty:', response.data.message);
        alert('Failed to adding duty. Please try again.'); // Display user-friendly message
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error adding duty:', error);
      alert('An error occurred while adding duty. Please try again later.'); // Display user-friendly message
    }
  };

  const handleEditRow = (index) => {
    setEditableIndex(index);
  };

  const handleSaveRow = () => {
    setEditableIndex(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/getDuty?reg=' + regNo);
        if (response.data) {
          const modifiedData = response.data.map(item => ({
            date: formatDate(item.dutyDate), // Rename dutyData to date
            time: item.dutyTime, // Rename dutyTime to time
            ...item
          }));
          setDutyList(modifiedData);
        }
      } catch (error) {
        console.error('Error retrieving Users:', error);
        alert('An error occurred while retrieving Users. Please try again later.'); // Display user-friendly message
      }
    };

    fetchData();

  }, [])

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
