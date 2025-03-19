import { ElectronAPI } from '@electron-toolkit/preload'
import { backend, notification } from './index'
declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    backend: typeof backend
    notify: typeof notification
  }
}
