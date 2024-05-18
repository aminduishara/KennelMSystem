import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { Dropdown, DropdownButton } from 'react-bootstrap';
import "../App.css";
import Footer from "../Components/Footer";
import { useLocation } from "react-router-dom";
import axios from "./../axiosConfig";

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
        const response = await axios.get("/getDogInfo2?reg=" + accountId);
        console.log(response.data[0]);
        setDogData(response.data[0]);
      } catch (error) {
        console.error("Error retrieving Users:", error);
        alert(
          "An error occurred while retrieving Users. Please try again later."
        ); // Display user-friendly message
      }
    };

    fetchData();
  }, []);

  if (dogData != null) {
    return (
      <div className="container-lg">
        <h1 className="mb-4 text-center fw-bold">Health Information</h1>
        <div className="row">
          <div className="col-md-4">
            <img
              src={process.env.REACT_APP_API_URL + "/" + dogData.imagePath}
              alt={dogData.name}
              className="img-fluid rounded-circle"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          </div>

          <div className="col-md-8">
            {/* <p><strong>Current Sick Type:</strong> {sickType}</p> */}
            <div
              class="card-body" style={{ background: "#728FCE" ,width:'550px'}}
            >
             <div className="m-3">    
              <div className="row mb-4">
                {" "}
                {/* Increased vertical gap */}
                <div className="col-md-5">
                  <div className="row mb-2">
                    <strong>Account ID:</strong>
                  </div>
                  <div className="row mb-3">
                    <strong>Name:</strong>
                  </div>
                  <div className="row mb-3">
                    <strong>Registration Number:</strong>
                  </div>
                  <div className="row mb-3">
                    <strong>Handler's Name:</strong>
                  </div>
                  <div className="row mb-3">
                    <strong>Breed:</strong>
                  </div>
                  <div className="row mb-3">
                    <strong>Gender:</strong>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="row mb-2">{accountId}</div>
                  <div className="row mb-3">{dogData.name}</div>
                  <div className="row mb-3">{dogData.regNo}</div>
                  <div className="row mb-3">{dogData.username}</div>
                  <div className="row mb-3">{dogData.breedId}</div>
                  <div className="row mb-3">{dogData.gender}</div>
                </div>
              </div>
              </div>
        </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4 ms-auto d-flex flex-column " >
            <div className="d-flex flex-column gap-3 mt-0 ">
              <button
                className="btn btn-outline-primary fw-bold btn-lg w-100 "
                onClick={handleAddHealthInfo}
              >
                Add Health Information
              </button>
              <button
                className="btn btn-outline-primary fw-bold btn-lg w-100"
                onClick={handleAddVaccinationInfo}
              >
                Add Vaccination Information
              </button>
              <button
                className="btn btn-danger fw-bold btn-lg w-100" // Use btn-danger class for red color
                onClick={handleAddDeathInfo}
              >
                Record Death Information
              </button>
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
