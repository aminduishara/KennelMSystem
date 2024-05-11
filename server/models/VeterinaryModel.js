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

module.exports = { getDogHandler, dogInfoHandler };