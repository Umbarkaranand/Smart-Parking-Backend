const mongoose = require("mongoose");

const mongourl =
  "mongodb+srv://anandumbarkar3:Anand123@cluster0.tszofv2.mongodb.net/smartparking?retryWrites=true&w=majority&appName=Cluster0";

const connectToDB = async () => {
  try {
    await mongoose.connect(mongourl);
    console.log("Connected to MongoDB");

    const fetch_data = mongoose.connection.db.collection("parkings");
    try {
      global.parkingData = await fetch_data.find({}).toArray();
    //  console.log(parkingData);
    } catch (error) {
      console.error(error);
    }

    const fetch_userdata = mongoose.connection.db.collection("users");
    try{
        
      global.userData = await fetch_userdata.find({}).toArray();
      console.log(userData);
    }
    catch(error)
    {
      console.error(error);
    }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

module.exports = connectToDB;
