import { ipcMain, IpcMainInvokeEvent, Notification } from 'electron'
import { NOTIFICATIONS, WIDGET } from '../constants'

export function createNotification(title: string, body: string): Notification {
  return new Notification({
    title,
    body,
    sound: 'default'
  })
}

export const initAPI = (callback) => {
  ipcMain.handle('node-version', (event: IpcMainInvokeEvent, msg: string): string => {
    console.log(event)
    console.log(msg)

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
