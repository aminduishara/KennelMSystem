import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Footer from '../Components/Footer';
 

const OicGenerateDailyReport = () => {
  // State variables to manage data and template
  const [templateData, setTemplateData] = useState('');
  const [deathInfo, setDeathInfo] = useState('');
  const [sickInfo, setSickInfo] = useState('');
  const [criminalInfo, setCriminalInfo] = useState('');
  const [narcoticInfo, setNarcoticInfo] = useState('');
  const [explosiveInfo, setExplosiveInfo] = useState('');

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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          {/* Buttons to fetch and display data */}
         
          <div className="mb-3">
            <Button block className=' daily-report-btn'onClick={() => updateTemplate(deathInfo)}>Add Death Information</Button>
          </div>
          <div className="mb-3">
            <Button className='daily-report-btn' block onClick={() => updateTemplate(sickInfo)}>Add Sick Information</Button>
          </div>
          <div className="mb-3">
            <Button className=' daily-report-btn' block onClick={() => updateTemplate(criminalInfo)}>Add Criminal Information</Button>
          </div>
          <div className="mb-3">
            <Button className=' daily-report-btn' block onClick={() => updateTemplate(narcoticInfo)}>Add Narcotic Information</Button>
          </div>
          <div className="mb-3">
            <Button className=' daily-report-btn' block onClick={() => updateTemplate(explosiveInfo)}>Add Explosive Information</Button>
          </div>
        </div>
        <div className="col-md-8">
          {/* Template to display daily report */}
          <h3>Generate Daily Report </h3>
          <div className="border p-3">{templateData}</div>
        </div>
      </div>
      <Footer className="daily-report-footer" />
    </div>
  );
};

export default OicGenerateDailyReport;
