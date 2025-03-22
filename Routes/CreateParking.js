const express = require("express");
const router = express.Router();
const Parking = require("../Parking");

router.post("/createparking", async (req, res) => {
  const { name, email, parkingname, address, imgsrc, parkingno, other } =
    req.body;

  const parkingArray = Array(Number(parkingno)).fill(1);

  try {
    const newParking = new Parking({
      name,
      parkingname,
      email,
      address,
      imgsrc,
      parkingno: parkingArray,
      other,
    });

    await newParking.save();

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});


router.post("/updateData", async (req, res) => {
    try {
      const { email, parkingIndex, newValue } = req.body;
  
      // Find the parking document associated with the given email
      const parkingDoc = await Parking.findOne({ email });
  
      if (!parkingDoc) {
        return res.status(404).json({ success: false, message: "Parking details not found" });
      }
  
      // Update the parking slot value at the specified index
      parkingDoc.parkingno[parkingIndex] = newValue;
  
      // Save the updated parking document
      await parkingDoc.save();
  
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating parking slot:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });


module.exports = router;
