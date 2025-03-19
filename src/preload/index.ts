import { contextBridge, ipcRenderer } from 'electron'
// import { electronAPI } from '@electron-toolkit/preload'

// // Custom APIs for renderer
// const api = {}

// // Use `contextBridge` APIs to expose Electron APIs to
// // renderer only if context isolation is enabled, otherwise
// // just add to the DOM global.
// if (process.contextIsolated) {
//   try {
//     contextBridge.exposeInMainWorld('electron', electronAPI)
//     contextBridge.exposeInMainWorld('api', api)
//   } catch (error) {
//     console.error(error)
//   }
// } else {
//   // @ts-ignore (define in dts)
//   window.electron = electronAPI
//   // @ts-ignore (define in dts)
//   window.api = api
// }

export const backend = {
  nodeVersion: async (msg: string): Promise<string> => await ipcRenderer.invoke('node-version', msg)
}

export const notification = {
  send: (title: string, body: string): void =>
    ipcRenderer.send('notification::show', `${title}::${body}`)
}

contextBridge.exposeInMainWorld('backend', backend)
contextBridge.exposeInMainWorld('notify', notification)
