import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import Footer from '../Components/Footer';

const DogProfile = (props) => {
    const formData = props.formData;

    const dummyData = {
        name: 'Buddy',
        breed: 'Bullmastif',
        gender: 'Male',
        source: 'Local',
        registeredDate: '2022-01-01',
        subject: 'Criminal',
        mealType: 'Meat',
        handlerName: 'K.Y Perera',
        registrationNumber: 'DOG123',  // Dummy registration number
    };

    // Merge formData with dummyData if formData is not provided
    const dogData = formData || dummyData;

    const [selectedSickType, setSelectedSickType] = useState('Select health status');
    const [selectedDutyType, setSelectedDutyType] = useState('Select duty status');

    const handleDutyTypeSelect = (eventKey) => {
        setSelectedDutyType(eventKey);
    };

    const handleAddDutyInfo = () => {
        // Navigate to AddDutyInfo page when the button is clicked
        navigate('/Pages/AddDutyInfo');
    };

    const handleAddTrainingInfo = () => {
        // Navigate to AddTrainingInfo page when the button is clicked
        navigate('/Pages/AddTrainingInfo');
    };

    const handleAddBreedingInfo = () => {
        // Navigate to AddBreedingInfo page when the button is clicked
        navigate('/Pages/AddBreedingInfo');
    };

    const handleSickTypeSelect = (eventKey) => {
        setSelectedSickType(eventKey);
    };

    const navigate = useNavigate();

    return (
        <div className="container-lg">
            <h1 className="mb-4">Handler Dashboard</h1>
            <div className="row">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body text-center">
                            <p><strong>Breed:</strong> {dogData.breed}</p>
                            <p><strong>Gender:</strong> {dogData.gender}</p>
                            <p><strong>Source:</strong> {dogData.source}</p>
                            <p><strong>Registered Date:</strong> {dogData.registeredDate}</p>
                            <p><strong>Subject:</strong> {dogData.subject}</p>
                            <p><strong>Meal Type:</strong> {dogData.mealType}</p>
                            <p><strong>Handler Name:</strong> {dogData.handlerName}</p>
                            
                        </div>
                    </div>
                    <div className="mt-4">
                        <DropdownButton id="duty-dropdown" title={selectedDutyType} onSelect={handleDutyTypeSelect}>
                            <Dropdown.Item eventKey="InDuty">In duty</Dropdown.Item>
                            <Dropdown.Item eventKey="Training">Training</Dropdown.Item>
                            <Dropdown.Item eventKey="Retired">Retired</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="position-relative">
                        <DropdownButton id="sick-dropdown" title={selectedSickType} onSelect={handleSickTypeSelect}>
                            <Dropdown.Item eventKey="Sick">Sick</Dropdown.Item>
                            <Dropdown.Item eventKey="Dead">Dead</Dropdown.Item>
                            <Dropdown.Item eventKey="Normal">Normal</Dropdown.Item>
                        </DropdownButton>
                        <img
                            src="/Images/Bullmustif.jpeg"
                            className="img-fluid rounded-circle mt-3"
                            style={{ width: '150px', height: '150px' }}
                            alt="Dog Avatar"
                        />
                        <p className="mt-3">Name: <strong>{dogData.name}</strong></p>
                        <p>Registration Number: <strong>{dogData.registrationNumber}</strong></p>
                    </div>
                    <div className="d-flex flex-column gap-3 mt-4">
                        <button type="button" className="btn btn-outline-primary btn-lg w-100" onClick={handleAddDutyInfo}>
                            Add Duty Information
                        </button>
                        <button type="button" className="btn btn-outline-primary btn-lg w-100" onClick={handleAddTrainingInfo}>
                            Add Training Information
                        </button>
                        <button type="button" className="btn btn-outline-primary btn-lg w-100" onClick={handleAddBreedingInfo}>
                            Add Breeding Information
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DogProfile;
