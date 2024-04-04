import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../App.css';
import Footer from '../Components/Footer';

const DirectorSearingDogProfiles = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [searchQuery, setSearchQuery] = useState('');
    const [dogAccounts, setDogAccounts] = useState([]);

    useEffect(() => {
        // Fetch dog accounts data from the backend API (replace URL with actual API endpoint)
        axios.get('https://my-api.com/dog-accounts')
            .then(response => {
                setDogAccounts(response.data);
            })
            .catch(error => {
                console.error('Error fetching dog accounts:', error);
            });
    }, []);

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
        // Navigate to the profile page of the selected dog account
       
        navigate(`/Pages/DirectorSearchingDogProfiles/${accountId}`); // Update the route path
    };

    return (
        <div className="container">
            <h2 className="mt-3 mb-4">Search Dogs</h2>
            <Form className="mb-3">
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
            </Form>
            <div>
                {dogAccounts.length === 0 ? (
                    <p>No dog accounts were found.</p>
                ) : (
                    <ListGroup>
                        {dogAccounts.map(account => (
                            <ListGroup.Item key={account.id} onClick={() => handleDogAccountClick(account.id)}>
                                <img src={account.image} alt={account.name} className="mr-3" style={{ width: '100px', height: '100px' }} />
                                <p className="mb-1">Name: {account.name}</p>
                                <p className="mb-0">Registration Number: {account.registrationNumber}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default DirectorSearingDogProfiles;
