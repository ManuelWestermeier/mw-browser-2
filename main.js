const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('node:path');

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1500,
    height: 1000,
    frame: false,
    darkTheme: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
    },
  });

  // Load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

  // Maximize & focus
  mainWindow.maximize();
  mainWindow.focus();

  mainWindow.on("focus", () => {
    globalShortcut.register('Control+Tab', () => {
      mainWindow.webContents.send('KeyDown::Control+Tab', "");
    });
  })

  mainWindow.on("blur", () => {
    // Unregister all global shortcuts when the app quits.
    globalShortcut.unregisterAll()
  })

  // Open the DevTools if needed
  // mainWindow.webContents.openDevTools();
};

app.on('will-quit', () => {
  // Unregister all global shortcuts when the app quits.
  globalShortcut.unregisterAll();
});

app.whenReady().then(() => {
  createWindow();
  // On macOS, re-create a window when the dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
