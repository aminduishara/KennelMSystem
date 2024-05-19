const pool = require('../db');

// Function to login a handler
function dogInfoHandler(pet, callback) {
    const sql = "SELECT * FROM policedog WHERE handlerRegNo = ?";
    const values = [pet];

    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        console.log('Data retrieved successfully:', data);
        return callback(null, data);
    });
}

function dogRegisterHandler(id, name, registrationNumber, breed, gender, registeredDate, birthday, subject, source, imagePath, callback) {
    const sql = "INSERT INTO policedog (`handlerRegNo`, `name`, `regNo`, `breedId`, `gender`, `registeredDate`, `birthday`, `subjectId`, `sourceId`, `imagePath`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [id, name, registrationNumber, breed, gender, registeredDate, birthday, subject, source, imagePath];

    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        console.log('Data inserted successfully:', data);
        return callback(null, data);
    });
}

function dogUpdateHandler(id, healthStatus, dutyStatus, callback) {
    const sql = "UPDATE policedog SET healthStatus = ?, dutyStatus = ? WHERE handlerRegNo = ?";
    const values = [healthStatus, dutyStatus, id];

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

function addDutyHandler(date, description, dutyPlace, result, time, regNo, callback) {
    const sql = "INSERT INTO dogduty (`regNo`, `dutyPlace`, `dutyDate`, `dutyTime`, `description`, `result`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [regNo, dutyPlace, date, time, description, result];

    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        console.log('Data inserted successfully:', data);
        return callback(null, data);
    });
}

function dutyInfoHandler(reg, callback) {
    const sql = "SELECT * FROM dogduty WHERE regNo = ?";
    const values = [reg];

    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        console.log('Data retrieved successfully:', data);
        return callback(null, data);
    });
}

function addTrainingHandler(date, description, endDate, environment, recommendedDuration, startDate, subject, trainingName, weaknesses, regNo, callback) {
    const sql = "INSERT INTO dogtraining (`regNo`, `date`, `name`, `subject`, `environment`, `duration`, `startDate`, `endDate`, `weakness`, `description`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [regNo, date, trainingName, subject, environment, recommendedDuration, startDate, endDate, weaknesses, description];

    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        console.log('Data inserted successfully:', data);
        return callback(null, data);
    });
}

function trainingInfoHandler(reg, callback) {
    const sql = "SELECT * FROM dogtraining WHERE regNo = ?";
    const values = [reg];

    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        console.log('Data retrieved successfully:', data);
        return callback(null, data);
    });
}

function addBreedingHandler(date, regNo, maleDogName, maleDogRegistrationNumber, numberOfPuppiesBorn, numberOfPuppiesLiving, description, callback) {
    const sql = "INSERT INTO dogbreeding (`regNo`, `date`, `maleDogName`, `maleDogRegistrationNumber`, `numberOfPuppiesBorn`, `numberOfPuppiesLiving`, `description`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [regNo, date, maleDogName, maleDogRegistrationNumber, numberOfPuppiesBorn, numberOfPuppiesLiving, description];

    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        console.log('Data inserted successfully:', data);
        return callback(null, data);
    });
}

function breedingInfoHandler(reg, callback) {
    const sql = "SELECT * FROM dogbreeding WHERE regNo = ?";
    const values = [reg];

    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        console.log('Data retrieved successfully:', data);
        return callback(null, data);
    });
}

function dogInfoHandlerAll(reg, callback) {
    const sql = "SELECT * FROM dogduty INNER JOIN policedog ON dogduty.regNo = policedog.regNo INNER JOIN user ON user.userId = policedog.handlerRegNo WHERE dogduty.dutyDate >= CURDATE() - INTERVAL 1 DAY AND dogduty.dutyDate <= CURDATE();";
    const values = [reg];

    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return callback(err, null);
        }
        console.log('Data retrieved successfully:', data);
        return callback(null, data);
    });
}

module.exports = { dogInfoHandler, dogRegisterHandler, dogUpdateHandler, addDutyHandler, dutyInfoHandler, addTrainingHandler, trainingInfoHandler, addBreedingHandler, breedingInfoHandler, dogInfoHandlerAll };
