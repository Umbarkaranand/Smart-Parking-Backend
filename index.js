const express = require("express");
const app = express();
const ConnectToDB = require("./db");
const CreateUserRouter = require('./Routes/CreateUser')
const CreateParkingRouter = require('./Routes/CreateParking')
const DisplayData = require("./Routes/DisplayData");

const port = 5000;

// Connect to MongoDB
ConnectToDB()
  .then(() => {
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });


    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", " http://localhost:5173");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-Width,Content-Type,Accept "
      );
      next();
    });

    app.use(express.json());
    app.use("/api", CreateUserRouter);
    app.use("/api", CreateParkingRouter);
    app.use("/api", DisplayData);

    
    
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server:", error.message);
  });