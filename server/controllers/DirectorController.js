// controllers/DirectorController.js

const { registerDirector, loginDirector } = require('../models/DirectorModel');

// Controller function to handle registering a director
function handleRegisterDirector(req, res) {
    const { username, password, email } = req.body;
    registerDirector(username, password, email, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json(data);
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

module.exports = { handleRegisterDirector, handleLoginDirector };
