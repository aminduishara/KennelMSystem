const express = require('express');
const cors = require('cors');//important for access API from different domain
const db = require('./db');

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Your routes and other server logic go here

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
   
});