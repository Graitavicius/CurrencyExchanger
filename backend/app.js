const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");

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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  next();
});

// fs.readFile("currency.json", (err, data) => {
//   if (err) throw err;
//   let currency = JSON.parse(data);
//   console.log(currency);
// });

let eyes = require("eyes");
let jsonData = require("./currency.json");

//console.log(jsonData);
// for (i = 0; i < jsonData.CcyNtry.length; i++) {
//   console.log(jsonData.CcyNtry[i].CcyNm[1].text);
// }
eyes.inspect(jsonData.CcyNtry[1]);
app.get("/api/currency", (req, res, next) => {
  res.status(200).json({
    message: "Currencies fetched successfully",
    currencies: jsonData,
  });
});

module.exports = app;
