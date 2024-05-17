const { getDogHandler, dogInfoHandler, addHealthHandler, healthInfoHandler, vaccineInfoHandler, addVaccineHandler, generalInfoHandler, addGeneralHandler } = require('../models/VeterinaryModel');
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

function handleAddHealth(req, res) {
    const { date, longtermSicknesses, currentSickness, medicineRecommendations, nextClinicDate, notes, regNo } = req.body;
    addHealthHandler(date, longtermSicknesses, currentSickness, medicineRecommendations, nextClinicDate, notes, regNo, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(result != null ? 200 : 401).json(result);
    });
}

function handleGetHealth(req, res) {
    const { reg } = req.query;
    healthInfoHandler(reg, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(result != null ? 200 : 401).json(result);
    });
}

function handleGetVaccine(req, res) {
    const { reg } = req.query;
    vaccineInfoHandler(reg, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(result != null ? 200 : 401).json(result);
    });
}

function handleAddVaccine(req, res) {
    const { date, vaccinationName, nextVaccinationDate, notes, regNo } = req.body;
    addVaccineHandler(date, vaccinationName, nextVaccinationDate, notes, regNo, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(result != null ? 200 : 401).json(result);
    });
}

function handleGetGeneral(req, res) {
    const { reg } = req.query;
    generalInfoHandler(reg, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(result != null ? 200 : 401).json(result);
    });
}

function handleAddGeneral(req, res) {
    const { date, ageYears, ageMonths, generalReason, notes, regNo } = req.body;
    addGeneralHandler(date, ageYears, ageMonths, generalReason, notes, regNo, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(result != null ? 200 : 401).json(result);
    });
}

module.exports = { handleGetDogs, handleGetDogsDetails, handleAddHealth, handleGetHealth, handleGetVaccine, handleAddVaccine, handleGetGeneral, handleAddGeneral };
