const {
  app,
  BrowserWindow,
  shell,
  screen,
  ipcMain,
  globalShortcut,
} = require("electron");
const path = require("node:path");

let mainWindow;
/**
 * @type {BrowserWindow}
 */
let mainWindow2;

function createWindow() {
  const { height, width } = screen.getPrimaryDisplay().workAreaSize;

  const x = parseInt(width - 150);
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
    titleBarStyle: "hidden",
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      partition: "persist:your-app",
    },
  });

  mainWindow.loadFile("index.html");
}

function openTelegram() {
  mainWindow.hide();
  mainWindow2?.destroy?.();
  const { height, width } = screen.getPrimaryDisplay().workAreaSize;

  const x = parseInt(width - width / 5 - width * 0.02);
  const y = parseInt(height - height / 2 - height * 0.02);
  mainWindow2 = new BrowserWindow({
    width: width / 4,
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
  const url = "https://web.telegram.org/a";
  mainWindow2.loadURL(url);

  mainWindow2.on("close", function () {
    mainWindow.show();
    mainWindow2.hide();
  });

  mainWindow2.on("minimize", function () {
    mainWindow.show();
    mainWindow2.hide();
  });
}

var canOpenORCanCloseTelegran = true;
app.whenReady().then(() => {
  ipcMain.on("open-telegram", () => {
    openTelegram();
  });
  if (!globalShortcut.isRegistered("F4")) {
    globalShortcut.register("F4", () => {
      if (canOpenORCanCloseTelegran) {
        canOpenORCanCloseTelegran = false;
        openTelegram();
      } else {
        canOpenORCanCloseTelegran = true;
        mainWindow?.show?.();
        mainWindow2?.hide?.();
      }
    });
  }

  createWindow();
});

app.on("will-quit", () => {
  // Desregistrar todos os atalhos antes de sair
  globalShortcut.unregisterAll();
});

app.on("quit", () => {
  // Desregistrar todos os atalhos antes de sair
  globalShortcut.unregisterAll();
});

app.on("before-quit", () => {
  // Desregistrar todos os atalhos antes de sair
  globalShortcut.unregisterAll();
});
