const { dogInfoHandler, dogRegisterHandler, dogUpdateHandler, addDutyHandler, dutyInfoHandler, addTrainingHandler, trainingInfoHandler } = require('../models/HandlerModel');
const multer = require('multer');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Specify the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Rename the file to avoid naming conflicts
    }
});

const upload = multer({ storage: storage }).single('image');

// Controller function to handle handler login
function handleGetDogInfo(req, res) {
    const { pet } = req.query;
    dogInfoHandler(pet, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(result != null ? 200 : 401).json(result);
    });
}

function handleRegisterDogInfo(req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'File upload error' });
        } else if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        // File upload successful, now handle the other form data
        const { id, name, registrationNumber, breed, gender, registeredDate, birthday, subject, source } = req.body;
        const imagePath = req.file.path; // Path to the uploaded image

        dogRegisterHandler(id, name, registrationNumber, breed, gender, registeredDate, birthday, subject, source, imagePath, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }
            return res.status(result != null ? 200 : 401).json(result);
        });
    });

    // const { id, name, registrationNumber, breed, gender, registeredDate, birthday, subject, source } = req.body;
    // dogRegisterHandler(id, name, registrationNumber, breed, gender, registeredDate, birthday, subject, source, (err, result) => {
    //     if (err) {
    //         return res.status(500).json({ error: 'Internal server error' });
    //     }
    //     return res.status(result != null ? 200 : 401).json(result);
    // });
}

function handleUpdateDogInfo(req, res) {
    const { id, healthStatus, dutyStatus } = req.body;
    dogUpdateHandler(id, healthStatus, dutyStatus, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(result != null ? 200 : 401).json(result);
    });
}

function handleAddDuty(req, res) {
    const { date, description, dutyPlace, result, time, regNo } = req.body;
    addDutyHandler(date, description, dutyPlace, result, time, regNo, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(result != null ? 200 : 401).json(result);
    });
}

function handleGetDuty(req, res) {
    const { reg } = req.query;
    dutyInfoHandler(reg, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(result != null ? 200 : 401).json(result);
    });
}

function handleAddTraining(req, res) {
    const { date, description, endDate, environment, recommendedDuration, startDate, subject, trainingName, weaknesses, regNo } = req.body;
    addTrainingHandler(date, description, endDate, environment, recommendedDuration, startDate, subject, trainingName, weaknesses, regNo, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(result != null ? 200 : 401).json(result);
    });
}

function handleGetTraining(req, res) {
    const { reg } = req.query;
    trainingInfoHandler(reg, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(result != null ? 200 : 401).json(result);
    });
}

module.exports = { handleGetDogInfo, handleRegisterDogInfo, handleUpdateDogInfo, handleAddDuty, handleGetDuty, handleAddTraining, handleGetTraining };
