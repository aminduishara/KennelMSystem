import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//import { Dropdown, DropdownButton } from 'react-bootstrap';
import '../App.css';
import Footer from '../Components/Footer';
import { useLocation } from 'react-router-dom';
import axios from './../axiosConfig';

const DeputyVetSearchedDogProfile = () => {
    const location = useLocation();
    const accountId = location.state.accountId;
    const navigate = useNavigate();

    const [dogData, setDogData] = useState();

    const handleAddHealthInfo = () => {
        navigate('/Pages/AddHealthInfo', { state: { regNo: dogData.regNo } });
    };

    const handleAddVaccinationInfo = () => {
        navigate('/Pages/AddVaccinationInfo', { state: { regNo: dogData.regNo } });
    };

    const handleAddDeathInfo = () => {
        navigate('/Pages/AddDeathInfo', { state: { regNo: dogData.regNo } });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/getDogInfo2?reg=' + accountId);
                console.log(response.data[0]);
                setDogData(response.data[0]);
            } catch (error) {
                console.error('Error retrieving Users:', error);
                alert('An error occurred while retrieving Users. Please try again later.'); // Display user-friendly message
            }
        };

        fetchData();

    }, [])

    if (dogData != null) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <img
                            src={process.env.REACT_APP_API_URL + "/" + dogData.imagePath}
                            alt={dogData.name}
                            className="img-fluid rounded-circle"
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="col-md-8">
                        <h2 className="mt-3 mb-4">Health Information</h2>
                        {/* <p><strong>Current Sick Type:</strong> {sickType}</p> */}
                        <div className="d-flex flex-column">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="row">
                                        <strong>Account ID:</strong>
                                    </div>
                                    <div className="row">
                                        <strong>Name:</strong>
                                    </div>
                                    <div className="row">
                                        <strong>Registration Number:</strong>
                                    </div>
                                    <div className="row">
                                        <strong>Handler's Name:</strong>
                                    </div>
                                    <div className="row">
                                        <strong>Breed:</strong>
                                    </div>
                                    <div className="row">
                                        <strong>Gender:</strong>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        {accountId}
                                    </div>
                                    <div className="row">
                                        {dogData.name}
                                    </div>
                                    <div className="row">
                                        {dogData.regNo}
                                    </div>
                                    <div className="row">
                                        {dogData.username}
                                    </div>
                                    <div className="row">
                                        {dogData.breedId}
                                    </div>
                                    <div className="row">
                                        {dogData.gender}
                                    </div>
                                </div>
                            </div>
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
    } else {
        return null; // or any fallback component or message
    }
};

export default DeputyVetSearchedDogProfile;