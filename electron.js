const { app, BrowserWindow, ipcMain } = require("electron")
const electron = require("electron")

let main, home

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

  home.loadURL("http://127.0.0.1:8000/home")
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
    resizable: false,
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

  main.loadURL("http://127.0.0.1:8000/bonzi")
}

app.on("ready", createWindow)
