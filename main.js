const { app, BrowserWindow, shell } = require("electron");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    autoHideMenuBar: true,
    x: 1510,
    y: 460,
    disableAutoHideCursor: true,
    title: "Elegram",
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      partition: "persist:your-app",
      contextIsolation: false,
    },
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
  const url = "https://web.telegram.org/k";
  mainWindow.loadURL(url);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
