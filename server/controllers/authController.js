const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kennel_new'
});

function registerDirector(req, res) {
    const sql = "INSERT INTO directorregister (`username`, `password`, `email`) VALUES (?, ?, ?)";
    const values = [req.body.username, req.body.password, req.body.email];

    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Data inserted successfully:', data);
        return res.status(200).json(data);
    });
}

function loginDirector(req, res) {
    const { username, password } = req.body;
    const sql = "SELECT * FROM directorregister WHERE username = ? AND password = ?";

    pool.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.length > 0) {
            // Director login successful
            console.log('Director login successful');
            return res.status(200).json({ success: true });
        } else {
            // Director login failed
            console.log('Director login failed');
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    });
}

module.exports = { registerDirector, loginDirector };
