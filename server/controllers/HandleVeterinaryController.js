const { getDogHandler, dogInfoHandler } = require('../models/VeterinaryModel');
const multer = require('multer');

function handleGetDogs(req, res) {
    const { reg } = req.query;
    getDogHandler(reg, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(result != null ? 200 : 401).json(result);
    });
}

function handleGetDogsDetails(req, res) {
    const { reg } = req.query;
    dogInfoHandler(reg, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(result != null ? 200 : 401).json(result);
    });
}

module.exports = { handleGetDogs, handleGetDogsDetails };
