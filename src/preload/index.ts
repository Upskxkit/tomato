import { contextBridge, ipcRenderer } from 'electron'
import { Timer, Backend, Notifications, Timers, Widget } from './types'
import { NOTIFICATIONS, TIMERS, WIDGET } from '../constants'

export const backend: Backend = {
  nodeVersion: async (msg: string): Promise<string> => await ipcRenderer.invoke('node-version', msg)
}

export const notifications: Notifications = {
  send: (title: string, body: string): void =>
    ipcRenderer.send(NOTIFICATIONS.SHOW, `${title}::${body}`)
}

export const timers: Timers = {
  get: (): Promise<Timer[]> => ipcRenderer.invoke(TIMERS.GET_TIMERS),
  add: (timer: Timer) => ipcRenderer.invoke(TIMERS.ADD_TIMER, timer),
  update: (timer: Omit<Timer, 'id'>) => ipcRenderer.invoke(TIMERS.UPDATE_TIMER, timer),
  remove: (id: Timer['id']) => ipcRenderer.invoke(TIMERS.DELETE_TIMER, id)
}

export const widget: Widget = {
  openWidget: (msg: string): void => ipcRenderer.send(WIDGET.OPEN_WIDGET, msg),
  hideWidget: (msg: string): void => ipcRenderer.send(WIDGET.HIDE_WIDGET, msg),
  onHideWidget: (callback: (data: string) => void) =>
    ipcRenderer.on(WIDGET.ON_HIDE_WIDGET, (_event, value) => callback(value)),
  onOpenWidget: (callback: (data: string) => void) =>
    ipcRenderer.on(WIDGET.ON_OPEN_WIDGET, (_event, value) => callback(value)),
  closeWidget: (): void => ipcRenderer.send(WIDGET.CLOSE_WIDGET)
}

contextBridge.exposeInMainWorld('backend', backend)
contextBridge.exposeInMainWorld('notify', notifications)
contextBridge.exposeInMainWorld('timers', timers)
contextBridge.exposeInMainWorld('widget', widget)
