import { Timer } from '@renderer/store'

export const openWidget = (timer: Timer, time_left: number, pauseDate: Date) => {
  window.widget.openWidget(JSON.stringify({ timer, time_left, pauseDate }))
}

export const closeWidget = () => {
  window.widget.closeWidget()
}

export const hideWidget = (timer: Timer) => {
  window.widget.hideWidget(JSON.stringify(timer))
}
