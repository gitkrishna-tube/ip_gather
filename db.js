
const mongoose = require('mongoose');

// MongoDB Atlas connection string
const uri = 'mongodb+srv://kri854191:PyZ8f7wae506g9Rn@cluster0.aouumks.mongodb.net/';

async function connectDb() {
    try {
        // Connect to MongoDB Atlas
        await mongoose.connect(uri);
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas:', err.message);
    }
}

module.exports = connectDb;
