const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: String,
  flightNumber: String,
  origin: String,
  destination: String,
  departureTime: Date,
  arrivalTime: Date,
  seatsAvailable: Number,
  price: Number,
});

module.exports = mongoose.model('Flight', flightSchema);
