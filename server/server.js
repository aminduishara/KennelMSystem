const express = require('express');
const mysql = require('mysql');
const cors = require('cors');// Import express, mysql, and cors modules

const app = express();
app.use(cors()); 
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'kennel_new'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Middleware
app.use(cors());

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// POST endpoint for inserting data into directorregister table
app.post('/kennel_new', (req, res) => {
    const sql = "INSERT INTO directorregister (`username`, `password`, `email`) VALUES (?, ?, ?)";
    const values = [req.body.username, req.body.password, req.body.email];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Data inserted successfully:', data);
        return res.status(200).json(data);
    });
});
