const { contextBridge, ipcRenderer } = require("electron");

// we can also expose variables, not just functions
contextBridge.exposeInMainWorld("downloader", {
  getPlaylist: link => ipcRenderer.invoke("getPlaylist", link),
  createFolder: title => ipcRenderer.invoke("createFolder", title),
  downloadVideo: info => ipcRenderer.invoke("downloadVideo", info),
});