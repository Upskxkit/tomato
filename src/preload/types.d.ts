// import { ElectronAPI } from '@electron-toolkit/preload'

export type Timer = {
  time_in_sec: number
  title: string
  id?: string
}
export interface Timers {
  get: () => Promise<Timer[]>
  add: (timer: Timer) => Promise<void>
  update: (timer: Omit<Timer, 'id'>) => Promise<void>
  remove: (id: Timer['id']) => Promise<void>
}

export interface Backend {
  nodeVersion: (msg: string) => Promise<string>
}

export interface Notifications {
  send: (title: string, body: string) => void
}

export interface Widget {
  openWidget: (msg: string) => void
}

declare global {
  interface Window {
    backend: Backend
    notify: Notifications
    timers: Timers
    widget: Widget
  }
}
