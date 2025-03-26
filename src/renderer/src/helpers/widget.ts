import { Timer } from '@renderer/store'

export const openWidget = (timer: Timer) => {
  window.widget.openWidget(JSON.stringify(timer))
}

export const closeWidget = () => {
  window.widget.closeWidget()
}

export const hideWidget = (timer: Timer) => {
  window.widget.hideWidget(JSON.stringify(timer))
}
