const pool = require('../db');

// Function to login a handler
function loginHandler(username, password, callback) {
    const sql = "SELECT * FROM handler WHERE username = ? AND password = ?";
    pool.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        if (result.length > 0) {
            console.log('Handler login successful');
            return callback(null, { success: true });
        } else {
            console.log('Handler login failed');
            return callback(null, { error: 'Invalid credentials' });
        }
    });
}

module.exports = { loginHandler };
