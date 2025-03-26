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

        // Ensure the index is within bounds
        if (parkingIndex < 0 || parkingIndex >= parkingDoc.parkingno.length) {
            return res.status(400).json({ success: false, message: "Invalid parking index" });
        }

        // Update the parking slot value at the specified index
        parkingDoc.parkingno[parkingIndex] = newValue;

        // Mark the field as modified to ensure MongoDB detects the change
        parkingDoc.markModified("parkingno");

        // Save the updated parking document
        await parkingDoc.save();

        res.json({ success: true, message: "Parking slot updated successfully" });
    } catch (error) {
        console.error("Error updating parking slot:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

module.exports = router;
