const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://mindaugas:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0.je8oc.mongodb.net/currency-exchanger?retryWrites=true&w=majority"
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

let jsonData = require("./currency.json");
let jsonRates = require("./rates.json");

app.get("/api/currency", (req, res, next) => {
  let currencyArrays = [];
  for (let i = 0; i < jsonData.CcyNtry.length; i++) {
    currencyArrays.push([
      jsonData.CcyNtry[i].Ccy.text,
      jsonData.CcyNtry[i].CcyNm[1].text,
    ]);
  }
  res.status(200).json({
    currencyArrays: currencyArrays,
  });
});

app.get("/api/rates", (req, res, next) => {
  rateArray = [];
  for (let i = 0; i < jsonRates.FxRate.length; i++) {
    rateArray.push([
      jsonRates.FxRate[i].CcyAmt[1].Ccy.text,
      jsonRates.FxRate[i].CcyAmt[1].Amt.text,
    ]);
  }
  res.status(200).json({
    rates: rateArray,
  });
});

module.exports = app;
