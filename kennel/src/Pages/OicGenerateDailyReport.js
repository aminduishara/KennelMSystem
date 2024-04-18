import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Footer from '../Components/Footer';
import DailyReport from '../Components/DailyReport';
 

const OicGenerateDailyReport = () => {
  // State variables to manage data and template
  const [templateData, setTemplateData] = useState('');
  const [deathInfo, setDeathInfo] = useState('');
  const [sickInfo, setSickInfo] = useState('');
  const [criminalInfo, setCriminalInfo] = useState('');
  const [narcoticInfo, setNarcoticInfo] = useState('');
  const [explosiveInfo, setExplosiveInfo] = useState('');

// Mock data for the daily report
const mockReportData = {
sickInfo: [
      { name: 'Dog 1', regNo: '123', handler: 'Handler 1', breed: 'Breed 1', age: 3, sickName: 'Sick 1', treatments: 'Treatment 1', description: 'Description 1' },
      { name: 'Dog 2', regNo: '456', handler: 'Handler 2', breed: 'Breed 2', age: 5, sickName: 'Sick 2', treatments: 'Treatment 2', description: 'Description 2' },
    ],
deathInfo: [{name: 'Dog 1', regNo: '123', handler: 'Handler 1', generalReason: 'General Reason 1', description: 'Description 1'} ],
criminalInfo: [],
drugInfo: [],
explosiveInfo: [],
};  

  // Function to fetch data from the database (replace with actual API call)
  const fetchData = () => {
    // Simulated API call (replace with actual API call)
    setTimeout(() => {
      const dailyData = {
        death: 'Daily death information from database',
        sick: 'Daily sick information from database',
        criminal: 'Daily criminal information from database',
        narcotic: 'Daily narcotic information from database',
        explosive: 'Daily explosive information from database',
      };
      setDeathInfo(dailyData.death);
      setSickInfo(dailyData.sick);
      setCriminalInfo(dailyData.criminal);
      setNarcoticInfo(dailyData.narcotic);
      setExplosiveInfo(dailyData.explosive);
    }, 1000); // Simulate API delay
  };

  // Function to update the template with the selected information
  const updateTemplate = (info) => {
    setTemplateData(info);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid mt-4">
      <div className="row align-items-center justify-content-center">
        <div className="col-md-12 text-center">
          {/* Buttons to fetch and display data */}
          <div className="d-inline-block mx-2">
            <Button className='daily-report-btn' onClick={() => updateTemplate(deathInfo)}>Add Death Information</Button>
          </div>
          <div className="d-inline-block mx-2">
            <Button className='daily-report-btn' onClick={() => updateTemplate(sickInfo)}>Add Sick Information</Button>
          </div>
          <div className="d-inline-block mx-2">
            <Button className='daily-report-btn' onClick={() => updateTemplate(criminalInfo)}>Add Criminal Information</Button>
          </div>
          <div className="d-inline-block mx-2">
            <Button className='daily-report-btn' onClick={() => updateTemplate(narcoticInfo)}>Add Narcotic Information</Button>
          </div>
          <div className="d-inline-block mx-2">
            <Button className='daily-report-btn' onClick={() => updateTemplate(explosiveInfo)}>Add Explosive Information</Button>
          </div>
        </div>
      </div>
      <div className="row mt-3">

        <div className="col-md-12" >
          {/* Template to display daily report */}
          <h3>Daily Report Template</h3>
          <div className="border p-3 daily-report-wrapper" >
            <DailyReport reportData={mockReportData} />
          </div>
        </div>
        </div>
        <Footer />
      </div>
   
    
      
  
    
  );
};

export default OicGenerateDailyReport;