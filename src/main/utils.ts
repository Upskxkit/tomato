'use strict'
import { Notification } from 'electron'

export function createNotification(title: string, body: string): Notification {
  return new Notification({
    title,
    body,
    sound: 'default'
  })
}
