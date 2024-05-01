const pool = require('../db');
const bcrypt = require('bcrypt');

// Function to register a new director
function registerDirector(username, password, email, type, deputyVetName, registrationNumber, rank, callback) {
    const sql = "INSERT INTO user (`username`, `password`, `email`, `role`, `reg_number`, `veterinary_name`, `rank`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [username, password, email, type, deputyVetName, registrationNumber, rank];

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
    const sql = "SELECT * FROM user WHERE username = ?";
    pool.query(sql, [username], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        if (result.length > 0) {
            const hashedPasswordFromDatabase = result[0].password;

            // Compare the user's input password with the hashed password from the database
            bcrypt.compare(password, hashedPasswordFromDatabase, function (err, passwordMatch) {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return callback(err, null);
                }
                if (passwordMatch) {
                    console.log('Director login successful');
                    return callback(null, { success: true, data: result[0] });
                } else {
                    console.log('Director login failed: Password does not match');
                    return callback(null, { error: 'Invalid credentials' });
                }
            });
        } else {
            console.log('Director login failed: User not found');
            return callback(null, { error: 'Invalid credentials' });
        }
    });
}

function removeUser(id, callback) {
    const sql = "DELETE FROM user WHERE userId = ?";
    const values = [id];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }

        // Check if any rows were affected
        if (result.affectedRows === 0) {
            console.log('No user found with the provided ID:', id);
            return callback(null, { message: 'No user found with the provided ID' });
        }

        console.log('User removed successfully');
        return callback(null, { success: true });
    });
}

function updateUser(id, username, password, deputyVetName, registrationNumber, rank, callback) {
    const sql = "UPDATE user SET username = ?, password = ?, reg_number = ?, veterinary_name = ?, rank = ? WHERE userId = ?";
    const values = [username, password, deputyVetName, registrationNumber, rank, id];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }

        // Check if any rows were affected
        if (result.affectedRows === 0) {
            console.log('No user found with the provided ID:', id);
            return callback(null, { message: 'No user found with the provided ID' });
        }

        console.log('User updated successfully');
        return callback(null, { success: true });
    });
}

function getUsers(type, callback) {
    const sql = "SELECT userId as id, username, email, reg_number as registrationNumber, veterinary_name as deputyVetName, rank FROM user WHERE role = ?";
    const values = [type];

    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        console.log('Data retrieved successfully:', data);
        return callback(null, data);
    });
}

function getSingleUser(userId, callback) {
    const sql = "SELECT userId as id, username, email, reg_number as registrationNumber, veterinary_name as deputyVetName, rank FROM user WHERE userId = ?";
    const values = [userId];

    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        console.log('Data retrieved successfully:', data);
        return callback(null, data);
    });
}


module.exports = { registerDirector, loginDirector, removeUser, updateUser, getUsers, getSingleUser };
