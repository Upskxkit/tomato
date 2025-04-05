import { app } from 'electron'
import path from 'node:path'
import fs from 'node:fs/promises'
import { Timer } from '../preload/types'

const USER_DATA_PATH = path.join(app.getPath('userData'), 'user_data.json')
const TIMER_DATA_PATH = path.join(app.getPath('userData'), 'timer_data.json')
console.log('USER_DATA_PATH', USER_DATA_PATH)
console.log('TIMER_DATA_PATH', TIMER_DATA_PATH)

export async function readUserData() {
  try {
    const data = await fs.readFile(USER_DATA_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.log('Error retrieving user data', error)
    // you may want to propagate the error, up to you
    return null
  }
}

export async function writeUserData(data) {
  fs.writeFile(USER_DATA_PATH, JSON.stringify(data))
}

export async function writeTimerData(data: Timer[]) {
  const jsonData = JSON.stringify(data)
  fs.writeFile(TIMER_DATA_PATH, jsonData)
}

export async function readTimerData(): Promise<Timer[]> {
  const data = await fs.readFile(TIMER_DATA_PATH, 'utf-8')

  return JSON.parse(data)
}
