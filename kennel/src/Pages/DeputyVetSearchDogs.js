import React, { useState, useEffect } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../App.css';
import Footer from '../Components/Footer';
import axios from './../axiosConfig';
import { useUser } from './../UserContext';

const DeputyVetSearchDogs = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [searchQuery, setSearchQuery] = useState('');
    const [dogAccounts, setDogAccounts] = useState([]);
    const { userId } = useUser();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchClick = () => {
        // Perform search or filtering based on the searchQuery state
        console.log('Search query:', searchQuery);

        // Dummy data for demonstration
        const dummyDogAccount = { id: 1, name: 'Aliska', registrationNumber: '3154' };

        // Set the dog accounts with the dummy data for demonstration
        setDogAccounts([dummyDogAccount]);
    };

    const handleDogAccountClick = (accountId) => {
        navigate('/Pages/DeputyVetSearchedDogProfile', { state: { accountId: accountId } });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/getDogs');
                if (response.data) {
                    setDogAccounts(response.data);
                }
            } catch (error) {
                console.error('Error retrieving Users:', error);
                alert('An error occurred while retrieving Users. Please try again later.'); // Display user-friendly message
            }
        };

        fetchData();

    }, [])

    return (
        <div className="container">
            <h2 className="mt-3 mb-4">Dogs List</h2>
            {/* <Form className="mb-3">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name or registration number"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSearchClick}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </Form> */}
            <div>
                {dogAccounts.length === 0 ? (
                    <p>No dog accounts were found.</p>
                ) : (
                    <ListGroup>
                        {dogAccounts.map(account => (
                            <ListGroup.Item key={account.regNo} onClick={() => handleDogAccountClick(account.regNo)} style={{ "display": 'flex', 'gap': '25px', 'cursor': 'pointer' }}>
                                <img src={process.env.REACT_APP_API_URL + "/" + account.imagePath} alt={account.name} className="mr-3" style={{ width: '100px', height: '100px' }} />
                                <p className="mb-1"><b>Name:</b> {account.name}</p>
                                <p className="mb-0"><b>Registration Number:</b> {account.regNo}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default DeputyVetSearchDogs;
