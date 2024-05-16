import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const OicGenerateSummary = () => {
  const [dogCount, setDogCount] = useState(null);
  const [retiredDogCount, setRetiredDogCount] = useState(null);
  const [sickDogCount, setSickDogCount] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFetchDogCount = () => {
    // Dummy data for dog count
    const dummyDogCount = 50;
    setDogCount(dummyDogCount);
  };

  const handleFetchRetiredDogCount = () => {
    // Dummy data for retired dog count
    const dummyRetiredDogCount = 20;
    setRetiredDogCount(dummyRetiredDogCount);
  };

  const handleFetchSickDogCount = () => {
    // Dummy data for sick dog count
    const dummySickDogCount = 10;
    setSickDogCount(dummySickDogCount);
  };

  return (
    <div className="container mt-5">
      <h2 className='fw-bold text-center mb-4'>Generate Summary</h2>
      <div className="d-flex justify-content-center mb-4">
        <Button variant="primary" onClick={handleFetchDogCount} className="me-3">Fetch Dog Count</Button>
        <Button variant="primary" onClick={handleFetchRetiredDogCount} className="me-3">Fetch Retired Dog Count</Button>
        <Button variant="primary" onClick={handleFetchSickDogCount}>Fetch Sick Dog Count</Button>
      </div>
      {dogCount !== null && <p className="text-center">No of Current Dogs: {dogCount}</p>}
      {retiredDogCount !== null && <p className="text-center">No of Retired Dogs: {retiredDogCount}</p>}
      {sickDogCount !== null && <p className="text-center">No of Sick Dogs for {startDate} to {endDate}: {sickDogCount}</p>}
    </div>
  );
};

export default OicGenerateSummary;
