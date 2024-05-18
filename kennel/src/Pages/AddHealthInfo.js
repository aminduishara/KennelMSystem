import React, { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import Footer from '../Components/Footer';
import axios from './../axiosConfig';
import { useLocation } from 'react-router-dom';

const AddHealthInfo = () => {
  const location = useLocation();
  const regNo = location.state.regNo;

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    longtermSicknesses: "",
    currentSickness: "",
    medicineRecommendations: [],
    nextClinicDate: "",
    notes: "",
    medicineGiven: "",
  });
  const [healthList, setHealthList] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const updatedHealthList = [...healthList];
    if (type === "checkbox") {
      if (checked) {
        updatedHealthList[index].medicineRecommendations.push(value);
      } else {
        updatedHealthList[index].medicineRecommendations = updatedHealthList[
          index
        ].medicineRecommendations.filter((item) => item !== value);
      }
    } else {
      updatedHealthList[index][name] = value;
    }
    setHealthList(updatedHealthList);
  };

  const handleAddHealthInfo = async () => {
    if (!formData || !formData.date || !formData.longtermSicknesses || !formData.currentSickness || !formData.nextClinicDate || !formData.notes) {
      alert('Please fill all the data');
      return;
    }
    const newHealth = { ...formData, regNo };

    try {
      const response = await axios.post('/addHealth', newHealth);

      if (response.status === 200 && response.data) {
        setHealthList([...healthList, newHealth]);
        setFormData({
          date: '',
          longtermSicknesses: '',
          currentSickness: '',
          medicineRecommendations: [],
          nextClinicDate: '',
          notes: '',
        });
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
        const response = await axios.get('/getHealth?reg=' + regNo);
        if (response.data) {
          const modifiedData = response.data.map(item => ({
            ...item,
            date: formatDate(item.date),
            medicineRecommendations: JSON.parse(item.recommendation),
            nextClinicDate: item.clinicDate,
            longtermSicknesses: item.longtermSickness
          }));
          setHealthList(modifiedData);
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

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setFormData(prevState => ({
      ...prevState,
      medicineRecommendations: checked
        ? [...prevState.medicineRecommendations, value]
        : prevState.medicineRecommendations.filter(item => item !== value)
    }));
  };

  return (
    <div className="container">
      <h1 className="mb-4 text-center fw-bold">Health Information</h1>
      <Button variant="primary fw-bold" onClick={handleShowModal}>
        Add Health Information
      </Button>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="modal-dialog-scrollable"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Health Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDate">
              <Form.Label>Date:</Form.Label>
              <Form.Control
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formLongtermSicknesses">
              <Form.Label>Longterm Sicknesses:</Form.Label>
              <Form.Control
                type="text"
                name="longtermSicknesses"
                value={formData.longtermSicknesses}
                onChange={(e) => {
                  const inputText = e.target.value;
                  if (/^[a-zA-Z][a-zA-Z\s]*$/.test(inputText)) {
                    setFormData({ ...formData, longtermSicknesses: inputText });
                  } else {
                    alert("Please enter text only.");
                  }
                }}
              />
            </Form.Group>

            <Form.Group controlId="formCurrentSickness">
              <Form.Label>Current Sickness:</Form.Label>
                  <Form.Control
                        type="text"
                        name="currentSickness"
                        value={formData.currentSickness}
                        onChange={(e) => {
                          const inputText = e.target.value;
                          if (/^[a-zA-Z][a-zA-Z\s]*$/.test(inputText)) {
                            setFormData({ ...formData, currentSickness: inputText });
                          } else {
                            alert("Please enter text only. ");
                          }
                        }}
                />
            </Form.Group>

            <Form.Group controlId="formMedicineGiven">
              <Form.Label>Medicine Given:</Form.Label>
              <Form.Control
                type="text"
                name="medicineGiven"
                value={formData.medicineGiven}
                onChange={(e) => {
                  const inputText = e.target.value;
                  if (/^[a-zA-Z][a-zA-Z0-9\s]*$/.test(inputText)) {
                    setFormData({ ...formData, medicineGiven: inputText });
                  } else {
                    alert("Please enter text only.");
                  }
                }}
              />
            </Form.Group>

            <Form.Group controlId="formMedicineRecommendations">
              <Form.Label>Medicine Recommendations:</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  label="Tablets"
                  value="Tablets"
                  checked={formData.medicineRecommendations.includes('Tablets')}
                  onChange={handleCheckboxChange}
                  id="formMedicineRecommendations1"
                />
                <Form.Check
                  type="checkbox"
                  label="Vaccine"
                  value="Vaccine"
                  checked={formData.medicineRecommendations.includes('Vaccine')}
                  onChange={handleCheckboxChange}
                  id="formMedicineRecommendations2"
                />
                <Form.Check
                  type="checkbox"
                  label="Liquid"
                  value="Liquid"
                  checked={formData.medicineRecommendations.includes('Liquid')}
                  onChange={handleCheckboxChange}
                  id="formMedicineRecommendations3"
                />
              </div>
            </Form.Group>
            <Form.Group controlId="formNextClinicDate">
              <Form.Label>Next Clinic Date:</Form.Label>
              <Form.Control
                type="date"
                name="nextClinicDate"
                value={formData.nextClinicDate}
                onChange={(e) =>
                  setFormData({ ...formData, nextClinicDate: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formNotes">
              <Form.Label>Notes:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
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
      <Footer />
    </div>
  );
};

export default AddHealthInfo;
