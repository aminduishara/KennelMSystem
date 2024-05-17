const pool = require('../db');

function getDogHandler(reg, callback) {
    const sql = "SELECT * FROM policedog";
    const values = [reg];

    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        console.log('Data retrieved successfully:', data);
        return callback(null, data);
    });
}

function dogInfoHandler(reg, callback) {
    const sql = "SELECT * FROM policedog INNER JOIN user ON policedog.handlerRegNo = user.userId WHERE regNo = ?";
    const values = [reg];

    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        console.log('Data retrieved successfully:', data);
        return callback(null, data);
    });
}

// Function to register a new director
function addHealthHandler(date, longtermSicknesses, currentSickness, medicineRecommendations, nextClinicDate, notes, regNo, callback) {
    const sql = "INSERT INTO doghealth (`date`, `regNo`, `longtermSickness`, `currentSickness`, `recommendation`, `clinicDate`, `notes`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    medicineRecommendations = JSON.stringify(medicineRecommendations); // Correctly encode the recommendations as a JSON string
    const values = [date, regNo, longtermSicknesses, currentSickness, medicineRecommendations, nextClinicDate, notes];

    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        console.log('Data inserted successfully:', data);
        return callback(null, data);
    });
}

function healthInfoHandler(reg, callback) {
    const sql = "SELECT * FROM doghealth WHERE regNo = ?";
    const values = [reg];

    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        console.log('Data retrieved successfully:', data);
        return callback(null, data);
    });
}

function vaccineInfoHandler(reg, callback) {
    const sql = "SELECT * FROM dogvaccination WHERE regNo = ?";
    const values = [reg];

    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        console.log('Data retrieved successfully:', data);
        return callback(null, data);
    });
}

// Function to register a new director
function addVaccineHandler(date, vaccinationName, nextVaccinationDate, notes, regNo, callback) {
    const sql = "INSERT INTO dogvaccination (`date`, `regNo`, `nextDate`, `name`, `notes`) VALUES (?, ?, ?, ?, ?)";
    const values = [date, regNo, nextVaccinationDate, vaccinationName, notes];

    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        console.log('Data inserted successfully:', data);
        return callback(null, data);
    });
}

function generalInfoHandler(reg, callback) {
    const sql = "SELECT * FROM dogdeath WHERE regNo = ?";
    const values = [reg];

    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        console.log('Data retrieved successfully:', data);
        return callback(null, data);
    });
}

// Function to register a new director
function addGeneralHandler(date, ageYears, ageMonths, generalReason, notes, regNo, callback) {
    const sql = "INSERT INTO dogdeath (`regNo`, `date`, `age_months`, `age_years`, `reason`, `notes`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [regNo, date, ageMonths, ageYears, generalReason, notes];

    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        console.log('Data inserted successfully:', data);
        return callback(null, data);
    });
}

module.exports = { getDogHandler, dogInfoHandler, addHealthHandler, healthInfoHandler, vaccineInfoHandler, addVaccineHandler, generalInfoHandler, addGeneralHandler };