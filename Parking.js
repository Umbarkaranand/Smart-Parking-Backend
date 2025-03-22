// Parking model file (Parking.js)
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ParkingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  parkingname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  imgsrc: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  parkingno: {
    type: [Number], 
    required: true,
  },

  other: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Parking", ParkingSchema);
