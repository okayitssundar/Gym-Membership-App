const express = require("express");
const accountRoutes = express.Router();
const fs = require("fs");

const dataPath = `./DB/useraccount.json`;

// util functions

const saveAccountData = (data) => {
  const stringifyData = JSON.stringify(data, null, 2);
  fs.writeFileSync(dataPath, stringifyData);
};

const getAccountData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

// reading the data
accountRoutes.get("/account", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    res.send(JSON.parse(data));
  });
});

// create account
accountRoutes.post("/account/addaccount", (req, res) => {
  var existAccounts = getAccountData();
  const d = new Date();

  const newAccountId = `${d.getFullYear()}${
    d.getMonth() + 1
  }${d.getDate()}${d.getHours()}${d.getMinutes()}`;

  existAccounts[newAccountId] = req.body;

  saveAccountData(existAccounts);
  res.send({ success: true, msg: "account data added successfully" });
});

// Read - get all accounts from the json file
accountRoutes.get("/account/list", (req, res) => {
  const accounts = getAccountData();
  res.send(accounts);
});

// Update - using Put method
accountRoutes.put("/account/:id", (req, res) => {
  var existAccounts = getAccountData();
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      const accountId = req.params["id"];
      existAccounts[accountId] = req.body;

      saveAccountData(existAccounts);
      res.send({
        success: true,
        msg: `account with id ${accountId} has been updated`,
      });
    },
    true
  );
});

//delete - using delete method
accountRoutes.delete("/account/delete/:id", (req, res) => {
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      var existAccounts = getAccountData();

      const userId = req.params["id"];

      delete existAccounts[userId];
      saveAccountData(existAccounts);
      res.send({
        success: true,
        msg: `accounts with id ${userId} has been deleted`,
      });
    },
    true
  );
});
module.exports = accountRoutes;
