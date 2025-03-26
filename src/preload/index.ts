import { contextBridge, ipcRenderer } from 'electron'
import { Timer, Backend, Notifications, Timers, Widget } from './types'
import { NOTIFICATIONS, WIDGET } from '../constants'

export const backend: Backend = {
  nodeVersion: async (msg: string): Promise<string> => await ipcRenderer.invoke('node-version', msg)
}

export const notifications: Notifications = {
  send: (title: string, body: string): void =>
    ipcRenderer.send(NOTIFICATIONS.SHOW, `${title}::${body}`)
}

export const timers: Timers = {
  get: (): Promise<Timer[]> => ipcRenderer.invoke('timers::get'),
  add: (timer: Timer) => ipcRenderer.invoke('timers::add', timer),
  update: (timer: Omit<Timer, 'id'>) => ipcRenderer.invoke('timers::update', timer),
  remove: (id: Timer['id']) => ipcRenderer.invoke('timers::remove', id)
}

export const widget: Widget = {
  openWidget: (msg: string): void => ipcRenderer.send(WIDGET.OPEN_WIDGET, msg),
  hideWidget: (msg: string): void => ipcRenderer.send(WIDGET.HIDE_WIDGET, msg),
  closeWidget: (): void => ipcRenderer.send(WIDGET.CLOSE_WIDGET)
}

contextBridge.exposeInMainWorld('backend', backend)
contextBridge.exposeInMainWorld('notify', notifications)
contextBridge.exposeInMainWorld('timers', timers)
contextBridge.exposeInMainWorld('widget', widget)
