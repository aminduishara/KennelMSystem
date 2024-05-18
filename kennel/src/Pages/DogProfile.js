import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DropdownButton, Dropdown } from "react-bootstrap";
import Footer from "../Components/Footer";
import axios from "./../axiosConfig";
import { useUser } from "./../UserContext";

const DogProfile = () => {
  const [selectedSickType, setSelectedSickType] = useState();
  const [selectedDutyType, setSelectedDutyType] = useState();
  const [dogData, setDogData] = useState([]);
  const { userId } = useUser();

  const handleDutyTypeSelect = (eventKey) => {
    setSelectedDutyType(eventKey);
  };

  const handleAddDutyInfo = () => {
    // Navigate to AddDutyInfo page when the button is clicked
    navigate("/Pages/AddDutyInfo", { state: { regNo: dogData.regNo } });
  };

  const handleAddTrainingInfo = () => {
    // Navigate to AddTrainingInfo page when the button is clicked
    navigate("/Pages/AddTrainingInfo", { state: { regNo: dogData.regNo } });
  };

  const handleAddBreedingInfo = () => {
    // Navigate to AddBreedingInfo page when the button is clicked
    navigate("/Pages/AddBreedingInfo", { state: { regNo: dogData.regNo } });
  };

  const handleSickTypeSelect = (eventKey) => {
    setSelectedSickType(eventKey);
  };

  useEffect(() => {
    handleUpdateStatus();
  }, [selectedSickType, selectedDutyType]);

  const handleUpdateStatus = async () => {
    if (!userId || !selectedSickType || !selectedDutyType) {
      return;
    }
    const formData = {
      id: userId,
      healthStatus: selectedSickType,
      dutyStatus: selectedDutyType,
    };
    try {
      const response = await axios.post("/updateDog", formData);
    } catch (error) {
      console.error("Error update dog:", error);
      alert("An error occurred while update dog. Please try again later."); // Display user-friendly message
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/getDogInfo?pet=" + userId);
        console.log(response.data);
        if (Array.isArray(response.data) && response.data.length === 0) {
          navigate("/Pages/DogAccountCreate");
        }
        setDogData(response.data[0]);
        setSelectedDutyType(response.data[0].dutyStatus);
        setSelectedSickType(response.data[0].healthStatus);
      } catch (error) {
        console.error("Error retrieving Users:", error);
        alert(
          "First time login.Before continue, Create an account for your dog"
        ); // Display user-friendly message
      }
    };

    fetchData();
  }, []);

  // Format date to 'Y-m-d' (Year-Month-Day) format
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    let month = (1 + formattedDate.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month; // Add leading zero if month is single digit
    let day = formattedDate.getDate().toString();
    day = day.length > 1 ? day : "0" + day; // Add leading zero if day is single digit
    return year + "-" + month + "-" + day;
  };

  return (
    <div className="container-lg">
      <h1 className="mb-4 text-center fw-bold">Handler Profile</h1>
      <div className="row">
        <div className="col-md-8">
          <div className="card" style={{ width: "550px" }}>
            <div class="card-body" style={{ background: "#728FCE" }}>
              <div class="row GX-2 mb-4">
                <div class="col-6 text-end">
                  <strong>Breed:</strong>
                </div>
                <div class="col-6">{dogData.breedId}</div>
              </div>
              <div class="row mb-4">
                <div class="col-6 text-end">
                  <strong>Gender:</strong>
                </div>
                <div class="col-6">{dogData.gender}</div>
              </div>
              <div class="row mb-4">
                <div class="col-6 text-end">
                  <strong>Source:</strong>
                </div>
                <div class="col-6">{dogData.sourceId}</div>
              </div>
              <div class="row mb-4">
                <div class="col-6 text-end">
                  <strong>Registered Date:</strong>
                </div>
                <div class="col-6">{formatDate(dogData.registeredDate)}</div>
              </div>
              <div class="row mb-4">
                <div class="col-6 text-end">
                  <strong>Subject:</strong>
                </div>
                <div class="col-6">{dogData.subjectId}</div>
              </div>
              <div class="row mb-4">
                <div class="col-6 text-end">
                  <strong>Birth Date:</strong>
                </div>
                <div class="col-6">{formatDate(dogData.birthday)}</div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="mt-4">
              <div className="mt-4">
                <div className="row justify-content-start align-items-center">
                  <div className="col-auto me-0">
                    <span className="d-block mb-0 fw-bold">
                      Update Duty status:
                    </span>
                  </div>
                  <div className="col-auto me-1">
                    <DropdownButton
                      id="duty-dropdown"
                      title={selectedDutyType}
                      onSelect={handleDutyTypeSelect}
                    >
                      <Dropdown.Item eventKey="InDuty" selected>
                        In duty
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Training">
                        Training
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Retired">Retired</Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <div className="col-auto me-0">
                    <span className="d-block mb-0 fw-bold">
                      Update Health status:
                    </span>
                  </div>
                  <div className="col-auto">
                    <DropdownButton
                      id="sick-dropdown"
                      title={selectedSickType}
                      onSelect={handleSickTypeSelect}
                    >
                      <Dropdown.Item eventKey="Sick">Sick</Dropdown.Item>
                      <Dropdown.Item eventKey="Dead">Dead</Dropdown.Item>
                      <Dropdown.Item eventKey="Normal" selected>
                        Normal
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 ms-auto d-flex flex-column align-items-center">
          <img
            src={process.env.REACT_APP_API_URL + "/" + dogData.imagePath}
            className="img-fluid rounded-circle mt-1"
            style={{ width: "150px", height: "150px" }}
            alt="Dog Avatar"
          />
          <p className="mt-4 fw-bold">
            Name: <strong>{dogData.name}</strong>
          </p>
          <p className="fw-bold">
            Registration Number: <strong>{dogData.regNo}</strong>
          </p>

          <div className="d-flex flex-column gap-4 mt-3">
            <button
              type="button"
              className="btn btn-outline-primary fw-bold btn-lg w-100"
              onClick={handleAddDutyInfo}
            >
              Add Duty Information
            </button>
            <button
              type="button"
              className="btn btn-outline-primary fw-bold btn-lg w-100"
              onClick={handleAddTrainingInfo}
            >
              Add Training Information
            </button>
            {dogData.gender === "female" && (
              <button
                type="button"
                className="btn btn-outline-primary fw-bold btn-lg w-100"
                onClick={handleAddBreedingInfo}
              >
                Add Breeding Information
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DogProfile;
