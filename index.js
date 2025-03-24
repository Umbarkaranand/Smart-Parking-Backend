const express = require("express");
const app = express();
const ConnectToDB = require("./db");
const CreateUserRouter = require('./Routes/CreateUser');
const CreateParkingRouter = require('./Routes/CreateParking');
const DisplayData = require("./Routes/DisplayData");

const port = 5000;

// Connect to MongoDB
ConnectToDB()
  .then(() => {
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    // CORS middleware to allow requests from specific origins
    app.use((req, res, next) => {
      // List of allowed origins
      const allowedOrigins = ['http://localhost:5173', 'https://smart-parking-system-a30af.netlify.app'];
      const origin = req.headers.origin;

      // Check if the origin is in the allowedOrigins list
      if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin); // Dynamically set the allowed origin
      }

      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow necessary HTTP methods
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Allow necessary headers
      res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials if needed

      // Handle preflight requests (OPTIONS)
      if (req.method === "OPTIONS") {
        return res.status(200).end();
      }

      next(); // Proceed to the next middleware
    });

    app.use(express.json());
    app.use("/api", CreateUserRouter);
    app.use("/api", CreateParkingRouter);
    app.use("/api", DisplayData);

    // Start the server
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server:", error.message);
  });
