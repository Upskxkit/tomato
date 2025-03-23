import { contextBridge, ipcRenderer } from 'electron'
import { Timer, Backend, Notifications, Timers } from './types'

export const backend: Backend = {
  nodeVersion: async (msg: string): Promise<string> => await ipcRenderer.invoke('node-version', msg)
}

export const notifications: Notifications = {
  send: (title: string, body: string): void =>
    ipcRenderer.send('notifications::show', `${title}::${body}`)
}

export const timers: Timers = {
  get: (): Promise<Timer[]> => ipcRenderer.invoke('timers::get'),
  add: (timer: Timer) => ipcRenderer.invoke('timers::add', timer),
  update: (timer: Omit<Timer, 'id'>) => ipcRenderer.invoke('timers::update', timer),
  remove: (id: Timer['id']) => ipcRenderer.invoke('timers::remove', id)
}

contextBridge.exposeInMainWorld('backend', backend)
contextBridge.exposeInMainWorld('notify', notifications)
contextBridge.exposeInMainWorld('timers', timers)
