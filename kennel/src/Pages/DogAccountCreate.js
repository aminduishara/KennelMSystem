import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
//style the date picker
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Components/Footer';
import '../App.css'
import axios from './../axiosConfig';
import { useUser } from './../UserContext';

const DogAccountCreate = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('male');
  const [registeredDate, setRegisteredDate] = useState(new Date());
  const [birthday, setBirthday] = useState(new Date());
  const [subject, setSubject] = useState('');
  const [source, setSource] = useState('');
  const navigate = useNavigate();
  const { userId } = useUser();

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const validateForm = () => {
    if (!image || !name || !registrationNumber || !breed || !gender || !registeredDate || !birthday || !subject || !source) {
      throw new Error('Please fill in all fields.');
    }
  };

  const submitForm = async () => {
    const formData = new FormData();
    formData.append('id', userId);
    formData.append('name', name);
    formData.append('registrationNumber', registrationNumber);
    formData.append('breed', breed);
    formData.append('gender', gender);
    formData.append('registeredDate', formatDate(registeredDate));
    formData.append('birthday', formatDate(birthday));
    formData.append('subject', subject);
    formData.append('source', source);
    formData.append('image', image); // Assuming 'image' is the selected image file

    try {
      const response = await axios.post('/registerDog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data
        }
      });
      navigate('/Pages/DogProfile');
    } catch (error) {
      console.error('Error registering dog account:', error);
      alert('An error occurred while creating the dog. Please try again later.'); // Display user-friendly message
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      validateForm();
      await submitForm();
    } catch (error) {
      alert(error.message);
    }
  };

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
      <div className="formRow row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="form-wrapper mb-20">

            <div className="mb-3">
              <h1>Create an account </h1>
              <label htmlFor="image" className="form-label">Image:</label>
              <input type="file" className="form-control-file" id="image" onChange={handleImageChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input type="text" className="form-control" id="name" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="registrationNumber" className="form-label">Registration Number:</label>
              <input type="text" className="form-control" id="registrationNumber" value={registrationNumber} onChange={(event) => setRegistrationNumber(event.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="breed" className="form-label">Breed:</label>
              <select className="form-select" id="breed" value={breed} onChange={(event) => setBreed(event.target.value)}>
                <option value="">Select breed</option>
                <option value="breed1">Doberman</option>
                <option value="breed2">German Shepherd</option>
                <option value="breed3">Rottweiler</option>
                <option value="breed4">Cocker Spaniel</option>
                <option value="breed5">Doberman Pinscher</option>
                <option value="breed6">Bullmastiff</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Gender:</label>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="gender" id="male" value="male" checked={gender === 'male'} onChange={(event) => setGender(event.target.value)} />
                <label className="form-check-label" htmlFor="male">Male</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="gender" id="female" value="female" checked={gender === 'female'} onChange={(event) => setGender(event.target.value)} />
                <label className="form-check-label" htmlFor="female">Female</label>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="registeredDate" className="form-label">Registered Date:</label>
              <DatePicker selected={registeredDate} onChange={(date) => setRegisteredDate(date)} className="form-control" id="registeredDate" />
            </div>
            <div className="mb-3">
              <label htmlFor="birthday" className="form-label">Birthday:</label>
              <DatePicker selected={birthday} onChange={(date) => setBirthday(date)} className="form-control" id="birthday" />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Subject:</label>
              <select className="form-select" id="subject" value={subject} onChange={(event) => setSubject(event.target.value)}>
                <option value="">Select subject</option>
                <option value="subject1">Narcotic</option>
                <option value="subject2">Explosive</option>
                <option value="subject3">Criminal</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="source" className="form-label">Source:</label>
              <select className="form-select" id="source" value={source} onChange={(event) => setSource(event.target.value)}>
                <option value="">Select source</option>
                <option value="source1">Local</option>
                <option value="source2">Foreign</option>
                <option value="source3">Donation</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DogAccountCreate;