require('dotenv').config();

const mongoose = require('mongoose');

const connect = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is missing in .env');
        }

        await mongoose.connect(process.env.MONGODB_URI);

        console.log('MongoDB Atlas: Connected successfully');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

module.exports = { connect, mongoose };