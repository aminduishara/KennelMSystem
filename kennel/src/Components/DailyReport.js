import React from 'react';
import { Table } from 'react-bootstrap';

const DailyReport = ({ reportData }) => {
   



  return (
    <div className="daily-report">
      <p>DIR/PO</p>
      <p>Director</p>
      <p>Kandy Kennels</p>
      <p>Date: {new Date().toLocaleDateString()}</p> {/* Display current date */}

      <h4>Sick Dog Information</h4>
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
              <td>{info.handler}</td>
              <td>{info.breed}</td>
              <td>{info.age}</td>
              <td>{info.sickName}</td>
              <td>{info.treatments}</td>
              <td>{info.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4>Death Information</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Reg No</th>
            <th>Handler</th>
            
            <th>General reason</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {reportData.deathInfo.map((info, index) => (
            <tr key={index}>
              <td>{info.name}</td>
              <td>{info.regNo}</td>
              <td>{info.handler}</td>
              
              <td>{info.generalReason}</td>
              <td>{info.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4>Helping for Criminal Cases</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Reg No</th>
            <th>Handler</th>
            
            <th>Duty place</th>
            <th>Duty subject</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {reportData.criminalInfo.map((info, index) => (
            <tr key={index}>
              <td>{info.name}</td>
              <td>{info.regNo}</td>
              <td>{info.handler}</td>
              
              <td>{info.generalReason}</td>
              <td>{info.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4>Helping for Drug Cases</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Reg No</th>
            <th>Handler</th>
            
            <th>Duty place</th>
            <th>Duty type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {reportData.drugInfo.map((info, index) => (
            <tr key={index}>
              <td>{info.name}</td>
              <td>{info.regNo}</td>
              <td>{info.handler}</td>
              
              <td>{info.generalReason}</td>
              <td>{info.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4>Helping for Explosives</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Reg No</th>
            <th>Handler</th>
            
            <th>Duty place</th>
           
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {reportData.explosiveInfo.map((info, index) => (
            <tr key={index}>
              <td>{info.name}</td>
              <td>{info.regNo}</td>
              <td>{info.handler}</td>
              
              <td>{info.generalReason}</td>
              <td>{info.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DailyReport;
