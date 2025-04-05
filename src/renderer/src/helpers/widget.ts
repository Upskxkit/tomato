import { Timer } from '@renderer/store'

export interface WidgetConfigParams {
  timer: Timer
  timeLeft: number
  transitionDate: string
  play: boolean
}

export const openWidget = (props: WidgetConfigParams) => {
  window.widget.openWidget(JSON.stringify(props))
}

export const closeWidget = () => {
  window.widget.closeWidget()
}

export const hideWidget = (props: WidgetConfigParams) => {
  window.widget.hideWidget(JSON.stringify(props))
}

export const onHideWidget = (callback: (data: WidgetConfigParams) => void) => {
  window.widget.onHideWidget((data) => {
    const parsedData = JSON.parse(data)
    callback({
      timer: parsedData.timer,
      play: parsedData.isPlay,
      timeLeft: parsedData.time_left,
      transitionDate: parsedData.transitionDate
    })
  })
}

export const onOpenWidget = (callback: (data: WidgetConfigParams) => void) => {
  window.widget.onOpenWidget((data) => {
    const parsedData = JSON.parse(data)
    callback({
      timer: parsedData.timer,
      play: parsedData.isPlay,
      timeLeft: parsedData.time_left,
      transitionDate: parsedData.transitionDate
    })
  })
}
