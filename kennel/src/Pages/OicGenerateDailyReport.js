import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Footer from '../Components/Footer';
import DailyReport from '../Components/DailyReport';
import '../App.css';
import axios from './../axiosConfig';
import { useUser } from "./../UserContext";
import { useLocation } from 'react-router-dom';

const OicGenerateDailyReport = () => {
  const { userId } = useUser();

  const [reportData, setReportData] = useState({
    'sickInfo': [],
    'deathInfo': [],
    'dutyInfo': []
  });

  // Mock data for the daily report
  // const mockReportData = {
  //   sickInfo: [
  //     { name: 'Dog 1', regNo: '123', handler: 'Handler 1', breed: 'Breed 1', age: 3, sickName: 'Sick 1', treatments: 'Treatment 1', description: 'Description 1' },
  //     { name: 'Dog 2', regNo: '456', handler: 'Handler 2', breed: 'Breed 2', age: 5, sickName: 'Sick 2', treatments: 'Treatment 2', description: 'Description 2' },
  //   ],
  //   deathInfo: [{ name: 'Dog 1', regNo: '123', handler: 'Handler 1', generalReason: 'General Reason 1', description: 'Description 1' }],
  //   criminalInfo: [],
  //   drugInfo: [],
  //   explosiveInfo: [],
  // };

  useEffect(() => {
    const fetchDataSick = async () => {
      try {
        const response = await axios.get("/getHealthAll");
        setReportData(prevReportData => ({
          ...prevReportData,
          sickInfo: [...prevReportData.sickInfo, ...response.data]
        }));
      } catch (error) {
        console.error("Error retrieving Users:", error);
        alert(
          "First time login.Before continue, Create an account for your dog"
        ); // Display user-friendly message
      }
    };

    const fetchDataGeneral = async () => {
      try {
        const response = await axios.get("/getDogs?filter=Dead");
        setReportData(prevReportData => ({
          ...prevReportData,
          deathInfo: [...prevReportData.deathInfo, ...response.data]
        }));
      } catch (error) {
        console.error("Error retrieving Users:", error);
        alert(
          "First time login.Before continue, Create an account for your dog"
        ); // Display user-friendly message
      }
    };

    const fetchDataDuty = async () => {
      try {
        const response = await axios.get('/getDutyAll');
        setReportData(prevReportData => ({
          ...prevReportData,
          dutyInfo: [...prevReportData.deathInfo, ...response.data]
        }));
      } catch (error) {
        console.error('Error retrieving Users:', error);
        alert('An error occurred while retrieving Users. Please try again later.'); // Display user-friendly message
      }
    };

    fetchDataSick();
    fetchDataGeneral();
    fetchDataDuty();
  }, []);

  return (
    <div className="container-fluid mt-4 ">
      {/* <div className="row align-items-center justify-content-center">
        <div className="col-md-12 text-center">
          <div className="d-inline-block mx-2">
            <Button className='daily-report-btn fw-bold hide-on-print' onClick={() => updateTemplate(deathInfo)}>Add Death Information</Button>
          </div>
          <div className="d-inline-block mx-2">
            <Button className='daily-report-btn fw-bold hide-on-print' onClick={() => updateTemplate(sickInfo)}>Add Sick Information</Button>
          </div>
          <div className="d-inline-block mx-2">
            <Button className='daily-report-btn fw-bold hide-on-print' onClick={() => updateTemplate(criminalInfo)}>Add Criminal Information</Button>
          </div>
          <div className="d-inline-block mx-2">
            <Button className='daily-report-btn fw-bold hide-on-print' onClick={() => updateTemplate(narcoticInfo)}>Add Narcotic Information</Button>
          </div>
          <div className="d-inline-block mx-2">
            <Button className='daily-report-btn fw-bold hide-on-print' onClick={() => updateTemplate(explosiveInfo)}>Add Explosive Information</Button>
          </div>
        </div>
      </div> */}
      <div className="row mt-3">

        <div className="col-md-12" style={{ background: '#728FCE' }}
        >
          {/* Template to display daily report */}
          <h4 className='fw-bold text-center'>Daily Report Kandy Kennels-Asgiriya</h4>
          <div className="border p-2 daily-report-wrapper" style={{ margin: '30px' }}>
            <DailyReport reportData={reportData} /> {/*calling the Dailyreport component */}
          </div>
        </div>
      </div>
      <Footer className="hide-on-print" />
    </div>





  );
};

export default OicGenerateDailyReport;