import TimerWidget from '@renderer/components/TimerWidget'
import { notify } from '@renderer/helpers/notify'
import { closeWidget, hideWidget, onOpenWidget, UpdatedState } from '@renderer/helpers/widget'
import { useEffect, useState } from 'react'
import { Timer } from 'src/preload/types'
import { Skeleton } from 'antd'

export const TimerWidgetPage = () => {
  const [timer, setTimer] = useState<null | Timer>(null)
  const [updatedState, setUpdatedState] = useState<UpdatedState | null>(null)

  useEffect(() => {
    onOpenWidget((data) => {
      setTimer(data.timer)
      setUpdatedState({
        timeLeft: data.timeLeft,
        play: data.play,
        transitionDate: data.transitionDate
      })
    })
  }, [])

  if (!timer) {
    return <Skeleton active />
  }

  return (
    <TimerWidget
      timer={timer}
      onTimeOut={() => {
        notify('Timeout', 'Your timer has timed out!')
      }}
      onClose={closeWidget}
      onHide={hideWidget}
      updatedState={updatedState}
    />
  )
}

export default TimerWidgetPage
