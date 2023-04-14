const { app, BrowserWindow } = require("electron");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      // preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL("http://localhost:3001");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  // create our express app
  const app = express();
  // middleware
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // route
  const routes = require(__dirname + "/Routes/Route");
  app.get("/", (req, res) =>
    res.sendFile(__dirname + "/Render/build/index.html")
  );
  app.use("/", routes);
  //filepath
  app.use(express.static(__dirname + "/Render/build"));
  //start
  app.listen(3001, () => {
    console.log("listening at port:3001");
  });
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
