import TimerWidget from '@renderer/components/TimerWidget'
import { notify } from '@renderer/helpers/notify'
import { closeWidget, hideWidget } from '@renderer/helpers/widget'
import { useTimersStore } from '@renderer/store'

export const TimerWidgetPage = () => {
  const timers = useTimersStore((state) => state.timers)
  return (
    <TimerWidget
      timer={timers[0]}
      onTimeOut={() => {
        notify('Timeout', 'Your timer has timed out!')
      }}
      onClose={closeWidget}
      onHide={(timer)=>{
        hideWidget(timer)
      }}
    />
  )
}

export default TimerWidgetPage
