/* eslint-disable @typescript-eslint/no-unused-vars */
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { /* Menu, MenuItem, */ globalShortcut, Notification } from 'electron'

import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { initAPI } from './api'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      contextIsolation: true,
      preload: join(__dirname, '../preload/index.js')
      // sandbox: false
    },
    // Windows specific settings
    // titleBarStyle: 'default',
    // titleBarOverlay: {
    //   color: '#2f3241',
    //   symbolColor: '#74b1be',
    //   height: 60
    // },
    // macOS specific settings
    ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {})
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow.destroy()
    widgetWindow.destroy()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}

function createTimerWindow() {
  const timerWindow = new BrowserWindow({
    width: 220,
    height: 150,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, '../preload/index.js')
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    timerWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '#timer')
  } else {
    timerWindow.loadFile(join(__dirname, '../renderer/index.html'), {
      hash: 'timer'
    })
  }

  timerWindow.setBackgroundColor('#00000000')

  timerWindow.on('closed', () => {
    mainWindow.destroy()
    timerWindow.destroy()
  })

  return timerWindow
}

let mainWindow
let widgetWindow

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  createGlobalShortcut()
  // createMenu()
  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  mainWindow = createWindow()
  widgetWindow = createTimerWindow()
  initAPI({ main: mainWindow, widget: widgetWindow })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Utils
// function createMenu(): void {
//   const menu = new Menu()
//   menu.append(
//     new MenuItem({
//       label: 'Electron',
//       submenu: [
//         {
//           role: 'help',
//           accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
//           click: (): void => {
//             console.log('Electron rocks!')
//           }
//         }
//       ]
//     })
//   )

//   Menu.setApplicationMenu(menu)
// }

function createGlobalShortcut(): void {
  globalShortcut.register('Alt+CommandOrControl+I', () => {
    new Notification({
      title: 'Electron',
      body: 'This is a notification!'
    }).show()
  })
}
