const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const app = express();
const cors = require("cors");
const videosRoutes = require("./routes/videos");
const bodyParser = require("body-parser");
require("dotenv").config();
const { PORT } = process.env;
const router = express.Router(); // To use router, instantiate it like this
// This middleware allows us to post JSON in request.body
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("Hey Middleware");
  next();
});

// This middleware allows us to serve static files
app.use("/public-images", express.static("./files"));

app.use("/videos", videosRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
