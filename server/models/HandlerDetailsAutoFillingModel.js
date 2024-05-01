const pool = require('../db');

// Function to fetch handler details by username
function getHandlerDetailsByUsername(username, callback) {
    const sql = "SELECT * FROM `handler` WHERE handler.username=?";
    pool.query(sql, [username], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            
            return callback(err, null);
        }
        if (result.length > 0) {
            console.log("result is ",result);//check the result is coming or not
            const { name, handlerRegNo } = result[0];
            console.log(name, handlerRegNo);
            return callback(null, { name, handlerRegNo });
        } else {
            console.log('Handler not found');
            return callback(null, { error: 'Handler not found' });
        }
    });
}

module.exports = { getHandlerDetailsByUsername };
