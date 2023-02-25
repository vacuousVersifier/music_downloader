const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const playlist = require("./downloader/playlist");
const folder = require("./downloader/folder");
const { download, init } = require("./downloader/video");

require("update-electron-app")();

let win;
const createWindow = async () => {
  win = new BrowserWindow({
    width: 480,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "page", "preload.js"),
      enableRemoteModule: true
    },
  });

  let root = await getRoot();

  ipcMain.handle("getPlaylist", (event, link) => {
    return playlist(link);
  });

  let current_folder;
  let firstDownload = true;
  ipcMain.handle("createFolder", (event, title) => {
    let folderResults = folder(win, root, title);
    current_folder = folderResults.folderPath;
    root = folderResults.root;

    return folderResults.response;
  });
  
  ipcMain.handle("downloadVideo", (event, info) => {
    console.log(info);
    if(firstDownload) { init(root); firstDownload = false; }
    let videos = download(current_folder, info.title, info.link);
    return videos;
  });

  win.loadFile("page/index.html");
};

async function getRoot() {
  return await dialog.showMessageBox(win, {
    title: "Select folder",
    message: "Please select the folder in which to download your songs!"
  }).then(async () => {
    return await dialog.showOpenDialog(win, { properties: ["openDirectory"]})
      .then(({canceled, filePaths}) => {
        if(canceled) {
          dialog.showMessageBox("You need to select a folder! Try again.");
          return getRoot();
        } else {
          return filePaths[0];
        }
      });
  });
}

app.whenReady().then(() => {
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