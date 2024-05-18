import React from 'react';
import { Table } from 'react-bootstrap';
import '../App.css';

const DailyReport = ({ reportData }) => {
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

      <h4 className='text-center'>Sick Dog Information</h4>
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

      <h4 className='text-center' >Death Information</h4>
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

      <h4 className='text-center'>Helping For Criminal Cases</h4>
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

      <h4 className='text-center'>Helping For Drug Cases</h4>
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

      <h4 className='text-center'>Helping For Explosives</h4>
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
        </tbody><br/>
        
      </Table>

      
      <div className='details'>
      <p>Checked by</p>
        <p>L.K Wijayabandara</p><br/> {/* Logged director name here*/}
        <br/>
        <br/>
        <p>Director,</p>
        <p>Kandy Kennels Devision,</p>
        <p>Asgiriya</p>
      </div>
      <div className="d-flex justify-content-end mt-3 hide-on-print ">
            <button className="btn btn-lg btn-primary fw-bold d-flex justify-content-center align-items-center" style={{ width: "100px", height: "40px",marginBottom:'30px' }}  onClick={() => window.print()}>Print</button>
      </div>
    </div>
  );
};

export default DailyReport;
