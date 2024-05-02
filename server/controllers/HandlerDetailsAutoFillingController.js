const { getHandlerDetailsByUsername } = require('../models/HandlerDetailsAutoFillingModel');

// Controller function to handle fetching handler details by username
function handleGetHandlerDetails(req, res) {
    const { username } = req.query;
    
    getHandlerDetailsByUsername(username, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.error) {
            return res.status(404).json({ error: result.error });
        }
        console.log("result is ",result);
        return res.status(200).json(result);
    });
}

module.exports = { handleGetHandlerDetails };
