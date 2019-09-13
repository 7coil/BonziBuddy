const { app, BrowserWindow, ipcMain } = require("electron")
const electron = require("electron")

let main, home, settings

const urlBase = process.env.NODE_ENV === 'production' ? 'https://bonzibuddy.netlify.com' : 'http://127.0.0.1:8000'

const createSettingsMenu = () => {
  if (settings) return;
  settings = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + "/static/favicon.ico",
    webPreferences: {
      nodeIntegration: true,
    },
  })

  settings.on("close", () => {
    settings = null
  })

  settings.loadURL(`${urlBase}/settings`)
}

const createHomeMenu = () => {
  if (home) return
  home = new BrowserWindow({
    width: 658,
    height: 436,
    maximizable: false,
    autoHideMenuBar: true,
    icon: __dirname + "/static/favicon.ico",
    webPreferences: {
      nodeIntegration: true,
    },
  })

  home.on("close", () => {
    home = null
  })

  home.loadURL(`${urlBase}/home`)
}

const createWindow = () => {
  main = new BrowserWindow({
    width: 200,
    height: 160,
    transparent: true,
    frame: false,
    // focusable: false,
    maximizable: false,
    alwaysOnTop: true,
    // resizable: false,
    icon: __dirname + "/static/favicon.ico",
    webPreferences: {
      nodeIntegration: true,
    },
  })

  ipcMain.on("windowMoving", (e, { mouseX, mouseY }) => {
    const { x, y } = electron.screen.getCursorScreenPoint()
    main.setPosition(x - mouseX, y - mouseY)
  })

  ipcMain.on("windowMoved", () => {
    // Do somehting when dragging stop
  })

  ipcMain.on("closeProgram", (e, code) => {
    if (typeof code !== "undefined") {
      if (main) main.close()
      if (home) home.close()
    } else {
      main.webContents.send("closeProgram")
    }
  })

  ipcMain.on("openMainMenu", createHomeMenu)
  ipcMain.on("openSettingsMenu", createSettingsMenu)

  main.loadURL(`${urlBase}/bonzi`)
}

app.on("ready", createWindow)
