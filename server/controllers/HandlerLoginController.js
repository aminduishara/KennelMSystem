const { loginHandler } = require('../models/HandlerLoginModel');

// Controller function to handle handler login
function handleLoginHandler(req, res) {
    const { username, password } = req.body;
    loginHandler(username, password, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(result.success ? 200 : 401).json(result);
    });
}

module.exports = { handleLoginHandler };
