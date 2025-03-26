import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { NOTIFICATIONS, WIDGET } from '../constants'
import { createNotification } from './utils'

export const initAPI = (callback) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ipcMain.handle('node-version', (_: IpcMainInvokeEvent): string => {
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

  ipcMain.on(WIDGET.OPEN_WIDGET, (_, msg: string) => {
    callback(msg)
  })
}
