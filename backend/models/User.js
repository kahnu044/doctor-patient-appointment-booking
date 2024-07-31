const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed passwords
  role: { type: String, enum: ['doctor', 'patient', 'admin'], required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
