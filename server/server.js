
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/Routes');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = 8000;

// Middleware
app.use('/kennel', authRoutes);
// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
