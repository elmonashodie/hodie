const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
// const applicationMenu = require('./menu')

// const appIcon = path.join(__dirname, 'appIcon.png')
const appName = 'Hodie'

// const notifier = require('node-notifier')
// const desktopIdle = require('desktop-idle')

// A global reference of the timer
let timer

// A global reference of the time stamp when user was inactive
let idleTimeStamp

// Keep a global reference of the window object
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 520,
    title: appName,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000')
    mainWindow.webContents.toggleDevTools()
  } else {
    mainWindow.loadFile('build/index.html')
  }

  mainWindow.on('close', (e) => {
    if (app.quitting) {
      mainWindow = null
    } else {
      e.preventDefault()
      mainWindow.hide()
    }
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', async () => {
  createWindow()
  // const menu = Menu.buildFromTemplate(applicationMenu(appName, mainWindow))
  // Menu.setApplicationMenu(menu)
})

app.on('before-quit', () => {
  app.quitting = true
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  } else {
    mainWindow.show()
  }
})

// Allow only one window
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (e, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

// Checks if the user doesn't move keyboard or mouse
function checkForIdleTime() {
  const idle = desktopIdle.getIdleTime()
  console.log('checkForIdle', idle)
  if (idle >= 600) {
    clearInterval(timer)
    idleTimeStamp = new Date(new Date().setMinutes(new Date().getMinutes() - 10))
    timer = setInterval(checkIfUserIsActiveAgain, 60000)
  }
}

// Checks when the user is active again (by touching the keyboard or mouse)
function checkIfUserIsActiveAgain() {
  const idle = desktopIdle.getIdleTime()
  console.log('checkIfUserIsActive', idle)
  if (idle <= 1) {
    clearInterval(timer)
    notifier.notify(
      {
        title: 'Idle time detected',
        message: `We want to let you know that you have been inactive since ${idleTimeStamp.toString().substring(16, 21)}.`,
        sound: 'Funk',
        icon: appIcon,
        wait: true
      }
    )
    timer = setInterval(checkForIdleTime, 60000)
  }
}

// Received from the App component to notify that a timer has been started
ipcMain.on('timer-running', () => {
  console.log('Timer running')
  timer = setInterval(checkForIdleTime, 10000)
})

// Received from the App component to notifty that a timer has been stopped
ipcMain.on('timer-stopped', () => {
  clearInterval(timer)
})