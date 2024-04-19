const pool = require('../db');

// Function to register a new director
function registerDirector(username, password, email, callback) {
    const sql = "INSERT INTO directorregister (`username`, `password`, `email`) VALUES (?, ?, ?)";
    const values = [username, password, email];

    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        console.log('Data inserted successfully:', data);
        return callback(null, data);
    });
}

// Function to login a director
function loginDirector(username, password, callback) {
    const sql = "SELECT * FROM directorregister WHERE username = ? AND password = ?";
    pool.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        if (result.length > 0) {
            // Director login successful
            console.log('Director login successful');
            return callback(null, { success: true });
        } else {
            // Director login failed
            console.log('Director login failed');
            return callback(null, { error: 'Invalid credentials' });
        }
    });
}

module.exports = { registerDirector, loginDirector };
