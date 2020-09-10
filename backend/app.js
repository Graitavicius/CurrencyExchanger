const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://mindaugas:etIzMhRfn9X0oJDx@cluster0.je8oc.mongodb.net/currency-exchanger?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(() => {
    console.log("Connection to database failed!");
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET");
  next();
});

app.get("/api/currency", (req, res, next) => {
  const currency = [
    {
      value: "Euros",
      amount: 5,
    },
    {
      value: "Litai",
      amount: 10,
    },
  ];
  res.status(200).json({
    message: "Currency fetched successfully!",
    currency: currency,
  });
});
module.exports = app;
