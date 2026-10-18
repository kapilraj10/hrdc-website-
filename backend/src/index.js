const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const db = require('./config/db.js');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes.js');
dotenv.config();


if (!process.env.JWT_SECRET) {
    console.warn('Warning: JWT_SECRET is not set. Using a fallback secret for development.');
}

const app = express();

// Middleware 
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, 
}));
app.use(bodyparser.json());
// test endpoint
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Routes
app.use('/api/v1/auth', authRoutes);





const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await db.connect();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();