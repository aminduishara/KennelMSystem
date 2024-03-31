import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
//style the date picker
import 'react-datepicker/dist/react-datepicker.css';
import { Navigate, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import '../App.css'




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
  const [handlerName, setHandlerName] = useState('');
  const [handlerRegistrationNumber, setHandlerRegistrationNumber] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Image:', image);
    console.log('Name:', name);
    console.log('Registration Number:', registrationNumber);
    console.log('Breed:', breed);
    console.log('Gender:', gender);
    console.log('Registered Date:', registeredDate);
    console.log('Birthday:', birthday);
    console.log('Subject:', subject);
    console.log('Source:', source);
    console.log('Handler Name:', handlerName);
    console.log('Handler Registration Number:', handlerRegistrationNumber);

    //generate an alert when create button is clicked.
   
    navigate('/Pages/DogProfile');
    
    
  };

  return (
    
  <div className="container">
    <div className="row justify-content-center">
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
      <div className="mb-3">
        <label htmlFor="handlerName" className="form-label">Handler Name:</label>
        <input type="text" className="form-control" id="handlerName" value={handlerName} onChange={(event) => setHandlerName(event.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="handlerRegistrationNumber" className="form-label">Handler Registration Number:</label>
        <input type="text" className="form-control" id="handlerRegistrationNumber" value={handlerRegistrationNumber} onChange={(event) => setHandlerRegistrationNumber(event.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Create</button>
    </form>
  </div>
</div>
{/* <Footer/> */}
</div>
  );
};

export default DogAccountCreate;