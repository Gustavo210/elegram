const { app, BrowserWindow, shell, screen, ipcMain } = require("electron");
const path = require("node:path");

let mainWindow;

function createWindow() {
  const { height, width } = screen.getPrimaryDisplay().workAreaSize;

  const x = parseInt(width - 200);
  const y = parseInt(height - 100);

  console.log(x, y);

  mainWindow = new BrowserWindow({
    width: 100,
    height: 100,
    autoHideMenuBar: true,
    x,
    y,
    disableAutoHideCursor: true,
    frame: false,
    title: "Elegram",
    alwaysOnTop: true,
    transparent: true,
    resizable: false,
    movable: true,
    minimizable: false,
    maximizable: false,
    closable: false,
    titleBarStyle: "customButtonsOnHover",
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      partition: "persist:your-app",
    },
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  ipcMain.on("open-telegram", () => {
    mainWindow.hide();

    const { height, width } = screen.getPrimaryDisplay().workAreaSize;

    const x = parseInt(width - width / 5 - width * 0.02);
    const y = parseInt(height - height / 2 - height * 0.02);
    const mainWindow2 = new BrowserWindow({
      width: width / 5,
      height: height / 2,
      autoHideMenuBar: true,
      x,
      y,
      disableAutoHideCursor: true,
      title: "Elegram",
      alwaysOnTop: true,
      minimizable: false,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: true,
        partition: "persist:your-app",
      },
    });
    mainWindow2.webContents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url);
      return { action: "deny" };
    });
    const url = "https://web.telegram.org/k";
    mainWindow2.loadURL(url);

    mainWindow2.on("close", function () {
      mainWindow.show();
      mainWindow2.hide();
    });
  });
  createWindow();
});
