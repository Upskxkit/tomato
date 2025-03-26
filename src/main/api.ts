import { BrowserWindow, ipcMain, IpcMainInvokeEvent } from 'electron'
import { NOTIFICATIONS, WIDGET } from '../constants'
import { createNotification } from './utils'

export const initAPI = ({ main, widget }: { main: BrowserWindow; widget: BrowserWindow }) => {
  ipcMain.handle('node-version', (): string => {
    return process.versions.node
  })

  ipcMain.on(NOTIFICATIONS.SHOW, (_: IpcMainInvokeEvent, msg: string) => {
    const notif = msg.split('::') as [string, string]
    createNotification(...notif).show()
  })

  const timers = [
    {
      time_in_sec: 5,
      title: 'Test2',
      id: '1234567890'
    },
    {
      time_in_sec: 600,
      title: 'asd',
      id: '1234567290'
    }
  ]

  ipcMain.handle('timers::get', () => {
    return timers
  })

  /* ipcMain.on('timers::add', () => {
    return timers
  })
  
  ipcMain.on('timers::update', () => {
    return timers
  })
  
  ipcMain.on('timers::remove', () => {
    return timers
  }) */

  ipcMain.on(WIDGET.OPEN_WIDGET, () => {
    if (!widget.isVisible()) {
      main.hide()
      widget.show()
    }
  })

  ipcMain.on(WIDGET.HIDE_WIDGET, () => {
    if (widget.isVisible()) {
      widget.hide()
      main.show()
    }
  })

  ipcMain.on(WIDGET.CLOSE_WIDGET, () => {
    widget.close()
    main.close()
  })
}
