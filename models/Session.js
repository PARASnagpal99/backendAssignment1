const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  date: { type: String, required: true },
  availability: { type: String, enum: ['Available', 'Booked'], default: 'Available' },
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  deanID: { type: mongoose.Schema.Types.ObjectId, ref: 'Dean' },
  startDateTime: { type: Date , required : true},
  endDateTime: { type: Date , required : true},
});

module.exports = mongoose.model('Session', sessionSchema);
