import { Timer } from '@renderer/store'

export const openWidget = (timer: Timer) => {
  window.widget.openWidget(JSON.stringify(timer))
}
