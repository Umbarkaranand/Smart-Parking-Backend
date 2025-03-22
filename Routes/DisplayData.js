const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/displaydata", async (req, res) => {
  const fetch_data = mongoose.connection.db.collection("parkings");
  try {
    global.parkingData = await fetch_data.find({}).toArray();
    //  console.log(parkingData);
  } catch (error) {
    console.error(error);
  }

  const fetch_userdata = mongoose.connection.db.collection("users");
  try {
    global.userData = await fetch_userdata.find({}).toArray();
    console.log(userData);
  } catch (error) {
    console.error(error);
  }
  try {
    res.send(global.parkingData);
  } catch (error) {
    console.error(error.message);
    res.send("Server Error");
  }
});

module.exports = router;
