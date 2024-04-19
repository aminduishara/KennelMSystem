const HandlerModel = require('../models/HandlerModel');

// Function to get all handler credentials
exports.getAllHandlers = (req, res) => {
    HandlerModel.getAllHandlers((error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json(results);
    });
};

// Function to add a new handler credential
exports.addHandler = (req, res) => {
    const { registrationNumber, handlerName, rank, username, password } = req.body;

    HandlerModel.addHandler(registrationNumber, handlerName, rank, username, password, (error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(201).json(data);
    });
};
