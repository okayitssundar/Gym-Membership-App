const express = require("express");
const priceRoutes = express.Router();
const fs = require("fs");

const dataPath = `./DB/pricing.json`;

// util functions

const savePricingData = (data) => {
  const stringifyData = JSON.stringify(data, null, 2);
  fs.writeFileSync(dataPath, stringifyData);
};

const getPricingData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

// reading the data
priceRoutes.get("/pricing", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    res.send(JSON.parse(data));
  });
});

//editing
priceRoutes.post("/pricing/edit", (req, res) => {
  savePricingData(req.body);
  res.send({ success: true, msg: "Plan data updated successfully" });
});

// Read - get all accounts from the json file
priceRoutes.get("/pricing/list", (req, res) => {
  const pricing = getPricingData();
  res.send(pricing);
});

module.exports = priceRoutes;
