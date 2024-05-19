import React from 'react';
import { Table } from 'react-bootstrap';
import '../App.css';

const DailyReport = ({ reportData }) => {

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
  //define previous day and current date 
  const currentDate = new Date();
  const previousDate = new Date(currentDate);
  previousDate.setDate(previousDate.getDate() - 1);
  const formattedPreviousDate = previousDate.toLocaleDateString();
  const formattedCurrentDate = currentDate.toLocaleDateString();
  return (
    <div className="daily-report">
      <p>Index:DIR/PO/PW</p>

      <p>Kandy Kennels Devision</p>
      <p>Asgiriya</p>
      <p className='fw-bold'> From [{formattedPreviousDate}] 6.00 A.M to [{formattedCurrentDate}] 6.00 A.M </p>

      <h4 className='text-center'>Sick Dogs</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Reg No</th>
            <th>Handler</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Sick Name</th>
            <th>Treatments</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {reportData.sickInfo.map((info, index) => (
            <tr key={index}>
              <td>{info.name}</td>
              <td>{info.regNo}</td>
              <td>{info.username}</td>
              <td>{info.breedId}</td>
              <td>{formatDate(info.birthday)}</td>
              <td>{info.currentSickness}</td>
              <td>{JSON.parse(info.recommendation).join(', ')}</td>
              <td>{info.notes}</td>
            </tr>
          ))}
          {reportData.sickInfo.length <= 0 && (
            <tr>
              <td colSpan="8">No records found</td>
            </tr>
          )}
        </tbody>
      </Table>

      <h4 className='text-center' >Death Dogs</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Reg No</th>
            <th>Handler</th>
            <th>Breed</th>
            <th>Birthday</th>
          </tr>
        </thead>
        <tbody>
          {reportData.deathInfo.map((info, index) => (
            <tr key={index}>
              <td>{info.name}</td>
              <td>{info.regNo}</td>
              <td>{info.username}</td>
              <td>{info.breedId}</td>
              <td>{formatDate(info.birthday)}</td>
            </tr>
          ))}
          {reportData.deathInfo.length <= 0 && (
            <tr>
              <td colSpan="5">No records found</td>
            </tr>
          )}
        </tbody>
      </Table>

      <h4 className='text-center'>Dogs Duty</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Reg No</th>
            <th>Handler</th>

            <th>Duty Place</th>
            <th>Duty Time</th>
            <th>Description</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {reportData.dutyInfo.map((info, index) => (
            <tr key={index}>
              <td>{info.name}</td>
              <td>{info.regNo}</td>
              <td>{info.username}</td>
              <td>{info.dutyPlace}</td>
              <td>{info.dutyTime}</td>
              <td>{info.description}</td>
              <td>{info.result.toString().toUpperCase()}</td>
            </tr>
          ))}
          {reportData.dutyInfo.length <= 0 && (
            <tr>
              <td colSpan="8">No records found</td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className='details'>
        <p>Checked by</p>
        <p>L.K Wijayabandara</p><br /> {/* Logged director name here*/}
        <br />
        <br />
        <p>Director,</p>
        <p>Kandy Kennels Devision,</p>
        <p>Asgiriya</p>
      </div>
      <div className="d-flex justify-content-end mt-3 hide-on-print ">
        <button className="btn btn-lg btn-primary fw-bold d-flex justify-content-center align-items-center" style={{ width: "100px", height: "40px", marginBottom: '30px' }} onClick={() => window.print()}>Print</button>
      </div>
    </div>
  );
};

export default DailyReport;
