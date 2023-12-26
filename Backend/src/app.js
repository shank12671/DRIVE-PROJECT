// importing core modules or other packages
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config()


mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB is connected Successfully via Mongoose");
  })
  .catch((err) => console.log(err));

// config
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// enabling cors (cross origin resource sharing)
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Controll-Allow-Origin", "*");
  res.header(
    "Access-Controll-Allow-Headers",
    "Origin, X-Requested-With, Accept, Authorization, Content-Type"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Controll-Allow-Methods",
      "PUT, PUSH, PATCH, GET, DELETE"
    );
    res.status(200).json({});
  }
  next();
});

// custom coded modules

const userRoutes = require("./api/routes/user.js");


// each resource gets its own routes

app.use("/users", userRoutes);

app.get("/", (req, res, next) => {
  res.json({
    message: "congo",
  });
});




// 404 error handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// catch-all error handling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
