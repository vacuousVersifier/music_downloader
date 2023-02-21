const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

require("update-electron-app")();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 480,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "page", "preload.js"),
    },
  });
  ipcMain.handle("ping", () => "HONK HONK");
  win.loadFile("page/index.html");
};

app.whenReady().then(() => {
  // for(let i = 0; i < 5; i++) { createWindow() };
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});