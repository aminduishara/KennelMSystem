import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//import { Dropdown, DropdownButton } from 'react-bootstrap';
import '../App.css';
import Footer from '../Components/Footer';


const DeputyVetSearchedDogProfile = ({ sickType }) => {
    const { accountId } = useParams();
    const navigate = useNavigate();

    const handleAddHealthInfo = () => {
        navigate('/Pages/AddHealthInfo');
    };

    const handleAddVaccinationInfo = () => {
        navigate('/Pages/AddVaccinationInfo');
    };

    const handleAddDeathInfo = () => {
        navigate('/Pages/AddDeathInfo');
    }

    const dogData = {
        id: 1,
        name: 'Buddy',
        registrationNumber: 'DOG123',
        handlerName: 'T.M Karunaratne',
        breed: 'German Shepherd',
        gender: 'Male',
        mealType: 'Beef',
        image: '/Images/Bullmustif.jpeg',
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={dogData.image}
                        alt={dogData.name}
                        className="img-fluid rounded-circle"
                        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                    />
                </div>
                <div className="col-md-8">
                    <h2 className="mt-3 mb-4">Health Information</h2>
                    <p>Account ID: {accountId}</p>
                    <p><strong>Current Sick Type:</strong> {sickType}</p>
                    <div className="d-flex flex-column">
                        <p><strong>Name:</strong> {dogData.name}</p>
                        <p><strong>Registration Number:</strong> {dogData.registrationNumber}</p>
                        <p><strong>Handler's Name:</strong>{dogData.handlerName}</p>
                        <p><strong>Breed:</strong> {dogData.breed}</p>
                        <p><strong>Gender:</strong> {dogData.gender}</p>
                        <p><strong>Meal Type:</strong> {dogData.mealType}</p>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="d-flex justify-content-start gap-4">
                        <button className="btn btn-primary btn-lg" onClick={handleAddHealthInfo}>Add Health Information</button>
                        
                        <button className="btn btn-primary btn-lg" onClick={handleAddVaccinationInfo}>Add Vaccination Information</button>
                        <button className="btn btn-primary btn-lg" class="btn btn-danger" onClick={handleAddDeathInfo}>Record Death Information</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DeputyVetSearchedDogProfile;