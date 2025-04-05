import TimerWidget from '@renderer/components/TimerWidget'
import { notify } from '@renderer/helpers/notify'
import { closeWidget, hideWidget, onOpenWidget } from '@renderer/helpers/widget'
import { useEffect, useState } from 'react'
import { Timer } from 'src/preload/types'
import { Skeleton } from 'antd'

export const TimerWidgetPage = () => {
  const [timer, setTimer] = useState<null | Timer>(null)

  useEffect(() => {
    onOpenWidget((data) => {
      setTimer(data.timer)
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
    />
  )
}

export default TimerWidgetPage
