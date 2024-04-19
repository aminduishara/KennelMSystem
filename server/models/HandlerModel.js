// models/HandlerModel.js

const pool = require('../db');

// Function to get all handler credentials
function getAllHandlers(callback) {
    pool.query('SELECT * FROM handler', (error, results) => {
        if (error) {
            console.error('Error fetching handler credentials:', error);
            return callback(error, null);
        }
        return callback(null, results);
    });
}

// Function to add a new handler credential
function addHandler(registrationNumber, handlerName, rank, username, password, callback) {
    pool.query(
        "INSERT INTO handler (`handlerRegNo`, `name`, `rank`, `username`, `password`) VALUES (?, ?, ?, ?, ?)",
        [registrationNumber, handlerName, rank, username, password],
        (error, results) => {
            if (error) {
                console.error('Error adding handler credential:', error);
                return callback(error, null);
            }
            return callback(null, { message: 'Handler added successfully', id: results.insertId });
        }
    );
}

module.exports = { getAllHandlers, addHandler };
