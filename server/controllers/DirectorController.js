// controllers/DirectorController.js
const bcrypt = require('bcrypt');
const { registerDirector, loginDirector, removeUser, updateUser, getUsers, getSingleUser } = require('../models/DirectorModel');

// Controller function to handle registering a director
function handleRegisterDirector(req, res) {
    const { username, password, email, type, deputyVetName = null, registrationNumber = null, rank = null } = req.body;
    const saltRounds = 10;

    // Generate salt and hash the password
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
            console.error('Error generating salt:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            // Store the hashed password in your database
            console.log('Hashed password:', hash);

            // Call registerDirector function with the hashed password
            registerDirector(username, hash, email, type, deputyVetName, registrationNumber, rank, (err, data) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal server error' });
                }
                return res.status(200).json(data);
            });
        });
    });
}


// Controller function to handle director login
function handleLoginDirector(req, res) {
    const { username, password } = req.body;
    loginDirector(username, password, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(result.success ? 200 : 401).json(result);
    });
}

function handleRemoveUser(req, res) {
    const { id } = req.body;
    removeUser(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(result.success ? 200 : 401).json(result);
    });
}

function handleUpdateUser(req, res) {
    const { id, username, password, deputyVetName = null, registrationNumber = null, rank = null } = req.body;
    const saltRounds = 10;

    // Generate salt and hash the password
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
            console.error('Error generating salt:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            // Store the hashed password in your database
            console.log('Hashed password:', hash);

            // Call registerDirector function with the hashed password
            updateUser(id, username, hash, deputyVetName, registrationNumber, rank, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal server error' });
                }
                return res.status(result.success ? 200 : 401).json(result);
            });
        });
    });
}

function handleGetUser(req, res) {
    const { type } = req.query;
    getUsers(type, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(result != null ? 200 : 401).json(result);
    });
}

function handleGetSingleUser(req, res) {
    const { userId } = req.query;
    console.log(userId);
    getSingleUser(userId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(result != null ? 200 : 401).json(result);
    });
}

module.exports = { handleRegisterDirector, handleLoginDirector, handleRemoveUser, handleUpdateUser, handleGetUser, handleGetSingleUser };
