import { ipcMain, IpcMainInvokeEvent, Notification } from 'electron'

ipcMain.handle('node-version', (event: IpcMainInvokeEvent, msg: string): string => {
  console.log(event)
  console.log(msg)

  return process.versions.node
})

ipcMain.on('notification::show', (_: IpcMainInvokeEvent, msg: string) => {
  const notif = msg.split('::') as [string, string]

  createNotification(...notif).show()
})

export function createNotification(title: string, body: string): Notification {
  return new Notification({
    title,
    body
  })
}
