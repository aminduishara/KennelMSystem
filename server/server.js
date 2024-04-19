
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/AuthRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

// Middleware
app.use('/kennel', authRoutes);
// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
