const { app, BrowserWindow, globalShortcut, session } = require('electron');
const path = require('node:path');
const loadExtensions = require('./backend/load-extensions');

const createWindow = () => {
  // Create the main browser window
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

  // Load the index.html file
  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

  // Maximize and focus the window
  mainWindow.maximize();
  mainWindow.focus();

  // Register global shortcut when window is focused
  mainWindow.on('focus', () => {
    globalShortcut.register('Control+Tab', () => {
      mainWindow.webContents.send('KeyDown::Control+Tab', '');
    });
  });

  // Unregister all global shortcuts when the window loses focus
  mainWindow.on('blur', () => {
    globalShortcut.unregisterAll();
  });

  // Open DevTools if necessary (uncomment for debugging)
  // mainWindow.webContents.openDevTools();
};

// Unregister all global shortcuts when the app quits
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.whenReady().then(() => {
  loadExtensions();
  createWindow();

  // On macOS, re-create the window when the dock icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit the app when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});