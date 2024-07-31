const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/appointmentApp');
    console.log('Connected to MongoDB successfully!');
  } catch (err) {
    console.error(`Failed to connect to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
