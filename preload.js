const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  openTelegram: () => ipcRenderer.send("open-telegram"),
});
