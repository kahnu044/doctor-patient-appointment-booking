const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  availableDays: [String], // e.g., ['Monday', 'Wednesday']
  workingHours: [{
    day: String, // 'Monday'
    start: String, // e.g., '09:00'
    end: String, // e.g., '12:00'
  }],
  leaves: [{
    date: Date, // 'DD-MM-YYYY'
  }],
  slotDuration: Number, // in minutes
});

module.exports = mongoose.model('Doctor', DoctorSchema);
